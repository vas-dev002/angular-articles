import { DateFilterOperator } from "../../models/date-filter-operator.entity";
import {
	FilterType,
	IDynamicFilterParameter
} from "../../models/dynamic-filter-parameter";
import { MultiselectFilterOperator } from "../../models/multiselect-filter-operator.entity";
import { NumberFilterOperator } from "../../models/number-filter-operator.entity";
import { TextFilterOperator } from "../../models/text-filter-operator.entity";
import { AgGridFilters } from "../ag-grid-filters";
import { DateFilter } from "../date-filter";
import { AgGridFilterFactory } from "../filter-factory";
import { MultiselectFilter } from "../multiselect-filter";
import { NumberFilter } from "../number-filter";
import { TextFilter } from "../text-filter";

describe("AgGridFilterFactory", () => {

	const agGridFilters: AgGridFilters = Object.assign( new AgGridFilters(), {
		shortName: {
			filter: "AD",
			filterType: "text",
			type: "contains"
		},
		unitName: {
			filter: "Un",
			filterType: "text",
			type: "startsWith"
		},
		historyDate: {
			dateFrom: "2019-11-19 00:00:00",
			dateTo: null,
			filterType: "date",
			type: "equals"
		},
		historyId: {
			filter: 2,
			filterType: "number",
			type: "equals"
		},
		onboardAction: [
			"Onboard Application Object",
			"Onboard Device Object",
			"Re-Onboard Device Object"
		]
	});

	const filterParameters: IDynamicFilterParameter[] = [
		Object.assign( new TextFilter(), {
			columnName: "shortName",
			filterOperator: TextFilterOperator.contains,
			filterType: FilterType.Text,
			filterValue: "AD"
		}),
		Object.assign( new TextFilter(), {
			columnName: "unitName",
			filterOperator: TextFilterOperator.beginsWith,
			filterType: FilterType.Text,
			filterValue: "Un"
		}),
		Object.assign( new DateFilter(), {
			columnName: "historyDate",
			filterOperator: DateFilterOperator.equals,
			filterType: FilterType.Date,
			filterValue: "2019-11-19 00:00:00"
		}),
		Object.assign( new NumberFilter(), {
			columnName: "historyId",
			filterOperator: NumberFilterOperator.equals,
			filterType: FilterType.Number,
			filterValue: 2
		}),
		Object.assign( new MultiselectFilter(), {
			columnName: "onboardAction",
			filterOperator: MultiselectFilterOperator.equals,
			filterType: FilterType.MultiSelect,
			filterValue: [
				"Onboard Application Object",
				"Onboard Device Object",
				"Re-Onboard Device Object"
			]
		})
	];

	describe("[Function]: createFilter", () => {
		it("should create filter parameters type of IDynamicFilterParameter", () => {
			const result = AgGridFilterFactory.createFilter(agGridFilters);
			expect(result).toEqual(filterParameters);
		});

		it("should return an empty array if there are no valid filters", () => {
			const notValidFilter = Object.assign( new AgGridFilters(), {
				shortName: {
					filter: false,
					filterType: "text",
					unknownProperty: "123"
				}
			});
			const result = AgGridFilterFactory.createFilter(notValidFilter);

			expect(result).toEqual([]);
		});
	});
});
