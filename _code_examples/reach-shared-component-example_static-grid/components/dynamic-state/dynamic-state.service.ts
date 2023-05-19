import { GridApi, IServerSideDatasource, IServerSideGetRowsParams } from "@ag-grid-community/core";
import { HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { Store } from "@ngrx/store";
import { isEqual } from "lodash";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { filter, takeUntil, throttleTime } from "rxjs/operators";

import { AppState } from "../../../../../../state";
import { getDelayPipe } from "../../../../../evergreen-shared/functions/timers";
import { ApiService } from "../../../../../services/api";
import {
	AgGridFilters
} from "./dynamic-query-parameters/dynamic-filter-parameters/ag-grid-filters";
import {
	DynamicQueryParametersBuilder
} from "./dynamic-query-parameters/dynamic-query-parameters-builder";
import {
	DynamicQueryParametersDirector
} from "./dynamic-query-parameters/dynamic-query-parameters-director";
import { DynamicGridKeySetIdService } from "./dynamic-grid-key-set-id.service";
import {
	DynamicGridTotalRowCount,
	StaticGridMetadataRequest,
	StaticGridReset
} from "../../state/actions/action";
import { TopBarSetRowsCount } from "../../state/actions/topbar";
import { MULTIPLE_STORE_SLICE_NAME } from "../../state/multiple-store/config";
import { createLocalAction } from "../../state/multiple-store/utils";
import { GridSelectors } from "../../state/selectors/selector";
import { TopBarSelectors } from "../../state/selectors/topbar";
import { transformToMetaSG } from "../utils/fn";
import { IOptionsDynamicSG } from "../main/entity";
import {
	DELAY_BEFORE_DISPLAYING_BUBBLES_MS,
	DELAY_BETWEEN_REFRESH_DATA_ACTION_MS
} from "./dynamic-state.config";

@Injectable()
export class DynamicGridStateService implements OnDestroy {
	public hasRowData = new BehaviorSubject<boolean>(true);
	public isRowsLoading$ = new BehaviorSubject<boolean>(false);
	public totalRowCounSubscription: Subscription;
	private previousFilterModel: AgGridFilters;

	public dynamicOptions$: Observable<IOptionsDynamicSG> = this.store.select(this.gridSelectors.selectDynamicOptions);

	private readonly destroy$ = new Subject();

	constructor(
		protected readonly store: Store<AppState>,
		protected readonly gridSelectors: GridSelectors,
		protected readonly topBarSelectors: TopBarSelectors,
		@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) protected readonly storeSliceName: string,
		private readonly apiService: ApiService,
		private readonly keySetIdService: DynamicGridKeySetIdService
	) {}

	public dataSource(url: string, apiErrorOccurs: EventEmitter<HttpErrorResponse>): IServerSideDatasource {
		return {
			getRows: (params: IServerSideGetRowsParams) => {
				this.isRowsLoading$.next(true);

				this.onFilterModelChanged(params.request.filterModel);

				const queryParametersBuilder: DynamicQueryParametersBuilder =
					new DynamicQueryParametersBuilder(params.request, this.keySetIdService);
				const queryParametersDirector: DynamicQueryParametersDirector =
					new DynamicQueryParametersDirector(queryParametersBuilder);

				this.apiService.getRequest(url, queryParametersDirector.buildQueryParameters())
					.pipe(takeUntil(this.destroy$))
					.subscribe((data: { data: unknown[], keyCount: number, keySetId: number }) => {
						this.isRowsLoading$.next(false);
						this.keySetIdService.setKeySetId(data.keySetId);
						this.filteredRowsCountChange(data.keyCount);
						params.success({ rowData: data.data, rowCount: data.keyCount });
						params.columnApi.autoSizeAllColumns(); // adjust the width of the columns to fit the new content
					},
					(error: HttpErrorResponse) => {
						apiErrorOccurs.emit(error);
						this.isRowsLoading$.next(false);
						params.fail();
					});
			}
		};
	}

	public getTotalRowsCount(url: string, apiErrorOccurs: EventEmitter<HttpErrorResponse>): Subscription {
		return this.apiService.getRequest(`${url}/count`)
			.pipe(takeUntil(this.destroy$))
			.subscribe((totalRowCount: number) => {
				this.hasRowData.next(totalRowCount > 0);
				this.store.dispatch(createLocalAction(
					DynamicGridTotalRowCount({totalRowCount}), this.storeSliceName
				));
			},
			(error: HttpErrorResponse) => {
				apiErrorOccurs.emit(error);
			});
	}

	public metadataRequest(url: string, apiErrorOccurs: EventEmitter<HttpErrorResponse>): void {
		this.store.dispatch(createLocalAction(
			StaticGridMetadataRequest({
				payload: {
					url: `${url}/metadata`,
					params: [],
					transformMeta: transformToMetaSG,
					errorActions: (error) => {
						apiErrorOccurs.emit(error);
						return [];
					}
				}
			}), this.storeSliceName)
		);
	}

	public hasData(): Observable<boolean> {
		return this.hasRowData;
	}

	public onLoadingRows(gridApi: GridApi): void {
		this.isRowsLoading$
			.pipe(
				getDelayPipe<boolean>(DELAY_BEFORE_DISPLAYING_BUBBLES_MS),
				takeUntil(this.destroy$)
			)
			.subscribe(isLoading => {
				if (isLoading) {
					gridApi.showLoadingOverlay();
				} else {
					gridApi.hideOverlay();
				}
			});
	}

	public onRefreshDataAction(url: string, apiErrorOccurs: EventEmitter<HttpErrorResponse>, gridApi: GridApi): void {
		this.store.select(this.topBarSelectors.selectRefreshDataAction)
			.pipe(
				takeUntil(this.destroy$),
				filter(x => !!x),
				throttleTime(DELAY_BETWEEN_REFRESH_DATA_ACTION_MS)
			)
			.subscribe(() => {
				if (!!this.totalRowCounSubscription) {
					this.totalRowCounSubscription.unsubscribe();
				}
				this.keySetIdService.resetKeySetId();
				this.totalRowCounSubscription = this.getTotalRowsCount(url, apiErrorOccurs);
				gridApi.refreshServerSideStore({
					purge: true
				});
			});
	}

	public filteredRowsCountChange(count: number) {
		this.store.dispatch(
			createLocalAction(TopBarSetRowsCount({ filteredRowsCount: count }), this.storeSliceName)
		);
	}

	public onFilterModelChanged(newFilterModel: AgGridFilters): void {
		if (!isEqual(this.previousFilterModel, newFilterModel)) {
			this.keySetIdService.resetKeySetId();
		}
		this.previousFilterModel = newFilterModel;
	}

	public clearGridState(): void {
		this.store.dispatch(createLocalAction(StaticGridReset(), this.storeSliceName));
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
