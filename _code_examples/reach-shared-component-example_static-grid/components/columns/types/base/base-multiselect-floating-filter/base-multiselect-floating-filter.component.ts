
import { Component, ChangeDetectionStrategy, HostListener } from "@angular/core";
import { IFloatingFilter, IFloatingFilterParams } from "@ag-grid-community/core";
import { TranslateService } from "@ngx-translate/core";
import { AgFrameworkComponent } from "@ag-grid-community/angular";
import { NgModel } from "@angular/forms";
import { checkClass } from "../../../../../../../../util/common/element";
import { map, filter } from "lodash";
import * as tfrm from "../../../../../../../../queries/util/field";

export interface MultiselectFloatingFilterParams extends IFloatingFilterParams {
	value: string[];
	meta: any;
	isUpperCase?: boolean;
}

/**
 * Was copied with changes from the MultiselectFloatingFilterComponent.
 * Not used yet, but in the future it is planned to implement a custom multiselect filter
 * for each type controller (where necessary) and inherit these filters from this base class.
 */
@Component({
	templateUrl: "base-multiselect-floating-filter.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseMultiselectFloatingFilterComponent implements IFloatingFilter,
	AgFrameworkComponent<MultiselectFloatingFilterParams> {

	private params: MultiselectFloatingFilterParams;
	public optionSet: any = [];
	public selection: Array<string> = [];
	public filterType: any;
	public currentValue: any;
	public showOptions = false;
	public isAllSelected: boolean;

	constructor(private readonly langService: TranslateService) { }

	agInit(params: MultiselectFloatingFilterParams): void {
		this.params = params;
		this.optionSet = (params.meta.filterOptions != null) ? params.meta.filterOptions : [];
		this.filterType = params.meta.customUiTransformation;
		this.setAllSelecton();
		this.currentValue = "All";
		window.addEventListener("scroll", this.scroll, true);
	}

	valueChanged() {
		this.params.parentFilterInstance((instance) =>
			(instance as any).onFloatingFilterChanged({ model: this.buildModel() }));
	}

	onParentModelChanged(parentModel: string[]): void {
		if (!parentModel) {
			this.currentValue = "All";
			this.setAllSelecton();
		} else {
			this.setSelection(parentModel);
			this.setCurrentValue(parentModel);
		}
	}

	public buildModel(): string[] {
		this.setCurrentValue(this.selection);
		return this.selection;
	}

	public setCurrentValue(model) {
		if (model && model.length > 0) {
			if (model.length === this.optionSet.length) {
				this.currentValue = "All";
			} else {
				this.currentValue = "";
				this.selection.forEach(element => {
					if (this.currentValue !== "") {
						this.currentValue += ",";
					}
					if (!element) {
						this.currentValue += this.langService.instant("Empty");
					} else {
						this.currentValue += this.langService.instant(element.replace(/\s/g, ""));
					}
				});
			}
		} else {
			this.currentValue = "";
		}
	}


	public setAllSelecton() {
		this.selection = [];
		for (const item of this.optionSet) {
			this.selection.push(this.getOptionValue(item));
		}
		this.isAllSelected = true;
	}


	public setSelection(model: any) {
		this.selection = [];
		for (const item of model) {
			this.selection.push(item || "");
		}

		this.isAllSelected = false;
	}

	public triggerFilter(select: NgModel) {

		if (filter(this.selection, (item: any) => item === undefined).length !== 0) {
			if (this.isAllSelected) {
				select.update.emit([]);
				this.isAllSelected = false;
			} else {
				const values = map(this.optionSet, (item) => this.getOptionValue(item));
				select.update.emit(values);
				this.isAllSelected = true;
			}
		}

		this.valueChanged();
	}

	isIndeterminate(): boolean { return !this.isAllSelected && this.selection.length > 0; }

	public toogleSelectAll(select: NgModel) {
		this.isAllSelected = !this.isAllSelected;
		if (!this.isAllSelected) {
			select.update.emit([]);
		} else {
			const values = map(this.optionSet, (item) => this.getOptionValue(item));
			select.update.emit(values);
		}

		this.valueChanged();
	}

	public toogleFilterPanel() {
		this.showOptions = !this.showOptions;
	}

	public getOptionValue(item: any) {
		return typeof item === "object" && item ? item.value : item;
	}

	public getDefaultOptionText(item: any) {
		return typeof item === "object" && item ? item.text : item;
	}

	public readinessProject(obj: any) { return tfrm.readinessProject(obj); }
	public getMailboxTypeIcon(obj: any) { return tfrm.mailboxTypeIcon(obj); }
	public getMailboxPermissionValue(obj: any) { return obj.accessType; }
	public booleanImageTextValue(obj: any) { return obj.text; }
	public booleanImage(text: any) { return tfrm.booleanImage(text); }
	public booleanTextClass(text: any) { return tfrm.booleanImageClass(text); }

	@HostListener("window:click")
	private closeClick(event: any) {
		if (!checkClass(event.target, "aggrid-multiselect-styled")) {
			this.showOptions = false;
		}
	}

	@HostListener("window:resize")
	private onResize() { this.showOptions = false; }

	scroll = (): void => { this.showOptions = false; };
}
