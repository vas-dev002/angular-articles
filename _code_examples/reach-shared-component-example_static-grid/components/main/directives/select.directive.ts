import { EventEmitter, Directive, Input, Output } from "@angular/core";

import { StaticGridComponent } from "../comp";
import { BaseControllerSGDirective } from "./base.directive";
import { isEqual } from "lodash";
import { DataIdTypeSG, IDataRowSG } from "../entity";

@Directive({
	selector: "[selectControllerSG]"
})
export class SelectControllerSGDirective extends BaseControllerSGDirective {
	constructor(public host: StaticGridComponent) {
		super(host);
	}

	// Selection
	@Input() public set showCheckboxes(value: boolean) {
		this._showCheckboxes = value;
		this.updateCheckboxVisibility();
	}
	public get showCheckboxes() { return this._showCheckboxes; }
	private _showCheckboxes = false;
	@Input() public set selectedDataIds(value: DataIdTypeSG[]) {
		if (!isEqual(value, this._selectedDataIds)) {
			this._selectedDataIds = value;
			this.updateSelection();
		}
	}
	public get selectedDataIds() {
		return this._selectedDataIds;
	}
	private _selectedDataIds: DataIdTypeSG[] = [];
	@Output() selectedDataRowsChange = new EventEmitter<Object[]>();

	public selectAllRows() {
		if (this.gridApi) {
			this.gridApi.selectAllFiltered();
		}
	}

	public deselectAllRows() {
		if (this.gridApi) {
			this.gridApi.deselectAllFiltered();
		}
	}

	protected setHostController(host: StaticGridComponent) {
		host.selectController = this;
	}
	protected subscribeOnEvents() {
		this.gridOptions.onSelectionChanged = (event) => {
			if (event.type === "api") { return; }
			const rows: IDataRowSG[] = this.gridApi.getSelectedRows() || [];
			this._selectedDataIds = rows.map(x => x[this.host.dataKey]);
			this.selectedDataRowsChange.next(rows);
		};
	}

	private updateSelection() {
		if (this.gridApi) {
			this.gridApi.forEachNode((rowNode) => {
				if (!rowNode || !rowNode.data) { return; }
				const id = rowNode.data[this.host.dataKey] as DataIdTypeSG;
				const selected = this.selectedDataIds.includes(id);
				rowNode.setSelected(selected);
			});
		}
	}

	private updateCheckboxVisibility() {
		if (this.gridOptions && this.gridOptions.columnApi != null && this.host.options && this.host.options.enableCheckBox) {
			this.gridOptions.columnApi.setColumnVisible(this.host.options.enableRowDragAndDrop ? "1" : "0", this.showCheckboxes);
		}
	}
}
