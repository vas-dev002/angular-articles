import { ColumnRowGroupChangedEvent } from "@ag-grid-community/core";
import { Subject } from "rxjs";
import { EventEmitter, Directive, Input, Output } from "@angular/core";
import { debounceTime, takeUntil } from "rxjs/operators";
import { isEqual } from "lodash";

import { StaticGridComponent } from "../comp";
import { BaseControllerSGDirective } from "./base.directive";
import { stylingAggridGroupedBy } from "../../../../../../util/common/style";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";


@Directive({
	selector: "[columnControllerSG]"
})
export class ColumnControllerSGDirective extends BaseControllerSGDirective {
	constructor(host: StaticGridComponent) {
		super(host);
	}

	// GroupColumns
	@Input() public set selectedGroupColumns(value: string[]) {
		this._selectedGroupColumns = value;
		this.updateGroupColumns(value);
	}
	public get selectedGroupColumns() {
		return this._selectedGroupColumns;
	}
	private _selectedGroupColumns: string[];
	@Output() public selectedGroupColumnsChange = new EventEmitter<string[]>();

	// ColumnState
	@Input() public set columnState(value: ColumnState[]) {
		this._columnState = value;
		this.updateColumnState(value);
	}
	public get columnState() {
		return this._columnState;
	}
	private _columnState: ColumnState[];
	private readonly columnStateEvent$ = new Subject();
	@Output() public columnStateChange = new EventEmitter<ColumnState[]>();

	public updateGroupColumns(groups: string[]) {
		if (this.columnApi) {
			this.columnApi.setRowGroupColumns(groups);
			stylingAggridGroupedBy();
		}
	}

	public updateColumnState(columns: ColumnState[]) {
		if (this.columnApi && columns && columns.length > 0) {
			this.columnApi.setColumnState(columns);
		}
	}

	public getVisibleColumns() {
		// get all visible columns except select column or column with cog menu
		// 'suppressToolPanel' is deprecated. since v22 - use suppressColumnsToolPanel / suppressFiltersToolPanel instead
		return this.gridOptions.columnApi.getAllDisplayedColumns().filter((column) =>
			!column.getColDef().suppressMenu && !column.getColDef().suppressColumnsToolPanel
			&& !column.getColDef().suppressColumnsToolPanel);
	}

	protected setHostController(host: StaticGridComponent) {
		host.columnController = this;
	}
	protected subscribeOnEvents() {
		const setColumnsState = () => {
			const columnState = this.columnApi.getColumnState();
			if (!isEqual(this.columnState, columnState)) {
				this.columnStateChange.next(columnState);
			}
		};
		this.columnStateEvent$.pipe(
			takeUntil(this.destroy$),
			debounceTime(100))
			.subscribe(() => {
				setColumnsState();
			});
		this.gridOptions.onColumnRowGroupChanged = (e) => {
			this.rowGroupChanged(e);
			setColumnsState();
		};
		this.gridOptions.onColumnResized = () => {
			// Reduce numbers of calls
			this.columnStateEvent$.next();
		};
		this.gridOptions.onColumnMoved = setColumnsState;
		this.gridOptions.onColumnPinned = setColumnsState;
	}

	private rowGroupChanged(event: ColumnRowGroupChangedEvent) {
		if (this.columnApi && event.source !== "api") {
			const columns = this.columnApi.getRowGroupColumns().map((x) => x.getColId());
			this.selectedGroupColumnsChange.emit(columns);
		}
	}
}
