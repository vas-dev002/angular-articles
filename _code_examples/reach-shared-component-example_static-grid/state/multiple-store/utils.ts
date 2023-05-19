import { Action } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { isEmptyNullOrUndefined } from "das-lib/utils-by-type";
import { MultipleStoreMeta } from "./entity";

export function createLocalAction<A extends Action>(action: A, name: string): any {
	if(!isEmptyNullOrUndefined(name)) {
		(action as any).__multipleStoreMeta = { sliceName: name } as MultipleStoreMeta;
	}
	return action;
}

export function isComponentAction(meta: MultipleStoreMeta, name: string): boolean {
	return meta.sliceName === name;
}

export function forThisComponent(name: string) {
	return filter(
		(action: any) => !action.__multipleStoreMeta || isComponentAction(action.__multipleStoreMeta, name)
	);
}
