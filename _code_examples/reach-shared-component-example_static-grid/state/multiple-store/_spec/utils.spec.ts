import { createAction } from "@ngrx/store";
import { cloneDeep } from "lodash";
import { MultipleStoreMeta } from "../entity";
import { createLocalAction, forThisComponent, isComponentAction } from "../utils";
declare const expect: jest.Expect;

describe("Multiple store utils: ", () => {

const TestAction = createAction("Test.Action");
const meta: MultipleStoreMeta = {
	sliceName: "TestKey"
};
	describe(`[Function: createLocalAction`, () => {
		it("should add meta data if slice name is provided", () => {
			const result = createLocalAction(cloneDeep(TestAction), "TestKey");
			expect(result.__multipleStoreMeta).toEqual(meta);
		});

		it("shouldn't add meta data if slice name is not provided", () => {
			const result = createLocalAction(cloneDeep(TestAction), "");
			expect(result.__multipleStoreMeta).toBeUndefined();
		});
	});

	describe(`[Function: isComponentAction`, () => {
		it("should return true", () => {
			const result = isComponentAction(meta, "TestKey");
			expect(result).toBeTruthy();
		});

		it("should return false", () => {
			const result = isComponentAction(meta, "AnotherKey");
			expect(result).toBeFalsy();
		});
	});

	describe(`[Function: forThisComponent`, () => {
		it("should return filter function", () => {
			const result = forThisComponent("TestKey");
			expect(result).toEqual(expect.any(Function));
		});
	});
});
