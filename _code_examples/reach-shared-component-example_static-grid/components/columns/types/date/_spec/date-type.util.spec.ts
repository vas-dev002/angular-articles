import { DateDasType } from "../date-type.util";

declare const expect: jest.Expect;

describe("DateDasType Utils: ", () => {

	const possibleValues = [null, undefined, "", "null", "2019-02-08T00:00:00"];

	it("[Function: getValue() should return a tooltip string]", () => {
		const result: { [key: number]: string } = {};
		possibleValues.forEach((val, index) => {
			result[index] = DateDasType.getValue(val);
		});
		expect(result).toMatchSnapshot();
	});

});
