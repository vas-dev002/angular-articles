import { Type } from "@angular/core";

import { FilterTypeSG, IColumnMetaSG } from "../../../../../../../../../../components/shared/aggrid/static-grid";
import { IColDefAbstractFactory } from "../../../base/base-abstract-factory/models";
import { StaticGridComponent } from "../../../../../main/comp";
import { BooleanSortingOptions } from "..";

declare const expect: jest.Expect;

describe("[Builder option]: BooleanSortingOptions", () => {
	const meta: IColumnMetaSG = {
		headerName: "Test Header",
		visible: false,
		cssClass: "testCss",
		columnName: "booleanImage",
		controller: { } as Type<IColDefAbstractFactory>,
		filterType: FilterTypeSG.Multiselect,
		lockVisible: false,
		isObjectKey: false,
		metaFromApi: { columnName: "booleanImage" }
	};
	const rowData = [
		{ [meta.columnName]: "True" },
		{ [meta.columnName]: "False" },
		{ [meta.columnName]: "True" }
	];
	const grid = { rowData } as StaticGridComponent;
	let booleanSortingOptions: BooleanSortingOptions;

	beforeEach(() => {
		booleanSortingOptions = new BooleanSortingOptions(meta, grid);
	});

	describe("[BooleanSortingOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(booleanSortingOptions).toBeTruthy();
			expect(booleanSortingOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: comparator", () => {
		const value1 = "True";
		const value2 = "False";

		it("should sort correctly if both values are not empty", () => {
			const comparator = booleanSortingOptions.comparator;

			expect(comparator(value1, value1)).toEqual(-0);
			expect(comparator(value1, value2)).toEqual(1);
			expect(comparator(value2, value1)).toEqual(-1);
		});

		it("should sort correctly if both values are not empty and property metaFromApi = null", () => {
			meta.metaFromApi = null;

			const comparator = booleanSortingOptions.comparator;

			expect(comparator(value1, value1)).toEqual(-0);
			expect(comparator(value1, value2)).toEqual(1);
			expect(comparator(value2, value1)).toEqual(-1);
		});
	});
});
