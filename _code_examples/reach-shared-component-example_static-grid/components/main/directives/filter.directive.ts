import { FilterChangedEvent, RowNode } from "@ag-grid-community/core";

import { EventEmitter, Directive, Input, Output } from "@angular/core";

import { StaticGridComponent } from "../comp";
import { isEqual } from "lodash";
import { BaseControllerSGDirective } from "./base.directive";
import { ISelectedFilters } from "../entity";
import { isStaticMode } from "../config/main";

@Directive({
	selector: "[filterControllerSG]"
})
export class FilterControllerSGDirective extends BaseControllerSGDirective {
	constructor(host: StaticGridComponent) {
		super(host);
	}

	// Filters
	@Input() public set selectedFilters(value: ISelectedFilters) {
		this._selectedFilters = value;
		this.updateFilters(value);
	}
	public get selectedFilters() {
		return this._selectedFilters;
	}
	private _selectedFilters: ISelectedFilters;
	@Output() selectedFiltersChange = new EventEmitter<ISelectedFilters>();

	// Custom rules for filtering
	@Input() public set customFilterRules(customFilterRules: (node: RowNode) => boolean) {
		this._customFilterRules = customFilterRules;
		this.updateCustomRules(customFilterRules);
	}
	public get customFilterRules() {
		return this._customFilterRules;
	}
	private _customFilterRules: (node: RowNode) => boolean;


	@Output() displayedRowsCountChange = new EventEmitter<number>();

	protected setHostController(host: StaticGridComponent) {
		host.filterController = this;
	}
	protected subscribeOnEvents() {
		this.gridOptions.onFilterChanged = (e) => {
			this.filtersChanged(e);
			// forEachNodeAfterFilter is only supported in ClientSide mode
			if (isStaticMode(this.gridMode)) {
				this.displayedRowsCountChange.emit(this.getDisplayedRowCount());
			}
		};
	}

	public updateFilters(selected: ISelectedFilters) {
		if (this.gridApi) {
			const currentState = this.gridApi.getFilterModel();
			if (!isEqual(selected, currentState)) {
				this.gridApi.setFilterModel(selected);
			}
		}
	}

	public reapplyFilters() {
		this.gridApi.onFilterChanged();
	}

	public getDisplayedRowCount() {
		let count = 0;
		this.gridApi.forEachNodeAfterFilter((node) => {
			if (!node.group) {
				count++;
			}
		});
		return count;
	}

	private updateCustomRules(customFilterRules: (node: RowNode) => boolean) {
		if (this.gridOptions && this.gridApi) {
			this.gridOptions.isExternalFilterPresent = () => !!customFilterRules;
			this.gridOptions.doesExternalFilterPass = (customFilterRules) ? (node) => customFilterRules(node) : null;
			this.reapplyFilters();
		}
	}

	private filtersChanged(event: FilterChangedEvent) {
		if (this.gridApi) {
			const model: ISelectedFilters = this.gridApi.getFilterModel();
			this.selectedFiltersChange.emit(model);
		}
	}
}
