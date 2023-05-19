import { IColumnMetaSG, IGetCellClassParams, FilterTypeSG } from "../../../main/entity";
import { Type, Injector } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef, ITooltipParams, ValueFormatterParams } from "@ag-grid-community/core";
import { ITypeControllerParams, IFilterOptionsSG } from "../../entity";
import { StaticGridComponent } from "../../../main/comp";
import { isColumnDisabled } from "../../../main/config/main";
import { uniqBy, orderBy } from "lodash";
import { StringMultiSelectFilterComponent } from "../../../../../filter/stringMultiSelect/comp";
import { MultiselectFloatingFilterComponent } from "../../../../../filter/floatingMultiselect/comp";
import { TextFloatingFilterComponent } from "../../../../../filter/floatingTextInput/comp";
import { customTextComparator, valueToString } from "../../../../../util/column";
import { MaterialTooltipComponent } from "../../../../../../material-tooltip/material-tooltip.component";
import { isNullOrUndefined } from "../../../../../../../util/common/common";

/**
 * @deprecated. Use builder and factory instead.
 */
export abstract class BaseTypeController {

	public abstract renderComponent: Type<ICellRendererAngularComp>;
	public customFilterFramework: any = StringMultiSelectFilterComponent;
	public meta: IColumnMetaSG;
	public grid: StaticGridComponent;
	public injector: Injector;

	constructor(protected readonly controllerParams: ITypeControllerParams) {
		this.meta = controllerParams.meta;
		this.grid = controllerParams.grid;
		this.injector = controllerParams.injector;
	}

	protected get baseDef(): ColDef {
		return {
			cellRendererFramework: this.renderComponent,
			field: this.meta.columnName,
			cellClass: this.meta.cssClass,
			headerName: this.meta.headerName,
			hide: !this.meta.visible,
			menuTabs: ["generalMenuTab", "filterMenuTab", "columnsMenuTab"],
			minWidth: 50,
			tooltipField: this.meta.tooltipField,
			maxWidth: 500,
			lockVisible: this.meta.lockVisible,
			keyCreator: this.getGroupKey(),
			cellClassRules: this.getCssRules(this.meta),
			tooltipComponentFramework: MaterialTooltipComponent,
			tooltipValueGetter: this.getTooltip(),
			valueFormatter: this.getStringValue(),
			...this.customFilterDef(),
			...this.addHeaderTooltip(),
			...this.customSortDef
		};
	}

	protected customFilterDef(): ColDef {
		return this.getFilterDefObject(this.meta.filterType);
	}

	protected get customSortDef(): ColDef {
		return {
			sortingOrder: ["asc", "desc", null]
		};
	}

	protected getStringValue(property?: string): (params: ValueFormatterParams) => string {
		return (params: ValueFormatterParams) => {
			return valueToString(params.value, property);
		};
	}

	protected getGroupKey(): <T>(params: { value: T }) => string {
		return <T>(params: { value: T }) => {
			return JSON.stringify(params.value);
		};
	}

	protected getTooltip(property?: string): (params: ITooltipParams) => string {
		return (params: ITooltipParams) => {
			return valueToString(params.value, property);
		};
	}

	protected getCssRules(meta: IColumnMetaSG) {
		return {
			"sg-cell-disabled": (params: IGetCellClassParams<{ [disabledField: string]: boolean }, null>) => {
				return isColumnDisabled(params.data, meta);
			}
		};
	}

	protected getMetaWithFilterOptions() {
		const meta = this.meta.metaFromApi || {};
		return {
			...meta,
			filterOptions: meta["filterOptions"] || this.getFilterOptions()
		};
	}

	protected customSortFilterOptions(filterOptions: IFilterOptionsSG[]): IFilterOptionsSG[] {
		return orderBy(
			filterOptions,
			[(option) => option.text.toString().toLowerCase()],
			["asc"]
		).sort((a, b) => { // "Empty" to the top.
			const comparator = (val) => val.text === "Empty" ? 0 : 1;
			return comparator(a) - comparator(b);
		});
	}

	protected getCustomModifiedOptionValue(value): IFilterOptionsSG {
		return {
			text: value || "Empty",
			value: value || ""
		};
	}

	// Remove for release! It's for testers and devs only.
	private addHeaderTooltip() {
		return this.meta.metaFromApi && !isNullOrUndefined(this.meta.metaFromApi["customUiTransformation"])
			? { headerTooltip: this.meta.metaFromApi["customUiTransformation"] || "String" }
			: {};
	}

	getFilterOptions(): IFilterOptionsSG[] {
		const uniqValues = uniqBy(this.grid.rowData, this.meta.columnName);
		const options = [];
		uniqValues.forEach(value => {
			options.push(this.getCustomModifiedOptionValue(value[this.meta.columnName]));
		});
		return this.customSortFilterOptions(options);
	}

	// Need to add specific interfaces for this objects (instead of ColDef type).
	// And probably it will be better to put this into the utilities file.
	getFilterDefObject(filterType: FilterTypeSG): ColDef {
		switch (filterType) {
			case FilterTypeSG.None:
				return {
					filter: false,
					filterParams: {}
				} as ColDef;
			case FilterTypeSG.Multiselect:
				return {
					filterFramework: this.customFilterFramework,
					floatingFilterComponentFramework: MultiselectFloatingFilterComponent,
					floatingFilterComponentParams: {
						suppressFilterButton: true,
						meta: this.getMetaWithFilterOptions()
					},
					filterParams: {
						defaultOption: "equals",
						filterOptions: ["equals", "notEquals"],
						textFormatter: function (r) { return r.toLowerCase(); },
						selectAllOnMiniFilter: false,
						meta: this.getMetaWithFilterOptions()
					}
				} as ColDef;
			case FilterTypeSG.Number:
			case FilterTypeSG.String:
			case FilterTypeSG.Date:
			case FilterTypeSG.DateTime:
			default:
				return {
					filter: "agTextColumnFilter",
					floatingFilterComponentFramework: TextFloatingFilterComponent,
					floatingFilterComponentParams: {
						suppressFilterButton: true
					},
					filterParams: {
						defaultOption: "contains",
						filterOptions: [
							"contains",
							"notContains",
							"startsWith",
							"endsWith"
						],
						caseSensitive: true,
						textCustomComparator: customTextComparator
					}
				} as ColDef;
		}
	}

}
