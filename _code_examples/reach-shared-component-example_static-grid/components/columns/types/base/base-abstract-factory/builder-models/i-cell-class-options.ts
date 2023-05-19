import { CellClassParams } from "@ag-grid-community/core";

export interface ICellClassOptions {
	cellClass: string | string[] | ((cellClassParams: CellClassParams) => string | string[]);
	cellClassRules: { [cssClassName: string]: (Function | string) };
}
