import { Directive, ElementRef, OnDestroy, Optional } from "@angular/core";
import { StaticGridComponent } from "../../components/main/comp";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GridApi } from "@ag-grid-community/core";
import { StaticGridServiceComponent } from "../../components/main-service/main-service.component";
import { StaticGridStateComponent } from "../../components/static-state/static-state.component";
import { DynamicGridStateComponent } from "../../components/dynamic-state/dynamic-state.component";

@Directive()
export abstract class BaseGridStyleDirective implements OnDestroy {

	public gridApi:	GridApi;

	private gridInstance: StaticGridComponent;
	protected readonly destroy$ = new Subject();

	constructor(
		@Optional() staticStateWrapper: StaticGridStateComponent,
		@Optional() dynamicStateWrapper: DynamicGridStateComponent,
		@Optional() serviceWrapper: StaticGridServiceComponent,
		public readonly gridElement: ElementRef
	) {
		const gridWrapper = staticStateWrapper || dynamicStateWrapper || serviceWrapper;

		if (gridWrapper) {
			gridWrapper.gridReady$
				.pipe(takeUntil(this.destroy$))
				.subscribe((g: StaticGridComponent) => this.onGridInstanceChange(g));
		}
	}

	protected abstract onGridReady();

	private onGridInstanceChange(grid: StaticGridComponent) {
		if (!grid) {
			return;
		}
		this.gridInstance = grid;
		this.gridApi = this.gridInstance.gridApi;
		this.gridInstance.firstDataRendered$.pipe(takeUntil(this.destroy$)).subscribe(
			(value: boolean) => this.onGridReady()
		);
	}

	ngOnDestroy() {
		this.destroy$.next(true);
	}
}
