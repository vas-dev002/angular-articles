import { ITooltipParams } from "@ag-grid-community/core";
import { TestBed } from "@angular/core/testing";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

import { BooleanTooltipOptions } from "..";

declare const expect: jest.Expect;

describe("[Builder option]: BooleanTooltipOptions", () => {
	let booleanTooltipOptions: BooleanTooltipOptions;
	let translateService: TranslateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [TranslateService]
		});

		translateService = TestBed.inject(TranslateService);
		booleanTooltipOptions = new BooleanTooltipOptions(translateService);
	});

	describe("[BooleanTooltipOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(booleanTooltipOptions).toBeTruthy();
			expect(booleanTooltipOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: getterFunction", () => {
		it("should return the currect value if data is set", () => {
			const params = { value: "False" };

			const tooltipValueGetter = booleanTooltipOptions.tooltipValueGetter(params as unknown as ITooltipParams);
			expect(tooltipValueGetter).toEqual("False");
		});

		it("should return null", () => {
			const params = { value: null };

			const tooltipValueGetter = booleanTooltipOptions.tooltipValueGetter(params as unknown as ITooltipParams);
			expect(tooltipValueGetter).toBeNull();
		});
	});
});
