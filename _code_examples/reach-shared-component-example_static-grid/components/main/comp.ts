import {
	Component, OnDestroy, ChangeDetectionStrategy, Input, HostListener, EventEmitter, Output, Injector
} from "@angular/core";
import {
	Module,
	GridApi,
	GridOptions,
	ColDef,
	ColumnApi,
	CsvExportParams,
	ColumnEvent,
	RowDragEvent,
	Column,
	ProcessCellForExportParams
} from "@ag-grid-community/core";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import {
	getMainDef, frameworkComponents,
	getEditDef, getServiceDef, getSelectionDef,
	getValueByType, isRowSelectable, getDataKey, getDragDef
} from "./config/main";
import {
	IColumnMetaSG,
	IOptionsSG,
	IInternalStateSG,
	IDataRowSG,
	defaultDataKeySG,
	IDragAndDropModel,
	GridMode,
	IOptionsDynamicSG
} from "./entity";
import { merge, intersection } from "lodash";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { ISelectAllMethods } from "../columns";
import { ColumnControllerSGDirective } from "./directives/column.directive";
import { FilterControllerSGDirective } from "./directives/filter.directive";
import { SortControllerSGDirective } from "./directives/sort.directive";
import { SelectControllerSGDirective } from "./directives/select.directive";
import * as moment from "moment";
import { checkClass } from "../../../../../util/common/element";
import { aggridMenuFix } from "../../../../../util/common/aggridMenuFix";
import { StaticGridApiService } from "./services/static-grid-api.service";
import { getGridSortModel } from "../../../util/fn";
import { tableModalWindowFix } from "../../../../../util/common/style";

@Component({
	selector: "static-grid",
	templateUrl: "./tpl.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [StaticGridApiService]
})
export class StaticGridComponent implements OnDestroy {

	// Options
	@Input() public set options(value: IOptionsSG) {
		this._options = value;
		this.setupGrid();
	}
	public get options() {
		return this._options;
	}
	private _options: IOptionsSG;

	@Input() public set dynamicModeOptions(value: IOptionsDynamicSG) {
		this._dynamicModeOptions = value;
		this.setupGrid();
	}
	public get dynamicModeOptions() {
		return this._dynamicModeOptions;
	}
	private _dynamicModeOptions: IOptionsDynamicSG;

	@Input() public set defaultConfig(val: GridOptions) {
		this._defaultConfig = val;
		this.setupGrid();
	}
	public get defaultConfig(): GridOptions {
		return this._defaultConfig;
	}
	private _defaultConfig: GridOptions;

	@Input() public gridMode: GridMode = GridMode.StaticMode;
	@Input() public rowData: IDataRowSG[];
	@Input() public hasData: boolean;
	@Input() public disabled = false;

	public columnController: ColumnControllerSGDirective;
	public filterController: FilterControllerSGDirective;
	public sortController: SortControllerSGDirective;
	public selectController: SelectControllerSGDirective;
	public readonly dateFormat = "ll";
	public readonly dateTimeFormat = "lll";
	public gridStyles: any = {};

	// MetaData
	@Input() public set columnMetaData(value: IColumnMetaSG[]) {
		this._columnMetaData = value;
		this.setupGrid();
	}
	public get columnMetaData() {
		return this._columnMetaData;
	}
	private _columnMetaData: IColumnMetaSG[] = [];


	@Output() visibleColumnsChange = new EventEmitter<ColDef[]>();
	@Output() gridReady = new EventEmitter<StaticGridComponent>();
	@Output() dragAndDropUpdate = new EventEmitter<IDragAndDropModel>();
	@Output() cellUpdate = this.staticGridApiService.cellUpdate;

	public destroy$ = new Subject();
	public columnDefs: ColDef[] = [];
	public gridOptions: GridOptions = {};
	public gridApi: GridApi;
	public gridColumnApi: ColumnApi;

	public agGridModules: Module[] = [
		ClipboardModule, ClientSideRowModelModule,
		CsvExportModule, MenuModule,
		RowGroupingModule, ColumnsToolPanelModule, ServerSideRowModelModule
	];

	public dataKey = defaultDataKeySG;

