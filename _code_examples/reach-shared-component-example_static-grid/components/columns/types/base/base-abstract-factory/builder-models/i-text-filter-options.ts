import { Type } from "@angular/core";
import { TextFloatingFilterComponent } from "../../../../../../../filter/floatingTextInput/comp";
import { ITextFilterParams } from "./i-text-filter-params";
import { ITextFloatingFilterComponentParams } from "./i-text-floating-filter-component-params";

export interface ITextFilterOptions {
	filterParams: ITextFilterParams;
	floatingFilterComponentFramework: Type<TextFloatingFilterComponent>;
	floatingFilterComponentParams?: ITextFloatingFilterComponentParams;
}
