import { IColumnMetaSG } from "../../../../../../../../../../../components/shared/aggrid/static-grid";
import { VisibilityOptions } from "..";

declare const expect: jest.Expect;

describe("[Option]: VisibilityOptions", () => {
	const meta = {
		field: "testField",
		cellClass: "testCellClass",
		headerName: "testHeaderName",
		hide: false,
		tooltipField: "testTooltipField",
		lockVisible: false,
		visible: true,
		cssClass: "testSlotClass"
	} as unknown as IColumnMetaSG;

	let visibilityOptions: VisibilityOptions;

	beforeEach(() => {
		visibilityOptions = new VisibilityOptions(meta);
	});

	describe("[VisibilityOptions instantiate]", () => {
		it("should be successfully created", () => {
			expect(visibilityOptions).toBeTruthy();
			expect(visibilityOptions).toMatchSnapshot();
		});
	});
});
