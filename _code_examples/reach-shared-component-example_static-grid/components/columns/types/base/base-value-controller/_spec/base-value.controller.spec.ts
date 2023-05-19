import { Injector, Type } from "@angular/core";
import { inject, TestBed } from "@angular/core/testing";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { ColDef, ValueFormatterParams } from "@ag-grid-community/core";
import { BaseValueControllerSG } from "../base-value.cotroller";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { COMMON_META } from "../../_spec/common.set";
import { StaticGridComponent } from "../../../../../main/comp";
import { getValueGetterResults } from "../../_spec/types-test.utils";

describe("Static Grid Column Type BaseValueControllerSG: ", () => {

	class TestBaseValueControllerSG extends BaseValueControllerSG {
		public renderComponent: Type<ICellRendererAngularComp>;

	}

	const meta = COMMON_META;
	const customOptions = {};
	const grid = { rowData: [] } as StaticGridComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [TranslateService]
		});
	});

	describe("Controller: TestOutcomeControllerSG", () => {
		let injector;
		let cDefinition: ColDef;
		let controller: TestBaseValueControllerSG;

		beforeEach(inject([Injector], (inj: Injector) => {
			injector = inj;
			controller = new TestBaseValueControllerSG({ meta, grid, customOptions, injector });
			cDefinition = controller.columnDefinition();
		}));

		it("should return default column definition", () => {
			expect(controller.columnDefinition()).toMatchSnapshot();
		});

		it("should return null getStringValue() method", () => {
			const value = { value: null } as ValueFormatterParams;
			expect(controller.getStringValue()(value)).toEqual(value.value);
		});

		it("should return string getStringValue() method", () => {
			const translate = TestBed.inject(TranslateService);
			const value = { value: {text: "passed"} } as ValueFormatterParams;
			const spyOnEvent = jest.spyOn(translate, "instant");
			controller.getStringValue()(value);
			expect(spyOnEvent).toHaveBeenCalledWith(value.value.text);
		});

		it("[Function: customValueGetter() should get TestOutcome value from ValueGetterParams]", () => {
			expect(getValueGetterResults(controller.columnDefinition().valueGetter)).toMatchSnapshot();
		});

	});
});
