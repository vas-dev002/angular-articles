
import { Type } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef, ValueFormatterParams, ValueGetterParams } from "@ag-grid-community/core";
import { TranslateService } from "@ngx-translate/core";
import { BaseTypeController } from "../base.controller";
import { ITypeControllerSG } from "../../../entity";

/**
 * @deprecated. Use builder and factory instead.
 */
export abstract class BaseValueControllerSG extends BaseTypeController implements ITypeControllerSG {

	public abstract renderComponent: Type<ICellRendererAngularComp>;

	private readonly langService: TranslateService = this.injector.get(TranslateService);

	public columnDefinition(): ColDef {
		return {
			...this.baseDef,
			valueGetter: this.customValueGetter,
			minWidth: 100
		};
	}

	// overridden for translation copy cell function
	public getStringValue(): (params: ValueFormatterParams) => string {
		return (params: ValueFormatterParams) => {
			return params.value && !!params.value.text ? this.langService.instant(params.value.text) : params.value;
		};
	}

	protected customValueGetter = (params: ValueGetterParams) => {
		if (!params.data) {
			return "";
		}
		return params.data[params.column.getColDef().field];
	}
}
