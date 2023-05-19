import { Provider } from "@angular/core";
import { EffectSources } from "@ngrx/effects";
import { ReducerManager } from "@ngrx/store";

import { StaticGridEffects } from "../effects/effect";
import {
	MULTIPLE_STORE_EFFECTS,
	MULTIPLE_STORE_REDUCER,
	MULTIPLE_STORE_SLICE_NAME
} from "../multiple-store/config";
import { staticGridReducer } from "../reducers/reducer";

export function multipleGridStoreMockProviders(gridKey: string): Provider[] {
	return [
		{
			provide: MULTIPLE_STORE_SLICE_NAME,
			useValue: gridKey
		},
		{
			provide: MULTIPLE_STORE_REDUCER,
			useValue: staticGridReducer
		},
		{
			provide: MULTIPLE_STORE_EFFECTS,
			useClass: StaticGridEffects
		},
		{
			provide: ReducerManager,
			useValue: {
				addReducer: jest.fn(),
				removeReducer: jest.fn()
			}
		},
		{
			provide: EffectSources,
			useValue: {
				addEffects: jest.fn()
			}
		}
	];
}
