import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";
import { StaticGridComponent } from "../../comp";
import { ColDef, GridOptions, SortChangedEvent } from "@ag-grid-community/core";
import { AgGridModule } from "@ag-grid-community/angular";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { SortControllerSGDirective } from "../sort.directive";
import { GridMode } from "../../entity";

declare const expect: jest.Expect;

@Component({
	template: `
		<static-grid sortControllerSG="" [sortModel]="sortModel"></static-grid>
	`
})
class TestComponent {

	@ViewChild(SortControllerSGDirective, { static: true })
	public sortController: SortControllerSGDirective;

	columnApi: any = {
		setRowGroupColumns() { },
		setColumnState() { },
		getAllDisplayedColumns() {
			return [] as ColDef[];
		},
		getColumnState() {
			return [];
		}
	};

	gridApi: any = {
		getFilterModel() {
			return [];
		},
		setFilterModel() { },
		getSortModel() { },
		setSortModel() { }
	};


	gridOptions = {
		onSortChanged() { }
	} as GridOptions;

	mode = GridMode.StaticMode;
}

describe("Static Grid Sort Controller", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot(), AgGridModule.withComponents([])],
			providers: [TranslateService],
			declarations: [
				StaticGridComponent,
				TestComponent,
				SortControllerSGDirective
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		component.sortController.init(
			component.gridOptions,
			component.gridApi,
			component.columnApi,
			component.mode
		);
		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("should return sortModel", () => {
		component.sortController.sortModel = [];
		const sortModel = component.sortController.sortModel;
		expect(sortModel).toMatchSnapshot();
	});

	it("should be called setSortModel", () => {
		const spyOnGetColumnState = jest.spyOn(component.columnApi, "getColumnState");
		component.sortController.sortModel = [];
		expect(spyOnGetColumnState).toHaveBeenCalled();
	});

	it("should call change event if sort model is changed", () => {
		const spyOnSetSortModel = jest.spyOn(component.sortController.sortModelChange, "next");
		component.gridOptions.onSortChanged({} as SortChangedEvent);
		expect(spyOnSetSortModel).toHaveBeenCalled();
	});
});
