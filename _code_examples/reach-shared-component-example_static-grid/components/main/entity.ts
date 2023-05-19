import { Type } from "@angular/core";
import {
	GetContextMenuItems,
	GetMainMenuItems,
	GridApi,
	RowNode,
	CellValueChangedEvent,
	ICellEditorParams
} from "@ag-grid-community/core";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { ICellRendererAngularComp, ICellEditorAngularComp } from "@ag-grid-community/angular";
import { IEditorTextValidator } from "../columns/editors/textEditor/text-editor.entity";
import { IColDefAbstractFactory } from "../columns/types/base/base-abstract-factory/models";

export interface IColumnMetaSG {
	columnName: string;
	lockVisible: boolean;
	visible: boolean;
	cssClass: string;
	headerName: string;
	controller: Type<IColDefAbstractFactory>;
	filterType: FilterTypeSG;
	isObjectKey: boolean;
	/** The temporary field until static grid has a connection with old version*/
	metaFromApi?: Object;
	/** The column name from data with tooltip*/
	tooltipField?: string;
	/** The column name from data with status of availability*/
	disabledField?: string;
}

export enum FilterTypeSG {
	Multiselect = "Multiselect",
	Number = "Number",
	String = "String",
	Date = "Date",
	DateTime = "DateTime",
	None = "None"
}

export interface IServiceColumn {
	serviceComponent: Type<ICellRendererAngularComp>;
	serviceParams: Object;
	index: number;
}

/** Configuration of Static Grid*/
export interface IOptionsSG {
	/** The message will be shown if data is not provided*/
	emptyMessage?: string;
	disableGroupBy?: boolean;
	editorsByKey?: { [columnKey: string]: IEditorOptions<{}> };
	serviceColumns?: IServiceColumn[];
	enableCheckBox?: boolean;
	suppressHeaderCheckBox?: boolean;
	dataKey?: DataKeyTypeSG;
	/** The object will be provided as a part of params for each column controller*/
	columnControllerOptions?: Object;
	exportFileName?: string;
	/** The options will be copied into agGrid options (GridOptions type)*/
	agGridOptions?: IAgGridOptions;
	styles?: Object;
	enableRowDragAndDrop?: boolean;
	suppressFilter?: boolean;
	suppressSortable?: boolean;
	suppressFloatingFilter?: boolean;
}

export interface IOptionsDynamicSG {
	dataUrl: string;
	agGridOptions?: IDynamicAgGridOptions;
}

export interface IShowingSelectionOptions {
	showCheckBoxes?: boolean;
	suppressHeaderCheckBox?: boolean;
}

export interface IDynamicAgGridOptions {
	cacheBlockSize?: number;
	maxBlocksInCache?: number;
	blockLoadDebounceMillis?: number;
}

export interface IAgGridOptions {
	getContextMenuItems?: GetContextMenuItems;
	getMainMenuItems?: GetMainMenuItems;
	localeTextFunc?: (key: string, defaultValue: string) => string;
	/** Define conditions for styles. Do not forget about ViewEncapsulation in Angular Components*/
	getRowClass?: (params: IGetRowClassParams<any>) => (string | string[]);
}

export interface IGetRowClassParams<TDataRow> {
	api: GridApi;
	data: TDataRow;
	node: RowNode;
	rowIndex: number;
}

export interface IGetCellClassParams<TDataRow, TCellValue> {
	value: TCellValue;
	api: GridApi;
	data: TDataRow;
	node: RowNode;
	rowIndex: number;
}

export interface IEditorOptions<Tvalidator> {
	editor: Type<ICellEditorAngularComp>;
	onChanged: (params: CellValueChangedEvent) => void;
	validator?: Tvalidator;
}

export interface ICellEditorParamsSG<Tvalidator> extends ICellEditorParams {
	validator?: Tvalidator;
}

export interface IEditorParams {
	meta: IColumnMetaSG;
	validator?: IEditorTextValidator;
}

export interface IInternalStateSG {
	groupColumns: string[];
	columns: ColumnState[];
	filters: ISelectedFilters;
	sortModel: ISortModel[];
}
export const defaultDataKeySG = "objectKey";
export type DataKeyTypeSG = string;
export type DataIdTypeSG = string | number;
export interface IDataRowSG {
	[key: string]: any;
}

export interface IFilterModel {
	type: string;
	filter: string;
	filterType: string;
}

export interface ISelectedFilters {
	[key: string]: IFilterModel;
}
export interface ISortModel {
	colId: string;
	sort: string;
}

export interface IDragAndDropModel {
	key: string | number;
	index: number;
}

export interface CellToUpdate {
	type: Type<ICellRendererAngularComp>;
	value: any;
}

export enum GridMode {
	StaticMode,
	DynamicMode,
	KeyValueMode
}

export enum RowModelType {
	ClientSide = "clientSide",
	Infinite = "infinite",
	Viewport = "viewport",
	ServerSide = "serverSide"
}
