import { Injectable } from "@angular/core";

import { uniqBy } from "lodash";

import { BooleanDasType, BooleanTypeOptions } from "../../../../../../cellRenderer/booleanImage/boolean-type.util";
import { StaticGridComponent } from "../../../../main/comp";
import { IColumnMetaSG } from "../../../../main/entity";
import { IFilterOptionsSG } from "../../../entity";

@Injectable()
export abstract class BooleanOptions {
	protected constructor(protected readonly meta: IColumnMetaSG, protected readonly grid: StaticGridComponent) { }

	protected getMetaWithFilterOptions(meta: IColumnMetaSG, grid: StaticGridComponent): unknown {
		const metaFromApi = meta.metaFromApi || {};
		return {
			...metaFromApi,
			filterOptions: metaFromApi["filterOptions"] || this.getFilterOptions(meta, grid)
		};
	}

	private getFilterOptions(meta: IColumnMetaSG, grid: StaticGridComponent): IFilterOptionsSG[] {
		const uniqValues = uniqBy(grid.rowData, meta.columnName);
		const options = [];
		uniqValues.forEach((value: unknown) => {
			options.push(this.getCustomModifiedOptionValue(value[meta.columnName]));
		});
		return this.customSortFilterOptions(options);
	}

	private getCustomModifiedOptionValue(value: unknown): IFilterOptionsSG {
		const optionValue = BooleanDasType.getValueWithEmptyProcessing(value);
		return {
			text: optionValue,
			value: optionValue
		};
	}

	private customSortFilterOptions(filterOptions: IFilterOptionsSG[]): IFilterOptionsSG[] {
		return filterOptions.sort((a: IFilterOptionsSG, b: IFilterOptionsSG) =>
			this.getBooleanIndex(a.text) - this.getBooleanIndex(b.text));
	}

	private readonly getBooleanIndex = (value: string): number => {
		return Object.keys(BooleanTypeOptions).indexOf(value);
	}
}
