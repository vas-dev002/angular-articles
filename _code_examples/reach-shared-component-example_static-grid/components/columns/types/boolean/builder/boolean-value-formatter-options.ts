import { TranslateService } from "@ngx-translate/core";
import { ValueFormatterParams } from "@ag-grid-community/core";
import { IValueFormatterOptions } from "../../base/base-abstract-factory/builder-models";
import { BooleanDasType } from "../../../../../../cellRenderer/booleanImage/boolean-type.util";

export class BooleanValueFormatterOptions implements IValueFormatterOptions {

	readonly formatterFunction = (params: ValueFormatterParams) => this.translateBoolean(params.value);

	constructor(private readonly langService: TranslateService) { }

	private translateBoolean(value: string): string {
		return (value) ? this.langService.instant(BooleanDasType.getValue(value)) : value;
	}
}
