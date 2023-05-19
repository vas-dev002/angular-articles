import { getDelayPipe } from "../timers";
import { TestScheduler } from "rxjs/testing";

describe("Evergreen Shared", () => {
	describe("[Function: getDelayPipe]", () => {
		let testScheduler: TestScheduler;
		beforeEach(() => {
			testScheduler = new TestScheduler((actual, expected) => {
				expect(actual).toStrictEqual(expected);
			});
		});
		it("should return value with delay", () => {
			testScheduler.run(helpers => {
				const { cold, expectObservable } = helpers;
				const values = { a: 1 };
				const source = cold("-a|", values);
				const result = source.pipe(getDelayPipe<number>(100));
				const expected = "- 100ms (a|)";
				expectObservable(result).toBe(expected, values);
			});
		});
		it("should return value without delay", () => {
			testScheduler.run(helpers => {
				const { cold, expectObservable } = helpers;
				const values = { a: 2 };
				const source = cold("-a|", values);
				const result = source.pipe(getDelayPipe<number>(100, [values.a]));
				const expected = "-a|";
				expectObservable(result).toBe(expected, values);
			});
		});

		it("should skip delayed value if new is raised", () => {
			testScheduler.run(helpers => {
				const { cold, expectObservable } = helpers;
				const values = { a: 1, b: 2, c: 3, d: 4};
				const source = cold("-a--b-c--d|", values);
				const result = source.pipe(getDelayPipe<number>(200, [values.b]));
				const expected = "----b---- 200ms (d|)";
				expectObservable(result).toBe(expected, values);
			});
		});
	});
});
