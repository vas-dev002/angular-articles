import { DynamicQueryParameters } from "../dynamic-query-parameters";

export interface IQueryParametersBuilder {
	setSkipParam(): IQueryParametersBuilder;
	setTopParam(): IQueryParametersBuilder;
	setSortParam(): IQueryParametersBuilder;
	setFilterParam(): IQueryParametersBuilder;
	setKeySetIdParam(): IQueryParametersBuilder;
	build(): DynamicQueryParameters;
	buildString(): string[];
}
