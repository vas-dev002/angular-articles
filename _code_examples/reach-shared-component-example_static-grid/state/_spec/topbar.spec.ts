import * as act from "../actions/topbar";
import * as sel from "../selectors/topbar";
import { topBarSGReducer } from "../reducers/topbar";
import { DEFAULT_TOPBAR_STATE_SG } from "../entity";
import { EMPTY_FILTERS_SET } from "./topbar.data.set";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { AppState } from "../../../../../../state";
import { IFilterModel, ISelectedFilters, ISortModel } from "../..";

describe("Static Grid State: ", () => {
	const topBarSelectors = new sel.TopBarSelectors(null);
	describe(`[Action: ${act.TopBarSetSelectedGroups.type}]`, () => {
		it("should set selected columns for groupping", () => {
			const selected = ["column1", "column2"];
			const action = act.TopBarSetSelectedGroups({ selected: selected });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.selectSelectedGroupColumns(appStateObj);
			expect(res).toEqual(selected);
		});
	});

	describe(`[Action: ${act.TopBarSetSelectedFilters.type}]`, () => {
		it("should set selected filters", () => {
			const selected = {
				columnName: { type: "testType" } as IFilterModel
			} as ISelectedFilters;
			const action = act.TopBarSetSelectedFilters({ selected: selected });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.selectSelectedFilters(appStateObj);
			expect(res).toEqual(selected);
		});
	});

	describe(`[Selector: selectDataUrl]`, () => {
		it("should are filters empty or not", () => {
			EMPTY_FILTERS_SET.forEach(set => {
				const appStateObj = {
					details: { staticGrid: { topbar: { selectedFilters: set.data } } }
				} as AppState;
				const res = sel.selectIsFiltersEmpty(appStateObj);
				expect(res).toEqual(set.res);
			});
		});
	});

	describe(`[Selector: selectGroupColumns]`, () => {
		it("should return GroupColumns", () => {
			const groupColumns = [
				{ name: "Custom Field", field: "label", value: false },
				{ name: "Value", field: "value", value: false }
			];
			const action = act.TopBarSetGroupColumns({ GroupColumns: groupColumns });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.selectGroupColumns(appStateObj);
			expect(res).toEqual(groupColumns);
		});
	});

	describe(`[Selector: filteredRowsCount]`, () => {
		it("should return filtered rows count", () => {
			const filteredRowsCount = 10;
			const action = act.TopBarSetRowsCount({ filteredRowsCount: filteredRowsCount });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.filteredRowsCount(appStateObj);
			expect(res).toEqual(filteredRowsCount);
		});
	});

	describe(`[Selector: selectRefreshDataAction]`, () => {
		it("should return time when action was called", () => {
			const action = act.TopBarRefreshData();
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.selectRefreshDataAction(appStateObj);
			expect(res).toBeTruthy();
		});
	});

	describe(`[Selector: selectColumnState]`, () => {
		it("should return column state", () => {
			const columns = [
				{ colId: "TestId", pinned: "right", width: 200 } as ColumnState
			];
			const action = act.TopBarSetColumnState({ columns: columns });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.selectColumnState(appStateObj);
			expect(res).toEqual(columns);
		});
	});

	describe(`[Selector: selectSortModel]`, () => {
		it("should return sort model", () => {
			const sort = [{ colId: "TestId", sort: "asc" } as ISortModel];
			const action = act.TopBarSetSortModel({ sort: sort });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = sel.selectSortModel(appStateObj);
			expect(res).toEqual(sort);
		});
	});

	describe(`[Selector: selectConfig]`, () => {
		it("should return topBar configuration", () => {
			const config = {
				exportHidden: true,
				groupbyHidden: true,
				countHidden: false,
				refreshHidden: false,
				filterHidden: false
			};
			const action = act.TopBarSetConfig({ config });
			const result = topBarSGReducer(DEFAULT_TOPBAR_STATE_SG, action);
			const appStateObj = {
				details: { staticGrid: { topbar: result } }
			} as AppState;
			const res = topBarSelectors.selectConfig(appStateObj);
			expect(res).toEqual(config);
		});
	});
});
