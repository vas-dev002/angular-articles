import { CellClassParams } from "@ag-grid-community/core";
import { getCssRules } from "../../../../../main/config/main";
import { IColumnMetaSG } from "../../../../../main/entity";
import { ICellClassOptions } from "../builder-models";

export class CellClassOptions implements ICellClassOptions {
	readonly cellClass: string | string[] | ((cellClassParams: CellClassParams) => string | string[]);
	readonly cellClassRules: { [cssClassName: string]: (Function | string) };

	constructor(meta: IColumnMetaSG) {
		this.cellClass = meta.cssClass;
		this.cellClassRules = getCssRules(meta);
	}
}
