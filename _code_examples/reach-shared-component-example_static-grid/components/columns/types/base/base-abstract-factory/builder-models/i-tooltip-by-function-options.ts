import { ITooltipParams } from "@ag-grid-community/core";
import { ITooltipOptions } from "./i-tooltip-options";

export interface ITooltipByFunctionOptions extends ITooltipOptions {
	tooltipValueGetter: (params: ITooltipParams) => string;
}
