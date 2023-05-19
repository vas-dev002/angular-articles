import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, ChangeDetectorRef, Type } from "@angular/core";
import { ICellRendererParams, ValueFormatterParams } from "@ag-grid-community/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";

@Component({
	selector: "group-container-sg",
	templateUrl: "group-container.component.html"
})
export class GroupContainerSGComponent implements ICellRendererAngularComp {

	@ViewChild("groupCell", { read: ViewContainerRef, static: true }) container: ViewContainerRef;

	emptyMode = false;
	stringValue: string;
	stringValueMode = false;

	constructor(private readonly resolver: ComponentFactoryResolver) { }

	public agInit<TValue>(params: ICellRendererParams): void {
		const value = this.decodeValue<TValue>(params.value);
		const dynamicValue = value as any;
		if (dynamicValue && dynamicValue.stringValueMode) {
			this.stringValueMode = true;
			this.stringValue = dynamicValue.value;
		} else {
			this.injectComponent(params, value);
		}
	}

	public refresh(): boolean {
		return false;
	}

	private decodeValue<TValue>(value: string): TValue {
		return JSON.parse(value);
	}

	private injectComponent<TValue>(params: ICellRendererParams, decodedValue: TValue): void {
		const field = params.node.field;
		const column = params.columnApi.getColumn(field);
		const colDef = column.getColDef();
		let stringValue: string;
		if (typeof colDef.valueFormatter !== "string") {
			stringValue = colDef.valueFormatter({ ...params, value: decodedValue } as ValueFormatterParams);
		} else {
			stringValue = colDef.valueFormatter;
		}
		if (!stringValue) {
			this.emptyMode = true;
			return;
		}

		const factory = this.resolver.resolveComponentFactory(colDef.cellRendererFramework as Type<ICellRendererAngularComp>);
		const ref = this.container.createComponent(factory);
		ref.injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>).markForCheck();
		ref.instance.agInit({
			...params,
			...colDef.cellRendererParams,
			groupByMode: true,
			value: decodedValue
		});
	}

}
