import { HeaderSelectAllSGComponent } from "../select-all.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ISelectAllParams, ISelectAllMethods } from "../entity";
import { EventEmitter } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";

describe("Select All component", () => {
	let component: HeaderSelectAllSGComponent;
	let fixture: ComponentFixture<HeaderSelectAllSGComponent>;
	let params: ISelectAllParams;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot(), MatTooltipModule, MatCheckboxModule],
			providers: [TranslateService],
			declarations: [
				HeaderSelectAllSGComponent
			]
		});
	});
	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderSelectAllSGComponent);
		component = fixture.componentInstance;
		params = {
			selectMethods: {
				getRowsCount: () => 0,
				getSelectedCount: () => 0,
				selectAll: () => { },
				deselectAll: () => { },
				onSelectionChanged: new EventEmitter<Object[]>()
			} as ISelectAllMethods

		} as ISelectAllParams;
		component.agInit(params);
		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("should return tooltip", () => {
		component.selectState = true;
		expect(component.tooltipText()).toBe("DeselectAll");
		component.selectState = false;
		expect(component.tooltipText()).toBe("SelectAll");
	});


	describe("checkbox status", () => {

		it("should be unselected", () => {
			params.selectMethods.getRowsCount = (excludeDisabledRows) => 5;
			params.selectMethods.getSelectedCount = () => 0;
			component.updateSelectStatus();
			expect(component.selectState).toBe(false);
			expect(component.indeterminateState).toBe(false);
		});

		it("should be unselected with no rows", () => {
			params.selectMethods.getRowsCount = (excludeDisabledRows) => 0;
			params.selectMethods.getSelectedCount = () => 0;
			component.updateSelectStatus();
			expect(component.selectState).toBe(false);
			expect(component.indeterminateState).toBe(false);
		});

		it("should be selected", () => {
			params.selectMethods.getRowsCount = (excludeDisabledRows) => 5;
			params.selectMethods.getSelectedCount = () => 5;
			component.updateSelectStatus();
			expect(component.selectState).toBe(true);
			expect(component.indeterminateState).toBe(false);
		});

		it("should be indeterminate", () => {
			params.selectMethods.getRowsCount = (excludeDisabledRows) => 5;
			params.selectMethods.getSelectedCount = () => 3;
			component.updateSelectStatus();
			expect(component.selectState).toBe(true);
			expect(component.indeterminateState).toBe(true);
		});
	});

	describe("selection event", () => {
		it("should prevent click event for material component", () => {
			const event = { preventDefault: () => { } } as Event;
			const spyOn = jest.spyOn(event, "preventDefault");
			component.selectionChange(event);
			expect(spyOn).toHaveBeenCalled();
		});

		it("should update selection status", () => {
			const event = { preventDefault: () => { } } as Event;
			const spyOn = jest.spyOn(component, "updateSelectStatus");
			component.selectionChange(event);
			expect(spyOn).toHaveBeenCalled();
		});

		it("should select all checkboxes", () => {
			const event = { preventDefault: () => { } } as Event;
			component.selectState = false;
			const spyOn = jest.spyOn(params.selectMethods, "selectAll");
			component.selectionChange(event);
			expect(spyOn).toHaveBeenCalled();
		});

		it("should deselect all checkboxes", () => {
			const event = { preventDefault: () => { } } as Event;
			component.selectState = true;
			const spyOn = jest.spyOn(params.selectMethods, "deselectAll");
			component.selectionChange(event);
			expect(spyOn).toHaveBeenCalled();
		});
	});
});
