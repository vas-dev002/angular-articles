import { ColDefBuilderValidationItem } from "./col-def-builder-validation-item";

export class ColDefBuilderValidationState {
	colId = new ColDefBuilderValidationItem("Column id is not set", "Column id was already set");
	valueGetter = new ColDefBuilderValidationItem("Value getter is not set", "Value getter was already set");
	valueSetter = new ColDefBuilderValidationItem("Value setter is not set", "Value setter was already set");
	valueFormatter = new ColDefBuilderValidationItem("Value formatter is not set", "Value formatter was already set");
	sorting = new ColDefBuilderValidationItem("Sorting is not set", "Setter was already set");
	filtering = new ColDefBuilderValidationItem("Filtering is not set", "Filtering was already set");
	grouping = new ColDefBuilderValidationItem("Grouping is not set", "Grouping was already set");
	cellRendering = new ColDefBuilderValidationItem("Cell rendering component is not set", "Cell rendering component was already set");
	width = new ColDefBuilderValidationItem("Width is not set", "Width was already set");
	menuTabs = new ColDefBuilderValidationItem("Menu tabs are not set", "Menu tabs were already set");
	cellClass = new ColDefBuilderValidationItem("Cell class rules are not set", "Cell class rules were already set");
	headerName = new ColDefBuilderValidationItem("Header name is not set", "Header name was already set");
	visibility = new ColDefBuilderValidationItem("Visibility is not set", "Visibility was already set");
	tooltip = new ColDefBuilderValidationItem("Tooltip is not set", "Tooltip was already set");
}
