import { Directive, HostListener } from "@angular/core";
import { BaseGridStyleDirective } from "../base/base-grid-style.directive";

/**
 * Height style fix for ag-grid wrapper with action bar at the bottom.
 */
@Directive({
	selector: "[gridWithActionBarHeightStyleFix]"
})
export class GridWithActionBarHeightStyleFixDirective extends BaseGridStyleDirective {
	public onGridReady(): void {
		this.setGridHeight();
	}

	@HostListener("window:resize", ["$event"])
	public onResize(): void {
		this.setGridHeight();
	}

	private setGridHeight(): void {
		const tableWrap = document.getElementById("agGridTable");
		if (tableWrap) {
			const top = tableWrap.getBoundingClientRect().top;
			const bottomElements = document.getElementsByClassName("actions");
			const bottom = (bottomElements[0] as HTMLElement).getBoundingClientRect().top;
			const borderIndent = 1;

			tableWrap.style.height = `${bottom - top - borderIndent}px`;
		}
	}
}
