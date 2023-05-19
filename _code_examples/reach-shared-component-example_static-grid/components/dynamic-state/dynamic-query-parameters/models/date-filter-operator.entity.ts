import {
	IQueryStringFilterOperatorNames
} from "../../../../../../../evergreen-shared/typegen/dynamic-query/query-string-filter-operator-names";

export class DateFilterOperator {
	static readonly equals = IQueryStringFilterOperatorNames.equals;
	static readonly notEquals = IQueryStringFilterOperatorNames.notEquals;
	static readonly onBefore = IQueryStringFilterOperatorNames.onBefore;
	static readonly onAfter = IQueryStringFilterOperatorNames.onAfter;
	static readonly greaterThan = IQueryStringFilterOperatorNames.greaterThanSymbol;
}
