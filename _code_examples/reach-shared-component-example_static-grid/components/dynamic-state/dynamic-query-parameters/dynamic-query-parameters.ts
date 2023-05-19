import { IDynamicFilterParameter } from "./models/dynamic-filter-parameter";
import { IDynamicQueryParameters } from "./models/dynamic-query-parameters";
import { IDynamicSortParameter } from "./models/dynamic-sort-parameter";

export class DynamicQueryParameters implements IDynamicQueryParameters {
	public skip: number;
	public top: number;
	public orderBy: IDynamicSortParameter[];
	public filter: IDynamicFilterParameter[];
	public keySetId: number;

	public setSkipParam(skip: number): void {
		this.skip = skip;
	}

	public setTopParam(top: number): void {
		this.top = top;
	}

	public setSortParam(sorts: IDynamicSortParameter[]): void {
		this.orderBy = sorts;
	}

	public setFilterParam(filters: IDynamicFilterParameter[]): void {
		this.filter = filters;
	}

	public setKeySetIdParam(keySetId: number): void {
		this.keySetId = keySetId;
	}
}
