import { StaticGridEditors, StaticGridRenderers } from "./components";
import { HeaderSelectAllSGComponent } from "./components/columns/renderers/selectAll/select-all.component";
import { DynamicGridStateComponent } from "./components/dynamic-state/dynamic-state.component";
import { KeyValueStateComponent } from "./components/key-value-table-state/key-value-state.component";
import { StaticGridServiceComponent } from "./components/main-service/main-service.component";
import { StaticGridComponent } from "./components/main/comp";
import { ColumnControllerSGDirective } from "./components/main/directives/column.directive";
import { FilterControllerSGDirective } from "./components/main/directives/filter.directive";
import { SelectControllerSGDirective } from "./components/main/directives/select.directive";
import { SortControllerSGDirective } from "./components/main/directives/sort.directive";
import { StaticGridStateComponent } from "./components/static-state/static-state.component";
import { TopBarStateSGComponent } from "./components/topbar-state/comp";
import { TopBarSGComponent } from "./components/topbar/comp";
import { RowsCounterSGComponent } from "./components/topbar/rowsCounter/comp.tested";
import { GridHeightStyleFixDirective } from "./custom-directives/grid-common/grid-height-style-fix.directive";
import {
	ModalStyleFixPathTasksDirective,
	ModalWindowStyleFixDirective,
	ModalWithTabsStyleFixDirective
} from "./custom-directives/grid-in-modal-window";
import { GridWithActionBarHeightStyleFixDirective } from "./custom-directives/grid-with-actions-bar";

export * from "./components";

const StaticGridDirectives = [
	ColumnControllerSGDirective,
	FilterControllerSGDirective,
	SortControllerSGDirective,
	SelectControllerSGDirective,

	// Style fix directives:
	GridHeightStyleFixDirective,
	ModalStyleFixPathTasksDirective,
	ModalWindowStyleFixDirective,
	ModalWithTabsStyleFixDirective,
	GridWithActionBarHeightStyleFixDirective
];

export const StaticGridComponents = [
	...StaticGridEditors,
	...StaticGridRenderers,
	...StaticGridDirectives,
	StaticGridComponent,
	StaticGridStateComponent,
	DynamicGridStateComponent,
	KeyValueStateComponent,
	StaticGridServiceComponent,
	TopBarSGComponent,
	TopBarStateSGComponent,
	RowsCounterSGComponent,
	HeaderSelectAllSGComponent
];

export const StaticGridFactoryComponents = [
	...StaticGridEditors,
	...StaticGridRenderers,
	HeaderSelectAllSGComponent
];
