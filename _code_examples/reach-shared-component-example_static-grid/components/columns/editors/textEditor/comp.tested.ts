import { Component } from "@angular/core";
import { ICellEditorAngularComp } from "@ag-grid-community/angular";
import { FormControl } from "@angular/forms";
import { ICellEditorParamsSG } from "../../..";
import { IEditorTextValidator } from "./text-editor.entity";

@Component({
	selector: "text-editor-sg",
	styleUrls: ["style.scss"],
	templateUrl: "tpl.html"
})
export class TextEditorSGComponent implements ICellEditorAngularComp {
	public frm: FormControl = new FormControl("");
	private originalValue: string;
	public maxLength: number;
	private params: ICellEditorParamsSG<IEditorTextValidator>;
	public getValue() {
		return this.frm.value;
	}
	public isPopup() {
		return false;
	}

	public agInit(params: ICellEditorParamsSG<IEditorTextValidator>) {
		this.originalValue = params.value;
		this.frm.setValue(params.value);
		this.maxLength = !!params.validator ? params.validator.maxLength : 5000;
		this.params = params;
	}

	public onKey(event: Event) {
		event.stopPropagation();
	}

	public save() {
		this.params.stopEditing();
	}

	public cancel() {
		this.frm.setValue(this.originalValue);
		this.params.stopEditing();
	}
}
