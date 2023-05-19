import { IDynamicFilterParameter } from "./dynamic-filter-parameter";
import { IDynamicSortParameter } from "./dynamic-sort-parameter";

export interface IDynamicQueryParameters {
	skip: number;
	top: number;
	orderBy: IDynamicSortParameter[];
	filter: IDynamicFilterParameter[];
	keySetId: number;
}
