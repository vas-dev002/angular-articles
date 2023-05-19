import { IQueryStringFilterCommonOperatorNames } from "../../../../../../evergreen-shared/typegen/dynamic-query/query-string-filter-common-operator-names";
import { IDynamicFilterParameter } from "./models/dynamic-filter-parameter";
import { IDynamicSortParameter } from "./models/dynamic-sort-parameter";

export class DynamicQueryStringFormat {
	public static andOperator = encodeURIComponent(` ${IQueryStringFilterCommonOperatorNames.and} `);

	public static filterQueryString(filters: IDynamicFilterParameter[]): string {
		return `(${filters.map(item => item.toQueryLanguage()).join(DynamicQueryStringFormat.andOperator)})`;
	}

	public static sortQueryString(sorts: IDynamicSortParameter[]): string {
		return sorts.map((item) =>
			encodeURIComponent(`${item.columnName} ${item.sort}`)
		).join(",");
	}
}
