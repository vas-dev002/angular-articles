import { ColDef } from "@ag-grid-community/core";
import { ITypeControllerParams } from "../../../../../../../../../../components/shared/aggrid/static-grid";

export interface IColDefAbstractFactory {
	createColDef: (controllerParams: ITypeControllerParams) => ColDef;
}
