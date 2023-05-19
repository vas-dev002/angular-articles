import { IHeaderParams } from "@ag-grid-community/core";
import { EventEmitter } from "@angular/core";

export interface ISelectAllMethods {
	selectAll: () => void;
	deselectAll: () => void;
	getRowsCount: (excludeDisabledRows: boolean) => number;
	getSelectedCount: () => number;
	onSelectionChanged: EventEmitter<Object[]>;
}

export interface ISelectAllParams extends IHeaderParams {
	suppressHeaderCheckBox?: boolean;
	selectMethods: ISelectAllMethods;
}
