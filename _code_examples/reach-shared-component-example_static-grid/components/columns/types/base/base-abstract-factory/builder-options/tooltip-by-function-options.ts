import { ITooltipParams } from "@ag-grid-community/core";
import { MaterialTooltipComponent } from "../../../../../../../../material-tooltip/material-tooltip.component";
import { ITooltipByFunctionOptions } from "../builder-models";

export class TooltipByFunctionOptions implements ITooltipByFunctionOptions {
	readonly tooltipComponentFramework = MaterialTooltipComponent;
	readonly tooltipValueGetter = (params: ITooltipParams) => params.value;
}
