import { ColDefBuilderValidationError } from "../col-def-builder-validation-error";

declare const expect: jest.Expect;

describe("[Model]: ColDefBuilderValidationError", () => {
	let colDefBuilderValidationError: ColDefBuilderValidationError;

	beforeEach(() => {
		colDefBuilderValidationError = new ColDefBuilderValidationError();
	});

	describe("[ColDefBuilderValidationError instantiate]", () => {
		it("should be successfully created", () => {
			expect(colDefBuilderValidationError).toBeTruthy();
			expect(colDefBuilderValidationError).toMatchSnapshot();
		});
	});
});
