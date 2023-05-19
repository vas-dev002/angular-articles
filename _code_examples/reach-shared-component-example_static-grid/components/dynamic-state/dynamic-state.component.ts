import { ColDef, ColumnState, GridApi, GridOptions, RowNode } from "@ag-grid-community/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnDestroy, OnInit, Output, Self } from "@angular/core";
import { combineLatest, Observable, Subject } from "rxjs";

import { DynamicGridKeySetIdService } from "./dynamic-grid-key-set-id.service";
import { GridSelectors } from "../../state/selectors/selector";
import { TopBarSelectors } from "../../state/selectors/topbar";
import { IStaticGridWrapper } from "../entity";
import { StaticGridComponent } from "../main/comp";
import {
	GridMode,
	IColumnMetaSG,
	IOptionsDynamicSG,
	IOptionsSG,
	ISelectedFilters,
	ISortModel
} from "../main/entity";
import { MainGridStateService } from "../static-state/main-state.service";
import { DynamicGridStateService } from "./dynamic-state.service";
import { defaultDynamicConfig } from "../main/config/main";
import { filter, first, map, takeUntil } from "rxjs/operators";
import { isEmptyNullOrUndefined } from "../../../../../util/common/common";

@Component({
	selector: "dynamic-grid-state",
	templateUrl: "dynamic-state.component.html",
	styleUrls: ["../static-state/static-state.component.scss"],
	providers: [
		GridSelectors,
		TopBarSelectors,
		DynamicGridStateService,
		MainGridStateService,
		DynamicGridKeySetIdService
	]
})
export class DynamicGridStateComponent implements IStaticGridWrapper, OnInit, OnDestroy {
	@Output() apiErrorOccurs  = new EventEmitter<HttpErrorResponse>();

	public dataUrl = "";
	public destroy$ = new Subject();

	public gridMode$: Observable<GridMode> = this.mainGridStateService.gridMode$;
	public hasData$: Observable<boolean> = this.dynamicGridStateService.hasData();
	public meta$: Observable<IColumnMetaSG[]> = this.mainGridStateService.meta$;
	public options$: Observable<IOptionsSG> = this.mainGridStateService.options$;
	public defaultConfig$: Observable<GridOptions> = combineLatest([
			this.mainGridStateService.meta$,
			this.mainGridStateService.options$
		])
		.pipe(
			first(),
			map(([meta, options]) => defaultDynamicConfig(options, meta))
		);
	public columnState$: Observable<ColumnState[]> = this.mainGridStateService.columnState$;
	public dynamicOptions$: Observable<IOptionsDynamicSG> = this.dynamicGridStateService.dynamicOptions$;
	public selectedFilters$: Observable<ISelectedFilters> =  this.mainGridStateService.selectedFilters$;
	public sortModel$: Observable<ISortModel[]> = this.mainGridStateService.sortModel$;
	public selectedGroupColumns$: Observable<string[]> = this.mainGridStateService.selectedGroupColumns$;
	public disabled$: Observable<boolean> = this.mainGridStateService.disabled$;

	public customFilterRules$: Observable<(node: RowNode) => boolean> =
		this.mainGridStateService.customFilterRulesChanges$.asObservable();
	public gridReady$: Observable<StaticGridComponent> = this.mainGridStateService.gridReady$.asObservable();

	constructor(
		@Self() readonly dynamicGridStateService: DynamicGridStateService,
		@Self() readonly mainGridStateService: MainGridStateService,
		@Self() readonly keySetIdService: DynamicGridKeySetIdService
	) {}

	ngOnInit(): void {
		this.setSubscriptionOnDataUrlChanged();
		this.mainGridStateService.setGridMode(GridMode.DynamicMode);
	}

	public onReady(grid: StaticGridComponent) {
		this.mainGridStateService.grid = grid;
		this.mainGridStateService.gridReady$.next(grid);
		this.mainGridStateService.initActions();
		this.configureDataSource(grid.gridApi);
		this.mainGridStateService.setStaticGridReadyStatus(true);
	}

	public setGroupColumns = (selected: string[]) => this.mainGridStateService.setGroupColumns(selected);

	public setFilters = (selected: ISelectedFilters) => this.mainGridStateService.setFilters(selected);

	public visibleColumnsChange = (col: ColDef[]) => this.mainGridStateService.visibleColumnsChange(col);

	public columnStateChange = (columns: ColumnState[]) => this.mainGridStateService.columnStateChange(columns);

	public sortModelChange = (sort: ISortModel[]) => this.mainGridStateService.sortModelChange(sort);

	private setSubscriptionOnDataUrlChanged(): void {
		this.dynamicOptions$
			.pipe(
				takeUntil(this.destroy$),
				filter((options: IOptionsDynamicSG) => !isEmptyNullOrUndefined(options.dataUrl))
			)
			.subscribe((options: IOptionsDynamicSG) => {
				this.dataUrl = options.dataUrl;
				this.dynamicModeRequests();
			});
	}

	private dynamicModeRequests(): void {
		this.dynamicGridStateService.getTotalRowsCount(this.dataUrl, this.apiErrorOccurs);
		this.dynamicGridStateService.metadataRequest(this.dataUrl, this.apiErrorOccurs);
	}

	private configureDataSource(gridApi: GridApi): void {
		const dataSource = this.dynamicGridStateService.dataSource(this.dataUrl, this.apiErrorOccurs);
		gridApi.setServerSideDatasource(dataSource);
		this.dynamicGridStateService.onLoadingRows(gridApi);
		this.dynamicGridStateService.onRefreshDataAction(this.dataUrl, this.apiErrorOccurs, gridApi);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this.mainGridStateService.setStaticGridReadyStatus(false);
		this.dynamicGridStateService.clearGridState();
	}
}
