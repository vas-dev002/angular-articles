import { Type, Injector } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef } from "@ag-grid-community/core";
import { IColumnMetaSG } from "../main/entity";
import { StaticGridComponent } from "../main/comp";
import { ColumnDisplayType } from "./types";
import { IColDefAbstractFactory } from "./types/base/base-abstract-factory/models";
import { ObjectDetailsType } from "@evergreen-shared/entity";

export interface ITypeControllerSG {
	renderComponent: Type<ICellRendererAngularComp>;
	columnDefinition(): ColDef;
}

export interface IFilterOptionsSG {
	text: string;
	value: unknown;
	props?: Object;
	sortOrder?: number;
}

export interface ITypeControllerParams {
	meta: IColumnMetaSG;
	grid: StaticGridComponent;
	customOptions: Object;
	injector?: Injector;
}

export interface ILinkMeta {
	uRLColumnName: string;
	objectType: string;
	objectTypeColumnName: string;
	labelColumnName: string;
	keyColumnName: string;
	parameters: string;
	urlParameters: string[];
	renderLinkProperty: string;
}

export interface IOutcomeComparatorValue {
	status: number;
	text: string;
	tooltip: string;
}

export enum ApplicationForwardPathTypeEnum {
	None = 0,
	Retire = 1,
	Keep = 2,
	ForwardPath = 3,
	Uncategorized = 4
}

export enum ApplicationAssociationTypeEnum {
	None = 0,
	Dynamic = 1,
	StickyInclude = 2,
	StickyExclude = 3,
	ForwardPathed = 4,
	Mixed = 5
}

export enum StringValueGetterMode {
	String,
	SelectedItem,
	Params
}

export interface ITypedController {
	key: ColumnDisplayType;
	factory: Type<IColDefAbstractFactory>;
}

export enum TaskFlags {
	IsBucketTask = "IsBucketTask",
	IsReadOnlyTask = "IsReadOnlyTask",
	IsSystemTask = "IsSystemTask"
}

export interface IDateTimeEditorChanges {
	taskId: number;
	projectId: number;
	id: number;
	objectType: ObjectDetailsType;
	date: string;
	postBackParameters: { [key: string]: unknown };
}

export interface ICapacityDateTimeEditorChanges extends IDateTimeEditorChanges {
	slotId: number;
	slotName: string;
}
