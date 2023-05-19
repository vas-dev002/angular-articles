import { InjectionToken, Type } from "@angular/core";
import { ActionReducer } from "@ngrx/store";

export const MULTIPLE_STORE_REDUCER = new InjectionToken<ActionReducer<any, any>>("MultipleStoreReducer");
export const MULTIPLE_STORE_SLICE_NAME = new InjectionToken<string>("StoreSliceName");
export const MULTIPLE_STORE_EFFECTS = new InjectionToken<Type<unknown>>("MultipleStoreEffects");
