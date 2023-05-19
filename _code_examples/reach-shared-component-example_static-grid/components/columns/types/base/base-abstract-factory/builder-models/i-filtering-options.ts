import { IFilterAngularComp } from "@ag-grid-community/angular";
import { IFloatingFilter } from "@ag-grid-community/core";
import { Type } from "@angular/core";

export interface IFilteringOptions {
	filterFramework: Type<IFilterAngularComp>;
	filterParams?: unknown;
	floatingFilterComponentFramework: Type<IFloatingFilter>;
	floatingFilterComponentParams?: unknown;
}
