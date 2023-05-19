import { Type } from "@angular/core";
import { IColumnMetaSG, FilterTypeSG } from "../../../../main/entity";
import { IColDefAbstractFactory } from "../base-abstract-factory/models";

export const COMMON_META: IColumnMetaSG = {
	headerName: "Test Header",
	visible: false,
	cssClass: "testCss",
	columnName: "testColumn",
	controller: {} as Type<IColDefAbstractFactory>,
	filterType: FilterTypeSG.Multiselect,
	lockVisible: false,
	isObjectKey: false,
	metaFromApi: { filterOptions: [], cellDefaultText: "Unassigned" }
};

export const ANY_VALUES = [
	null, undefined,
	"", "text", "False", "true",
	0, 1, -1,
	{}
];
