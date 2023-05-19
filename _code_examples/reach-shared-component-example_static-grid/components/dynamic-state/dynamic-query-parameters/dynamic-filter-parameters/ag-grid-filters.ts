import { DateFilterModel, NumberFilterModel, TextFilterModel } from "@ag-grid-community/core";
import { isArray } from "lodash";

type AgGridFilterType = TextFilterModel | NumberFilterModel | DateFilterModel | unknown[];

export class AgGridFilters {
	[key: string]: AgGridFilterType;

	public static isTextFilter(item): item is TextFilterModel {
		const filter: TextFilterModel = item;
		return typeof filter.filter === "string"
			&& typeof filter.type === "string"
			&& typeof filter.filterType === "string";
	}

	public static isNumberFilter(item): item is NumberFilterModel {
		const filter: NumberFilterModel = item;
		return typeof filter.filter === "number"
			&& (typeof filter.filterTo === "number"
				|| typeof filter.filterTo === "object"
				|| typeof filter.filterTo === "undefined"
			)
			&& typeof filter.type === "string"
			&& typeof filter.filterType === "string";
	}

	public static isDateFilter(item): item is DateFilterModel {
		const filter: DateFilterModel = item;
		return (typeof filter.dateFrom === "string" || typeof filter.dateFrom === "object")
			&& (typeof filter.dateTo === "string" || typeof filter.dateTo === "object")
			&& typeof filter.type === "string"
			&& typeof filter.filterType === "string";
	}

	public static isMultiSelectFilter(item): item is unknown[] {
		return isArray(item);
	}
}
