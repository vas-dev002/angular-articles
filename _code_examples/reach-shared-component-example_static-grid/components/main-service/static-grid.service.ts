import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, pipe, Observable, UnaryFunction } from "rxjs";
import { ISelectedFilters, ISortModel, DataIdTypeSG, IDataRowSG } from "../main/entity";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { ColDef, RowNode } from "@ag-grid-community/core";
import { skip, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { StaticGridComponent } from "../main/comp";
import { isEqual } from "lodash";
import { filterSelectedRows } from "../main/config/custom-filters.utils";

@Injectable()
export class StaticGridService implements OnDestroy {
	public readonly destroy$ = new Subject();
	private grid: StaticGridComponent;
	private readonly _gridReady$ = new BehaviorSubject<boolean>(false);
	public readonly gridReady$ = this._gridReady$.asObservable().pipe(this.getPipe());

	private readonly _columnState$ = new BehaviorSubject<ColumnState[]>([]);
	public readonly columnState$ = this._columnState$.asObservable().pipe(this.getPipe());
	private readonly _selectedGroupColumns$ = new BehaviorSubject<string[]>([]);
	// eslint-disable-next-line max-len
	public readonly selectedGroupColumns$ = this._selectedGroupColumns$.asObservable().pipe(this.getPipe());
	private readonly _selectedFilters$ = new BehaviorSubject<ISelectedFilters>({});
	public readonly selectedFilters$ = this._selectedFilters$.asObservable().pipe(this.getPipe());
	private readonly _sortModel$ = new BehaviorSubject<ISortModel[]>([]);
	public readonly sortModel$ = this._sortModel$.asObservable().pipe(this.getPipe());
	private readonly _showCheckboxes$ = new BehaviorSubject<boolean>(false);
	public readonly showCheckboxes$ = this._showCheckboxes$.asObservable().pipe(this.getPipe());
	private readonly _selectedDataIds$ = new BehaviorSubject<DataIdTypeSG[]>([]);
	public readonly selectedDataIds$ = this._selectedDataIds$.asObservable().pipe(this.getPipe());
	private readonly _selectedDataRows$ = new BehaviorSubject<IDataRowSG[]>([]);
	public readonly selectedDataRows$ = this._selectedDataRows$.asObservable().pipe(this.getPipe());
	private readonly _displayedRowsCount$ = new BehaviorSubject<number>(0);
	public readonly displayedRowsCount$ = this._displayedRowsCount$.asObservable().pipe(this.getPipe());
	private readonly _visibleColumns$ = new BehaviorSubject<ColDef[]>([]);
	public readonly visibleColumns$ = this._visibleColumns$.asObservable().pipe(this.getPipe());
	private readonly _customFilterRules$ = new BehaviorSubject<(node: RowNode) => boolean>(null);
	public readonly customFilterRules$ = this._customFilterRules$.asObservable().pipe(this.getPipe());

	public setColumnState = (columnState: ColumnState[]) => this._columnState$.next(columnState);
	// eslint-disable-next-line max-len
	public setSelectedGroupColumns = (selectedGroupColumns: string[]) => this._selectedGroupColumns$.next(selectedGroupColumns);
	public setFilters = (selectedFilters: ISelectedFilters) => this._selectedFilters$.next(selectedFilters);
	public setSortModel = (sortModel: ISortModel[]) => this._sortModel$.next(sortModel);
	public showCheckboxes = () => this._showCheckboxes$.next(true);
	public hideCheckboxes = () => this._showCheckboxes$.next(false);
	public setSelectedDataIds = (ids: DataIdTypeSG[]) => this._selectedDataIds$.next(ids);
	public setDisplayedRowsCount = (rowsCount: number) => this._displayedRowsCount$.next(rowsCount);
	public setVisibleColumns = (columns: ColDef[]) => this._visibleColumns$.next(columns);

	public showOnlySelectedRows(onlySelectedRows: boolean) {
		this._customFilterRules$.next(
			(onlySelectedRows) ? filterSelectedRows : null
		);
	}

	public setSelectedDataRows(dataRows: IDataRowSG[]) {
		this._selectedDataRows$.next(dataRows);
		this._selectedDataIds$.next(dataRows && dataRows.map(row =>
			row[this.grid.dataKey]
		));
		this.grid.filterController.reapplyFilters();
	}

	// Internal Grid Actions
	/** The method can be executed only after GridReady event*/
	public selectAllRows() {
		if (this.grid) {
			this.grid.selectController.selectAllRows();
		}
	}

	/** The method can be executed only after GridReady event*/
	public deselectAllRows() {
		if (this.grid) {
			this.grid.selectController.deselectAllRows();
		}
	}

	/** The method can be executed only after GridReady event*/
	public exportData() {
		if (this.grid) {
			this.grid.exportData();
		}
	}


	/** The method can be executed only after GridReady event*/
	public adjustGridSize() {
		if (this.grid) {
			this.grid.adjustGridSize();
		}
	}

	public setGrid(grid: StaticGridComponent) {
		this.grid = grid;
		this._gridReady$.next(true);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this._gridReady$.next(false);
	}

	private getPipe<T>(): UnaryFunction<Observable<T>, Observable<T>> {
		return pipe(
			skip(1),
			takeUntil(this.destroy$),
			distinctUntilChanged((x, y) => isEqual(x, y))
		);
	}
}

