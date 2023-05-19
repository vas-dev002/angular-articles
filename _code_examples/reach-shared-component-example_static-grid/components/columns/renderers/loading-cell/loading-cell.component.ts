import { Component } from "@angular/core";
import { ILoadingCellRendererAngularComp } from "@ag-grid-community/angular";
import { ILoadingCellRendererParams } from "@ag-grid-community/core";

@Component({
	selector: "loading-cell-sg-renderer",
	templateUrl: "loading-cell.component.html",
	styleUrls: [ "loading-cell.component.scss" ]
})
export class LoadingCellSGComponent implements ILoadingCellRendererAngularComp {
	params: any;

	agInit(params: ILoadingCellRendererParams): void {
		this.params = params;
	}
}
