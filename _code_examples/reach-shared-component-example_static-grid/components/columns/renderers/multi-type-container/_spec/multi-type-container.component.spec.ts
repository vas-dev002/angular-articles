import { ICellRendererParams } from "@ag-grid-community/core";
import { ComponentFactory, ComponentRef, NgModule, ViewContainerRef } from "@angular/core";
import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { ReadinessRendererComponent } from "../../../../../../../../../components/shared/aggrid/cellRenderer/readiness/readiness-renderer.component";
import { ReadinessComponent } from "../../../../../../../../../components/shared/aggrid/cellRenderer/readiness/readiness.component";
import { MultiTypeContainerSGComponent } from "../multi-type-container.component";

declare const expect: jest.Expect;

describe("[Component]: MultiTypeContainerSGComponent", () => {
	let component: MultiTypeContainerSGComponent;
	let fixture: ComponentFixture<MultiTypeContainerSGComponent>;
	let params: ICellRendererParams;

	@NgModule({
		declarations: [ReadinessRendererComponent, ReadinessComponent],
		entryComponents: [
			ReadinessRendererComponent,
			ReadinessComponent
		]
	})
	class MockModule { }

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [MultiTypeContainerSGComponent],
			imports: [MockModule]
		})
			.overrideTemplate(MultiTypeContainerSGComponent, `<span></span>`)
			.overrideTemplate(ReadinessComponent, `<span></span>`)
			.overrideTemplate(ReadinessRendererComponent, `<span></span>`).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MultiTypeContainerSGComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		params = {
			value: {
				renderComponent: ReadinessRendererComponent,
				value: ""
			}
		} as unknown as ICellRendererParams;
	});

	describe("[Method]: agInit", () => {
		it("should initialize component correctly", () => {
			component.container = {
				createComponent<C>(componentFactory: ComponentFactory<C>): ComponentRef<C> {
					return {
						injector: {
							get(mockValue: unknown) {
								return {
									markForCheck () { }
								};
							}
						},
						instance: {
							agInit({ }) { }
						} as unknown
					} as ComponentRef<C>;
				}
			} as ViewContainerRef;

			component.agInit(params);
			expect(component).toBeTruthy();
		});
	});

	describe("[Method]: refresh", () => {
		it("should return false", () => {
			expect(component.refresh()).toBeFalsy();
		});
	});

});
