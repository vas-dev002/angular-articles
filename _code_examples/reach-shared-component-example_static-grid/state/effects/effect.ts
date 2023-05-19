import { Inject, Injectable, Optional } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import * as act from "../actions/action";
import {
	map,
	mergeMap,
	switchMap,
	catchError,
	onErrorResumeNext,
	takeUntil
} from "rxjs/operators";
import { ApiService } from "../../../../../../components/services/api";
import { LayoutErrorMessage } from "../../../../../../state/layout/actions";
import { throwError, forkJoin } from "rxjs";
import { apiError } from "../../../../../../components/util/common/error";
import * as actTopbar from "../../state/actions/topbar";
import { IGroupByColumn } from "../../components/topbar/entity";
import { Action } from "@ngrx/store";
import { IDataRowSG, IColumnMetaSG } from "../../components/main/entity";
import { IStaticGridGetDataParams, IStaticGridGetMetadataParams } from "../../../util/entity";
import { objectByPropertyStringComparator } from "../../../../../evergreen-shared/utils/comparators";
import { createLocalAction, forThisComponent } from "../multiple-store/utils";
import { MULTIPLE_STORE_SLICE_NAME } from "../multiple-store/config";
import { MultipleStoreEffects } from "../multiple-store/multiple-store.effects";
import { ITypedController } from "../../components/columns/entity";

@Injectable()
export class StaticGridEffects extends MultipleStoreEffects {

	constructor(
		@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) protected sliceName: string,
		protected actions$: Actions,
		private readonly api: ApiService
	) {
		super(actions$, sliceName);
	}

	public readonly staticGridDataGetRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(act.StaticGridDataRequest),
			forThisComponent(this.sliceName),
			map(
				(prm: {
					action: Action,
					url: string;
					requestTimeout?: number;
					params: string[];
					transformMeta: (response: Object, customMetaTypes: ITypedController[]) => IColumnMetaSG[];
					customMetaTypes?: ITypedController[];
					transformData: (response: Object) => IDataRowSG[];
					errorActions: (res: any) => Action[];
				}) => prm
			),
			switchMap(prm => {
				return this.api.getRequest(prm.url, prm.params, prm.requestTimeout).pipe(
					takeUntil(
						this.actions$.pipe(
								ofType(act.CancelStaticGridDataRequest)
						)),
					map((response: IDataRowSG[]) => this.mapRowsData(response, prm)),
					catchError(res => throwError({ res, prm })),
					mergeMap(result => this.mapStaticGridData(result)),
					catchError(err => this.errorHandler(err)),
					onErrorResumeNext()
				);
			}

			),
			map(prm => prm)
		)
	);

	public readonly staticGridSeparatedDataRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(act.StaticGridSeparatedDataRequest),
			forThisComponent(this.sliceName),
			map((prm: { payload: IStaticGridGetDataParams }) => prm),
			switchMap((params: { payload: IStaticGridGetDataParams }) => {
				const getMetadataUrl = params.payload.urlMetadata ? params.payload.urlMetadata : `${params.payload.url}/metadata`;

				return forkJoin([
					this.api.getRequest(params.payload.url, params.payload.params),
					this.api.getRequest(getMetadataUrl, params.payload.params)
				]).pipe(
					takeUntil(
						this.actions$.pipe(ofType(act.CancelStaticGridDataRequest))
					),
					map(([results, metadata]) =>
						({ results: this.sortDataByColumnName(results, params.payload.sortFieldName), metadata })),
					map((response: any) => this.mapRowsData(response, params.payload)),
					catchError(res => throwError({ res, params })),
					mergeMap(result => this.mapStaticGridData(result)),
					catchError(err => this.errorHandler(err)),
					onErrorResumeNext()
				);
			}
			)
		)
	);

	public readonly staticGridMetadataRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(act.StaticGridMetadataRequest),
			forThisComponent(this.sliceName),
			map((prm: { payload: IStaticGridGetMetadataParams }) => prm),
			switchMap((params: { payload: IStaticGridGetMetadataParams }) => {

				return this.api.getRequest(params.payload.url, params.payload.params).pipe(
					takeUntil(
						this.actions$.pipe(ofType(act.CancelStaticGridDataRequest))
					),
					map((metadata) => ({ res: { meta: params.payload.transformMeta({ metadata }) } })),
					catchError(res => throwError({ res, prm: params.payload })),
					mergeMap(result => this.mapStaticGridData(result)),
					catchError(err => this.errorHandler(err)),
					onErrorResumeNext()
				);
			}
			)
		)
	);

	private sortDataByColumnName(data: any, fieldName: string): any {
		return fieldName ? [...data.sort(objectByPropertyStringComparator(fieldName))] : data;
	}

	private errorHandler(err) {
		const errActions: Action[] = err.prm.errorActions(err.res);
		const error = apiError(err, "FullPage");
		let resultErrorActions = [];
		if (errActions && errActions.length > 0) {
			resultErrorActions = [...errActions];
		} else {
			resultErrorActions = [LayoutErrorMessage({ message: error })];
		}
		resultErrorActions.push(createLocalAction(act.StaticGridLoadError(), this.sliceName));
		return resultErrorActions;
	}

	private mapRowsData(response: IDataRowSG[], prm) {
		const res = {
			meta: prm.transformMeta(response, prm.customMetaTypes),
			data: prm.transformData(response)
		};
		return { res, prm };
	}

	private mapStaticGridData(result, onlyMetadata = false) {
		const res = result.res;
		let actions = [
			createLocalAction(act.StaticGridSelectRows({ rows: []}), this.sliceName),
			createLocalAction(act.StaticGridSetMeta({ meta: res.meta }), this.sliceName),
			createLocalAction(act.StaticGridDataLoaded({ data: res.data }), this.sliceName),
			createLocalAction(actTopbar.TopBarSetGroupColumns({
				GroupColumns: res.meta
					.filter(x => (this.isColumnGroupable(x)))
					.map(x => {
						return {
							field: x.columnName,
							name: x.headerName
						} as IGroupByColumn;
					})
			}), this.sliceName)
		];

		if (onlyMetadata) {
			actions = actions.splice(2, 1);
		}
		return actions;
	}

	private isColumnGroupable(columnMeta: IColumnMetaSG): boolean {
		return columnMeta.visible;
	}
}
