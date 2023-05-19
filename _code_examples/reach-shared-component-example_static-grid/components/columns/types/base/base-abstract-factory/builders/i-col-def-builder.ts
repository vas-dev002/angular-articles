import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef } from "@ag-grid-community/core";
import { Type } from "@angular/core";
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

export interface IColDefBuilder {
	setColId(colId: string): IColDefBuilder;
	ignoreColId(): IColDefBuilder;

	setValueGetterByFunction(valueGetterOptions: IValueGetterByFunctionOptions): IColDefBuilder;
	setValueGetterByProperty(valueGetterOptions: IValueGetterByPropertyOptions): IColDefBuilder;
	ignoreValueGetter(): IColDefBuilder;

	setValueSetter(valueSetterOptions: IValueSetterOptions): IColDefBuilder;
	ignoreValueSetter(): IColDefBuilder;

	setValueFormatter(valueFormatterOptions: IValueFormatterOptions): IColDefBuilder;
	ignoreValueFormatter(): IColDefBuilder;

	setSorting(sortingOptions: ISortingOptions): IColDefBuilder;
	ignoreSorting(): IColDefBuilder;

	setCustomFiltering(filteringOptions: IFilteringOptions): IColDefBuilder;
	setTextFiltering(filteringOptions: ITextFilterOptions): IColDefBuilder;
	setDateTimeFiltering(filteringOptions: IDateTimeFilterOptions): IColDefBuilder;
	ignoreFiltering(): IColDefBuilder;

	setGrouping(groupingOptions: IGroupingOptions): IColDefBuilder;
	ignoreGrouping(): IColDefBuilder;

	setCellRenderer(component: Type<ICellRendererAngularComp>): IColDefBuilder;
	ignoreCellRenderer(): IColDefBuilder;

	setWidth(widthOptions: IWidthOptions): IColDefBuilder;
	ignoreWidth(): IColDefBuilder;

	setMenuTabs(menuTabs: MenuTab[]): IColDefBuilder;
	ignoreMenuTabs(): IColDefBuilder;

	setCellClass(cellClassOptions: ICellClassOptions): IColDefBuilder;
	ignoreCellClass(): IColDefBuilder;

	setHeaderName(headerName: string): IColDefBuilder;
	ignoreHeaderName(): IColDefBuilder;

	setVisibility(visibilityOptions: IVisibilityOptions): IColDefBuilder;
	ignoreVisibility(): IColDefBuilder;

	setTooltipOptionsByFunction(tooltipOptions: ITooltipByFunctionOptions): IColDefBuilder;
	setTooltipOptionsByField(tooltipOptions: ITooltipByFieldOptions): IColDefBuilder;
	ignoreTooltip(): IColDefBuilder;

	validate(): string[];

	build(): ColDef;
}
