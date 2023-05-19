import { IServerSideGetRowsRequest } from "@ag-grid-community/core";

import {
	IDynamicQueryRequestModel
} from "../../../../../../evergreen-shared/typegen/dynamic-query/dynamic-query-request-model";
import { isNullOrUndefined } from "../../../../../../util/common/common";
import { DynamicGridKeySetIdService } from "../dynamic-grid-key-set-id.service";
import { AgGridFilterFactory } from "./dynamic-filter-parameters/filter-factory";
import { DynamicQueryParameters } from "./dynamic-query-parameters";
import { DynamicQueryStringFormat } from "./dynamic-query-string-format";
import { AgGridSortFactory } from "./dynamic-sort-parameters/sort-factory";
import { IQueryParametersBuilder } from "./models/query-parameters-builder";

export class DynamicQueryParametersBuilder implements IQueryParametersBuilder {
	private readonly queryParameters: DynamicQueryParameters;
	private readonly nameof = <T>(name: keyof T) => name;

	public constructor(
		protected readonly agGridRequestModel: IServerSideGetRowsRequest,
		protected readonly keySetIdService: DynamicGridKeySetIdService
	) {
		this.queryParameters = new DynamicQueryParameters();
	}

	public setSkipParam(): DynamicQueryParametersBuilder {
		this.queryParameters.setSkipParam(this.agGridRequestModel.startRow);
		return this;
	}

	public setTopParam(): DynamicQueryParametersBuilder {
		const top = this.agGridRequestModel.endRow - this.agGridRequestModel.startRow;
		this.queryParameters.setTopParam(top);
		return this;
	}

	public setSortParam(): DynamicQueryParametersBuilder {
		const sortParameters = AgGridSortFactory.createSort(this.agGridRequestModel.sortModel);
		if (sortParameters.length > 0) {
			this.queryParameters.setSortParam(sortParameters);
		}
		return this;
	}

	public setFilterParam(): DynamicQueryParametersBuilder {
		const filterParameters = AgGridFilterFactory.createFilter(this.agGridRequestModel.filterModel);
		if (filterParameters.length > 0) {
			this.queryParameters.setFilterParam(filterParameters);
		}
		return this;
	}

	public setKeySetIdParam(): DynamicQueryParametersBuilder {
		const keySetId = this.keySetIdService.getKeySetId();
		if (!isNullOrUndefined(keySetId)) {
			this.queryParameters.setKeySetIdParam(keySetId);
		}
		return this;
	}

	public build(): DynamicQueryParameters {
		return this.queryParameters;
	}

	public buildString(): string[] {
		const params = [];

		if (!isNullOrUndefined(this.queryParameters.skip) && !isNullOrUndefined(this.queryParameters.top)) {
			params.push(
				`${this.nameof<IDynamicQueryRequestModel>("skip")}=${this.queryParameters.skip}`,
				`${this.nameof<IDynamicQueryRequestModel>("top")}=${this.queryParameters.top}`);
		}
		if (!isNullOrUndefined(this.queryParameters.orderBy) && this.queryParameters.orderBy.length > 0) {
			const sortString = DynamicQueryStringFormat.sortQueryString(this.queryParameters.orderBy);
			params.push(`${this.nameof<IDynamicQueryRequestModel>("orderBy")}=${sortString}`);
		}
		if (!isNullOrUndefined(this.queryParameters.filter) && this.queryParameters.filter.length > 0) {
			const filterString = DynamicQueryStringFormat.filterQueryString(this.queryParameters.filter);
			params.push(`${this.nameof<IDynamicQueryRequestModel>("filter")}=${filterString}`);
		}
		if (!isNullOrUndefined(this.queryParameters.keySetId)) {
			params.push(`${this.nameof<IDynamicQueryRequestModel>("keySetId")}=${this.queryParameters.keySetId}`);
		}

		return params;
	}
}
