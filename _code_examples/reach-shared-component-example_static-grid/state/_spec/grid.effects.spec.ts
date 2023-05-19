import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { ApiService } from "../../../../../services/api";
import { StaticGridEffects } from "../effects/effect";
import { MULTIPLE_STORE_SLICE_NAME } from "../multiple-store/config";

describe("Static Grid Effects", () => {
	let effects: StaticGridEffects;
	let actions: Observable<Action>;
	let api: ApiService;
	const sliceName = "TestKey";

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ApiService,
					useValue: {
						getRequest: jest.fn()
					}
				},
				{
					provide: MULTIPLE_STORE_SLICE_NAME,
					useValue: sliceName
				},
				StaticGridEffects,
				provideMockActions(() => actions)
			],
			imports: [
				HttpClientTestingModule
			]
		});
		actions = TestBed.inject(Actions);
		effects = TestBed.inject(StaticGridEffects);
		api = TestBed.inject(ApiService);
	});

	it("should be created", () => {
		expect(api).toBeTruthy();
		expect(effects).toBeTruthy();
		expect(actions).toBeTruthy();
	});
});
