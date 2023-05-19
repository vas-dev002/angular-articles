import { GridApi } from "@ag-grid-community/core";
import { DasHTMLHelper } from "../../utils/html-helper/html-helper";

export abstract class CommonModalGridStyleFix {

	/**
	 * This function stretches the height of the ag-grid container based on the content of the grid.
	 * @param gridContainer - ag-grid container.
	 * @param gridApi - ag-grid gridApi.
	 */
	public static getGridContainerHeight(gridContainer: HTMLElement, gridApi: GridApi): number {
		if (!gridContainer || !gridApi) {
			return 0;
		}

		const getElementClientHeight = DasHTMLHelper.getElementClientHeight;
		const rowHeight = 34; // Height in pixels defined in config.ts: rowHeight: 34
		const sumOfBorderHeights = 0;
		const agHeaderHeight = getElementClientHeight("ag-header", gridContainer);
		const agHScrollHeight = getElementClientHeight("ag-body-horizontal-scroll", gridContainer);
		const extraHeight = sumOfBorderHeights + agHeaderHeight + agHScrollHeight;
		const visibleRowsCount = gridApi.getDisplayedRowCount();

		return Math.min(visibleRowsCount * rowHeight + extraHeight, this.maxGridHeightInPx());
	}

	/**
	 * The "300" value (px) is the approximate size of the header + footer of modal window.
	 * We have to calculate this size in future.
	 * The "0.9" - rate of screen height (90%)
	 */
	private static maxGridHeightInPx(): number {
		return window.innerHeight * 0.9 - 300;
	}

}
