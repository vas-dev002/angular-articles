import { TestBed, ComponentFixture } from "@angular/core/testing";

import { LoadingCellSGComponent } from "../loading-cell.component";

describe("[Component]: LoadingCellSGComponent", () => {
	let component: LoadingCellSGComponent;
	let fixture: ComponentFixture<LoadingCellSGComponent>;
	let params;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				LoadingCellSGComponent
			]
		}).overrideTemplate(LoadingCellSGComponent, "<span></span>");

		fixture = TestBed.createComponent(LoadingCellSGComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		params = {
			loadingMessage: "Loading"
		};
	});

	describe("[Method]: agInit", () => {
		it("should initialize component correctly", () => {
			component.agInit(params);
			expect(component.params).toEqual(params);
		});
	});
});
