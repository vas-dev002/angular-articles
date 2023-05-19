import { Type } from "@angular/core";

import { cloneDeep } from "lodash";

import { ITypedController } from "../entity";
import { TextFactorySG } from "./text/text.factory";
import { ColumnDisplayType } from "./base-api-types";
import { IReadinessObject } from "../../../../util/entity";
import { IGroupKeyReadinessOptions } from "./readiness-edit/entity";
import { IColDefAbstractFactory } from "./base/base-abstract-factory/models";

export function mergeTypedControllersArrays(
	typedControllers1: ITypedController[],
	typedControllers2: ITypedController[]): ITypedController[] {

	const result = cloneDeep(typedControllers1);

	typedControllers2.forEach(cType => {
		const existedDef = result.find(column => column.key === cType.key);
		if (!existedDef) {
			result.push(cType);
		} else {
			existedDef.factory = cType.factory;
		}
	});

	return result;
}

export function getControllerByApiType(
	factory: ColumnDisplayType,
	typedControllers: ITypedController[]): Type<IColDefAbstractFactory> {

	const controller = typedControllers.find(column => column.key === factory);
	return (controller) ? controller.factory : TextFactorySG;
}

export function getObjGroup(readinessOptions: IReadinessObject, isMultiType: boolean): IGroupKeyReadinessOptions {
	const result: IGroupKeyReadinessOptions = {
		backColorHtml: readinessOptions.backColorHtml,
		ragStatus: getRagStatus(readinessOptions),
		isSentenceCase: readinessOptions.isSentenceCase
	};
	if (isMultiType) {
		result.stringValueMode = isMultiType,
		result.value = getRagStatus(readinessOptions);
	}
	return result;
}

export function getRagStatus(readinessOptions: IReadinessObject): string {
	let ragStatus = "";

	if (readinessOptions && readinessOptions.ragStatus) {
		ragStatus = (readinessOptions.isSentenceCase)
			? readinessOptions.ragStatus.toString()
			: readinessOptions.ragStatus.toString().toUpperCase();
	}

	return ragStatus;
}
