import { Component, OnDestroy, OnInit, Self } from "@angular/core";
import { Subject, Observable, combineLatest } from "rxjs";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { ColDef, GridOptions, RowNode } from "@ag-grid-community/core";

import {
	IColumnMetaSG,
	IOptionsSG,
	ISelectedFilters,
	ISortModel,
	DataIdTypeSG,
	IDataRowSG,
	IDragAndDropModel,
	CellToUpdate,
	GridMode
} from "../main/entity";
import { StaticGridComponent } from "../main/comp";
import { IStaticGridWrapper } from "../entity";
import { GridSelectors } from "../../state/selectors/selector";
import { TopBarSelectors } from "../../state/selectors/topbar";
import { StaticGridStateService } from "./static-state.service";
import { MainGridStateService } from "./main-state.service";
import { defaultStaticConfig } from "../main/config/main";
import { first, map } from "rxjs/operators";

@Component({
	selector: "static-grid-state",
	templateUrl: "static-state.component.html",
	styleUrls: ["static-state.component.scss"],
	providers: [
		GridSelectors,
		TopBarSelectors,
		StaticGridStateService,
		MainGridStateService
	]
})
export class StaticGridStateComponent implements IStaticGridWrapper, OnInit, OnDestroy {

	public destroy$ = new Subject();

	public gridMode$: Observable<GridMode> = this.mainGridStateService.gridMode$;
	public hasData$: Observable<boolean> = this.staticGridStateService.hasData();
	public data$: Observable<Object[]> = this.staticGridStateService.data$;
	public meta$: Observable<IColumnMetaSG[]> = this.mainGridStateService.meta$;
	public defaultConfig$: Observable<GridOptions> = combineLatest([
		this.mainGridStateService.meta$,
		this.mainGridStateService.options$
	])
	.pipe(
		first(),
		map(([meta, options]) => defaultStaticConfig(options, meta))
	);
	public options$: Observable<IOptionsSG> = this.mainGridStateService.options$;
	public columnState$: Observable<ColumnState[]> = this.mainGridStateService.columnState$;
	public selectedGroupColumns$: Observable<string[]> = this.mainGridStateService.selectedGroupColumns$;
	public selectedFilters$: Observable<ISelectedFilters> =  this.mainGridStateService.selectedFilters$;
	public sortModel$: Observable<ISortModel[]> = this.mainGridStateService.sortModel$;
	public disabled$: Observable<boolean> = this.mainGridStateService.disabled$;
	public selectedDataIds$: Observable<DataIdTypeSG[]> = this.mainGridStateService.selectedDataIds$;
	public showCheckboxes$: Observable<boolean> = this.mainGridStateService.showCheckboxes$.asObservable();

	public customFilterRules$: Observable<(node: RowNode) => boolean> =
		this.mainGridStateService.customFilterRulesChanges$.asObservable();

	// IStaticGridWrapper
	public gridReady$: Observable<StaticGridComponent> = this.mainGridStateService.gridReady$.asObservable();

	constructor(
		@Self() readonly staticGridStateService: StaticGridStateService,
		@Self() readonly mainGridStateService: MainGridStateService
	) {}

	public ngOnInit(): void {
		this.mainGridStateService.setGridMode(GridMode.StaticMode);
	}

	public onReady(grid: StaticGridComponent): void {
		this.mainGridStateService.grid = grid;
		this.mainGridStateService.gridReady$.next(grid);
		this.mainGridStateService.initActions();
		this.mainGridStateService.setStaticGridReadyStatus(true);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this.staticGridStateService.dragAndDropUpdate(null);
		this.mainGridStateService.setStaticGridReadyStatus(false);
	}

	public setGroupColumns = (selected: string[]) => this.mainGridStateService.setGroupColumns(selected);

	public setFilters = (selected: ISelectedFilters) => this.mainGridStateService.setFilters(selected);

	public displayedRowsCountChange = (filteredRowsCount: number) =>
		this.staticGridStateService.displayedRowsCountChange(filteredRowsCount)

	public visibleColumnsChange = (col: ColDef[]) => this.mainGridStateService.visibleColumnsChange(col);

	public columnStateChange = (columns: ColumnState[]) => this.mainGridStateService.columnStateChange(columns);

	public sortModelChange = (sort: ISortModel[]) => this.mainGridStateService.sortModelChange(sort);

	public selectedDataRowsChange = (rows: IDataRowSG[]) => this.mainGridStateService.selectedDataRowsChange(rows);

	public dragAndDropUpdate = (dragAndDrop: IDragAndDropModel) =>
		this.staticGridStateService.dragAndDropUpdate(dragAndDrop)

	public onCellUpdate = (cellToUpdate: CellToUpdate) => this.staticGridStateService.onCellUpdate(cellToUpdate);
}
