import { ColDefBuilderValidationState } from "../col-def-builder-validation-state";

declare const expect: jest.Expect;

describe("[Model]: ColDefBuilderValidationState", () => {
	let colDefBuilderValidationState: ColDefBuilderValidationState;

	beforeEach(() => {
		colDefBuilderValidationState = new ColDefBuilderValidationState();
	});

	describe("[ColDefBuilderValidationState instantiate]", () => {
		it("should be successfully created", () => {
			expect(colDefBuilderValidationState).toBeTruthy();
			expect(colDefBuilderValidationState).toMatchSnapshot();
		});
	});
});
