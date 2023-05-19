import { ValueGetterParams } from "@ag-grid-community/core";

export interface IValueGetterByFunctionOptions {
	getterFunction: (params: ValueGetterParams) => unknown;
}
