import { EventEmitter, Directive, Input, Output, } from "@angular/core";
import { StaticGridComponent } from "../comp";
import { isEqual } from "lodash";
import { BaseControllerSGDirective } from "./base.directive";
import { ISortModel } from "../entity";
import { getGridSortModel } from "../../../../util/fn";

@Directive({
	selector: "[sortControllerSG]"
})
export class SortControllerSGDirective extends BaseControllerSGDirective {
	constructor(host: StaticGridComponent) {
		super(host);
	}
	// Sorting
	@Input() public set sortModel(value: ISortModel[]) {
		this._sortModel = value;
		this.updateSortModel(value);
	}
	public get sortModel() {
		return this._sortModel;
	}
	private _sortModel: ISortModel[];
	@Output() sortModelChange = new EventEmitter<ISortModel[]>();


	protected setHostController(host: StaticGridComponent) {
		host.sortController = this;
	}

	protected subscribeOnEvents() {
		this.gridOptions.onSortChanged = () => {
			this.sortModelChange.next(getGridSortModel(this.columnApi));
		};
	}

	public updateSortModel(sort: ISortModel[]) {
		if (this.gridApi) {
			const currentState = getGridSortModel(this.columnApi);
			if (!isEqual(sort, currentState)) {
				this.gridApi.setSortModel(sort);
			}
		}
	}
}
