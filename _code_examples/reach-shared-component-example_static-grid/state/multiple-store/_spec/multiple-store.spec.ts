import { TestBed } from "@angular/core/testing";
import { EffectSources } from "@ngrx/effects";
import { createAction, createReducer, on, ReducerManager } from "@ngrx/store";
import { MockReducerManager, MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppState, INITIAL_APPLICATION_STATE } from "../../../../../../../state";
import { MultipleStore } from "../multiple-store";
import { createLocalAction } from "../utils";

class MockReducerManagerExtended extends MockReducerManager {
	addReducer(key: any, reducer: any) {}
	removeReducer(featureKey: any) {}
}

describe("MultipleStore", () => {
	let multipleStore: MultipleStore;
	let mockStore: MockStore<AppState>;
	let reducerManager: ReducerManager;

	const initialState = INITIAL_APPLICATION_STATE as AppState;
	const TestAction = createAction("Test.Action");
	const TestReducer = createReducer(INITIAL_APPLICATION_STATE,
		on(TestAction, state => ({ ...state, test: "test" }))
	);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideMockStore({initialState}),
				{
					provide: EffectSources,
					useValue: {
						addEffects: jest.fn()
					}
				},
				{
					provide: ReducerManager,
					useClass: MockReducerManagerExtended
				}
			]
		});
		mockStore = TestBed.inject(MockStore);
		reducerManager = TestBed.inject(ReducerManager);
		const effectSources = TestBed.inject(EffectSources);
		multipleStore = new MultipleStore(mockStore, reducerManager, effectSources, TestReducer, null, "TestKey");
	});

	it("init multiple store", () => {
		expect(multipleStore).toBeTruthy();
	});

	it("destroy multiple store", () => {
		const removeReducer = jest.spyOn(reducerManager, "removeReducer");
		const dispatch = jest.spyOn(mockStore, "dispatch");
		multipleStore.ngOnDestroy();
		expect(removeReducer).toHaveBeenCalled();
		expect(removeReducer).toHaveBeenCalledWith("TestKey");
		expect(dispatch).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith({
			"__multipleStoreMeta": {
				"sliceName": "TestKey"
			},
			"type": "[TestKey] Destroyed"
		});
	});

	it("reducerProxy - should invoke reducer function if meta is not provided", () => {
		const res = multipleStore.reducerProxy(initialState, TestAction());
		const expected = TestReducer(initialState, TestAction());
		expect(res).toEqual(expected);
	});

	it("reducerProxy - should return unchnaged state if slice names are not equal", () => {
		const res = multipleStore.reducerProxy(initialState, createLocalAction(TestAction(), "AnotherKey"));
		const expected = INITIAL_APPLICATION_STATE;
		expect(res).toEqual(expected);
	});

	it("reducerProxy - should return action value if action has setValueActionType", () => {
		const res = multipleStore.reducerProxy(
			initialState,
			createLocalAction({ type: multipleStore.setValueActionType, value: null}, "TestKey")
		);
		expect(res).toBeNull();
	});

	it("reducerProxy - should invoke reducer function if slice names are equal", () => {
		const res = multipleStore.reducerProxy(
			initialState,
			createLocalAction(TestAction(), "TestKey")
		);
		const expected = TestReducer(initialState, TestAction());
		expect(res).toEqual(expected);
	});
});
