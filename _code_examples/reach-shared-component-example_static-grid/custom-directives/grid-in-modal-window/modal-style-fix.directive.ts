import { Directive, HostListener } from "@angular/core";
import { BaseGridStyleDirective } from "../base/base-grid-style.directive";
import { CommonModalGridStyleFix } from "./utils/common-modal-grid-style-fix";

/**
 * Ag-grid wrapper height style fix for a modal window in project path tasks.
 */
@Directive({
	selector: "[modalStyleFixPathTasks]"
})
export class ModalStyleFixPathTasksDirective extends BaseGridStyleDirective {
	private minHeight = 0;

	public onGridReady() {
		this.setGridHeight();
	}

	@HostListener("window:resize", ["$event"])
	public onResize() {
		this.setGridHeight();
	}

	private setGridHeight() {
		const tableWrap = this.gridElement.nativeElement;
		const gridWrapperHeight = CommonModalGridStyleFix.getGridContainerHeight(tableWrap, this.gridApi);

		if (gridWrapperHeight > this.minHeight) {
			this.minHeight = gridWrapperHeight;
			tableWrap.style.height = `${gridWrapperHeight}px`;
		}
	}
}
