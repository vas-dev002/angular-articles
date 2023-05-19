import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { MULTIPLE_STORE_SLICE_NAME } from "../../../state/multiple-store/config";

import { GridSelectors } from "../../../state/selectors/selector";
import { KeyValueStateService } from "../key-value-state.service";


declare const expect: jest.Expect;

describe("[Service]: KeyValueStateService", () => {
	const storeSliceName = "TestKey";

	let store: MockStore;
	let service: KeyValueStateService;
	let gridSelectors: GridSelectors;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				KeyValueStateService,
				provideMockStore(),
				GridSelectors,
				{
					provide: MULTIPLE_STORE_SLICE_NAME,
					useValue: storeSliceName
				}
			]
		});

		store = TestBed.inject(MockStore);
		service = TestBed.inject(KeyValueStateService);
		gridSelectors = TestBed.inject(GridSelectors);
	});

	describe("KeyValueStateService Function [constructor]", () => {
		it("should compile", () => {
			expect(service).toBeTruthy();
		});
	});

	describe("KeyValueStateService Function [hasData]", () => {
		it("should return true when data array is not empty", done => {
			const data = [
				{ id:1, name: "First" },
				{ id:2, name: "Second" },
				{ id:3, name: "Third" }
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
});
