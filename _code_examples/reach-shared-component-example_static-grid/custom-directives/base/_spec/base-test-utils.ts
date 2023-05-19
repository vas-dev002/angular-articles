import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { StaticGridComponent } from "../../../components/main/comp";

export function getSpyOnEventAfterGridReady(directive, gridWrapper) {
	const spyOnEvent = jest.spyOn(directive, "onGridReady");
	const gridRenderedSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
	const gridRendered$: Observable<boolean> = gridRenderedSubject.asObservable();
	const grid = { firstDataRendered$: gridRendered$ } as StaticGridComponent;

	gridWrapper.onReady(grid);
	gridRenderedSubject.next(true);

	return spyOnEvent;
}
