import { pipe, of, Observable, Subject } from "rxjs";
import { delay, switchMap, takeUntil } from "rxjs/operators";

export function getDelayPipe<T>(delayMS: number, skipDelayFor?: T[]) {
	let cancel: Subject<{}>;
	return pipe<Observable<T>, Observable<T>>(
		switchMap((x) => {
			if (cancel) {
				cancel.next();
				cancel.complete();
			}
			cancel = new Subject();
			if (skipDelayFor && skipDelayFor.some((s) => s === x)) {
				return of(x);
			} else {
				return of(x).pipe(delay(delayMS), takeUntil(cancel));
			}
		})
	);
}
