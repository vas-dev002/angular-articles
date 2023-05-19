import { WidthOptions } from "..";

declare const expect: jest.Expect;

describe("[Option]: WidthOptions", () => {
	let widthOptions: WidthOptions;

	beforeEach(() => {
		widthOptions = new WidthOptions();
	});

	describe("[WidthOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(widthOptions).toBeTruthy();
			expect(widthOptions).toMatchSnapshot();
		});
	});
});
