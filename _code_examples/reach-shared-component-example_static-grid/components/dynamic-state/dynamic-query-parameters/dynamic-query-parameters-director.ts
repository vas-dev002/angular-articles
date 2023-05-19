import { IQueryParametersBuilder } from "./models/query-parameters-builder";

export class DynamicQueryParametersDirector {

	constructor(private readonly builder: IQueryParametersBuilder) {}

	public buildQueryParameters(): string[] {
		return this.builder
			.setSkipParam()
			.setTopParam()
			.setSortParam()
			.setFilterParam()
			.setKeySetIdParam()
			.buildString();
	}
}
