import { ColDef } from "@ag-grid-community/core";
import { Injector } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { inject, TestBed } from "@angular/core/testing";

import { IColumnMetaSG } from "../../../../main/entity";
import { StaticGridComponent } from "../../../../main/comp";
import { COMMON_META } from "../../base/_spec/common.set";
import { BooleanFactorySG } from "../boolean.factory";

declare const expect: jest.Expect;

describe("Static Grid Column Type Boolean: ", () => {
	const meta: IColumnMetaSG = COMMON_META;
	const customOptions = {};
	const rowData = [
		{ [meta.columnName]: "False" },
		{ [meta.columnName]: "" },
		{ [meta.columnName]: "True" }
	];
	const grid = { rowData } as StaticGridComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [TranslateService]
		});
	});

	describe(`Controller: BooleanFactorySG `, () => {
		let factory: BooleanFactorySG;
		let columnDefinition: ColDef;
		let injector: Injector;

		beforeEach(inject([Injector], (inj: Injector) => {
			injector = inj;
			factory = new BooleanFactorySG();
		}));

		describe("[Method]: createColDef ", () => {
			it("should return default column definition", () => {
				columnDefinition = factory.createColDef({ meta, grid, customOptions, injector });
				expect(columnDefinition).toMatchSnapshot();
			});
		});
	});
});
