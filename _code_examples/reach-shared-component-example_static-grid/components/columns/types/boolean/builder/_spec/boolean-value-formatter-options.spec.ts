import { ValueFormatterParams } from "@ag-grid-community/core";
import { TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { BooleanValueFormatterOptions } from "..";

declare const expect: jest.Expect;

describe("[Builder option]: BooleanValueFormatterOptions", () => {
	let booleanValueFormatterOptions: BooleanValueFormatterOptions;
	let translateService: TranslateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [TranslateService]
		});

		translateService = TestBed.inject(TranslateService);
		booleanValueFormatterOptions = new BooleanValueFormatterOptions(translateService);
	});

	describe("[BooleanValueFormatterOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(booleanValueFormatterOptions).toBeTruthy();
			expect(booleanValueFormatterOptions).toMatchSnapshot();
		});
	});

	describe("[Method]: formatterFunction", () => {
		it("should return the currect value", () => {
			const params = { value: "True" };
			const expectedResult = params.value;
			const formatterFunction = booleanValueFormatterOptions.formatterFunction(params as unknown as ValueFormatterParams);
			expect(formatterFunction).toEqual(expectedResult);
		});

		it("should return null", () => {
			const params = { value: null };
			const formatterFunction = booleanValueFormatterOptions.formatterFunction(params as unknown as ValueFormatterParams);
			expect(formatterFunction).toBeNull();
		});
	});
});
