import { createAction, props, Action } from "@ngrx/store";
import {
	IColumnMetaSG,
	IOptionsSG,
	IDataRowSG,
	IDragAndDropModel,
	CellToUpdate,
	GridMode,
	IOptionsDynamicSG
} from "../../components/main/entity";
import { IStaticGridGetDataParams, IStaticGridGetMetadataParams } from "../../../util/entity";
import { ITypedController } from "../../components/columns/entity";

export const StaticGridReset = createAction("Static.Grid.Reset");
export const CancelStaticGridDataRequest = createAction("Cancel.Static.Grid.Data.Request");
export const StaticGridDataRequest = createAction("Static.Grid.Data.Request",
	props<{
		url: string,
		requestTimeout?: number,
		params: string[],
		transformMeta: (response: Object) => IColumnMetaSG[],
		customMetaTypes?: ITypedController[],
		transformData: (response: Object) => IDataRowSG[],
		errorActions: (res) => Action[]
	}>()
);

export const StaticGridSeparatedDataRequest = createAction("Static.Grid.Separated.Data.Request",
	props<{ payload: IStaticGridGetDataParams }>()
);

export const StaticGridMetadataRequest = createAction("Static.Grid.Metadata.Request",
	props<{ payload: IStaticGridGetMetadataParams }>()
);

export const StaticGridDataLoaded = createAction("Static.Grid.Data.Loaded",
	props<{ data: IDataRowSG[] }>()
);
export const StaticGridLoadError = createAction("Static.Grid.Data.Error");
export const StaticGridSetMeta = createAction("Static.Grid.Set.Meta",
	props<{ meta: IColumnMetaSG[] }>()
);
export const StaticGridSetOptions = createAction("Static.Grid.Set.Options",
	props<{ options: IOptionsSG }>()
);
export const DynamicGridSetOptions = createAction("Dynamic.Grid.Set.Options",
	props<{ options: IOptionsDynamicSG }>()
);
export const StaticGridShowCheckboxes = createAction("Static.Grid.Show.Checkboxes",
	props<{ show: boolean }>()
);
export const StaticGridSelectRows = createAction("Static.Grid.Select.DataRows",
	props<{ rows: IDataRowSG[] }>()
);
export const StaticGridSelectAll = createAction("Static.Grid.Select.ALL");
export const StaticGridDeselectAll = createAction("Static.Grid.Deselect.ALL");
export const StaticGridSetReady = createAction("Static.Grid.Set.Ready",
	props<{ status: boolean }>()
);
export const StaticGridExportFile = createAction("Static.Grid.Export.File");
export const StaticGridShowOnlySelectedRows = createAction("Static.Grid.Show.Only.Selected.Rows",
	props<{ onlySelectedRows: boolean }>()
);
export const StaticGridDragAndDrop = createAction("Static.Grid.Drag.And.Drop",
	props<{ dragAndDrop: IDragAndDropModel }>()
);
export const StaticGridDisabled = createAction("Static.Grid.Disabled",
	props<{ status: boolean }>()
);
export const StaticGridCellToUpdate = createAction("Static.Grid.Cell.To.Update",
	props<{ cellToUpdate: CellToUpdate }>()
);
export const StaticGridMode = createAction("Static.Grid.Mode",
	props<{ mode: GridMode }>()
);
export const DynamicGridTotalRowCount = createAction("Dynamic.Grid.Total.Row.Count",
	props<{ totalRowCount: number }>()
);
