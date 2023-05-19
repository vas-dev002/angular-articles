import { ISortModel } from "../../../../..";
import { IDynamicSortParameter } from "../../models/dynamic-sort-parameter";
import { AgGridSortFactory } from "../sort-factory";

describe("AgGridSortFactory", () => {

	const agGridSorts: ISortModel[] = [
		{
			colId: "shortName",
			sort: "asc"
		},
		{
			colId: "objectType",
			sort: "desc"
		}
	];

	const sortParameters: IDynamicSortParameter[] = [
		{
			columnName: "shortName",
			sort: "asc"
		},
		{
			columnName: "objectType",
			sort: "desc"
		}
	];

	describe("[Function]: createSort", () => {
		it("should create sort parameters type of IDynamicSortParameter", () => {
			const result = AgGridSortFactory.createSort(agGridSorts);
			expect(result).toEqual(sortParameters);
		});

		it("should return an empty array if there are no valid sorts", () => {
			const notValidSort = {
				column: "wrong name",
				sort: "asc"
			} as unknown as ISortModel;
			const result = AgGridSortFactory.createSort([notValidSort]);

			expect(result).toEqual([]);
		});
	});
});
