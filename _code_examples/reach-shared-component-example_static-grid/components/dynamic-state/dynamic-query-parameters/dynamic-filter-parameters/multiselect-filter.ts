import { isString } from "lodash";
import { FilterOperator, FilterType, IDynamicFilterParameter } from "../models/dynamic-filter-parameter";

export class MultiselectFilter implements IDynamicFilterParameter {
	columnName: string;
	filterType: FilterType;
	filterOperator: FilterOperator;
	filterValue: unknown[];

	toQueryLanguage(): string {
		let values = "''";
		if(this.filterValue.length > 0) {
			if (this.filterValue.every(item => isString(item))) {
				values = this.filterValue.map(item => `'${item}'`).join(",");
			} else {
				values = this.filterValue.join(",");
			}
		}

		return encodeURIComponent(
			`${this.columnName} ${this.filterOperator} (${values})`
		);
	}
}
