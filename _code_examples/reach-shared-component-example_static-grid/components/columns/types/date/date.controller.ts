import { Type } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef, ITooltipParams, ValueFormatterParams } from "@ag-grid-community/core";

import { ITypeControllerSG } from "../../entity";
import { BaseTypeController } from "../base/base.controller";
import { DateSGRendererComponent } from "./date.component";
import { dateComparator } from "../../../../../util/column";
import { DateDasType } from "./date-type.util";
import { IDateValue, IDateGroupKeyParams } from "./entity";

/**
 * @deprecated. Use builder and factory instead.
 */
export class DateControllerSG extends BaseTypeController implements ITypeControllerSG {

	public renderComponent: Type<ICellRendererAngularComp> = DateSGRendererComponent;

	public columnDefinition(): ColDef {
		return {
			...this.baseDef
		};
	}

	protected customFilterDef(): ColDef {
		return {
			filter: "agDateColumnFilter",
			filterParams: {
				defaultOption: "equals",
				filterOptions: [
					"equals",
					"notEqual",
					"lessThanOrEqual",
					"greaterThan",
					"greaterThanOrEqual"
				],
				comparator: dateComparator,
				inRangeInclusive: false,
				suppressAndOrCondition: true
			}
		};
	}

	protected get customSortDef(): ColDef {
		return {
			sortingOrder: ["desc", "asc", null]
		};
	}

	protected getTooltip(): (params: ITooltipParams) => string {
		return (params: ITooltipParams) => this.transformDateValue(params);
	}

	protected getStringValue(): (params: ValueFormatterParams) => string {
		return (params: ValueFormatterParams) => this.transformDateValue(params);
	}

	protected getGroupKey(): <T>(params: { value: T } | IDateValue) => string {
		return (params: IDateGroupKeyParams) => {
			const typedValue = params?.date || params.value;

			return JSON.stringify({
				stringValueMode: true,
				value: DateDasType.getValue(typedValue)
			});
		};
	}

	private readonly transformDateValue = (params: ValueFormatterParams | ITooltipParams) => {
		const value = params.value?.date || params.value;
		return DateDasType.getValue(value);
	}
}
