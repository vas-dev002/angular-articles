import { Type } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { IColumnMetaSG, FilterTypeSG, IGetCellClassParams, IDataRowSG } from "../../../../main/entity";
import { StaticGridComponent } from "../../../../main/comp";
import { ColDef, ITooltipParams, ValueFormatterParams } from "@ag-grid-community/core";
import { BaseTypeController } from "../base.controller";
import { getValueGetterResults } from "./types-test.utils";
import { IColDefAbstractFactory } from "../base-abstract-factory/models";

declare const expect: jest.Expect;

class TestTypeController extends BaseTypeController {
	public renderComponent = {} as Type<ICellRendererAngularComp>;
	public columnDefinition(): ColDef {
		return {
			...this.baseDef
		};
	}
}

describe("Static Grid Column Type", () => {
	describe(`Base Controller: BaseControllerSG`, () => {
		const baseMeta: IColumnMetaSG = {
			headerName: "Test Header",
			visible: false,
			cssClass: "testCss",
			columnName: "testColumn",
			controller: {} as Type<IColDefAbstractFactory>,
			filterType: FilterTypeSG.Multiselect,
			lockVisible: false,
			isObjectKey: false,
			metaFromApi: {}
		};
		let meta;
		let customOptions = {};
		let grid = { rowData: [] } as StaticGridComponent;
		let controller: TestTypeController;

		beforeEach(() => {
			meta = { ...baseMeta };
			customOptions = {};
			grid = { rowData: [] } as StaticGridComponent;
			controller = new TestTypeController({ meta, grid, customOptions });
		});

		it("should return default column definition", () => {
			const definition = controller.columnDefinition();
			expect(definition).toMatchSnapshot();
		});

		it("should return default column definition with None filter type", () => {
			meta.filterType = FilterTypeSG.None;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			expect(definition).toMatchSnapshot();
		});

		it("should return keyCreator for groups", () => {
			meta = {} as IColumnMetaSG;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			expect(definition.keyCreator).toBeDefined();
			const values = [1, "test", { test: "value" }];
			const res = {};
			values.forEach((value) => {
				res[value.toString()] = definition.keyCreator({ value });
			});
			expect(res).toMatchSnapshot();
		});

		it("should fill tooltipField", () => {
			const column = "TooltipTestColumn";
			meta = { tooltipField: column } as IColumnMetaSG;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			expect(definition.tooltipField).toBeDefined();
			expect(definition.tooltipField).toBe(column);
		});

		it("should return tooltip by default", () => {
			meta = {} as IColumnMetaSG;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			expect(definition.tooltipValueGetter).toBeDefined();
			const params = { value: "TestTooltip" } as ITooltipParams;
			expect(definition.tooltipValueGetter(params)).toBe(params.value);
		});

		it("should return export value by default", () => {
			meta = {} as IColumnMetaSG;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			expect(definition.valueFormatter).toBeDefined();
			const params = { value: "TestValue" } as ValueFormatterParams;
			if (typeof definition.valueFormatter !== "string") {
				expect(definition.valueFormatter(params)).toBe(params.value);
			} else {
				expect(definition.valueFormatter).toBe(params.value);
			}
		});

		it("should set class by disabled status", () => {
			const column = "DisabledTestColumn";
			meta = { disabledField: column } as IColumnMetaSG;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			expect(definition.cellClassRules).toBeDefined();
			const cellClass = "sg-cell-disabled";
			const cssFunction = definition.cellClassRules[cellClass] as Function;
			expect(typeof cssFunction).toBe("function");
			let params = {
				data: null,
				rowIndex: 0, node: null, value: null, api: null
			} as IGetCellClassParams<{ [disabledField: string]: boolean }, null>;
			expect(cssFunction(params)).toBe(false);
			const values = [true, false, null, undefined];
			const results = [true, false, false, false];
			values.forEach((value, index) => {
				params = {
					data: { [column]: value },
					rowIndex: 0, node: null, value: null, api: null
				} as IGetCellClassParams<{ [disabledField: string]: boolean }, null>;
				expect(cssFunction(params)).toBe(results[index]);
			});

		});

		it("should return the value", () => {
			meta = {} as IColumnMetaSG;
			controller = new TestTypeController({ meta, grid, customOptions });
			const definition = controller.columnDefinition();
			const valueFunction = definition.valueFormatter;
			const value = "ShowMe";
			const params = { value } as ValueFormatterParams;
			if (typeof valueFunction !== "string") {
				expect(valueFunction(params)).toBe(value);
			} else {
				expect(valueFunction).toBe(value);
			}
		});

		it("should return default column definition with Number filterType", () => {
			const metaWithNumber = { ...meta, filterType: FilterTypeSG.Number };
			const newController = new TestTypeController({ meta: metaWithNumber, grid, customOptions });
			const definition = newController.columnDefinition();
			expect(definition).toMatchSnapshot();
		});

		it("should handle Empty values when generating FilterOptions", () => {
			const gridWithRowData = {
				rowData: [
					{
						testColumn: ""
					} as IDataRowSG,
					{
						testColumn: "value"
					} as IDataRowSG
				]
			} as StaticGridComponent;
			const newController = new TestTypeController({ meta, grid: gridWithRowData, customOptions });
			const definition = newController.columnDefinition();
			expect(definition.floatingFilterComponentParams.meta.filterOptions).toMatchSnapshot();
		});

		it("should handle customUiTransformation value in metaFromApi", () => {
			const metaWithCustomUiTransformation = {
				...meta,
				metaFromApi: {
					customUiTransformation: ""
				}
			};
			const newController = new TestTypeController({ meta: metaWithCustomUiTransformation, grid, customOptions });
			const definition = newController.columnDefinition();
			expect(definition.filterParams).toMatchSnapshot();
		});

		it("[Common type test function: getValueGetterResults should handle empty value getter]", () => {
			expect(getValueGetterResults("")).toMatchSnapshot();
		});

	});
});
