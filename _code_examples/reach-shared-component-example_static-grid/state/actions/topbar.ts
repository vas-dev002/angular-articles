import { createAction, props } from "@ngrx/store";
import { IGroupByColumn, ITopbarConfig } from "../../components/topbar/entity";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { ISelectedFilters, ISortModel } from "../../components/main/entity";

export const STATIC_GRID_TOPBAR = createAction("Static.Grid.TopBar");
export const TopBarSetSelectedGroups = createAction(
	"Static.Grid.TopBar.Set.Selected.Groups",
	props<{ selected: string[] }>()
);
export const TopBarSetSelectedFilters = createAction(
	"Static.Grid.TopBar.Set.Selected.Filters",
	props<{ selected: ISelectedFilters }>()
);
export const TopBarSetRowsCount = createAction(
	"Static.Grid.TopBar.Set.RowsCount",
	props<{ filteredRowsCount: number }>()
);
export const TopBarSetGroupColumns = createAction(
	"Static.Grid.TopBar.Set.GroupColumns",
	props<{ GroupColumns: IGroupByColumn[] }>()
);
export const TopBarRefreshData = createAction(
	"Static.Grid.TopBar.Refresh.Data"
);
export const TopBarSetColumnState = createAction(
	"Static.Grid.TopBar.Set.ColumnState",
	props<{ columns: ColumnState[] }>()
);
export const TopBarSetSortModel = createAction(
	"Static.Grid.TopBar.Set.SortModel",
	props<{ sort: ISortModel[] }>()
);
export const TopBarSetConfig = createAction(
	"Static.Grid.TopBar.Set.Config",
	props<{ config: ITopbarConfig }>()
);
