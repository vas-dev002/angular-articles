import { ITypedController } from "../entity";
import { ColumnDisplayType } from "./base-api-types";
import { MultiTypeValueFactorySG } from "./multi-type-value/multi-type-value.factory";

export const complexApiTypes: ITypedController[] = [
	{ key: ColumnDisplayType.MultiTypeValue, factory: MultiTypeValueFactorySG }
];
