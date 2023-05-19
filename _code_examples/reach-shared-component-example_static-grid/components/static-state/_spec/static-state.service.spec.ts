import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { onDestroyTest } from "../../../../../../evergreen-shared/utils/common-tests/component.tests";
import { MULTIPLE_STORE_SLICE_NAME } from "../../../state/multiple-store/config";

import { GridSelectors } from "../../../state/selectors/selector";
import { TopBarSelectors } from "../../../state/selectors/topbar";
import { StaticGridStateService } from "../static-state.service";


declare const expect: jest.Expect;

describe("[Service]: StaticGridStateService", () => {
	const storeSliceName = "TestKey";

	let store: MockStore;
	let service: StaticGridStateService;
	let gridSelectors: GridSelectors;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StaticGridStateService,
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
		service = TestBed.inject(StaticGridStateService);
		gridSelectors = TestBed.inject(GridSelectors);
	});

	describe("Function [constructor]", () => {
		it("should compile", () => {
			expect(service).toBeTruthy();
		});
	});

	describe("Function [hasData]", () => {
		it("should return true when data array is not empty", done => {
			const data = [
				{ id:1, name: "First row" },
				{ id:2, name: "Second row" },
				{ id:3, name: "Third row" }
			];
			store.overrideSelector(gridSelectors.selectData, data);
			store.refreshState();

			const hasData = service.hasData();

			hasData.subscribe(res => {
				expect(res).toBeTruthy();
				done();
			});
		});

		it("should return false when data array is empty", done => {
			store.overrideSelector(gridSelectors.selectData, []);
			store.refreshState();

			const hasData = service.hasData();

			hasData.subscribe(res => {
				expect(res).toBeFalsy();
				done();
			});
		});
	});

	describe("Function [displayedRowsCountChange]", () => {
		it("should dispatch TopBarSetRowsCount action when the displayed number of rows is changed", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");

			service.displayedRowsCountChange(550);

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				filteredRowsCount: 550,
				type: "Static.Grid.TopBar.Set.RowsCount"
			});
		});
	});

	describe("Function [dragAndDropUpdate]", () => {
		it("should dispatch StaticGridDragAndDrop action when drag and drop is changed", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");
			const model = {
				key: 15,
				index: 3
			};

			service.dragAndDropUpdate(model);

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				dragAndDrop: model,
				type: "Static.Grid.Drag.And.Drop"
			});
		});
	});

	describe("Function [onCellUpdate]", () => {
		it("should dispatch StaticGridCellToUpdate action when cell was updated", () => {
			const dispatch = jest.spyOn(store, "dispatch");

			service.onCellUpdate(null);

			expect(dispatch).toHaveBeenCalledWith({
				__multipleStoreMeta: {
					"sliceName": "TestKey"
				},
				cellToUpdate: null,
				type: "Static.Grid.Cell.To.Update"
			});
		});
	});

	describe("Function [onDestroy]", () => {
		it("should proper handle destroy", ()=> {
			onDestroyTest(service);
		});
	});
});
