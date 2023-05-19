import { Type } from "@angular/core";

import { FilterTypeSG, IColumnMetaSG } from "../../../../../../../../../../components/shared/aggrid/static-grid";
import { IColDefAbstractFactory } from "../../../base/base-abstract-factory/models";
import { StaticGridComponent } from "../../../../../main/comp";
import { BooleanFilteringOptions } from "..";

declare const expect: jest.Expect;

describe("[Builder option]: BooleanFilteringOptions", () => {
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
	let booleanFilteringOptions: BooleanFilteringOptions;

	beforeEach(() => {
		booleanFilteringOptions = new BooleanFilteringOptions(meta, grid);
	});

	describe("[BooleanSortingOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(booleanFilteringOptions).toBeTruthy();
			expect(booleanFilteringOptions).toMatchSnapshot();
		});
	});
});
