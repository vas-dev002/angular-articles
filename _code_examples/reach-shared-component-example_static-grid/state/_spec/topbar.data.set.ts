import { IFilterModel, ISelectedFilters } from "../../components/main/entity";

export const EMPTY_FILTERS_SET = [
	{
		data: { columnName: { type: "testType" } as IFilterModel } as ISelectedFilters,
		res: false
	},
	{
		data: {},
		res: true
	},
	{
		data: null,
		res: true
	}
];