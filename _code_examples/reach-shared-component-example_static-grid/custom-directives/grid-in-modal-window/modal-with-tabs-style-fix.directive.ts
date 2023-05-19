import { Directive, HostListener } from "@angular/core";
import { BaseGridStyleDirective } from "../base/base-grid-style.directive";
import { CommonModalGridStyleFix } from "./utils/common-modal-grid-style-fix";

/**
 * Height style fix for tabs with ag-grid wrappers in modal window.
 */
@Directive({
	selector: "[modalWithTabsStyleFix]"
})
export class ModalWithTabsStyleFixDirective extends BaseGridStyleDirective {
	public onGridReady() {
		this.changeEnvironment();
	}

	@HostListener("window:resize", ["$event"])
	public onResize() {
		this.changeEnvironment();
	}

	private changeEnvironment() {
		const tabsSmallContainers = document.getElementsByClassName("tabs-small-container") as HTMLCollectionOf<HTMLElement>;
		const gridWrapper = tabsSmallContainers[0];
		const maxTableHeight = window.innerHeight * 0.9 - 300;

		if (gridWrapper.clientHeight > maxTableHeight) {
			gridWrapper.style.height = `${maxTableHeight}px`;
		}
	}
}
