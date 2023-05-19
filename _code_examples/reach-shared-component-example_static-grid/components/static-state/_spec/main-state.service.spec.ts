import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { onDestroyTest } from "../../../../../../evergreen-shared/utils/common-tests/component.tests";

import { MULTIPLE_STORE_SLICE_NAME } from "../../../state/multiple-store/config";
import { GridSelectors } from "../../../state/selectors/selector";
import { TopBarSelectors } from "../../../state/selectors/topbar";
import { StaticGridComponent } from "../../main/comp";
import { defaultDataKeySG, GridMode, ISortModel } from "../../main/entity";
import { MainGridStateService } from "../main-state.service";
import { filterSelectedRows } from "../../main/config/custom-filters.utils";


declare const expect: jest.Expect;

describe("[Service]: MainGridStateService", () => {
	const storeSliceName = "TestKey";
	const gridMock = {
		selectController: {
			selectAllRows: jest.fn(),
			deselectAllRows: jest.fn()
		},
		exportData: jest.fn(),
		gridColumnApi: {
			autoSizeAllColumns: jest.fn()
		},
		filterController: {
			reapplyFilters: jest.fn()
		}
	};

	let store: MockStore;
	let service: MainGridStateService;
	let gridSelectors: GridSelectors;
	let topBarSelectors: TopBarSelectors;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MainGridStateService,
				provideMockStore(),
				GridSelectors,
				TopBarSelectors,
				{
					provide: MULTIPLE_STORE_SLICE_NAME,
					useValue: storeSliceName
				}
			]
		});

		store = TestBed.inject(MockStore);
		service = TestBed.inject(MainGridStateService);
		gridSelectors = TestBed.inject(GridSelectors);
		topBarSelectors = TestBed.inject(TopBarSelectors);
		service.grid = gridMock as unknown as StaticGridComponent;
	});

	describe("Function [constructor]", () => {
		it("should compile", () => {
			expect(service).toBeTruthy();
		});
	});

	describe("Function [initActions]", () => {
		it("should be initialized on static-grid initialization event", () => {
			const spyOnNext = jest.spyOn(service.showCheckboxes$, "next");
			const spyOnCustomFilterRulesChanges = jest.spyOn(service.customFilterRulesChanges$, "next");
			const selectSelectAll = store.overrideSelector(gridSelectors.selectSelectAll, "3");
			const selectDeselectAll = store.overrideSelector(gridSelectors.selectDeselectAll, "2");
			const selectExportFile = store.overrideSelector(gridSelectors.selectExportFile, "1");

			store.overrideSelector(gridSelectors.selectShowCheckboxes, false);
			store.overrideSelector(gridSelectors.selectShowOnlySelectedRows, true);
			store.overrideSelector(topBarSelectors.selectSelectedGroupColumns, ["1", "2"]);

			service.initActions();

			selectSelectAll.setResult("33");
			selectDeselectAll.setResult("22");
			selectExportFile.setResult("11");
			store.refreshState();

			expect(spyOnCustomFilterRulesChanges).toHaveBeenCalledWith(filterSelectedRows);
			expect(gridMock.selectController.selectAllRows).toHaveBeenCalled();
			expect(gridMock.selectController.deselectAllRows).toHaveBeenCalled();
			expect(gridMock.exportData).toHaveBeenCalled();
			expect(spyOnNext).toHaveBeenCalledWith(false);
			expect(service.customFilterRules).toBeDefined();
			expect(service["selectedGroupColumns"]).toEqual(["1", "2"]);

			store.overrideSelector(gridSelectors.selectShowOnlySelectedRows, false);
			store.overrideSelector(topBarSelectors.selectSelectedGroupColumns, null);
			store.refreshState();

			expect(service.customFilterRules).toBeNull();
			expect(spyOnCustomFilterRulesChanges).toHaveBeenCalledWith(null);
			expect(service["selectedGroupColumns"]).toEqual([]);
		});
	});

	describe("Function [setGridMode]", () => {
		it("should dispatch StaticGridMode action when grid mode is set", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");

			service.setGridMode(GridMode.DynamicMode);

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				mode: GridMode.DynamicMode,
				type: "Static.Grid.Mode"
			});
		});
	});

	describe("Function [setStaticGridReadyStatus]", () => {
		it("should dispatch StaticGridSetReady action", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");

			service.setStaticGridReadyStatus(true);

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				status: true,
				type: "Static.Grid.Set.Ready"
			});
		});
	});

	describe("Function [setGroupColumns]", () => {
		it("should dispatch TopBarSetSelectedGroups action", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");
			const arg = ["sel1", "sel2", "sel3"];

			service.setGroupColumns(arg);

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				selected: arg,
				type: "Static.Grid.TopBar.Set.Selected.Groups"
			});
		});
	});

	describe("Function [setFilters]", () => {
		it("should dispatch TopBarSetSelectedGroups action", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");

			service.setFilters({});

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				selected: {},
				type: "Static.Grid.TopBar.Set.Selected.Filters"
			});
		});
	});

	describe("Function [visibleColumnsChange]", () => {
		it("Function [visibleColumnsChange] - should execute logic when column visibility was changed", () => {
			const dispatch = jest.spyOn(store, "dispatch");
			const columns = [
				{ headerName: "Custom Field", field: "label", enableRowGroup: true },
				{ headerName: "Value", field: "value", enableRowGroup: true  }
			];
			service.grid = gridMock as unknown as StaticGridComponent;
			store.overrideSelector(topBarSelectors.selectSelectedGroupColumns, ["1", "2"]);
			store.refreshState();

			service.initActions();
			service.visibleColumnsChange(columns);

			expect(dispatch).toHaveBeenCalled();
			expect(dispatch).nthCalledWith(1, {
				__multipleStoreMeta: {
					sliceName: "TestKey"
				},
				GroupColumns: [
					{ name: "Custom Field", field: "label"},
					{ name: "Value", field: "value" }
				],
				type: "Static.Grid.TopBar.Set.GroupColumns"
			});
			expect(dispatch).nthCalledWith(2, {
				__multipleStoreMeta: {
					sliceName: "TestKey"
				},
				selected: [],
				type: "Static.Grid.TopBar.Set.Selected.Groups"
			});
			expect(gridMock.gridColumnApi.autoSizeAllColumns).toHaveBeenCalled();
		});
	});

	describe("Function [columnStateChange]", () => {
		it("should dispatch TopBarSetColumnState action", () => {
			const dispatch = jest.spyOn(store, "dispatch");
			const columns = [
				{ colId: "TestId", pinned: "right", width: 200 }
			];

			service.columnStateChange(columns);

			expect(dispatch).toHaveBeenCalled();
			expect(dispatch).toHaveBeenCalledWith({
				__multipleStoreMeta: {
					sliceName: "TestKey"
				},
				columns,
				type: "Static.Grid.TopBar.Set.ColumnState"
			});
		});
	});

	describe("Function [sortModelChange]", () => {
		it("should dispatch TopBarSetSortModel action", () => {
			const dispatch = jest.spyOn(store, "dispatch");
			const sort = [{ colId: "TestId", sort: "asc" } as ISortModel];

			service.sortModelChange(sort);

			expect(dispatch).toHaveBeenCalled();
			expect(dispatch).toHaveBeenCalledWith({
				__multipleStoreMeta: {
					sliceName: "TestKey"
				},
				sort,
				type: "Static.Grid.TopBar.Set.SortModel"
			});
		});
	});

	describe("Function [selectedDataRowsChange]", () => {
		it("should dispatch StaticGridSelectRows action", () => {
			const dispatch = jest.spyOn(store, "dispatch");
			const rows = [{ [defaultDataKeySG]: 1 }, { [defaultDataKeySG]: 22 }];
			service.grid = gridMock as unknown as StaticGridComponent;

			service.selectedDataRowsChange(rows);

			expect(gridMock.filterController.reapplyFilters).toHaveBeenCalled();
			expect(dispatch).toHaveBeenCalled();
			expect(dispatch).toHaveBeenCalledWith({
				__multipleStoreMeta: {
					sliceName: "TestKey"
				},
				rows,
				type: "Static.Grid.Select.DataRows"
			});
		});
	});

	describe("Function [onDestroy]", () => {
		it("should proper handle destroy", ()=> {
			onDestroyTest(service);
		});
	});
});
