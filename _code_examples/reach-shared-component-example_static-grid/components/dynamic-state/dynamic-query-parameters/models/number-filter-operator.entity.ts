import {
	IQueryStringFilterOperatorNames
} from "../../../../../../../evergreen-shared/typegen/dynamic-query/query-string-filter-operator-names";

export class NumberFilterOperator {
	static readonly equals = IQueryStringFilterOperatorNames.equalsSymbol;
	static readonly notEquals = IQueryStringFilterOperatorNames.notEqualsSymbol;
	static readonly lessThanOrEqual = IQueryStringFilterOperatorNames.lessThanOrEqualSymbol;
	static readonly lessThan = IQueryStringFilterOperatorNames.lessThanSymbol;
	static readonly greaterThan = IQueryStringFilterOperatorNames.greaterThanSymbol;
	static readonly greaterThanOrEqual = IQueryStringFilterOperatorNames.greaterThanOrEqualSymbol;
}