	// Temporary solution. Used to get data in a directive when referring to the component as a class.
	private readonly _firstDataRendered$: BehaviorSubject<boolean> = new BehaviorSubject(null);
	public firstDataRendered$: Observable<boolean> = this._firstDataRendered$.asObservable();

	constructor(private readonly injector: Injector,
		private readonly staticGridApiService: StaticGridApiService) {}

	private setupGrid() {
		if(!this.options || !this.columnMetaData) {
			return;
		}
		this.configureGridOptions();
		this.configureColDef();
	}

	private configureGridOptions(): void {
		this.gridOptions.frameworkComponents = frameworkComponents;
		if (this.options.enableRowDragAndDrop) {
			const dragDropUpdate = (event: RowDragEvent) => {
				const key = event.node.data[this.dataKey];
				const index = event.node.rowIndex + 1;
				this.dragAndDropUpdate.emit({key: key, index: index});
			};
			this.gridOptions.onRowDragEnd = dragDropUpdate;

			// enable managed drag
			this.gridOptions.rowDragManaged = true;
			this.gridOptions.animateRows = true;
		}
		merge(
			this.gridOptions,
			this.defaultConfig,
			this.options.agGridOptions as GridOptions,
			this.dynamicModeOptions?.agGridOptions as GridOptions
		);
	}

	private getRowCount(excludeDisabledRows = false) {
		if (this.rowData) {
			return (!excludeDisabledRows)
				? this.rowData.length
				: this.rowData.filter((row) =>
					isRowSelectable(row, this.columnMetaData)
				).length;
		} else {
			return 0;
		}
	}

	private getSelectedCount() {
		return this.gridApi ? this.gridApi.getSelectedNodes().length : 0;
	}

	private configureColDef() {
		if (this.columnMetaData && this.columnMetaData.length > 0) {
			this.columnDefs = this.columnMetaData.map(x =>
				merge(
					getMainDef(x, this, this.options.columnControllerOptions, this.injector),
					this.options.editorsByKey
						&& this.options.editorsByKey[x.columnName] ? getEditDef(x, this.options.editorsByKey[x.columnName]) : {}
				)
			);

			if (this.options.serviceColumns) {
				this.options.serviceColumns.forEach((x) => {
					const def = getServiceDef(x);
					const index = (x.index > this.columnDefs.length) ? 0 : x.index;
					this.columnDefs.splice(index, 0, def);
				});
			}

			if (this.options.enableCheckBox) {
				const selectMethods: ISelectAllMethods = {
					getRowsCount: (excludeDisabledRows) => this.getRowCount(excludeDisabledRows),
					getSelectedCount: () => this.getSelectedCount(),
					selectAll: () => this.selectController.selectAllRows(),
					deselectAll: () => this.selectController.deselectAllRows(),
					onSelectionChanged: this.selectController.selectedDataRowsChange
				};

				const showingSelectionOptions = {
					showCheckBoxes: this.selectController.showCheckboxes,
					suppressHeaderCheckBox: this.options.suppressHeaderCheckBox
				};

				this.columnDefs.splice(0, 0,
					getSelectionDef(showingSelectionOptions, selectMethods, this.columnMetaData)
				);
			}

			this.rowDragColDef();
		}
	}

	private rowDragColDef() {
		if (this.options.enableRowDragAndDrop) {
			this.columnDefs.splice(0, 0, getDragDef(this.columnMetaData));
		}
	}

	onColumnVisibilityChanged(event: ColumnEvent) {
		this.columnController.updateGroupColumns(this.gridColumnApi.getRowGroupColumns().map((x) => x.getColId()));
		this.columnController.updateColumnState(this.gridColumnApi.getColumnState());

		const visibleColumns = this.columnController.getVisibleColumns();
		this.visibleColumnsChange.emit(visibleColumns.map(x => x.getColDef()));
	}

