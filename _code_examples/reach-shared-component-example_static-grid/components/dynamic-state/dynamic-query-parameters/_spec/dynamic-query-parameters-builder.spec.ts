import { IServerSideGetRowsRequest } from "@ag-grid-community/core";
import { cloneDeep } from "lodash";

import { DynamicGridKeySetIdService } from "../../dynamic-grid-key-set-id.service";
import { DateFilter } from "../dynamic-filter-parameters/date-filter";
import { AgGridFilterFactory } from "../dynamic-filter-parameters/filter-factory";
import { MultiselectFilter } from "../dynamic-filter-parameters/multiselect-filter";
import { NumberFilter } from "../dynamic-filter-parameters/number-filter";
import { TextFilter } from "../dynamic-filter-parameters/text-filter";
import { DynamicQueryParametersBuilder } from "../dynamic-query-parameters-builder";
import { DateFilterOperator } from "../models/date-filter-operator.entity";
import {
	FilterType,
	IDynamicFilterParameter
} from "../models/dynamic-filter-parameter";
import { MultiselectFilterOperator } from "../models/multiselect-filter-operator.entity";
import { NumberFilterOperator } from "../models/number-filter-operator.entity";
import { TextFilterOperator } from "../models/text-filter-operator.entity";

describe("DynamicQueryParametersBuilder", () => {

	const agGridRequestModel: IServerSideGetRowsRequest = {
		startRow: 1000,
		endRow: 500,
		rowGroupCols: [],
		valueCols: [],
		pivotCols: [],
		pivotMode: false,
		groupKeys: [],
		filterModel: {
			onboardAction: [
				"Onboard Device Object",
				"Onboard Application Object",
				"Re-Onboard Device Object"
			],
			historyDate: {
				dateFrom: "2019-12-05 00:00:00",
				dateTo: null,
				filterType: "date",
				type: "lessThanOrEqual"
			},
			historyId: {
				filter: 33,
				filterType: "number",
				type: "greaterThan"
			},
			shortName: {
				filter: "AD",
				filterType: "text",
				type: "contains"
			},
			unitName: {
				filter: "Un",
				filterType: "text",
				type: "startsWith"
			}
		},
		sortModel: [
			{
				sort: "desc",
				colId: "historyDate"
			},
			{
				sort: "asc",
				colId: "objectType"
			}
		]
	};

	const filters: IDynamicFilterParameter[] = [
		Object.assign( new MultiselectFilter(), {
			columnName: "onboardAction",
			filterOperator: MultiselectFilterOperator.equals,
			filterType: FilterType.MultiSelect,
			filterValue: [
				"Onboard Device Object",
				"Onboard Application Object",
				"Re-Onboard Device Object"
			]
		}),
		Object.assign( new DateFilter(), {
			columnName: "historyDate",
			filterOperator: DateFilterOperator.onBefore,
			filterType: FilterType.Date,
			filterValue: "2019-12-05 00:00:00"
		}),
		Object.assign( new NumberFilter(), {
			columnName: "historyId",
			filterOperator: NumberFilterOperator.greaterThan,
			filterType: FilterType.Number,
			filterValue: 33
		}),
		Object.assign( new TextFilter(), {
			columnName: "shortName",
			filterOperator: TextFilterOperator.contains,
			filterType: FilterType.Text,
			filterValue: "AD"
		}),
		Object.assign( new TextFilter(), {
			columnName: "unitName",
			filterOperator: TextFilterOperator.beginsWith,
			filterType: FilterType.Text,
			filterValue: "Un"
		})
	];

	let builder: DynamicQueryParametersBuilder;
	let keySetIdService: DynamicGridKeySetIdService;

	beforeEach(() => {
		keySetIdService = new DynamicGridKeySetIdService();
		builder = new DynamicQueryParametersBuilder(agGridRequestModel,keySetIdService);
	});

	describe("Function [constructor]", () => {
		it("should create", () => {
			expect(builder).toBeTruthy();
			expect(builder.build()).toBeDefined();
		});
	});

	describe("[Function]: setSkipParam", () => {
		it("should set skip parameter in DynamicQueryParameters object", () => {
			const result = builder.setSkipParam();

			expect(result).toEqual(builder);
			expect(builder.build().skip).toEqual(agGridRequestModel.startRow);
		});
	});

	describe("[Function]: setTopParam", () => {
		it("should set top parameter in DynamicQueryParameters object", () => {
			const result = builder.setTopParam();

			expect(result).toEqual(builder);
			expect(builder.build().top).toEqual(agGridRequestModel.endRow - agGridRequestModel.startRow);
		});
	});

	describe("[Function]: setSortParam", () => {
		it("should set sort parameter in DynamicQueryParameters object", () => {
			const result = builder.setSortParam();
			const exptected = [
				{
					columnName: agGridRequestModel.sortModel[0].colId,
					sort: agGridRequestModel.sortModel[0].sort
				},
				{
					columnName: agGridRequestModel.sortModel[1].colId,
					sort: agGridRequestModel.sortModel[1].sort
				}
			];

			expect(result).toEqual(builder);
			expect(builder.build().orderBy).toEqual(exptected);
		});

		it("should not do anything when ag-grid sort model is different", () => {
			const requestModel = cloneDeep(agGridRequestModel);
			requestModel.sortModel = [
				{
					columnId: "Test",
					sortType: "desc"
				}
			];
			builder = new DynamicQueryParametersBuilder(requestModel, keySetIdService);
			const result = builder.setSortParam();

			expect(result).toEqual(builder);
			expect(builder.build().orderBy).toBeUndefined();
		});
	});

	describe("[Function]: setFilterParam", () => {
		it("should set filter parameter in DynamicQueryParameters object", () => {
			const spyOnCreateFilter = jest.spyOn(AgGridFilterFactory, "createFilter");
			const result = builder.setFilterParam();

			expect(spyOnCreateFilter).toHaveBeenCalled();
			expect(result).toEqual(builder);
			expect(builder.build().filter).toEqual(filters);
		});

		it("should not do anything when ag-grid filter model is empty", () => {
			const requestModel = cloneDeep(agGridRequestModel);
			requestModel.filterModel = {};
			builder = new DynamicQueryParametersBuilder(requestModel, keySetIdService);
			const result = builder.setFilterParam();

			expect(result).toEqual(builder);
			expect(builder.build().filter).toBeUndefined();
		});
	});

	describe("[Function]: setKeySetIdParam", () => {
		it("should set keySetId parameter in DynamicQueryParameters object", () => {
			keySetIdService.setKeySetId(12345);
			const result = builder.setKeySetIdParam();

			expect(result).toEqual(builder);
			expect(builder.build().keySetId).toEqual(12345);
		});

		it("should not set keySetId parameter when keySetId is undefined", () => {
			const result = builder.setKeySetIdParam();

			expect(result).toEqual(builder);
			expect(builder.build().keySetId).toBeUndefined();
		});
	});

	describe("[Function]: buildString", () => {
		it("should return empty array if there is nothing in DynamicQueryParameters object", () => {
			const result = builder.buildString();

			expect(result).toEqual([]);
		});
		it("should build query string parameters from DynamicQueryParameters object", () => {
			keySetIdService.setKeySetId(12345);
			builder.setSkipParam();
			builder.setTopParam();
			builder.setSortParam();
			builder.setFilterParam();
			builder.setKeySetIdParam();
			const result = builder.buildString();

			expect(result).toEqual([
				"skip=1000",
				"top=-500",
				"orderBy=historyDate%20desc,objectType%20asc",
				"filter=(onboardAction%20EQUALS%20('Onboard%20Device%20Object'%2C'Onboard%20Application%20Object'%2C'Re-Onboard%20Device%20Object')%20AND%20historyDate%20ON%20BEFORE%20('2019-12-05%2000%3A00%3A00')%20AND%20historyId%20%3E%2033%20AND%20shortName%20CONTAINS%20('AD')%20AND%20unitName%20BEGINS%20WITH%20('Un'))",
				"keySetId=12345"
			]);
		});
	});
});
