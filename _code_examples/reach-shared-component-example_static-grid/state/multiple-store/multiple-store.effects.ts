import { Injectable } from "@angular/core";
import { ofType, Actions, OnIdentifyEffects, OnRunEffects, EffectNotification } from "@ngrx/effects";
import { takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { forThisComponent } from "../multiple-store/utils";

@Injectable()
export abstract class MultipleStoreEffects implements OnIdentifyEffects, OnRunEffects {

	constructor(protected readonly actions$: Actions, protected readonly sliceName: string) {}

	ngrxOnIdentifyEffects(): string {
		return this.sliceName;
	}

	ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
		return resolvedEffects$.pipe(
			takeUntil(
				this.actions$.pipe(
					ofType(`[${this.sliceName}] Destroyed`),
					forThisComponent(this.sliceName)
				)
			)
		);
	}
}
