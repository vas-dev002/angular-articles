import { ValueGetterParams } from "@ag-grid-community/core";

import { IValueGetterByFunctionOptions } from "../../base/base-abstract-factory/builder-models";
import { BooleanDasType } from "../../../../../../cellRenderer/booleanImage/boolean-type.util";

export class BooleanValueGetterOptions implements IValueGetterByFunctionOptions {

	readonly getterFunction = (params: ValueGetterParams) => this.customValueGetter(params);

	constructor(private readonly columnName: string) { }

	private customValueGetter(params: ValueGetterParams): string {
		return BooleanDasType.getValueWithEmptyProcessing(params.data ? params.data[this.columnName]: null);
	}

}
