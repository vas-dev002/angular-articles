import { gridFeatures } from "./selector";
import { ITopBarStateSG, IStaticGridState } from "../entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { isEmpty } from "lodash";
import { ISelectedFilters } from "../../components/main/entity";
import { Inject, Injectable, Optional } from "@angular/core";
import { isEmptyNullOrUndefined } from "das-lib/utils-by-type";
import { MULTIPLE_STORE_SLICE_NAME } from "../multiple-store/config";

@Injectable()
export class TopBarSelectors {

	constructor(@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) readonly storeSliceName: string) {}

	gridFeatures = isEmptyNullOrUndefined(this.storeSliceName)
		? gridFeatures
		: createFeatureSelector(this.storeSliceName);

	topBarFeatures =
		createSelector(this.gridFeatures, (state: IStaticGridState) => state.topbar);

	selectGroupColumns =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.groupColumns);

	selectSelectedGroupColumns =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.selectedGroups);

	selectSelectedFilters =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.selectedFilters);

	filteredRowsCount =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.filteredRowsCount);

	selectIsFiltersEmpty =
		createSelector(this.selectSelectedFilters, (state: ISelectedFilters) => isEmpty(state));

	selectRefreshDataAction =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.refreshDataAction);

	selectColumnState =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.columnState);

	selectSortModel =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.sortModel);

	selectConfig =
		createSelector(this.topBarFeatures, (state: ITopBarStateSG) => state.config);
}

const topBarFeatures =
	createSelector(gridFeatures, (state: IStaticGridState) => state.topbar);

export const selectGroupColumns =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.groupColumns);

export const selectSelectedGroupColumns =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.selectedGroups);

export const selectSelectedFilters =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.selectedFilters);

export const filteredRowsCount =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.filteredRowsCount);

export const selectIsFiltersEmpty =
	createSelector(selectSelectedFilters, (state: ISelectedFilters) => isEmpty(state));

export const selectRefreshDataAction =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.refreshDataAction);

export const selectColumnState =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.columnState);

export const selectSortModel =
	createSelector(topBarFeatures, (state: ITopBarStateSG) => state.sortModel);
