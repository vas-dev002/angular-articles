import { ITooltipParams } from "@ag-grid-community/core";
import { TooltipByFunctionOptions } from "..";

declare const expect: jest.Expect;

describe("[Option]: TooltipByFunctionOptions", () => {
	let tooltipByFunctionOptions: TooltipByFunctionOptions;

	beforeEach(() => {
		tooltipByFunctionOptions = new TooltipByFunctionOptions();
	});

	describe("[TooltipByFunctionOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(tooltipByFunctionOptions).toBeTruthy();
			expect(tooltipByFunctionOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: tooltipValueGetter", () => {
		it("should return valid value when slot is invalid", () => {
			const params = { value: "Test1" } as ITooltipParams;
			const tooltipValueGetter = tooltipByFunctionOptions.tooltipValueGetter(params);

			expect(tooltipValueGetter).toBe(params.value);
		});
	});
});
