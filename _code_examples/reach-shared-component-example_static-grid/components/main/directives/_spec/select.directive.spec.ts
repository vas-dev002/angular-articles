import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";
import { StaticGridComponent } from "../../comp";
import { ColDef, GridOptions, SelectionChangedEvent, GridApi, ColumnApi, Column, RowNode } from "@ag-grid-community/core";
import { AgGridModule } from "@ag-grid-community/angular";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { SelectControllerSGDirective } from "../select.directive";
import { DataIdTypeSG, GridMode } from "../../..";

@Component({
	template: `
		<static-grid selectControllerSG="" [options]="{enableCheckBox: true}"></static-grid>
	`
})
class TestComponent {

	@ViewChild(SelectControllerSGDirective, { static: true })
	public selectController: SelectControllerSGDirective;

	columnApi = {
		setColumnVisible: (key: string | Column, visible: boolean) => { }
	} as ColumnApi;

	gridApi = {
		getSelectedRows() { return []; },
		selectAllFiltered() { },
		deselectAllFiltered() { },
		forEachNode(callback: (rowNode: RowNode, index: number) => void) { }
	} as GridApi;

	mode = GridMode.StaticMode;
}

describe("Static Grid Sort Controller", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let gridOptions: GridOptions;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot(), AgGridModule.withComponents([])],
			providers: [TranslateService],
			declarations: [
				StaticGridComponent,
				TestComponent,
				SelectControllerSGDirective
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		gridOptions = {
			columnApi: component.columnApi,
			columnDefs: []
		};
		component.selectController.init(
			gridOptions,
			component.gridApi,
			component.columnApi,
			component.mode
		);
		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("should subscribe on selection event", () => {
		const spyOn = jest.spyOn(component.selectController.selectedDataRowsChange, "next");
		const event = gridOptions.onSelectionChanged;
		expect(gridOptions.onSelectionChanged).toBeDefined();
		event({ type: "api" } as SelectionChangedEvent);
		expect(spyOn).toHaveBeenCalledTimes(0);
		event({ type: "manual" } as SelectionChangedEvent);
	});

	describe("show checkboxes", () => {
		it("should return showCheckboxes", () => {
			component.selectController.showCheckboxes = true;
			const res = component.selectController.showCheckboxes;
			expect(res).toBe(true);
		});

		it("should update checkbox visibility", () => {
			const spyOn = jest.spyOn(component.columnApi, "setColumnVisible");
			component.selectController.showCheckboxes = true;
			expect(spyOn).toHaveBeenCalled();
			expect(spyOn).toHaveBeenCalledWith("0", true);
		});

		it("should update checkbox visibility - case when drag and drop was enabled", () => {
			component.selectController.host.options.enableRowDragAndDrop = true;
			const spyOn = jest.spyOn(component.columnApi, "setColumnVisible");
			component.selectController.showCheckboxes = true;
			expect(spyOn).toHaveBeenCalled();
			expect(spyOn).toHaveBeenCalledWith("1", true);
		});
	});

	describe("select / deselect all filtered rows", () => {
		it("should select all rows", () => {
			const spyOn = jest.spyOn(component.gridApi, "selectAllFiltered");
			component.selectController.selectAllRows();
			expect(spyOn).toHaveBeenCalled();
		});

		it("should select all rows", () => {
			const spyOn = jest.spyOn(component.gridApi, "deselectAllFiltered");
			component.selectController.deselectAllRows();
			expect(spyOn).toHaveBeenCalled();
		});
	});

	describe("set selected rows", () => {
		it("should skip updating if data is empty", () => {
			const dataIds: DataIdTypeSG[] = [1, 2, 3];
			const rowNode = {
				setSelected(newValue: boolean, clearSelection?: boolean, suppressFinishActions?: boolean) { }
			} as RowNode;
			component.gridApi.forEachNode = (callback) => {
				callback(rowNode, 0);
			};
			const spyOn = jest.spyOn(rowNode, "setSelected");
			component.selectController.selectedDataIds = dataIds;
			expect(spyOn).toHaveBeenCalledTimes(0);
		});

		it("should update row selection", () => {
			const dataIds: DataIdTypeSG[] = [1, 2, 3];
			const rowNode = {
				setSelected(newValue: boolean, clearSelection?: boolean, suppressFinishActions?: boolean) { },
				data: {
					[component.selectController.host.dataKey]: 2
				}
			} as RowNode;
			component.gridApi.forEachNode = (callback) => {
				callback(rowNode, 0);
			};
			const spyOn = jest.spyOn(rowNode, "setSelected");
			component.selectController.selectedDataIds = dataIds;
			expect(spyOn).toHaveBeenCalledTimes(1);
		});

		it("should skip updating if the same ids are selected", () => {
			const dataIds: DataIdTypeSG[] = [1, 2, 3];
			const rowNode = {
				setSelected(newValue: boolean, clearSelection?: boolean, suppressFinishActions?: boolean) { },
				data: {
					[component.selectController.host.dataKey]: 2
				}
			} as RowNode;
			component.gridApi.forEachNode = (callback) => {
				callback(rowNode, 0);
			};
			component.selectController.selectedDataIds = dataIds;
			const spyOn = jest.spyOn(rowNode, "setSelected");
			component.selectController.selectedDataIds = [...dataIds];
			expect(spyOn).toHaveBeenCalledTimes(0);
		});
	});

});
