import { Directive, HostListener } from "@angular/core";
import { BaseGridStyleDirective } from "../base/base-grid-style.directive";

/**
 * Ag-grid wrapper height style fix for a regular screen.
 */
@Directive({
	selector: "[gridHeightStyleFix]"
})
export class GridHeightStyleFixDirective extends BaseGridStyleDirective {
	public onGridReady() {
		this.setGridHeight();
	}

	@HostListener("window:resize", ["$event"])
	public onResize() {
		this.setGridHeight();
	}

	private setGridHeight() {
		const tableWrap = this.gridElement.nativeElement;
		const top = tableWrap.getBoundingClientRect().top;

		tableWrap.style.height = `${window.innerHeight - top}px`;
	}
}
