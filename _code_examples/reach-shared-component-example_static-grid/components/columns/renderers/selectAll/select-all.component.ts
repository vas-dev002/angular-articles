import { Component, OnDestroy } from "@angular/core";
import { IHeaderAngularComp } from "@ag-grid-community/angular";
import { ISelectAllMethods, ISelectAllParams } from "./entity";
import { Subject } from "rxjs";
import { takeUntil, startWith } from "rxjs/operators";
import { IHeaderParams } from "@ag-grid-community/core";

@Component({
	selector: "das-select-all",
	styleUrls: ["select-all.component.scss"],
	templateUrl: "select-all.component.html"
})

export class HeaderSelectAllSGComponent implements IHeaderAngularComp, OnDestroy {
	public selectState = false;
	public indeterminateState = false;
	public suppressHeaderCheckBox: boolean;

	private readonly destroy$ = new Subject();
	private selectMethods: ISelectAllMethods;
	private params: ISelectAllParams;

	public agInit(params: ISelectAllParams) {
		this.params = params;
		this.selectMethods = this.params.selectMethods;
		this.suppressHeaderCheckBox = this.params.suppressHeaderCheckBox;

		if (!this.suppressHeaderCheckBox) {
			this.selectMethods.onSelectionChanged.pipe(takeUntil(this.destroy$), startWith([])).subscribe(
				() => this.updateSelectStatus()
			);
		}
	}

	public selectionChange(event: Event): void {
		event.preventDefault();

		this.toggleSelection();
		this.updateSelectStatus();
	}

	public tooltipText(): string {
		return (this.selectState) ? "DeselectAll" : "SelectAll";
	}

	public updateSelectStatus(): void {
		const selectedRows = this.selectMethods.getSelectedCount();
		const availableRows = this.selectMethods.getRowsCount(true);

		this.indeterminateState = selectedRows > 0 && selectedRows !== availableRows;
		this.selectState = this.indeterminateState || (availableRows !== 0 && selectedRows === availableRows);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public refresh(params: IHeaderParams): boolean {
		return true;
	}

	private toggleSelection(): void {
		!this.selectState ? this.selectMethods.selectAll() : this.selectMethods.deselectAll();
	}
}
