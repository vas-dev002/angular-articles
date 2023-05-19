import { Directive, HostListener } from "@angular/core";
import { BaseGridStyleDirective } from "../base/base-grid-style.directive";
import { CommonModalGridStyleFix } from "./utils/common-modal-grid-style-fix";

/**
 * Ag-grid wrapper height style fix for a modal window.
 */
@Directive({
	selector: "[modalWindowStyleFix]"
})
export class ModalWindowStyleFixDirective extends BaseGridStyleDirective {
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

		tableWrap.style.height = `${gridWrapperHeight}px`;
	}
}
