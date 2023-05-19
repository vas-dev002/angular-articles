import { ITooltipParams } from "@ag-grid-community/core";
import { TranslateService } from "@ngx-translate/core";

import { TooltipByFunctionOptions } from "../../base/base-abstract-factory/builder-options";
import { BooleanDasType } from "../../../../../../cellRenderer/booleanImage/boolean-type.util";

export class BooleanTooltipOptions extends TooltipByFunctionOptions {
	readonly tooltipValueGetter = (params: ITooltipParams) => this.translateBoolean(params.value);

	constructor(private readonly langService: TranslateService) {
		super();
	}

	private translateBoolean(value: string): string {
		return (value) ? this.langService.instant(BooleanDasType.getValue(value)) : value;
	}
}
