import { DynamicGridKeySetIdService } from "../dynamic-grid-key-set-id.service";

describe("DynamicGridKeySetIdService", () => {

	let keySetIdService: DynamicGridKeySetIdService;

	beforeEach(() => {
		keySetIdService = new DynamicGridKeySetIdService();
	});

	describe("Function [constructor]", () => {
		it("should keySetId is undefined", () => {
			expect(keySetIdService.getKeySetId()).toBeUndefined();
		});
	});

	describe("[Function]: setKeySetId, getKeySetId", () => {
		it("should set keySetId", () => {
			keySetIdService.setKeySetId(54321);

			expect(keySetIdService.getKeySetId()).toEqual(54321);
		});
	});

	describe("[Function]: resetKeySetId", () => {
		it("should set keySetId value to undefined", () => {
			keySetIdService.setKeySetId(54321);
			keySetIdService.resetKeySetId();

			expect(keySetIdService.getKeySetId()).toBeUndefined();
		});
	});
});
