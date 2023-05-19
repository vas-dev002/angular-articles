import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";
import { StaticGridComponent } from "../../comp";
import { GridOptions, RowNode, GridApi, ColumnApi, Column } from "@ag-grid-community/core";
import { AgGridModule } from "@ag-grid-community/angular";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { FilterControllerSGDirective } from "../filter.directive";
import { ColumnState } from "@ag-grid-community/core/dist/es6/columnController/columnController";
import { GridMode, ISelectedFilters } from "../../..";

@Component({
	template: `
		<static-grid
			filterControllerSG=""
            [selectedFilters]="selectedFilters"
            ></static-grid>`
})
class TestComponent {
	@ViewChild(FilterControllerSGDirective, { static: true })
	public filterController: FilterControllerSGDirective;

	columnApi = {
		setRowGroupColumns(colKeys: (string | Column)[]) { },
		setColumnState(columnState: ColumnState[]) { },
		getAllDisplayedColumns() {
			return [] as Column[];
		},
		getColumnState() {
			return [];
		}
	} as ColumnApi;

	gridApi = {
		getFilterModel() {
			return [];
		},
		setFilterModel(model) { },
		forEachNodeAfterFilter(callback: (rowNode: RowNode, index: number) => void) { },
		onFilterChanged() { }
	} as unknown as GridApi;

	gridOptions = {
		columnApi: this.columnApi,
		columnDefs: []
	} as GridOptions;

	mode = GridMode.StaticMode;
}

describe("Static Grid Filter Controller", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot(), AgGridModule.withComponents([])],
			providers: [TranslateService],
			declarations: [
				StaticGridComponent,
				TestComponent,
				FilterControllerSGDirective
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		component.filterController.init(
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

	it("should return selectedFilters when the values are equal", () => {
		const value: ISelectedFilters = {
			"key": {
				type: "type",
				filter: "filter",
				filterType: "filterType"
			}
		};
		const newGridApi = {
			getFilterModel() {
				return value;
			},
			setFilterModel(model) { },
			forEachNodeAfterFilter(callback: (rowNode: RowNode, index: number) => void) { },
			onFilterChanged() { }
		} as GridApi;

		component.filterController.init(
			component.gridOptions,
			newGridApi,
			component.columnApi,
			component.mode
		);
		component.filterController.selectedFilters = value;
		const selectedFilters = component.filterController.selectedFilters;
		expect(selectedFilters).toMatchSnapshot();
	});

	it("should return selectedFilters", () => {
		component.filterController.selectedFilters = {};
		const selectedFilters = component.filterController.selectedFilters;
		expect(selectedFilters).toMatchSnapshot();
	});

	it("should be called onFilterChanged", () => {
		const onFilterChanged = component.gridOptions.onFilterChanged(null);
		expect(onFilterChanged).toMatchSnapshot();
	});

	it("should return the right numbers of displayed rows", () => {
		const nodes = [
			{ group: false }, { group: false }, { group: true }
		] as RowNode[];
		component.gridApi.forEachNodeAfterFilter = (callback) => {
			nodes.forEach(callback);
		};
		const spyOn = jest.spyOn(component.gridApi, "forEachNodeAfterFilter");
		const res = component.filterController.getDisplayedRowCount();
		expect(spyOn).toHaveBeenCalled();
		expect(res).not.toBe(nodes.length);
		expect(res).toBe(2);
	});

	describe("set custom filter", () => {
		it("should return custom filter", () => {
			component.filterController.customFilterRules = () => true;
			const res = component.filterController.customFilterRules;
			expect(res).toBeDefined();
			expect(res({} as RowNode)).toBe(true);
		});

		it("should set custom rules", () => {
			component.filterController.customFilterRules = () => true;
			expect(component.gridOptions.isExternalFilterPresent).toBeDefined();
			expect(component.gridOptions.isExternalFilterPresent()).toBe(true);
			expect(component.gridOptions.doesExternalFilterPass).toBeDefined();
			expect(component.gridOptions.doesExternalFilterPass({} as RowNode)).toBe(true);
		});

		it("should reapply filters", () => {
			const spyOn = jest.spyOn(component.gridApi, "onFilterChanged");
			component.filterController.customFilterRules = () => true;
			expect(spyOn).toHaveBeenCalledTimes(1);
		});

		it("should reset custom rules", () => {
			component.gridOptions.isExternalFilterPresent = () => true;
			component.gridOptions.doesExternalFilterPass = () => true;
			component.filterController.customFilterRules = null;
			expect(component.gridOptions.isExternalFilterPresent).toBeDefined();
			expect(component.gridOptions.isExternalFilterPresent()).toBe(false);
			expect(component.gridOptions.doesExternalFilterPass).toBe(null);
		});

		it("should not call getDisplayedRowCount when grid mode is not StaticMode", () => {
			const spyOnGetDisplayedRowCount = jest.spyOn(component.filterController, "getDisplayedRowCount");
			component.mode = GridMode.DynamicMode;

			component.filterController.init(
				component.gridOptions,
				component.gridApi,
				component.columnApi,
				component.mode
			);
			component.gridOptions.onFilterChanged(null);

			expect(spyOnGetDisplayedRowCount).toHaveBeenCalledTimes(0);
		});
	});
});
