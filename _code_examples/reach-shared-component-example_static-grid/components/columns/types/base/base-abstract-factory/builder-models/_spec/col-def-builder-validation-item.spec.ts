import { ColDefBuilderValidationItem } from "../col-def-builder-validation-item";

declare const expect: jest.Expect;

describe("[Model]: ColDefBuilderValidationError", () => {
	const requiredErrorMessage = "";
	const duplicateErrorMessage = "";
	const isSet = false;
	let colDefBuilderValidationItem: ColDefBuilderValidationItem;

	beforeEach(() => {
		colDefBuilderValidationItem = new ColDefBuilderValidationItem(requiredErrorMessage, duplicateErrorMessage, isSet);
	});

	describe("[ColDefBuilderValidationItem instantiate]", () => {
		it("should be successfully created", () => {
			expect(colDefBuilderValidationItem).toBeTruthy();
			expect(colDefBuilderValidationItem).toMatchSnapshot();
		});
	});
});
