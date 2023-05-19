import { ColDef, ColumnState, RowNode } from "@ag-grid-community/core";
import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, pipe, Subject } from "rxjs";
import { filter, skip, takeUntil } from "rxjs/operators";

import { AppState } from "../../../../../../state";
import { MULTIPLE_STORE_SLICE_NAME } from "../../state/multiple-store/config";
import { createLocalAction } from "../../state/multiple-store/utils";
import { GridSelectors } from "../../state/selectors/selector";
import { TopBarSelectors } from "../../state/selectors/topbar";
import { StaticGridComponent } from "../main/comp";
import { filterSelectedRows } from "../main/config/custom-filters.utils";
import {
	DataIdTypeSG,
	GridMode,
	IColumnMetaSG,
	IDataRowSG,
	IOptionsSG,
	ISelectedFilters,
	ISortModel
} from "../main/entity";
import * as act from "../../state/actions/action";
import * as actTopbar from "../../state/actions/topbar";
import { IGroupByColumn } from "../topbar/entity";

@Injectable()
export class MainGridStateService implements OnDestroy  {
	public gridMode$: Observable<GridMode> = this.store.select(this.gridSelectors.selectGridMode);
	public meta$: Observable<IColumnMetaSG[]> = this.store.select(this.gridSelectors.selectMeta);
	public options$: Observable<IOptionsSG> = this.store.select(this.gridSelectors.selectOptions);
	public columnState$: Observable<ColumnState[]> = this.store.select(this.topBarSelectors.selectColumnState);
	public selectedGroupColumns$: Observable<string[]> =
		this.store.select(this.topBarSelectors.selectSelectedGroupColumns);
	public selectedFilters$: Observable<ISelectedFilters> =
		this.store.select(this.topBarSelectors.selectSelectedFilters);
	public sortModel$: Observable<ISortModel[]> = this.store.select(this.topBarSelectors.selectSortModel);
	public disabled$: Observable<boolean> = this.store.select(this.gridSelectors.selectDisabled);
	public selectedDataIds$: Observable<DataIdTypeSG[]> = this.store.select(this.gridSelectors.selectSelectedDataIds);

	public showCheckboxes$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public grid: StaticGridComponent;
	public customFilterRules: (node: RowNode) => boolean;

	protected readonly destroy$ = new Subject();

	public readonly customFilterRulesChanges$: BehaviorSubject<(node: RowNode) => boolean> = new BehaviorSubject(null);
	public readonly gridReady$: BehaviorSubject<StaticGridComponent> = new BehaviorSubject(null);

	private readonly actionPipe = pipe(skip(1), filter((x) => !!x), takeUntil(this.destroy$));
	private selectedGroupColumns: string[] = [];

	constructor(
		protected readonly store: Store<AppState>,
		protected readonly gridSelectors: GridSelectors,
		protected readonly topBarSelectors: TopBarSelectors,
		@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) protected readonly storeSliceName: string
	) {}

	public initActions(): void {
		this.store.select(this.gridSelectors.selectSelectAll).pipe(this.actionPipe)
			.subscribe(() => this.grid.selectController.selectAllRows());
		this.store.select(this.gridSelectors.selectDeselectAll).pipe(this.actionPipe)
			.subscribe(() => this.grid.selectController.deselectAllRows());
		this.store.select(this.gridSelectors.selectExportFile).pipe(this.actionPipe)
			.subscribe(() => this.grid.exportData());
		this.store.select(this.gridSelectors.selectShowCheckboxes).pipe(takeUntil(this.destroy$))
			.subscribe((showCheckboxes) => this.showCheckboxes$.next(showCheckboxes));
		this.store.select(this.gridSelectors.selectShowOnlySelectedRows).pipe(takeUntil(this.destroy$))
			.subscribe((showSelected) => {
				this.customFilterRules = (showSelected) ? filterSelectedRows : null;
				this.customFilterRulesChanges$.next(this.customFilterRules);
			});

		this.selectedGroupColumns$.pipe(takeUntil(this.destroy$)).subscribe(val => this.selectedGroupColumns = val || []);
	}

	public setGridMode(mode: GridMode): void {
		this.store.dispatch(createLocalAction(
			act.StaticGridMode({mode}),
			this.storeSliceName
		));
	}

	public setStaticGridReadyStatus(status: boolean): void {
		this.store.dispatch(createLocalAction(act.StaticGridSetReady({ status }), this.storeSliceName));
	}

	public setGroupColumns(selected: string[]) {
		this.store.dispatch(
			createLocalAction(actTopbar.TopBarSetSelectedGroups({ selected }), this.storeSliceName)
		);
	}

	public setFilters(selected: ISelectedFilters) {
		this.store.dispatch(
			createLocalAction(actTopbar.TopBarSetSelectedFilters({ selected }), this.storeSliceName)
		);
	}

	public visibleColumnsChange(col: ColDef[]): void {
		const groupColumns = col
			.filter((colDef: ColDef) => colDef.enableRowGroup)
			.map((colDef: ColDef) => {
				return { field: colDef.field, name: colDef.headerName } as IGroupByColumn;
		});
		this.store.dispatch(
			createLocalAction(actTopbar.TopBarSetGroupColumns({ GroupColumns: groupColumns }), this.storeSliceName)
		);

		const selectedGroupColumns = this.selectedGroupColumns
			.filter(group => col.some(column => column.field === group));

		this.setGroupColumns(selectedGroupColumns);
		this.grid.gridColumnApi.autoSizeAllColumns();
	}

	public columnStateChange(columns: ColumnState[]) {
		this.store.dispatch(createLocalAction(actTopbar.TopBarSetColumnState({ columns: columns }), this.storeSliceName));
	}

	public sortModelChange(sort: ISortModel[]) {
		this.store.dispatch(createLocalAction(actTopbar.TopBarSetSortModel({ sort: sort }), this.storeSliceName));
	}

	public selectedDataRowsChange(rows: IDataRowSG[]) {
		this.store.dispatch(createLocalAction(act.StaticGridSelectRows({ rows: rows }), this.storeSliceName));
		this.grid.filterController.reapplyFilters();
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
