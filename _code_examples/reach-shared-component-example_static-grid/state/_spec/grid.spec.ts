import * as act from "../actions/action";
import * as sel from "../selectors/selector";
import { defaultReducer } from "../reducers/reducer";
import { DEFAULT_STATIC_GRID_STATE, IStaticGridState } from "../entity";
import { AppState } from "../../../../../../state";
import {
	IColumnMetaSG,
	IOptionsSG,
	defaultDataKeySG,
	GridMode
} from "../../components/main/entity";
import { EMPTY_DATA_SET, SIMPLE_GET_DATA_PARAMS } from "./grid.data.set";
import { cloneDeep } from "lodash";

describe("Static Grid State: ", () => {

	const gridSelectors = new sel.GridSelectors(null);

	describe(`[Action: ${act.StaticGridReset.type}`, () => {
		it("should reset state of grid", () => {
			const action = act.StaticGridReset();
			const state = {
				...DEFAULT_STATIC_GRID_STATE,
				isLoading: true,
				data: [{ key: "test" }]
			} as IStaticGridState;
			const result = defaultReducer(state, action);
			expect(result).toEqual(DEFAULT_STATIC_GRID_STATE);
		});
	});

	describe(`[Action: ${act.StaticGridDataRequest.type}`, () => {
		it("should change loading status", () => {
			const action = act.StaticGridDataRequest(SIMPLE_GET_DATA_PARAMS);
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectLoadingStatus(appStateObj);
			expect(res).toBe(true);
		});
	});

	describe(`[Action: ${act.StaticGridSeparatedDataRequest.type}`, () => {
		it("should change loading status", () => {
			const action = act.StaticGridSeparatedDataRequest({
				payload: SIMPLE_GET_DATA_PARAMS
			});
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectLoadingStatus(appStateObj);
			expect(res).toBe(true);
		});
	});

	describe(`[Action: ${act.StaticGridLoadError.type}`, () => {
		it("should change loading status to false", () => {
			const gridState = {
				...DEFAULT_STATIC_GRID_STATE,
				isLoading: true
			};
			const action = act.StaticGridLoadError();
			const result = defaultReducer(gridState, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectLoadingStatus(appStateObj);
			expect(res).toBe(false);
		});
	});

	describe(`[Action: ${act.StaticGridDataLoaded.type}`, () => {
		it("should set loaded data and change loading status", () => {
			const loadedData = [
				{ f1: "f1", [defaultDataKeySG]: 1 },
				{ f2: "f2", [defaultDataKeySG]: 2 },
				{ f3: "f3", [defaultDataKeySG]: 3 }
			];
			const action = act.StaticGridDataLoaded({ data: loadedData });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const resStatus = sel.selectLoadingStatus(appStateObj);
			expect(resStatus).toBe(false);
			const resData = sel.selectData(appStateObj);
			expect(resData).toEqual(loadedData);
		});
		it("should show data is empty or not", () => {
			EMPTY_DATA_SET.forEach(set => {
				const appStateObj = {
					details: { staticGrid: { data: set.data as Object[] } }
				} as AppState;
				const res = sel.selectIsDataEmpty(appStateObj);
				expect(res).toEqual(set.res);
			});
		});
		it("should set total row count", () => {
			const loadedData = [
				{ f1: "f1", [defaultDataKeySG]: 1 },
				{ f2: "f2", [defaultDataKeySG]: 2 },
				{ f3: "f3", [defaultDataKeySG]: 3 }
			];
			const action = act.StaticGridDataLoaded({ data: loadedData });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const resData = gridSelectors.totalRowCount(appStateObj);
			expect(resData).toEqual(loadedData.length);
		});
		it("should return total row count equal to 0 if data is null", () => {
			const loadedData = null;
			const action = act.StaticGridDataLoaded({ data: loadedData });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const resData = gridSelectors.totalRowCount(appStateObj);
			expect(resData).toEqual(0);
		});

		it("should set total row count for dynamic mode", () => {
			const state = cloneDeep(DEFAULT_STATIC_GRID_STATE);
			state.mode = GridMode.DynamicMode;
			const action = act.DynamicGridTotalRowCount({ totalRowCount: 12345 });
			const result = defaultReducer(state, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const resData = gridSelectors.totalRowCount(appStateObj);
			expect(resData).toEqual(12345);
		});

		it("should return total row count for infinite scroll mode equal to 0 if data is null", () => {
			const action = act.StaticGridMode({ mode: GridMode.DynamicMode });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const resData = gridSelectors.totalRowCount(appStateObj);
			expect(resData).toEqual(0);
		});
	});

	describe(`[Action: ${act.StaticGridSetMeta.type}`, () => {
		it("should set meta data for columns", () => {
			const meta = [{ headerName: "Test" } as IColumnMetaSG];
			const action = act.StaticGridSetMeta({ meta: meta });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectMeta(appStateObj);
			expect(res).toEqual(meta);
		});
	});

	describe(`[Action: ${act.StaticGridSetOptions.type}`, () => {
		it("should set options for static-grid", () => {
			const options = { emptyMessage: "testMessage" } as IOptionsSG;
			const action = act.StaticGridSetOptions({ options: options });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectOptions(appStateObj);
			const resDataKey = sel.selectDataKey(appStateObj);
			expect(res).toEqual(options);
			expect(resDataKey).toEqual(defaultDataKeySG);
		});
		it("should set options with custom data key", () => {
			const dataKey = "CustomKey";
			const options = { dataKey } as IOptionsSG;
			const action = act.StaticGridSetOptions({ options: options });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectDataKey(appStateObj);
			expect(res).toEqual(dataKey);
		});

		it("should set options with disableGroupBy", () => {
			const disableGroupBy = true;
			const options = { disableGroupBy } as IOptionsSG;
			const action = act.StaticGridSetOptions({ options: options });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = gridSelectors.selectDisableGroupBy(appStateObj);
			expect(res).toEqual(disableGroupBy);
		});

		it("should return disableGroupBy false when the options are not set", () => {
			const action = act.StaticGridSetOptions({ options: undefined });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = gridSelectors.selectDisableGroupBy(appStateObj);
			expect(res).toBeFalsy();
		});
	});

	describe(`[Action: ${act.StaticGridSelectRows.type}`, () => {
		it("should set selected data rows", () => {
			const rows = [{ [defaultDataKeySG]: 1 }, { [defaultDataKeySG]: 22 }];
			const action = act.StaticGridSelectRows({ rows: rows });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectSelectedDataRows(appStateObj);
			expect(res).toEqual(rows);
			const count = sel.selectSelectedDataRowsCount(appStateObj);
			expect(count).toEqual(2);
			const resIds = sel.selectSelectedDataIds(appStateObj);
			expect(resIds).toEqual([1, 22]);
		});
	});

	describe(`[Selector: selectAll]`, () => {
		it("should return time when selectAll was called", () => {
			const action = act.StaticGridSelectAll();
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectSelectAll(appStateObj);
			expect(res).toBeTruthy();
		});
		it("should return time when deselectAll was called", () => {
			const action = act.StaticGridDeselectAll();
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectDeselectAll(appStateObj);
			expect(res).toBeTruthy();
		});
	});

	describe(`[Action: ${act.StaticGridSetReady}`, () => {
		it("should set ready status", () => {
			const status = true;
			const action = act.StaticGridSetReady({ status: status });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectReadyStatus(appStateObj);
			expect(res).toEqual(status);
		});
		it("should set not ready status", () => {
			const status = false;
			const action = act.StaticGridSetReady({ status: status });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectReadyStatus(appStateObj);
			expect(res).toEqual(status);
		});
	});

	describe(`[Selector: selectExportFile]`, () => {
		it("should return time when exportFile was called", () => {
			const action = act.StaticGridExportFile();
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectExportFile(appStateObj);
			expect(res).toBeTruthy();
		});
	});

	describe(`[Selector: selectShowCheckboxes]`, () => {
		it("should show checkboxes", () => {
			const action = act.StaticGridShowCheckboxes({ show: true });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectShowCheckboxes(appStateObj);
			expect(res).toBe(true);
		});

		it("should hide checkboxes", () => {
			const action = act.StaticGridShowCheckboxes({ show: false });
			const state = {
				...DEFAULT_STATIC_GRID_STATE,
				showCheckboxes: true
			} as IStaticGridState;
			const result = defaultReducer(state, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectShowCheckboxes(appStateObj);
			expect(res).toBe(false);
		});
	});

	describe(`[Selector: selectShowOnlySelectedRows]`, () => {
		it("should show only selected rows", () => {
			const action = act.StaticGridShowOnlySelectedRows({ onlySelectedRows: true });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectShowOnlySelectedRows(appStateObj);
			expect(res).toBe(true);
		});

		it("should show all rows", () => {
			const action = act.StaticGridShowOnlySelectedRows({ onlySelectedRows: false });
			const state = {
				...DEFAULT_STATIC_GRID_STATE,
				showOnlySelectedRows: true
			} as IStaticGridState;
			const result = defaultReducer(state, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectShowOnlySelectedRows(appStateObj);
			expect(res).toBe(false);
		});
	});

	describe(`[Selector: dragAndDrop]`, () => {
		it("should return key and index when drag and drop event occurs", () => {
			const action = act.StaticGridDragAndDrop({ dragAndDrop: { key: "id", index: 5 } });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.dragAndDrop(appStateObj);
			expect(res).toEqual({ key: "id", index: 5 });
		});
	});

	describe(`[Selector: selectDisabled]`, () => {
		it("should disabled ag grid", () => {
			const action = act.StaticGridDisabled({ status: true });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = sel.selectDisabled(appStateObj);
			expect(res).toBe(true);
		});
	});

	describe(`[Selector: selectCellToUpdate]`, () => {
		it("should return cell to update", () => {
			const action = act.StaticGridCellToUpdate({ cellToUpdate: null });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = { details: { staticGrid: result } } as AppState;
			const res = sel.selectCellToUpdate(appStateObj);
			expect(res).toBe(null);
		});
	});

	describe(`[Selector: selectGridMode]`, () => {
		it("should set dynamic mode flag", () => {
			const action = act.StaticGridMode({ mode: GridMode.DynamicMode });
			const result = defaultReducer(DEFAULT_STATIC_GRID_STATE, action);
			const appStateObj = {
				details: { staticGrid: result }
			} as AppState;
			const res = gridSelectors.selectGridMode(appStateObj);
			expect(res).toBe(GridMode.DynamicMode);
		});
	});
});
