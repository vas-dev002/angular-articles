import { IColumnMetaSG } from "../../../../../main/entity";
import { IVisibilityOptions } from "../builder-models";

export class VisibilityOptions implements IVisibilityOptions {
	readonly hide: boolean;
	readonly lockVisible: boolean;

	constructor(meta: IColumnMetaSG) {
		this.hide = !meta.visible;
		this.lockVisible = meta.lockVisible;
	}
}
