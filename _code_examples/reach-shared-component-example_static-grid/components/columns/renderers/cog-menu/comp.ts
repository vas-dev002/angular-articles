import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { RowNode } from "@ag-grid-community/core";
import { ICellCogMenuParams, ICogMenuItem } from "./entity";

@Component({
	selector: "child-cell",
	templateUrl: "tpl.html"
})
export class CogMenuSGComponent implements ICellRendererAngularComp {
	public permissionStatus: boolean;
	public params: ICellCogMenuParams;
	public items: ICogMenuItem[];
	public isOpened = false;
	private _getIndex(): number {
		let index = this.params.rowIndex;
		this.params.api.forEachNodeAfterFilterAndSort((rowNode: RowNode, rowIndex: number) => {
			if (this.params.node.id === rowNode.id) {
				index = rowIndex;
			}
		});
		return index;
	}

	public agInit(params: ICellCogMenuParams): void {
		this.params = params;
		this.items = params.menuItems;
	}

	public refresh(): boolean {
		return false;
	}

	public show(item: ICogMenuItem) {
		return item.hide && item.hide({ params: this.params, rowIndex: this._getIndex() });
	}

	public onClick(item: ICogMenuItem) {
		item.onClick({ params: this.params, rowIndex: this._getIndex() });
	}

	public get isDisabled(): boolean {
		return !!this.params && !!this.params.isDisabled && this.params.isDisabled(this.params.data);
	}
}
