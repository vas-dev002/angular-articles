import { ColumnState, GridOptions, RowNode } from "@ag-grid-community/core";
import { Component, OnDestroy, OnInit, Self } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { GridSelectors } from "../../state/selectors/selector";
import { TopBarSelectors } from "../../state/selectors/topbar";
import { IStaticGridWrapper } from "../entity";
import { StaticGridComponent } from "../main/comp";
import { defaultKeyValueConfig } from "../main/config/main";
import { CellToUpdate, GridMode, IColumnMetaSG, IOptionsSG } from "../main/entity";
import { MainGridStateService } from "../static-state/main-state.service";
import { KeyValueStateService } from "./key-value-state.service";

@Component({
	selector: "key-value-grid-state",
	templateUrl: "key-value-state.component.html",
	styleUrls: ["../static-state/static-state.component.scss", "./key-value-state.component.scss"],
	providers: [
		GridSelectors,
		TopBarSelectors,
		KeyValueStateService,
		MainGridStateService
	]
})
export class KeyValueStateComponent implements IStaticGridWrapper, OnInit, OnDestroy {
	public destroy$ = new Subject();

	public gridMode$: Observable<GridMode> = this.mainGridStateService.gridMode$;
	public hasData$: Observable<boolean> = this.keyValueStateService.hasData();
	public data$: Observable<Object[]> = this.keyValueStateService.data$;
	public meta$: Observable<IColumnMetaSG[]> = this.mainGridStateService.meta$;
	public defaultConfig$: Observable<GridOptions> = this.mainGridStateService.meta$
		.pipe(map(meta => defaultKeyValueConfig(meta)));
	public options$: Observable<IOptionsSG> = this.mainGridStateService.options$;
	public columnState$: Observable<ColumnState[]> = this.mainGridStateService.columnState$;
	public disabled$: Observable<boolean> = this.mainGridStateService.disabled$;

	public customFilterRules: (node: RowNode) => boolean;

	// IStaticGridWrapper
	public gridReady$: Observable<StaticGridComponent> = this.mainGridStateService.gridReady$.asObservable();

	constructor(
		@Self() readonly keyValueStateService: KeyValueStateService,
		@Self() readonly mainGridStateService: MainGridStateService
	) {}

	public ngOnInit(): void {
		this.mainGridStateService.setGridMode(GridMode.KeyValueMode);
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
		this.mainGridStateService.setStaticGridReadyStatus(false);
	}

	public columnStateChange = (columns: ColumnState[]) => this.mainGridStateService.columnStateChange(columns);

	public onCellUpdate = (cellToUpdate: CellToUpdate) => this.keyValueStateService.onCellUpdate(cellToUpdate);
}
