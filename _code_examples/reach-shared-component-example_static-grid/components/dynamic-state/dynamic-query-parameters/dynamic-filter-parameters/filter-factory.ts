import { DateFilterModel, NumberFilterModel, TextFilterModel } from "@ag-grid-community/core";
import { DateFilterOperator } from "../models/date-filter-operator.entity";

import {
	FilterType,
	IDynamicFilterParameter
} from "../models/dynamic-filter-parameter";
import { MultiselectFilterOperator } from "../models/multiselect-filter-operator.entity";
import { NumberFilterOperator } from "../models/number-filter-operator.entity";
import { TextFilterOperator } from "../models/text-filter-operator.entity";
import { AgGridFilters } from "./ag-grid-filters";
import { DateFilter } from "./date-filter";
import { MultiselectFilter } from "./multiselect-filter";
import { NumberFilter } from "./number-filter";
import { TextFilter } from "./text-filter";

export abstract class AgGridFilterFactory {
	private static readonly textFilterOperatorsMap = new Map<string, TextFilterOperator>(
		[
			["contains", TextFilterOperator.contains],
			["notContains", TextFilterOperator.notContains],
			["startsWith", TextFilterOperator.beginsWith],
			["endsWith", TextFilterOperator.endsWith]
		]
	);

	private static readonly dateFilterOperatorsMap = new Map<string, DateFilterOperator>(
		[
			["equals", DateFilterOperator.equals],
			["notEqual", DateFilterOperator.notEquals],
			["lessThanOrEqual", DateFilterOperator.onBefore],
			["greaterThanOrEqual", DateFilterOperator.onAfter],
			["greaterThan", DateFilterOperator.greaterThan]
		]
	);

	private static readonly numberFilterOperatorsMap = new Map<string, NumberFilterOperator>(
		[
			["equals", NumberFilterOperator.equals],
			["notEqual", NumberFilterOperator.notEquals],
			["lessThanOrEqual", NumberFilterOperator.lessThanOrEqual],
			["lessThan", NumberFilterOperator.lessThan],
			["greaterThanOrEqual", NumberFilterOperator.greaterThanOrEqual],
			["greaterThan", NumberFilterOperator.greaterThan]
		]
	);

	public static createFilter(agGridFilters: AgGridFilters): IDynamicFilterParameter[] {
		const filters: IDynamicFilterParameter[] = [];
		const columns = Object.keys(agGridFilters);

		for (const column of columns) {
			let filter: IDynamicFilterParameter = null;
			const agGridFilter = agGridFilters[column];

			if (AgGridFilters.isTextFilter(agGridFilter)) {
				filter = this.createTextFilter(agGridFilter, column);
			}

			if (AgGridFilters.isDateFilter(agGridFilter)) {
				filter = this.createDateFilter(agGridFilter, column);
			}

			if (AgGridFilters.isNumberFilter(agGridFilter)) {
				filter = this.createNumberFilter(agGridFilter, column);
			}

			if (AgGridFilters.isMultiSelectFilter(agGridFilter)) {
				filter = this.createMultiselectFilter(agGridFilter, column);
			}

			if (filter) {
				filters.push(filter);
			}
		}

		return filters;
	}

	private static createTextFilter(filter: TextFilterModel, column: string): TextFilter {
		const textFilter = new TextFilter();
		textFilter.columnName = column;
		textFilter.filterType = FilterType.Text;
		textFilter.filterOperator = AgGridFilterFactory.textFilterOperatorsMap.get(filter.type);
		textFilter.filterValue = filter.filter;

		return textFilter;
	}

	private static createDateFilter(filter: DateFilterModel, column: string): DateFilter {
		const dateFilter = new DateFilter();
		dateFilter.columnName = column;
		dateFilter.filterType = FilterType.Date;
		dateFilter.filterOperator = AgGridFilterFactory.dateFilterOperatorsMap.get(filter.type);
		dateFilter.filterValue = filter.dateFrom;

		return dateFilter;
	}

	private static createNumberFilter(filter: NumberFilterModel, column: string): NumberFilter {
		const numberFilter = new NumberFilter();
		numberFilter.columnName = column;
		numberFilter.filterType = FilterType.Number;
		numberFilter.filterOperator = AgGridFilterFactory.numberFilterOperatorsMap.get(filter.type);
		numberFilter.filterValue = filter.filter;

		return numberFilter;
	}

	private static createMultiselectFilter(filter: unknown[], column: string): MultiselectFilter {
		const multiselectFilter = new MultiselectFilter();
		multiselectFilter.columnName = column;
		multiselectFilter.filterType = FilterType.MultiSelect;
		multiselectFilter.filterOperator = MultiselectFilterOperator.equals;
		multiselectFilter.filterValue = filter;

		return multiselectFilter;
	}
}
