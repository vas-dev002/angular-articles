import { Inject, Injectable, Optional } from "@angular/core";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IStaticGridState } from "../entity";
import { IOptionsSG, IDataRowSG, DataKeyTypeSG, DataIdTypeSG, IColumnMetaSG, GridMode } from "../../components";
import { AppState } from "../../../../../../state";
import { getDataKey } from "../../components/main/config/main";
import { isEmptyNullOrUndefined } from "das-lib/utils-by-type";
import { MULTIPLE_STORE_SLICE_NAME } from "../multiple-store/config";
import { isNullOrUndefined } from "../../../../../util/common/common";

@Injectable()
export class GridSelectors {

	constructor(@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) readonly storeSliceName: string) {}

	gridFeatures = isEmptyNullOrUndefined(this.storeSliceName)
		? gridFeatures
		: createFeatureSelector(this.storeSliceName);

	selectGridMode =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.mode);

	selectLoadingStatus =
		createSelector(this.gridFeatures, (state: IStaticGridState) => {
			return state.isLoading;
		} );

	selectData =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.data);

	totalRowCount =
		createSelector(this.gridFeatures, (state: IStaticGridState) => {
			if (state.mode === GridMode.StaticMode) {
				return state.data ? state.data.length : 0;
			} else {
				return state.dynamicTotalRowCount ?? 0;
			}
		});

	selectMeta =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.meta);

	selectOptions =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.options);

	selectDynamicOptions =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.dynamicOptions);

	selectIsDataEmpty =
		createSelector(this.totalRowCount,
			(totalCount: number) => totalCount === 0);

	selectShowCheckboxes =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.showCheckboxes);

	selectDataKey =
		createSelector(this.selectOptions, this.selectMeta,
			(options: IOptionsSG, meta: IColumnMetaSG[]) => getDataKey(options, meta));

	selectDisableGroupBy =
		createSelector(this.selectOptions,
			(options: IOptionsSG) =>
				options && !isNullOrUndefined(options.disableGroupBy) ? options.disableGroupBy : false);

	selectSelectedDataRows =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.selectedDataRows);

	selectSelectedDataRowsCount =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.selectedDataRows.length);

	selectSelectedDataIds =
		createSelector(this.selectSelectedDataRows, this.selectDataKey,
			(rows: IDataRowSG[], key: DataKeyTypeSG) => rows.map(x => x[key] as DataIdTypeSG));

	selectSelectAll =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.selectAllAction);

	selectDeselectAll =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.deselectAllAction);

	selectReadyStatus =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.ready);

	selectExportFile =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.exportFileAction);

	selectShowOnlySelectedRows =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.showOnlySelectedRows);

	dragAndDrop =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.dragAndDrop);

	selectDisabled =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.disabled);

	selectCellToUpdate =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.cellToUpdate);
}

export const gridFeatures = (state: AppState) =>  state.details.staticGrid;

export const selectLoadingStatus =
	createSelector(gridFeatures, (state: IStaticGridState) => state.isLoading);

export const selectData =
	createSelector(gridFeatures, (state: IStaticGridState) => state.data);

export const totalRowCount =
	createSelector(selectData, (state: []) => state ? state.length : 0);

export const selectMeta =
	createSelector(gridFeatures, (state: IStaticGridState) => state.meta);

export const selectOptions =
	createSelector(gridFeatures, (state: IStaticGridState) => state.options);

export const selectIsDataEmpty =
	createSelector(selectData, (state: Object[]) => !(state && state.length > 0));

export const selectShowCheckboxes =
	createSelector(gridFeatures, (state: IStaticGridState) => state.showCheckboxes);

export const selectDataKey =
	createSelector(selectOptions, selectMeta, (options: IOptionsSG, meta: IColumnMetaSG[]) => getDataKey(options, meta));

export const selectSelectedDataRows =
	createSelector(gridFeatures, (state: IStaticGridState) => state.selectedDataRows);

export const selectSelectedDataRowsCount =
createSelector(gridFeatures, (state: IStaticGridState) => state.selectedDataRows.length);

export const selectSelectedDataIds =
	createSelector(selectSelectedDataRows, selectDataKey,
		(rows: IDataRowSG[], key: DataKeyTypeSG) => rows.map(x => x[key] as DataIdTypeSG));

export const selectSelectAll =
	createSelector(gridFeatures, (state: IStaticGridState) => state.selectAllAction);

export const selectDeselectAll =
	createSelector(gridFeatures, (state: IStaticGridState) => state.deselectAllAction);

export const selectReadyStatus =
	createSelector(gridFeatures, (state: IStaticGridState) => state.ready);

export const selectExportFile =
	createSelector(gridFeatures, (state: IStaticGridState) => state.exportFileAction);

export const selectShowOnlySelectedRows =
	createSelector(gridFeatures, (state: IStaticGridState) => state.showOnlySelectedRows);

export const dragAndDrop =
	createSelector(gridFeatures, (state: IStaticGridState) => state.dragAndDrop);

export const selectDisabled =
	createSelector(gridFeatures, (state: IStaticGridState) => state.disabled);

export const selectCellToUpdate =
	createSelector(gridFeatures, (state: IStaticGridState) => state.cellToUpdate);
