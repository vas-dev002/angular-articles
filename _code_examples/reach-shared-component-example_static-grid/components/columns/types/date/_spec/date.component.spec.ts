import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ICellRendererParams } from "@ag-grid-community/core";

import { DateSGRendererComponent } from "../date.component";

describe("[Component]: DateSGRendererComponent", () => {
	let component: DateSGRendererComponent;
	let fixture: ComponentFixture<DateSGRendererComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DateSGRendererComponent],
			imports: [],
			providers: []
		}).overrideTemplate(DateSGRendererComponent, `<span></span>`);

		fixture = TestBed.createComponent(DateSGRendererComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe("[Method]: refresh", () => {
		it("should return true", () => {
			const result = component.refresh();
			expect(result).toBeFalsy();
		});
	});

	describe("[Method]: agInit", () => {
		it("should set date and time for MultiTypeValue", () => {
			const params = {
				value: {
					date: "2021-02-13T00:00:00"
				}
			};

			component.agInit(params as unknown as ICellRendererParams);
			fixture.detectChanges();
			expect(component.params).toBe(params);
		});
	});

	describe("[Method]: getValue", () => {
		it("should set date for MultiTypeValue", () => {
			const params = {
				value: {
					date: "2021-02-13T00:00:00"
				}
			};
			component.params = params as unknown as ICellRendererParams;
			expect(component.getValue()).toBe("Feb 13, 2021");
		});

		it("should set date in value", () => {
			const params = { value: "2021-04-14T00:00:00" };
			component.params = params as unknown as ICellRendererParams;

			expect(component.getValue()).toBe("Apr 14, 2021");
		});

		it("should set empty in value", () => {
			const params = { value: null };

			component.params = params as unknown as ICellRendererParams;
			expect(component.getValue()).toBe("");
		});
	});
});
