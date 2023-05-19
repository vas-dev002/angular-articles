import { IColumnMetaSG } from "src/app/components/shared/aggrid/static-grid";
import { CellClassOptions } from "..";

declare const expect: jest.Expect;

describe("[Option]: CellClassOptions", () => {
	const meta = {
		field: "testField",
		cellClass: "testCellClass",
		headerName: "testHeaderName",
		hide: false,
		tooltipField: "testTooltipField",
		lockVisible: false,
		cssClass: "testSlotClass"
	} as unknown as IColumnMetaSG;
	let cellClassOptions: CellClassOptions;

	beforeEach(() => {
		cellClassOptions = new CellClassOptions(meta);
	});

	describe("[CellClassOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(cellClassOptions).toBeTruthy();
			expect(cellClassOptions).toMatchSnapshot();
		});
	});
});
