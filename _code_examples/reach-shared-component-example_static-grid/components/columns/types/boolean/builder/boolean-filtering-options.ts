import { MultiselectFloatingFilterComponent } from "../../../../../../../../../components/shared/aggrid/filter/floatingMultiselect/comp";
import { BooleanImageFilterComponent } from "../../../../../../filter/booleanImage/comp";
import { IColumnMetaSG } from "../../../../main/entity";
import { StaticGridComponent } from "../../../../main/comp";
import { IFilteringOptions } from "../../base/base-abstract-factory/builder-models";
import { BooleanOptions } from "./boolean-options";

export class BooleanFilteringOptions extends BooleanOptions implements IFilteringOptions {
	readonly filterFramework = BooleanImageFilterComponent;
	readonly filterParams: unknown;
	readonly floatingFilterComponentFramework = MultiselectFloatingFilterComponent;
	readonly floatingFilterComponentParams: unknown;

	constructor(meta: IColumnMetaSG, grid: StaticGridComponent) {
		super(meta, grid);
		this.filterParams = { meta: this.getMetaWithFilterOptions(this.meta, this.grid) };
		this.floatingFilterComponentParams = {
			suppressFilterButton: true,
			meta: this.getMetaWithFilterOptions(this.meta, this.grid)
		};
	}
}
