import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef } from "@ag-grid-community/core";
import { Type } from "@angular/core";
import { IColDefBuilder } from "./i-col-def-builder";
import {
	ICellClassOptions,
	IDateTimeFilterOptions,
	IFilteringOptions,
	IGroupingOptions,
	ISortingOptions,
	ITextFilterOptions,
	ITooltipByFieldOptions,
	ITooltipByFunctionOptions,
	IValueFormatterOptions,
	IValueGetterByFunctionOptions,
	IValueGetterByPropertyOptions,
	IValueSetterOptions,
	IVisibilityOptions,
	IWidthOptions,
	MenuTab
} from "../builder-models";
import { ColDefBuilderValidationState } from "../builder-models/col-def-builder-validation-state";
import { ColDefBuilderValidationItem } from "../builder-models/col-def-builder-validation-item";
import { ColDefBuilderValidationError } from "../builder-models/col-def-builder-validation-error";

export class ColDefBuilder implements IColDefBuilder {
	private readonly colDef: ColDef = {};
	private readonly validationState = new ColDefBuilderValidationState();
	/**
	 * Function to return a unique column id on grid
	 *
	 * @param { string } colId - The unique column ID
	 * @return { ColDefBuilder } - Builder after 'colId' and 'field' properties were setted
	 * @example
	 *
	 * setColId(controllerParams.meta.columnName)
	 */
	setColId(colId: string): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.colId, () => {
			this.colDef.colId = colId;
			// NOTE: We have to set field property in order to make grouping work.
			// Field property is used as colId to find column definition
			this.colDef.field = colId;
		});
	}
	/**
	 * Function to ignore a unique column id setting
	 *
	 * @return { ColDefBuilder } - Builder after 'colId' and 'field' properties were setted
	 * @example
	 *
	 * ignoreColId()
	 */
	ignoreColId(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.colId);
	}
	/**
	 * Function to return cell value
	 *
	 * @param { IValueGetterByFunctionOptions } valueGetterOptions - Function to get the cells value
	 * @return { ColDefBuilder } - Builder after 'valueGetter' property were setted
	 * @example
	 *
	 * setValueGetterByFunction(new BooleanValueGetterOptions(controllerParams.meta.columnName))
	 */
	setValueGetterByFunction(valueGetterOptions: IValueGetterByFunctionOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueGetter, () => {
			this.colDef.valueGetter = valueGetterOptions.getterFunction;
		});
	}
	/**
	 * Function to return cell property
	 *
	 * @param { IValueGetterByPropertyOptions } valueGetterOptions - Property to get the cells value
	 * @return { ColDefBuilder } - Builder after 'field' property were setted
	 * @example
	 *
	 * setValueGetterByProperty({ propertyName: 'test_value' })
	 */
	setValueGetterByProperty(valueGetterOptions: IValueGetterByPropertyOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueGetter, () => {
			this.colDef.field = valueGetterOptions.propertyName;
		});
	}
	/**
	 * Function to ignore cell value getter settings
	 *
	 * @return { ColDefBuilder } - Builder after 'field' property were setted
	 * @example
	 *
	 * ignoreValueGetter()
	 */
	ignoreValueGetter(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueGetter);
	}
	/**
	 * Function to return cell input
	 *
	 * @param { IValueSetterOptions } valueSetterOptions - Function to return cell input
	 * @return { ColDefBuilder } - Builder after 'valueSetter' property were setted
	 * @example
	 *
	 * setValueSetter({ setterFunction: (params: ValueSetterParams) => true })
	 */
	setValueSetter(valueSetterOptions: IValueSetterOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueSetter, () => {
			this.colDef.valueSetter = valueSetterOptions.setterFunction;
		});
	}
	/**
	 * Function to ignore value setter setting
	 *
	 * @return { ColDefBuilder } - Builder after 'valueSetter' property were setted
	 * @example
	 *
	 * ignoreValueSetter()
	 */
	ignoreValueSetter(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueSetter);
	}
	/**
	 * Function to return value format
	 *
	 * @param { IValueFormatterOptions } valueFormatterOptions - A function to format a value, should return a string
	 * @return { ColDefBuilder } - Builder after 'valueFormatter' property were setted
	 * @example
	 *
	 * setValueFormatter(new BooleanValueFormatterOptions(controllerParams.injector.get(TranslateService)))
	 */
	setValueFormatter(valueFormatterOptions: IValueFormatterOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueFormatter, () => {
			this.colDef.valueFormatter = valueFormatterOptions.formatterFunction;
		});
	}
	/**
	 * Function to ignore value formatter setting
	 *
	 * @return { ColDefBuilder } - Builder after 'valueFormatter' property were setted
	 * @example
	 *
	 * ignoreValueFormatter()
	 */
	ignoreValueFormatter(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.valueFormatter);
	}
	/**
	 * Function to return custom settings for column sorting
	 *
	 * @param { ISortingOptions } sortingOptions - Object for custom sorting
	 * @return { ColDefBuilder } - Builder after 'sortingOrder' and 'comparator' properties were setted
	 * @example
	 *
	 * setSorting(new BooleanSortingOptions(controllerParams.meta, controllerParams.grid))
	 */
	setSorting(sortingOptions: ISortingOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.sorting, () => {
			this.colDef.sortingOrder = sortingOptions.sortingOrder;
			this.colDef.comparator = sortingOptions.comparator;
		});
	}
	/**
	 * Function to ignore sorting setting
	 *
	 * @return { ColDefBuilder } - Builder after 'sortingOrder' and 'comparator' properties were setted
	 * @example
	 *
	 * ignoreSorting()
	 */
	ignoreSorting(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.sorting, () => {
			this.colDef.sortable = false;
		});
	}
	/**
	 * Function to return custom settings for column filtering
	 *
	 * @param { IFilteringOptions } filteringOptions - Object for custom filtering
	 * @return { ColDefBuilder } - Builder after
	 * 'filterFramework',
	 * 'filterParams' ,
	 * 'floatingFilterComponentFramework',
	 * 'floatingFilterComponentParams' - properties were setted
	 * @example
	 *
	 * setCustomFiltering(new BooleanFilteringOptions(controllerParams.meta, controllerParams.grid))
	 */
	setCustomFiltering(filteringOptions: IFilteringOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.filtering, () => {
			this.colDef.filterFramework = filteringOptions.filterFramework;
			this.colDef.filterParams = filteringOptions.filterParams;
			this.colDef.floatingFilterComponentFramework = filteringOptions.floatingFilterComponentFramework;
			this.colDef.floatingFilterComponentParams = filteringOptions.floatingFilterComponentParams;
		});
	}
	/**
	 * Function to return column filtering by text
	 *
	 * @param { ITextFilterOptions } filteringOptions - Object for filtering by text
	 * @return { ColDefBuilder } - Builder after
	 * 'filter',
	 * 'filterParams' ,
	 * 'floatingFilterComponentFramework',
	 * 'floatingFilterComponentParams' - properties were setted
	 * @example
	 *
	 * setTextFiltering(new RichTextEditorFilterOptions())
	 */
	setTextFiltering(filteringOptions: ITextFilterOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.filtering, () => {
			this.colDef.filter = "agTextColumnFilter";
			this.colDef.filterParams = filteringOptions.filterParams;
			this.colDef.floatingFilterComponentFramework = filteringOptions.floatingFilterComponentFramework;
			this.colDef.floatingFilterComponentParams = filteringOptions.floatingFilterComponentParams;
		});
	}
	/**
	 * Function to return column filtering by date
	 *
	 * @param { IDateTimeFilterOptions } filteringOptions - Object for filtering by date
	 * @return { ColDefBuilder } - Builder after 'filter' and 'filterParams' properties were setted
	 * @example
	 *
	 * setDateTimeFiltering(new CapacityDateTimeDateFilterOptions())
	 */
	setDateTimeFiltering(filteringOptions: IDateTimeFilterOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.filtering, () => {
			this.colDef.filter = "agDateColumnFilter";
			this.colDef.filterParams = filteringOptions.filterParams;
		});
	}
	/**
	 * Function to ignore filtering setting
	 *
	 * @return { ColDefBuilder } - Builder after
	 * @example
	 *
	 * ignoreFiltering()
	 */
	ignoreFiltering(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.filtering, () => {
			this.colDef.floatingFilter = false;
		});
	}
	/**
	 * Function to return a string key for a value. This string is used for grouping
	 *
	 * @param { IGroupingOptions } groupingOptions - Function to return a string key for a value
	 * @return { ColDefBuilder } - Builder after 'enableRowGroup' and 'keyCreator' properties were setted
	 * @example
	 *
	 * setGrouping(new BooleanGroupingOptions())
	 */
	setGrouping(groupingOptions: IGroupingOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.grouping, () => {
			this.colDef.enableRowGroup = true;
			this.colDef.keyCreator = groupingOptions.getGroupKey;
		});
	}
	/**
	 * Function to supress grouping setting
	 *
	 * @return { ColDefBuilder } - Builder after 'enableRowGroup' and 'keyCreator' properties were setted
	 * @example
	 *
	 * ignoreGrouping()
	 */
	ignoreGrouping(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.grouping);
	}
	/**
	 * Function to return column cellRenderer
	 *
	 * @param { Type<ICellRendererAngularComp> } component - cellRenderer
	 * @return { ColDefBuilder } - Builder after 'cellRendererFramework' property were setted
	 * @example
	 *
	 * setCellRenderer(BooleanImageRendererComponent)
	 */
	setCellRenderer(component: Type<ICellRendererAngularComp>): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.cellRendering, () => {
			this.colDef.cellRendererFramework = component;
		});
	}
	/**
	 * Function to ignore column cellRenderer setting
	 *
	 * @return { ColDefBuilder } - Builder after 'cellRendererFramework' property were setted
	 * @example
	 *
	 * ignoreCellRenderer()
	 */
	ignoreCellRenderer(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.cellRendering);
	}
	/**
	 * Function to return column width
	 *
	 * @param { IWidthOptions } widthOptions - Object for column width
	 * @return { ColDefBuilder } - Builder after 'minWidth', 'maxWidth', 'width' properties were setted
	 * @example
	 *
	 * setWidth(new WidthOptions())
	 */
	setWidth(widthOptions: IWidthOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.width, () => {
			this.colDef.minWidth = widthOptions.minWidth;
			this.colDef.width = widthOptions.width;
			this.colDef.maxWidth = widthOptions.maxWidth;
		});
	}
	/**
	 * Function to ignore width setting
	 *
	 * @param { IWidthOptions } widthOptions - Object for column width
	 * @return { ColDefBuilder } - Builder after 'minWidth', 'maxWidth', 'width' properties were setted
	 * @example
	 *
	 * ignoreWidth(new WidthOptions())
	 */
	ignoreWidth(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.width);
	}
	/**
	 * Function to return visible menu tabs by order: filterMenuTab, generalMenuTab, columnsMenuTab
	 *
	 * @param { MenuTab } menuTabs - The menu tabs to show
	 * @return { ColDefBuilder } - Builder after 'menuTabs' property were setted
	 * @example
	 *
	 * setMenuTabs([MenuTab.GeneralMenuTab, MenuTab.FilterMenuTab, MenuTab.ColumnsMenuTab])
	 */
	setMenuTabs(menuTabs: MenuTab[]): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.menuTabs, () => {
			this.colDef.menuTabs = menuTabs;
		});
	}
	/**
	 * Function to ignore menu tabs setting
	 *
	 * @return { ColDefBuilder } - Builder after 'menuTabs' property were setted
	 * @example
	 *
	 * ignoreMenuTabs()
	 */
	ignoreMenuTabs(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.menuTabs, () => {
			 this.colDef.suppressMenu = true;
		});
	}
	/**
	 * Function to return column css property
	 *
	 * @param { ICellClassOptions } cellClassOptions - Css property
	 * @return { ColDefBuilder }- Builder after 'cellClass', 'cellClassRules' properties were setted
	 * @example
	 *
	 * setCellClass(new CellClassOptions(controllerParams.meta))
	 */
	setCellClass(cellClassOptions: ICellClassOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.cellClass, () => {
			this.colDef.cellClass = cellClassOptions.cellClass;
			this.colDef.cellClassRules = cellClassOptions.cellClassRules;
		});
	}
	/**
	 * Function to ignore column css property setting
	 *
	 * @return { ColDefBuilder }- Builder after 'cellClass', 'cellClassRules' properties were setted
	 * @example
	 *
	 * ignoreCellClass()
	 */
	ignoreCellClass(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.cellClass);
	}
	/**
	 * Function to return column header
	 *
	 * @param { string } headerName - The name to render in the column header
	 * @return { ColDefBuilder } - Builder after 'headerName' property were setted
	 * @example
	 *
	 * setHeaderName(controllerParams.meta.headerName)
	 */
	setHeaderName(headerName: string): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.headerName, () => {
			this.colDef.headerName = headerName;
		});
	}
	/**
	 * Function to ignore column header name setting
	 *
	 * @return { ColDefBuilder } - Builder after 'headerName' property were setted
	 * @example
	 *
	 * ignoreHeaderName()
	 */
	ignoreHeaderName(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.headerName);
	}
	/**
	 * Function to return column visibility
	 *
	 * @param { IVisibilityOptions } visibilityOptions - Object for column visibility
	 * @return { ColDefBuilder }- Builder after 'hide', 'lockVisible' properties were setted
	 * @example
	 *
	 * setVisibility(new VisibilityOptions(controllerParams.meta))
	 */
	setVisibility(visibilityOptions: IVisibilityOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.visibility, () => {
			this.colDef.hide = visibilityOptions.hide;
			this.colDef.lockVisible = visibilityOptions.lockVisible;
		});
	}
	/**
	 * Function to ignore column visibility setting
	 *
	 * @return { ColDefBuilder }- Builder after 'hide', 'lockVisible' properties were setted
	 * @example
	 *
	 * ignoreVisibility()
	 */
	ignoreVisibility(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.visibility);
	}
	/**
	 * Function to return column tooltip
	 *
	 * @param { ITooltipByFunctionOptions } tooltipOptions - The function used to calculate the tooltip of the object
	 * @return { ColDefBuilder } - Builder after 'tooltipComponentFramework', 'tooltipValueGetter' properties were setted
	 * @example
	 *
	 * setTooltipOptionsByFunction(new BooleanTooltipOptions())
	 */
	setTooltipOptionsByFunction(tooltipOptions: ITooltipByFunctionOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.tooltip, () => {
			this.colDef.tooltipComponentFramework = tooltipOptions.tooltipComponentFramework;
			this.colDef.tooltipValueGetter = tooltipOptions.tooltipValueGetter;
		});
	}
	/**
	 * Function to return column tooltip by propery
	 *
	 * @param { ITooltipByFunctionOptions } tooltipOptions - The field where we get the tooltip on the object
	 * @return { ColDefBuilder } - Builder after 'tooltipComponentFramework', 'tooltipValueGetter' properties were setted
	 * @example
	 *
	 * setTooltipOptionsByField({ tooltipField: 'test_tooltip'})
	 */
	setTooltipOptionsByField(tooltipOptions: ITooltipByFieldOptions): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.tooltip, () => {
			this.colDef.tooltipComponentFramework = tooltipOptions.tooltipComponentFramework;
			this.colDef.tooltipField = tooltipOptions.tooltipField;
		});
	}
	/**
	 * Function to ignore column tooltip setting
	 *
	 * @return { ColDefBuilder } - Builder after 'tooltipComponentFramework', 'tooltipValueGetter' properties were setted
	 * @example
	 *
	 * ignoreTooltip()
	 */
	ignoreTooltip(): IColDefBuilder {
		return this.validateAndSetProperties(this.validationState.tooltip);
	}
	/**
	 * Function to return error for wrong property
	 *
	 * @return { ColDefBuilder } - Return error for wrong property
	 * @example
	 *
	 * validate()
	 */
	validate(): string[] {
		return Object.entries(this.validationState)
			.filter(([key, validationItem]: [string, ColDefBuilderValidationItem]) => this.validationState.hasOwnProperty(key))
			.map(([key, validationItem]: [string, ColDefBuilderValidationItem]) =>
				!validationItem.isSet ? validationItem.requiredErrorMessage : "")
			.filter(error => error);
	}
	/**
	 * Function to return column definftions
	 *
	 * @return { ColDef | never } - Return column definftions
	 * @example
	 *
	 * build()
	 */
	build(): ColDef | never {
		const errorMessages = this.validate();
		if (errorMessages.length) {
			throw new ColDefBuilderValidationError(errorMessages.join("\n"));
		}
		return this.colDef;
	}

	private validateAndSetProperties(validationgItem: ColDefBuilderValidationItem, propertiesSetter?: () => void)
		: IColDefBuilder {

		if (validationgItem.isSet) {
			throw new ColDefBuilderValidationError(validationgItem.duplicateErrorMessage);
		}
		if (propertiesSetter) {
			propertiesSetter();
		}

		validationgItem.isSet = true;
		return this;
	}
}
