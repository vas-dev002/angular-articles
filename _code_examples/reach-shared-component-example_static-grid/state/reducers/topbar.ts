import * as ent from "../entity";
import * as act from "../actions/topbar";
import * as moment from "moment";
import { createReducer, on, Action } from "@ngrx/store";

const topBarFeatureReducer = createReducer(
	ent.DEFAULT_TOPBAR_STATE_SG,
	on(act.TopBarSetSelectedGroups, (state, { selected }) => ({
		...state,
		selectedGroups: selected
	})),
	on(act.TopBarSetSelectedFilters, (state, { selected }) => ({
		...state,
		selectedFilters: selected
	})),
	on(act.TopBarSetRowsCount, (state, { filteredRowsCount }) => ({
		...state,
		filteredRowsCount: filteredRowsCount
	})),
	on(act.TopBarSetGroupColumns, (state, { GroupColumns }) => ({
		...state,
		groupColumns: GroupColumns
	})),
	on(act.TopBarRefreshData, state => ({
		...state,
		refreshDataAction: moment().format("HH:mm:ss:SSS")
	})),
	on(act.TopBarSetColumnState, (state, { columns }) => ({
		...state,
		columnState: columns
	})),
	on(act.TopBarSetSortModel, (state, { sort }) => ({
		...state,
		sortModel: sort
	})),
	on(act.TopBarSetConfig, (state, { config }) => ({
		...state,
		config
	}))
);

export function topBarSGReducer(state: ent.ITopBarStateSG | undefined, action: Action) {
	return topBarFeatureReducer(state, action);
}
