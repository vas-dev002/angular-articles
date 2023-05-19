import { DynamicQuery } from "../../../../../../../queries/util/dynamic-query.performance";
import { FilterOperator, FilterType, IDynamicFilterParameter } from "../models/dynamic-filter-parameter";

export class TextFilter implements IDynamicFilterParameter {
	columnName: string;
	filterType: FilterType;
	filterOperator: FilterOperator;
	filterValue: string;

	toQueryLanguage(): string {
		return encodeURIComponent(
			`${this.columnName} ${this.filterOperator} ('${DynamicQuery.replaceBrace(this.filterValue)}')`
		);
	}
}
