import { FilterOperator, FilterType, IDynamicFilterParameter } from "../models/dynamic-filter-parameter";

export class DateFilter implements IDynamicFilterParameter {
	columnName: string;
	filterType: FilterType;
	filterOperator: FilterOperator;
	filterValue: string;

	toQueryLanguage(): string {
		return encodeURIComponent(
			`${this.columnName} ${this.filterOperator} ('${this.filterValue}')`
		);
	}
}
