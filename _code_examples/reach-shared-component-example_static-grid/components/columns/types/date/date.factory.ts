import { ColDef } from "@ag-grid-community/core";
import { ITypeControllerParams } from "../../entity";

import { IColDefAbstractFactory } from "../base/base-abstract-factory/models";
import { DateControllerSG } from "./date.controller";

export class DateFactorySG implements IColDefAbstractFactory {

	createColDef(controllerParams: ITypeControllerParams): ColDef {
		const controller = new DateControllerSG(controllerParams);

		return controller.columnDefinition();
	}
}
