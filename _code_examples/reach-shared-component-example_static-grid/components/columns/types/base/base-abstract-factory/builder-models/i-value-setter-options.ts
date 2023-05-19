import { ValueSetterParams } from "@ag-grid-community/core";

export interface IValueSetterOptions {
	setterFunction: (params: ValueSetterParams) => boolean;
}
