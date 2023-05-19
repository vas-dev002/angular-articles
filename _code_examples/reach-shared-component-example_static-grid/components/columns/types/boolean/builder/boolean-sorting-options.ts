import { StaticGridComponent } from "../../../../main/comp";
import { IColumnMetaSG } from "../../../../main/entity";
import { ISortingOptions, SortingOrderOption } from "../../base/base-abstract-factory/builder-models";
import { customSortStatus } from "../../../../../../util/column";
import { BooleanDasType } from "../../../../../../cellRenderer/booleanImage/boolean-type.util";
import { BooleanOptions } from "./boolean-options";

export class BooleanSortingOptions extends BooleanOptions implements ISortingOptions {
	readonly sortingOrder: SortingOrderOption[] = [SortingOrderOption.Desc, SortingOrderOption.Asc, null];
	readonly comparator = (valueA: string, valueB: string) => this.booleanComparator(valueA, valueB);

	constructor(meta: IColumnMetaSG, grid: StaticGridComponent) {
		super(meta, grid);
	}

	private booleanComparator(valueA: string, valueB: string): number {
		return -customSortStatus(
			this.getMetaWithFilterOptions(this.meta, this.grid)
			)(
				BooleanDasType.getValueWithEmptyProcessing(valueA),
				BooleanDasType.getValueWithEmptyProcessing(valueB)
			);
	}
}
