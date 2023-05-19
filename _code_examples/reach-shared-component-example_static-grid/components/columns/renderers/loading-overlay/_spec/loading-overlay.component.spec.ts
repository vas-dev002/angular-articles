import { TestBed, ComponentFixture } from "@angular/core/testing";

import { LoadingOverlaySGComponent } from "../loading-overlay.component";

describe("[Component]: LoadingOverlaySGComponent", () => {
	let component: LoadingOverlaySGComponent;
	let fixture: ComponentFixture<LoadingOverlaySGComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				LoadingOverlaySGComponent
			]
		}).overrideTemplate(LoadingOverlaySGComponent, "<span></span>");

		fixture = TestBed.createComponent(LoadingOverlaySGComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe("[Method]: agInit", () => {
		it("should initialize component correctly", () => {
			component.agInit(null);
			expect(component.params).toBeNull();
		});
	});
});
