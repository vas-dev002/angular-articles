import { AgGridFilters } from "../ag-grid-filters";

describe("AgGridFilters", () => {

	describe("[Function]: isTextFilter", () => {
		it("should return true when filter implements TextFilterModel interface", () => {
			const textFilter = {
				filter: "AD",
				type: "contains",
				filterType: "text"
			};
			const result = AgGridFilters.isTextFilter(textFilter);

			expect(result).toBeTruthy();
		});

		it("should return false when filter doesn't implement TextFilterModel interface", () => {
			const filter = {
				filter: 123,
				filterOperator: "contains",
				filterType: "text"
			};
			const result = AgGridFilters.isTextFilter(filter);

			expect(result).toBeFalsy();
		});
	});

	describe("[Function]: isNumberFilter", () => {
		it("should return true when filter implements NumberFilterModel interface", () => {
			const numberFilter = {
				filter: 321,
				filterTo: null,
				type: "equals",
				filterType: "number"
			};
			const result = AgGridFilters.isNumberFilter(numberFilter);

			expect(result).toBeTruthy();
		});

		it("should return false when filter doesn't implement NumberFilterModel interface", () => {
			const filter = {
				filter: "some text",
				filterTo: undefined,
				filterOperator: "contains",
				filterType: true
			};
			const result = AgGridFilters.isNumberFilter(filter);

			expect(result).toBeFalsy();
		});
	});

	describe("[Function]: isDateFilter", () => {
		it("should return true when filter implements DateFilterModel interface", () => {
			const dateFilter = {
				dateFrom: "01.01.2021",
				dateTo: null,
				type: "equals",
				filterType: "date"
			};
			const result = AgGridFilters.isDateFilter(dateFilter);

			expect(result).toBeTruthy();
		});

		it("should return false when filter doesn't implement DateFilterModel interface", () => {
			const filter = {
				filter: 123,
				filterOperator: "contains",
				filterType: "number"
			};
			const result = AgGridFilters.isDateFilter(filter);

			expect(result).toBeFalsy();
		});
	});

	describe("[Function]: isMultiSelectFilter", () => {
		it("should return true when filter is array", () => {
			const multiFilter = [
				"filter1",
				"filter2",
				"filter3"
			];
			const result = AgGridFilters.isMultiSelectFilter(multiFilter);

			expect(result).toBeTruthy();
		});

		it("should return false when filter is not array", () => {
			const filter = {
				filter: 123,
				filterType: "number",
				filterOperator: "contains"
			};
			const result = AgGridFilters.isMultiSelectFilter(filter);

			expect(result).toBeFalsy();
		});
	});
});
