import { Component } from "@angular/core";
import { ILoadingOverlayParams } from "@ag-grid-community/core";
import { ILoadingOverlayAngularComp } from "@ag-grid-community/angular";

@Component({
	selector: "loading-overlay-sg",
	templateUrl: "loading-overlay.component.html"
})
export class LoadingOverlaySGComponent implements ILoadingOverlayAngularComp {
	params: ILoadingOverlayParams;

	agInit(params: ILoadingOverlayParams): void {
		this.params = params;
	}
}
