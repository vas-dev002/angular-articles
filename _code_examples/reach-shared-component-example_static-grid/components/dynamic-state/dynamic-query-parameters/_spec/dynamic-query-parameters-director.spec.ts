import { isArray } from "lodash";
import { DynamicQueryParametersDirector } from "../dynamic-query-parameters-director";
import { IQueryParametersBuilder } from "../models/query-parameters-builder";

describe("DynamicQueryParametersDirector", () => {

	const builderMock: IQueryParametersBuilder = {
		setSkipParam: jest.fn(),
		setTopParam: jest.fn(),
		setSortParam: jest.fn(),
		setFilterParam: jest.fn(),
		setKeySetIdParam: jest.fn(),
		build: jest.fn(),
		buildString: jest.fn().mockReturnValue(["$skip=1000", "$top=-500"])
	};

	let director: DynamicQueryParametersDirector;

	beforeAll(() => {
		builderMock.setSkipParam = jest.fn().mockReturnValue(builderMock);
		builderMock.setTopParam = jest.fn().mockReturnValue(builderMock);
		builderMock.setSortParam = jest.fn().mockReturnValue(builderMock);
		builderMock.setFilterParam = jest.fn().mockReturnValue(builderMock);
		builderMock.setKeySetIdParam = jest.fn().mockReturnValue(builderMock);
		director = new DynamicQueryParametersDirector(builderMock);
	});

	describe("Function [constructor]", () => {
		it("should create", () => {
			expect(director).toBeTruthy();
		});
	});

	describe("[Function]: buildQueryParameters", () => {
		it("should call all required methods", () => {
			director.buildQueryParameters();

			expect(builderMock.setSkipParam).toHaveBeenCalled();
			expect(builderMock.setTopParam).toHaveBeenCalled();
			expect(builderMock.setSortParam).toHaveBeenCalled();
			expect(builderMock.setFilterParam).toHaveBeenCalled();
			expect(builderMock.setKeySetIdParam).toHaveBeenCalled();
			expect(builderMock.build).not.toHaveBeenCalled();
			expect(builderMock.buildString).toHaveBeenCalled();
		});

		it("should return an array of string - query parameters", () => {
			const result = director.buildQueryParameters();

			expect(isArray(result)).toBeTruthy();
			expect(result).toEqual(["$skip=1000", "$top=-500"]);
		});
	});
});
