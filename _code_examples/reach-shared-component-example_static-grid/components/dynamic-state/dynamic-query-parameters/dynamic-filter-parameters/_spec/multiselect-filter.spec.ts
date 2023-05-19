import { FilterType } from "../../models/dynamic-filter-parameter";
import { MultiselectFilterOperator } from "../../models/multiselect-filter-operator.entity";
import { MultiselectFilter } from "../multiselect-filter";

describe("MultiselectFilter", () => {

	let filter: MultiselectFilter;

	beforeEach(() => {
		filter = new MultiselectFilter();
		filter.columnName = "testColumn";
		filter.filterType = FilterType.MultiSelect;
		filter.filterOperator = MultiselectFilterOperator.equals;
	});

	describe("[Function]: toQueryLanguage", () => {
		it("should return query string with '' when filter value is empty array", () => {
			filter.filterValue = [];
			const result = filter.toQueryLanguage();

			expect(result).toEqual("testColumn%20EQUALS%20('')");
		});

		it("should return string values enclosed in quotes when filter value is string array", () => {
			filter.filterValue = ["value1", "value2", "value3"];
			const result = filter.toQueryLanguage();

			expect(result).toEqual("testColumn%20EQUALS%20('value1'%2C'value2'%2C'value3')");
		});

		it("should return query string when filter value is number array", () => {
			filter.filterValue = [1, 2, 3];
			const result = filter.toQueryLanguage();

			expect(result).toEqual("testColumn%20EQUALS%20(1%2C2%2C3)");
		});
	});
});
