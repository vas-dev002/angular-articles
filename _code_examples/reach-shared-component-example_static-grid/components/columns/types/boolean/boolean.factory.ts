import { ColDef } from "@ag-grid-community/core";
import { TranslateService } from "@ngx-translate/core";

import { ITypeControllerParams } from "../../entity";
import { ColDefBuilder } from "../base/base-abstract-factory/builders/col-def-builder";
import { IColDefAbstractFactory } from "../base/base-abstract-factory/models";
import { MenuTab } from "../base/base-abstract-factory/builder-models";
import { BooleanImageRendererComponent } from "../../../../../cellRenderer/booleanImage/boolean-renderer.component";
import { CellClassOptions, VisibilityOptions, WidthOptions } from "../base/base-abstract-factory/builder-options";
import {
	BooleanFilteringOptions,
	BooleanGroupingOptions,
	BooleanSortingOptions,
	BooleanTooltipOptions,
	BooleanValueFormatterOptions,
	BooleanValueGetterOptions
} from "./builder";

export class BooleanFactorySG implements IColDefAbstractFactory {

	createColDef(controllerParams: ITypeControllerParams): ColDef {
		return new ColDefBuilder()
			.setColId(controllerParams.meta.columnName)
			.setWidth(new WidthOptions())
			.setTooltipOptionsByFunction(new BooleanTooltipOptions(controllerParams.injector.get(TranslateService)))
			.setMenuTabs([MenuTab.GeneralMenuTab, MenuTab.FilterMenuTab, MenuTab.ColumnsMenuTab])
			.setCellClass(new CellClassOptions(controllerParams.meta))
			.setHeaderName(controllerParams.meta.headerName)
			.setVisibility(new VisibilityOptions(controllerParams.meta))
			.setCellRenderer(BooleanImageRendererComponent)
			.setSorting(new BooleanSortingOptions(controllerParams.meta, controllerParams.grid))
			.setValueGetterByFunction(new BooleanValueGetterOptions(controllerParams.meta.columnName))
			.ignoreValueSetter()
			.setValueFormatter(new BooleanValueFormatterOptions(controllerParams.injector.get(TranslateService)))
			.setGrouping(new BooleanGroupingOptions())
			.setCustomFiltering(new BooleanFilteringOptions(controllerParams.meta, controllerParams.grid))
			.build();
	}
}
