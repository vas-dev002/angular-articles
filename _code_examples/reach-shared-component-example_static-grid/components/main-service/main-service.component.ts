import { Component, OnDestroy, Input, OnInit, Host, } from "@angular/core";
import { Subject, Observable, BehaviorSubject, combineLatest } from "rxjs";
import {
	IColumnMetaSG,
	IOptionsSG,
	ISelectedFilters,
	ISortModel,
	DataIdTypeSG,
	IDataRowSG,
	GridMode
} from "../main/entity";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { ColDef, GridOptions, RowNode } from "@ag-grid-community/core";
import { StaticGridComponent } from "../main/comp";
import { StaticGridService } from "./static-grid.service";
import { ServiceSGDictionary } from "./entity";
import { IStaticGridWrapper } from "../entity";
import { defaultStaticConfig } from "../main/config/main";
import { first, map } from "rxjs/operators";

/**
 * @deprecated. Use StaticGridStateComponent or DynamicGridStateComponent with Multiple Store.
 */
@Component({
	selector: "static-grid-service",
	templateUrl: "./tpl.html"
})
export class StaticGridServiceComponent implements IStaticGridWrapper, OnDestroy, OnInit {

	public options$ = new  BehaviorSubject<IOptionsSG>(null);
	public columnMetaData$ = new  BehaviorSubject<IColumnMetaSG[]>(null);
	@Input() public gridKey = "static-grid-key";
	public defaultConfig$: Observable<GridOptions> = combineLatest([
		this.columnMetaData$,
		this.options$
	])
	.pipe(
		first(),
		map(([meta, options]) => defaultStaticConfig(options, meta))
	);
	@Input() public set options(val: IOptionsSG) {
		this.options$.next(val);
		this._options = val;
	}
	public get options(): IOptionsSG {
		return this._options;
	}
	private _options: IOptionsSG;
	@Input() public rowData: IDataRowSG[];
	@Input() public set columnMetaData(val: IColumnMetaSG[]) {
		this.columnMetaData$.next(val);
		this._columnMetaData = val;
	}
	public get columnMetaData(): IColumnMetaSG[] {
		return this._columnMetaData;
	}
	private _columnMetaData: IColumnMetaSG[];

	public gridMode: GridMode = GridMode.StaticMode;
	public columnState$: Observable<ColumnState[]>;
	public selectedGroupColumns$: Observable<string[]>;
	public selectedFilters$: Observable<ISelectedFilters>;
	public sortModel$: Observable<ISortModel[]>;
	public showCheckboxes$: Observable<boolean>;
	public selectedDataIds$: Observable<DataIdTypeSG[]>;
	public customFilterRules$: Observable<(node: RowNode) => boolean>;
	public destroy$ = new Subject();

	private service: StaticGridService;

	// IStaticGridWrapper
	private readonly _gridReady$: BehaviorSubject<StaticGridComponent> = new BehaviorSubject(null);
	public gridReady$: Observable<StaticGridComponent> = this._gridReady$.asObservable();

	constructor(
		@Host() private readonly srvDictionary: ServiceSGDictionary) { }

	public ngOnInit() {
		this.service = this.srvDictionary.get(this.gridKey);
		this.init();
	}

	public init() {
		this.columnState$ = this.service.columnState$;
		this.selectedGroupColumns$ = this.service.selectedGroupColumns$;
		this.selectedFilters$ = this.service.selectedFilters$;
		this.sortModel$ = this.service.sortModel$;
		this.showCheckboxes$ = this.service.showCheckboxes$;
		this.selectedDataIds$ = this.service.selectedDataIds$;
		this.customFilterRules$ = this.service.customFilterRules$;
	}

	public onReady(grid: StaticGridComponent) {
		this.service.setGrid(grid);
		this._gridReady$.next(grid);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this.service.ngOnDestroy();
	}

	public setGroupColumns(selected: string[]) {
		this.service.setSelectedGroupColumns(selected);
	}

	public setFilters(selected: ISelectedFilters) {
		this.service.setFilters(selected);
	}

	public displayedRowsCountChange(rowsCount: number) {
		this.service.setDisplayedRowsCount(rowsCount);
	}

	public visibleColumnsChange(col: ColDef[]) {
		this.service.setVisibleColumns(col);
	}

	public columnStateChange(columns: ColumnState[]) {
		this.service.setColumnState(columns);
	}

	public sortModelChange(sort: ISortModel[]) {
		this.service.setSortModel(sort);
	}

	public selectedDataRowsChange(rows: IDataRowSG[]) {
		this.service.setSelectedDataRows(rows);
	}

	public hasData(): boolean {
		return !!this.rowData && this.rowData.length > 0;
	}
}
