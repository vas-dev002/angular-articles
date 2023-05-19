import { Inject, Injectable, OnDestroy, Provider, Type } from "@angular/core";
import {
	ReducerManager,
	ActionReducer,
	Store,
	Action
} from "@ngrx/store";
import { EffectSources } from "@ngrx/effects";
import { createLocalAction, isComponentAction } from "./utils";
import { MULTIPLE_STORE_EFFECTS, MULTIPLE_STORE_REDUCER, MULTIPLE_STORE_SLICE_NAME } from "./config";

@Injectable()
export class MultipleStore implements OnDestroy {
	name = "";

	initActionType = "";
	destroyedActionType = "";
	setValueActionType = "";

	constructor(
		private readonly store: Store,
		private readonly reducers: ReducerManager,
		private readonly effectsSources: EffectSources,
		@Inject(MULTIPLE_STORE_REDUCER) readonly reducer: ActionReducer<any, any>,
		@Inject(MULTIPLE_STORE_EFFECTS) readonly effects: Type<unknown>,
		@Inject(MULTIPLE_STORE_SLICE_NAME) readonly storeSliceName: string = null
	) {
		this.name = storeSliceName || `${this.constructor.name}`;
		this.initActionType = `[${this.name}] Init`;
		this.destroyedActionType = `[${this.name}] Destroyed`;
		this.setValueActionType = `[${this.name}] Set Value`;

		this.reducers.addReducer(this.name, this.reducerProxy );

		this.dispatch({type: this.initActionType});
		this.effectsSources.addEffects(effects);
	}

	reducerProxy = (state, action) => {
		// global actions pass through, invoke the component reducer
		if (!action.__multipleStoreMeta) {
			return this.reducer(state, action);
		}

		// filter out local actions for this component
		if (!isComponentAction(action.__multipleStoreMeta, this.name)) {
			return state;
		}

		// update state
		if (action.type === this.setValueActionType) {
			return action.value;
		}

		// local action, invoke the component reducer
		return this.reducer(state, action);
	}

	dispatch<A extends Action>(action: A): void {
		this.store.dispatch(createLocalAction(action, this.name));
	}

	ngOnDestroy(): void {
		this.reducers.removeReducer(this.name);
		this.dispatch({ type: this.destroyedActionType});
	}
}

export function multipleStoreProviders(
	sliceName: string,
	reducer: ActionReducer<any, any>,
	effects: Type<unknown>,
	selectors: Type<unknown>[]
): Provider[] {
	return [
		{
			provide: MULTIPLE_STORE_SLICE_NAME,
			useValue: sliceName
		},
		MultipleStore,
		{
			provide: MULTIPLE_STORE_REDUCER,
			useValue: reducer
		},
		{
			provide: MULTIPLE_STORE_EFFECTS,
			useClass: effects
		},
		...selectors
	];
}
