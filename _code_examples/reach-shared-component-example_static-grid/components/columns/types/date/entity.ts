import { ValueFormatterParams } from "@ag-grid-community/core";

export interface IDateValue {
	date: string;
}

export interface IDateGroupKeyParams {
	value: string;
	date: string;
}

export interface IDateValueFormatterParams extends ValueFormatterParams {
	value: string | IDateValue;
}
