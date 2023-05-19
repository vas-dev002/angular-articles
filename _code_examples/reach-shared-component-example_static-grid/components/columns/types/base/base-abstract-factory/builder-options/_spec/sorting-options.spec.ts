import { SortingOptions } from "..";

declare const expect: jest.Expect;

describe("[Option]: SortingOptions", () => {
	let sortingOptions: SortingOptions;

	beforeEach(() => {
		sortingOptions = new SortingOptions();
	});

	describe("[SortingOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(sortingOptions).toBeTruthy();
			expect(sortingOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: comparator", () => {
		it("should sort correctly if both values are not empty", () => {
			const value1 = "ATest1";
			const value2 = "BTest1";
			const comparator = sortingOptions.comparator;

			expect(comparator(value1, value1)).toEqual(0);
			expect(comparator(value1, value2)).toEqual(-1);
			expect(comparator(value2, value1)).toEqual(1);
		});

		it("should sort correctly if both values are undefined", () => {
			const value1 = null;
			const value2 = null;
			const comparator = sortingOptions.comparator;

			expect(comparator(value1, value1)).toEqual(0);
			expect(comparator(value1, value2)).toEqual(0);
			expect(comparator(value2, value1)).toEqual(0);
		});
	});
});
