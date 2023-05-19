import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { TextEditorSGComponent } from "../comp.tested";
import { ReactiveFormsModule } from "@angular/forms";
import { ICellEditorParams } from "@ag-grid-community/core";
import { MaterialDesignModule } from "../../../../../../../../../modules/shared/material";
import { IEditorTextValidator } from "../text-editor.entity";
import { ICellEditorParamsSG } from "../../../../main/entity";

declare const expect: jest.Expect;

describe("TextEditorSGComponent", () => {
	let component: TextEditorSGComponent;
	let fixture: ComponentFixture<TextEditorSGComponent>;
	let params: ICellEditorParams;
	let stopEditing: jest.Mock;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TextEditorSGComponent],
			providers: [TranslateService],
			imports: [TranslateModule.forRoot(), MaterialDesignModule, ReactiveFormsModule]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TextEditorSGComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		stopEditing = jest.fn();
		params = {
			value: "TestValueOriginal",
			stopEditing: () => stopEditing()
		} as ICellEditorParamsSG<IEditorTextValidator>;
		component.agInit(params);
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("check maxLength values", () => {
		const newParams = {
			...params,
			validator: {
				maxLength: 3000
			}
		} as ICellEditorParamsSG<IEditorTextValidator>;
		component.agInit(newParams);
		expect(component.maxLength).toBe(newParams.validator.maxLength);
	});

	it("check initial values", () => {
		const getValue = component.getValue();
		expect(getValue).toBe(params.value);
		expect(component.isPopup()).toBe(false);
	});

	it("save action should return a new value", () => {
		const newValue = "NewValue";
		component.frm.setValue(newValue);
		component.save();
		let getValue = component.getValue();
		expect(getValue).toBe(newValue);
		getValue = component.getValue();
		expect(getValue).not.toBe(params.value);
		expect(stopEditing.mock.calls.length).toBe(1);
	});

	it("cancel action should return the original value", () => {
		const newValue = "NewValue";
		component.frm.setValue(newValue);
		component.cancel();
		let getValue = component.getValue();
		expect(getValue).toBe(params.value);
		getValue = component.getValue();
		expect(getValue).not.toBe(newValue);
		expect(stopEditing.mock.calls.length).toBe(1);
	});

	it("stop propagation key event", () => {
		const stopF = jest.fn();
		const event = { stopPropagation: stopF as ()=> void} as Event;
		component.onKey(event);
		expect(stopF).toBeCalled();
	});

});
