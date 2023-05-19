import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, ChangeDetectorRef, Type } from "@angular/core";
import { ICellRendererParams } from "@ag-grid-community/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { IControllerDataConfig } from "../../types/multi-type-value/entity";

@Component({
	selector: "multi-type-container-sg",
	templateUrl: "multi-type-container.component.html"
})
export class MultiTypeContainerSGComponent implements ICellRendererAngularComp {

	@ViewChild("groupCell", { read: ViewContainerRef, static: true }) container: ViewContainerRef;

	emptyMode = false;

	constructor(private readonly resolver: ComponentFactoryResolver) { }

	agInit(params: ICellRendererParams): void {
		const value = params.value;
		this.injectComponent(params, value);
	}

	refresh(): boolean {
		return false;
	}

	private injectComponent(params: ICellRendererParams, decodedValue: IControllerDataConfig): void {
		const factory = this.resolver.resolveComponentFactory(decodedValue.renderComponent);
		const ref = this.container.createComponent(factory);
		ref.injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>).markForCheck();
		ref.instance.agInit({
			...params,
			value: decodedValue.value
		});
	}

}
