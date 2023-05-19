import { DateFilterOperator } from "./date-filter-operator.entity";
import { MultiselectFilterOperator } from "./multiselect-filter-operator.entity";
import { NumberFilterOperator } from "./number-filter-operator.entity";
import { TextFilterOperator } from "./text-filter-operator.entity";

export enum FilterType {
	Number = "number",
	Text = "text",
	Date = "date",
	MultiSelect = "multiSelect"
}

export type FilterOperator =
	TextFilterOperator | DateFilterOperator | NumberFilterOperator | MultiselectFilterOperator;

export interface IDynamicFilterParameter {
	columnName: string;
	filterType: FilterType;
	filterOperator: FilterOperator;
	filterValue: unknown;
	toQueryLanguage(): string;
}
