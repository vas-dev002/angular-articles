import { GridApi } from "@ag-grid-community/core";
import { CommonModalGridStyleFix } from "../common-modal-grid-style-fix";


describe("[Abstract class]: CommonModalGridStyleFix", () => {
	describe("[Function]: getGridContainerHeight", () => {
		it("should return default height without rows", () => {
			const gridApi = { getDisplayedRowCount: () => 5 } as GridApi;
			const gridContainer = { getElementsByClassName: (name) => null } as HTMLElement;
			const testResult = 170;
			const testHeight = CommonModalGridStyleFix.getGridContainerHeight(gridContainer, gridApi);

			expect(testHeight).toEqual(testResult);
		});
	});
});
