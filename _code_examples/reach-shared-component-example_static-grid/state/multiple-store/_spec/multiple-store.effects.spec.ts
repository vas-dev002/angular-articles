import { Optional } from "@ag-grid-community/core";
import { Inject } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { MULTIPLE_STORE_SLICE_NAME } from "../config";
import { MultipleStoreEffects } from "../multiple-store.effects";
declare const expect: jest.Expect;

class TestMultipleStoreEffects extends MultipleStoreEffects {
	constructor(protected readonly actions$: Actions,
		@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) protected sliceName: string) {
		super(actions$, sliceName);
	}
}

describe("Multiple Store Effects", () => {
	let effects: TestMultipleStoreEffects;
	let actions: Observable<Action>;
	const sliceName = "TestKey";

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: MULTIPLE_STORE_SLICE_NAME,
					useValue: sliceName
				},
				TestMultipleStoreEffects,
				provideMockActions(() => actions)
			]
		});
		actions = TestBed.inject(Actions);
		effects = TestBed.inject(TestMultipleStoreEffects);

	});

	it("should be created", () => {
		expect(effects).toBeTruthy();
		expect(actions).toBeTruthy();
	});

	it("ngrxOnIdentifyEffects - should return slice name", () => {
		const name = effects.ngrxOnIdentifyEffects();
		expect(name).toEqual(sliceName);
	});

	it("ngrxOnRunEffects - should return observable", () => {
		const res = effects.ngrxOnRunEffects(of());
		expect(res).toMatchSnapshot();
	});
});
