import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ICellRendererParams } from "@ag-grid-community/core";
import { DateDasType } from "./date-type.util";

@Component({
	selector: "date-sg",
	template: `<span>{{ getValue() }}</span>`
})
export class DateSGRendererComponent implements ICellRendererAngularComp {
	public params: ICellRendererParams;

	agInit(params: ICellRendererParams): void {
		this.params = params;
	}

	getValue(): string {
		const value = this.params.value?.date || this.params.value;

		return DateDasType.getValue(value);
	}

	refresh(): boolean {
		return false;
	}
}
