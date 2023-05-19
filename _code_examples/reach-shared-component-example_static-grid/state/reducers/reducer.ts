import * as ent from "../entity";
import * as act from "../actions/action";
import { STATIC_GRID_TOPBAR } from "../actions/topbar";
import { topBarSGReducer } from "./topbar";
import { createReducer, on, Action } from "@ngrx/store";
import * as moment from "moment";

const actionTemplate = "HH:mm:ss:SSS";
export function staticGridReducer(
	state: ent.IStaticGridState = ent.DEFAULT_STATIC_GRID_STATE,
	action: Action
): ent.IStaticGridState {
	if (action.type.startsWith(STATIC_GRID_TOPBAR.type)) {
		return {
			...state,
			topbar: topBarSGReducer(state.topbar, action)
		};
	} else {
		return staticGridFeatureReducer(state, action);
	}
}

const staticGridFeatureReducer = createReducer(
	ent.DEFAULT_STATIC_GRID_STATE,
	on(act.StaticGridReset, state => ({ ...ent.DEFAULT_STATIC_GRID_STATE })),
	on(act.StaticGridDataRequest, state => ({ ...state, isLoading: true })),
	on(act.StaticGridSeparatedDataRequest, state => ({ ...state, isLoading: true })),
	on(act.StaticGridDataLoaded, (state, { data }) => ({
		...state,
		isLoading: false,
		data: data
	})),
	on(act.StaticGridLoadError, state => ({ ...state, isLoading: false })),
	on(act.StaticGridSetMeta, (state, { meta }) => ({ ...state, meta: meta })),
	on(act.StaticGridSetOptions, (state, { options }) => ({
		...state,
		options: options
	})),
	on(act.DynamicGridSetOptions, (state, { options }) => ({
		...state,
		dynamicOptions: options
	})),
	on(act.StaticGridShowCheckboxes, (state, { show }) => ({
		...state, showCheckboxes: show
	})),
	on(act.StaticGridSelectRows, (state, { rows }) => ({
		...state,
		selectedDataRows: rows
	})),
	on(act.StaticGridSelectAll, state => ({
		...state,
		selectAllAction: moment().format(actionTemplate)
	})),
	on(act.StaticGridDeselectAll, state => ({
		...state,
		deselectAllAction: moment().format(actionTemplate)
	})),
	on(act.StaticGridSetReady, (state, { status }) => ({
		...state,
		ready: status
	})),
	on(act.StaticGridExportFile, state => ({
		...state,
		exportFileAction: moment().format(actionTemplate)
	})),
	on(act.StaticGridShowOnlySelectedRows, (state, { onlySelectedRows }) => ({
		...state, showOnlySelectedRows: onlySelectedRows
	})),
	on(act.StaticGridDragAndDrop, (state, { dragAndDrop }) => ({
		...state, dragAndDrop: dragAndDrop
	})),
	on(act.StaticGridDisabled, (state, { status }) => ({
		...state, disabled: status
	})),
	on(act.StaticGridCellToUpdate, (state, { cellToUpdate }) => ({
		...state, cellToUpdate
	})),
	on(act.StaticGridMode, (state, { mode }) => ({
		...state, mode
	})),
	on(act.DynamicGridTotalRowCount, (state, { totalRowCount }) => ({
		...state, dynamicTotalRowCount: totalRowCount
	}))
);

export function defaultReducer(
	state: ent.IStaticGridState | undefined,
	action: Action
) {
	return staticGridFeatureReducer(state, action);
}
