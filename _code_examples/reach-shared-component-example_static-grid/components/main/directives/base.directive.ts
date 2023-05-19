import { StaticGridComponent } from "../comp";
import { Subject } from "rxjs";
import { GridOptions, GridApi, ColumnApi } from "@ag-grid-community/core";
import { Directive, OnDestroy } from "@angular/core";

import { GridMode } from "../entity";

@Directive()
export abstract class BaseControllerSGDirective implements OnDestroy {
	protected destroy$ = new Subject();
	protected gridOptions: GridOptions;
	protected gridApi: GridApi;
	protected columnApi: ColumnApi;
	protected gridMode: GridMode;

	 protected constructor(host: StaticGridComponent) {
		this.setHostController(host);
	}

	protected abstract setHostController(host: StaticGridComponent): void;

	public init(gridOptions: GridOptions, gridApi: GridApi, columnApi: ColumnApi, gridMode: GridMode) {
		this.gridOptions = gridOptions;
		this.gridApi = gridApi;
		this.columnApi = columnApi;
		this.gridMode = gridMode;
		this.subscribeOnEvents();
	}

	protected abstract subscribeOnEvents(): void;

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
