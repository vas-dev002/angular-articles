import { TestBed, ComponentFixture, inject } from "@angular/core/testing";
import { ColumnControllerSGDirective } from "../column.directive";
import { Component, ViewChild } from "@angular/core";
import { StaticGridComponent } from "../../comp";
import { Column, ColDef, GridOptions, GridApi, ColumnRowGroupChangedEvent } from "@ag-grid-community/core";
import { AgGridModule } from "@ag-grid-community/angular";
import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { GridMode } from "../../entity";

@Component({
	template: `
		<static-grid
			columnControllerSG=""
			[selectedGroupColumns]="selectedGroupColumns"
		></static-grid>
	`
})
class TestComponent {
	@ViewChild(ColumnControllerSGDirective, { static: true })
	public colController: ColumnControllerSGDirective;

	columnApi: any = {
		setRowGroupColumns() {},
		setColumnState() {},
		getAllDisplayedColumns() {
			return [
				{
					getColDef() {
						return {
							suppressMenu: false,
							suppressColumnsToolPanel: false // ag-grid Warning
						};
					},
					getColId() {
						return "0";
					}
				}
			] as Column[];
		},
		getColumnState() {
			return [];
		},
		getRowGroupColumns() { return []; }
	};

	gridOptions = {
		columnApi: this.columnApi,
		columnDefs: [
			{ lockVisible: false, hide: false, field: "0" },
			{ lockVisible: false, hide: false, field: "1" }
		] as ColDef[],
		onColumnRowGroupChanged() {},
		onColumnResized() {}
	} as GridOptions;

	mode = GridMode.StaticMode;
}

describe("Static Grid Column Controller", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot(), AgGridModule.withComponents([])],
			providers: [TranslateService],
			declarations: [
				StaticGridComponent,
				TestComponent,
				ColumnControllerSGDirective
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		component.colController.init(
			component.gridOptions,
			{} as GridApi,
			component.columnApi,
			component.mode
		);
		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("should be called setRowGroupColumns", () => {
		const spyOnInstant = jest.spyOn(component.columnApi, "setRowGroupColumns");
		component.colController.selectedGroupColumns = [];
		expect(spyOnInstant).toHaveBeenCalled();
	});

	it("should be called setColumnState", () => {
		const spyOnInstant = jest.spyOn(component.columnApi, "setColumnState");
		component.colController.columnState = [
			{} as ColumnState,
			{} as ColumnState
		];
		expect(spyOnInstant).toHaveBeenCalled();
	});

	it("should return getVisibleColumns", () => {
		const res = component.colController.getVisibleColumns();
		expect(res).toMatchSnapshot();
	});

	it("should return selectedGroupColumns", () => {
		component.colController.selectedGroupColumns = [];
		const selectedGroupColumns = component.colController.selectedGroupColumns;
		expect(selectedGroupColumns).toMatchSnapshot();
	});


	it("should return columnState", () => {
		component.colController.columnState = [
			{} as ColumnState,
			{} as ColumnState
		];
		const columnState = component.colController.columnState;
		expect(columnState).toMatchSnapshot();

		const d = new ColumnControllerSGDirective({} as StaticGridComponent);
		expect(d).toMatchSnapshot();
	});

	it("should return ColumnControllerSGDirective", () => {
		const d = new ColumnControllerSGDirective({} as StaticGridComponent);
		expect(d).toMatchSnapshot();
	});

	it("should return columnApi.getColumnState", () => {
		const getColumnState = component.columnApi.getColumnState();
		expect(getColumnState).toMatchSnapshot();
	});

	it("should return gridOptions.onColumnRowGroupChanged", () => {
		const onColumnRowGroupChanged = component.gridOptions.onColumnRowGroupChanged(
			{ source : {}} as ColumnRowGroupChangedEvent);
		expect(onColumnRowGroupChanged).toMatchSnapshot();
	});

	it("should return gridOptions.onColumnResized", () => {
		const onColumnResized = component.gridOptions.onColumnResized(null);
		expect(onColumnResized).toMatchSnapshot();
	});
});
