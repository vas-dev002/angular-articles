import { ValueGetterParams } from "@ag-grid-community/core";
import { BooleanValueGetterOptions } from "..";

declare const expect: jest.Expect;

describe("[Builder option]: BooleanValueGetterOptions", () => {
	const columnName = "booleanImageColumn";
	let booleanValueGetterOptions: BooleanValueGetterOptions;

	beforeEach(() => {
		booleanValueGetterOptions = new BooleanValueGetterOptions(columnName);
	});

	describe("[BooleanValueGetterOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(booleanValueGetterOptions).toBeTruthy();
			expect(booleanValueGetterOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: getterFunction", () => {
		it("should return the currect value if data is set", () => {
			const params = {
				data: { booleanImageColumn: "True" }
			};
			const expectedResult = params.data.booleanImageColumn;
			const result = booleanValueGetterOptions.getterFunction(params as unknown as ValueGetterParams);
			expect(result).toEqual(expectedResult);
		});

		it("should return null", () => {
			const params = { data: null };

			const result = booleanValueGetterOptions.getterFunction(params as unknown as ValueGetterParams);
			expect(result).toBe("");
		});
	});
});
