import {
	IColumnMetaSG,
	IOptionsSG,
	IDataRowSG,
	ISelectedFilters,
	ISortModel,
	IDragAndDropModel,
	CellToUpdate,
	GridMode,
	IOptionsDynamicSG
} from "../components/main/entity";
import { DEFAULT_TOPBAR_CONFIG, IGroupByColumn, ITopbarConfig } from "../components/topbar/entity";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
export interface IStaticGridState {
	mode: GridMode;
	isLoading: boolean;
	data: IDataRowSG[];
	meta: IColumnMetaSG[];
	options: IOptionsSG;
	dynamicOptions: IOptionsDynamicSG;
	topbar: ITopBarStateSG;
	showCheckboxes: boolean;
	showOnlySelectedRows: boolean;
	selectedDataRows: IDataRowSG[];
	deselectAllAction: string;
	selectAllAction: string;
	ready: boolean;
	exportFileAction: string;
	dragAndDrop: IDragAndDropModel;
	disabled: boolean;
	cellToUpdate: CellToUpdate;
	dynamicTotalRowCount: number;
}
export interface ITopBarStateSG {
	groupColumns: IGroupByColumn[];
	selectedGroups: string[];
	selectedFilters: ISelectedFilters;
	filteredRowsCount: number;
	refreshDataAction: string;
	columnState: ColumnState[];
	sortModel: ISortModel[];
	config: ITopbarConfig;
}

export const DEFAULT_TOPBAR_STATE_SG: ITopBarStateSG = {
	groupColumns: [],
	selectedGroups: [],
	selectedFilters: {},
	filteredRowsCount: null,
	refreshDataAction: null,
	columnState: [],
	sortModel: [],
	config: DEFAULT_TOPBAR_CONFIG
};

export const DEFAULT_STATIC_GRID_STATE: IStaticGridState = {
	mode: GridMode.StaticMode,
	isLoading: false,
	data: [],
	meta: [],
	options: {},
	dynamicOptions: { dataUrl: "" },
	topbar: DEFAULT_TOPBAR_STATE_SG,
	showCheckboxes: true,
	showOnlySelectedRows: false,
	selectedDataRows: [],
	selectAllAction: null,
	deselectAllAction: null,
	ready: false,
	exportFileAction: null,
	dragAndDrop: null,
	disabled: null,
	cellToUpdate: null,
	dynamicTotalRowCount: null
};
