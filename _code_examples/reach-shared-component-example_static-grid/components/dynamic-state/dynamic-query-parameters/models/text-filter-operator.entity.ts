import {
	IQueryStringFilterOperatorNames
} from "../../../../../../../evergreen-shared/typegen/dynamic-query/query-string-filter-operator-names";

export class TextFilterOperator {
	static readonly contains = IQueryStringFilterOperatorNames.contains;
	static readonly notContains = IQueryStringFilterOperatorNames.notContains;
	static readonly beginsWith = IQueryStringFilterOperatorNames.beginsWith;
	static readonly endsWith = IQueryStringFilterOperatorNames.endsWith;
}
