import { BooleanGroupingOptions } from "..";
import { BooleanGroupParams } from "../../entity";

declare const expect: jest.Expect;

describe("[Builder option]: BooleanGroupingOptions", () => {
	let booleanGroupingOptions: BooleanGroupingOptions;

	beforeEach(() => {
		booleanGroupingOptions = new BooleanGroupingOptions();
	});

	describe("[BooleanGroupingOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(booleanGroupingOptions).toBeTruthy();
			expect(booleanGroupingOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: getGroupKey", () => {
		it("should provide an unique grouping key", () => {
			const value1 = { value: "True" };
			const value2 = { value: "False" };

			const key1 = booleanGroupingOptions.getGroupKey(value1 as unknown as BooleanGroupParams);
			const key2 = booleanGroupingOptions.getGroupKey(value2 as unknown as BooleanGroupParams);

			expect(key1).toEqual(JSON.stringify("True"));
			expect(key2).toEqual(JSON.stringify("False"));
		});
	});
});
