import { IGroupingOptions } from "../../base/base-abstract-factory/builder-models";
import { BooleanGroupParams } from "../entity";

export class BooleanGroupingOptions implements IGroupingOptions {
	readonly getGroupKey = (params: BooleanGroupParams) => JSON.stringify(params.value);
}
