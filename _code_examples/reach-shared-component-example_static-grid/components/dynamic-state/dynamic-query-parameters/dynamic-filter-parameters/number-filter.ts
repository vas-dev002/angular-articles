import { FilterOperator, FilterType, IDynamicFilterParameter } from "../models/dynamic-filter-parameter";

export class NumberFilter implements IDynamicFilterParameter {
	columnName: string;
	filterType: FilterType;
	filterOperator: FilterOperator;
	filterValue: number;

	toQueryLanguage(): string {
		return encodeURIComponent(
			`${this.columnName} ${this.filterOperator} ${this.filterValue}`
		);
	}
}