	public onReady(params) {
		this.dataKey = getDataKey(this.options, this.columnMetaData);
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		this.columnController.init(this.gridOptions, this.gridApi, this.gridColumnApi, this.gridMode);
		this.filterController?.init(this.gridOptions, this.gridApi, this.gridColumnApi, this.gridMode);
		this.sortController?.init(this.gridOptions, this.gridApi, this.gridColumnApi, this.gridMode);
		this.selectController?.init(this.gridOptions, this.gridApi, this.gridColumnApi, this.gridMode);
		this.gridOptions.onColumnVisible = (event: ColumnEvent) => this.onColumnVisibilityChanged(event);
		this.restoreGridState({
			groupColumns: this.columnController.selectedGroupColumns,
			columns: this.columnController.columnState,
			filters: this.filterController?.selectedFilters,
			sortModel: this.sortController?.sortModel
		});
		this.updateColumnDefs();
		this.gridReady.next(this);

		tableModalWindowFix();
	}

	public onFirstDataRendered(params) {
		this._firstDataRendered$.next(true);
		setTimeout(() => {
			this.adjustGridSize();
		});
	}

	public adjustGridSize() {
		this.setColumnWidth();
	}

	public getGridState(): IInternalStateSG {
		return {
			groupColumns: this.gridColumnApi.getRowGroupColumns().map((x) => x.getColId()),
			columns: this.gridColumnApi.getColumnState(),
			filters: this.gridApi.getFilterModel(),
			sortModel: getGridSortModel(this.gridColumnApi)
		};
	}

	public restoreGridState(state: IInternalStateSG) {
		this.columnController.updateGroupColumns(state.groupColumns);
		this.columnController.updateColumnState(state.columns);
		this.filterController?.updateFilters(state.filters);
		this.sortController?.updateSortModel(state.sortModel);
	}

	public restoreDefaultColumnsVisibility(gridState: IInternalStateSG) {
		gridState.columns
			.filter(column => this.columnMetaData.some(colMeta => colMeta.columnName === column.colId && colMeta.visible))
			.forEach(column => column.hide = false);
	}

	public updateColumnDefs() {
		const state = this.getGridState();
		const hasVisibleColumns = !!this.columnController.getVisibleColumns().length;
		// if all columns were hidden by user - restore all column visibility on refresh
		if (state.columns && !hasVisibleColumns) {
			this.restoreDefaultColumnsVisibility(state);
		}
		this.restoreGridState(state);
	}

	public get emptyMessage(): string {
		return this.options && this.options.emptyMessage;
	}

	private isExcludeFromExport(colDef: ColDef): boolean {
		return !!(colDef.refData && colDef.refData.excludeFromExport);
	}

	public exportData(): void {
		if (!this.gridApi && !this.gridColumnApi) { return; }
		let fileName = "Dashworks export";
		if (!!this.options.exportFileName) {
			fileName = this.options.exportFileName.replace(/[^0-9a-z_ \-\(\)]/gi, "");
		}
		fileName += ` - ` + `${moment().format("YYYYMMDD")}`;

		let columnKeys = this.gridColumnApi.getAllColumns()
			.filter((column: Column) => column.isVisible() && !this.isExcludeFromExport(column.getColDef()))
			.map((column: Column) => column.getColId());

		columnKeys = intersection(columnKeys, this.columnMetaData.map((columnMeta: IColumnMetaSG) => columnMeta.columnName));
		const params: CsvExportParams = {
			allColumns: false,
			fileName,
			columnKeys,
			processCellCallback: (cellForExportParams: ProcessCellForExportParams): string => {
				return getValueByType(cellForExportParams.column.getColDef(), cellForExportParams.value);
			}
		};
		this.gridApi.exportDataAsCsv(params);
	}

	private setColumnWidth() {
		if (this.gridColumnApi) {
			this.gridColumnApi.autoSizeAllColumns();
		}
	}

	@HostListener("window:resize", ["$event"])
	public onResize() {
		this.adjustGridSize();
	}

	@HostListener("document:click", ["$event"])
	onClick(event) {
		if (checkClass(event.target, "ag-header-cell-menu-button") || checkClass(event.target, "mat-option")) {
			aggridMenuFix();
		}
		if (checkClass(event.target, "mat-checkbox") || checkClass(event.target, "ag-menu-option")) {
			aggridMenuFix();
		}
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		if (document.getElementById("content")) {
			document.getElementById("content").style.overflow = "auto";
		}
	}
}
