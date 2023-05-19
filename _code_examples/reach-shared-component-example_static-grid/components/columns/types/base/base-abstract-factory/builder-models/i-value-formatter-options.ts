import { ValueFormatterParams } from "@ag-grid-community/core";

export interface IValueFormatterOptions {
	formatterFunction: (params: ValueFormatterParams) => string;
}
