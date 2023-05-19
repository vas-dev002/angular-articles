import { Type } from "@angular/core";
import { ITooltipParams } from "@ag-grid-community/core";

import { IColDefAbstractFactory } from "../../base/base-abstract-factory/models";
import { IDateValueFormatterParams } from "../entity";
import { StaticGridComponent } from "../../../../main/comp";
import { FilterTypeSG } from "../../../../main/entity";
import { DateControllerSG } from "../date.controller";
import { DateDasType } from "../date-type.util";
import { IColumnMetaSG } from "../../../..";

import * as moment from "moment";

declare const expect: jest.Expect;

describe("Static Grid Column Type Date: ", () => {
	describe(`Controller: DateControllerSG`, () => {
		const meta: IColumnMetaSG = {
			headerName: "Test Header",
			visible: false,
			cssClass: "testCss",
			columnName: "testColumn",
			controller: {} as Type<IColDefAbstractFactory>,
			filterType: FilterTypeSG.Date,
			lockVisible: false,
			isObjectKey: false,
			metaFromApi: {}
		};
		const customOptions = {};
		const grid = { rowData: [] } as StaticGridComponent;
		const controller = new DateControllerSG({ meta, grid, customOptions });
		it("should return default column definition for date type", () => {
			expect(controller.columnDefinition()).toMatchSnapshot();
		});
		it("should return default column definition for datetime type", () => {
			const dateTimeMeta: IColumnMetaSG = {
				headerName: "Test Header",
				visible: false,
				cssClass: "testCss",
				columnName: "testColumn",
				controller: {} as Type<IColDefAbstractFactory>,
				filterType: FilterTypeSG.DateTime,
				lockVisible: false,
				isObjectKey: false,
				metaFromApi: {}
			};
			const dateTimeCustomOptions = {};
			const dateTimeGrid = { rowData: [] } as StaticGridComponent;
			const dateTimeController = new DateControllerSG({
				meta: dateTimeMeta,
				grid: dateTimeGrid,
				customOptions: dateTimeCustomOptions
			});
			expect(dateTimeController.columnDefinition()).toMatchSnapshot();
		});

		describe("[Method] keyCreator ", () => {
			it("should return default custom group key", () => {
				const value1 = { date: "2021-02-13T00:00:00" };
				const value2 = "2021-02-13T00:00:00";

				const keyCreator = controller.columnDefinition().keyCreator;
				const key1 = keyCreator(value1);
				const key2 = keyCreator({ value: value2 });

				const expectedKey1 = {
					stringValueMode: true,
					value: DateDasType.getValue(value1.date)
				};
				const expectedKey2 = {
					stringValueMode: true,
					value: DateDasType.getValue(value2)
				};

				expect(key1).toEqual(JSON.stringify(expectedKey1));
				expect(key2).toEqual(JSON.stringify(expectedKey2));
			});
		});

		describe("[Method] getTooltip ", () => {
			it("should return date value", () => {
				const value = {
					value: {
						date: "2021-02-13T00:00:00"
					}
				} as ITooltipParams;

				const valueGetter = controller.columnDefinition()
					.tooltipValueGetter as unknown as (params: ITooltipParams) => string;

				const result = valueGetter(value);
				const expectedResult = "Feb 13, 2021";

				expect(result).toEqual(expectedResult);
			});

			it("should return date and time value", () => {
				const params = { value: "2021-02-13T00:00:00" } as ITooltipParams;

				const valueGetter = controller.columnDefinition()
					.tooltipValueGetter as unknown as (params: ITooltipParams) => string;

				const result = valueGetter(params);
				const expectedResult = "Feb 13, 2021";

				expect(result).toEqual(expectedResult);
			});

			it("should return null", () => {
				const value = {
					value: null
				} as ITooltipParams;

				const valueGetter = controller.columnDefinition()
					.tooltipValueGetter as unknown as (params: ITooltipParams) => string;

				const result = valueGetter(value);
				expect(result).toBe("");
			});
		});

		describe("[Method] valueFormatter ", () => {
			it("should return custom value formatter", () => {
				const value1 = { date: "2021-02-13T00:00:00" };
				const value2 = "2021-02-13T00:00:00";
				const value3 = null;

				const valueFormatter = controller.columnDefinition()
					.valueFormatter as (params: IDateValueFormatterParams) => string;

				const formattedValue1 =	valueFormatter({ value: value1 } as unknown as IDateValueFormatterParams);
				const formattedValue2 = valueFormatter({ value: value2 } as unknown as IDateValueFormatterParams);
				const formattedValue3 = valueFormatter({ value: value3 } as unknown as IDateValueFormatterParams);

				expect(formattedValue1).toEqual(moment(value1.date).format("ll"));
				expect(formattedValue2).toEqual(moment(value2).format("ll"));
				expect(formattedValue3).toBe("");
			});
		});
	});
});
