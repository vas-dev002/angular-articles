import { AgGridModule } from "@ag-grid-community/angular";
import { Component, ViewChild, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { provideMockStore } from "@ngrx/store/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { StaticGridStateComponent } from "../../../components/static-state/static-state.component";
import { StaticGridComponent } from "../../../components/main/comp";
import { ColumnControllerSGDirective } from "../../../components/main/directives/column.directive";
import { FilterControllerSGDirective } from "../../../components/main/directives/filter.directive";
import { SelectControllerSGDirective } from "../../../components/main/directives/select.directive";
import { SortControllerSGDirective } from "../../../components/main/directives/sort.directive";
import { getSpyOnEventAfterGridReady } from "../../base/_spec/base-test-utils";
import { GridWithActionBarHeightStyleFixDirective } from "../action-bar-style-fix.directive";

@Component({
	template: `
		<static-grid-state gridWithActionBarHeightStyleFix=""></static-grid-state>
		<div *ngIf="showTable" id="agGridTable"></div>
		<div class="actions"></div>`
})
class StaticGridStateWrapperComponent {
	@Input() showTable: boolean;
	@ViewChild(StaticGridStateComponent, { static: true })
	public staticGridState: StaticGridStateComponent;

	@ViewChild(GridWithActionBarHeightStyleFixDirective, { static: true })
	public gridWithActionBarHeightStyleFixDirective: GridWithActionBarHeightStyleFixDirective;
}

describe("[Directive]: GridWithActionBarHeightStyleFixDirective", () => {
	const initialState = {
		details: {
			staticGrid: {
				options: {}
			}
		}
	};
	let component: StaticGridStateWrapperComponent;
	let fixture: ComponentFixture<StaticGridStateWrapperComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				AgGridModule.withComponents([])
			],
			providers: [
				provideMockStore({ initialState }),
				TranslateService
			],
			declarations: [
				StaticGridStateWrapperComponent,
				GridWithActionBarHeightStyleFixDirective,
				FilterControllerSGDirective,
				ColumnControllerSGDirective,
				SortControllerSGDirective,
				SelectControllerSGDirective,
				StaticGridComponent,
				StaticGridStateComponent
			]
		});

		fixture = TestBed.createComponent(StaticGridStateWrapperComponent);
		component = fixture.componentInstance;
		component.showTable = true;
		fixture.detectChanges();
	});

	it("should compile", () => {
		window.dispatchEvent(new Event("resize"));
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it("should call onGridReady when grid ready", () => {
		const styleDirective = component.gridWithActionBarHeightStyleFixDirective;
		const gridWrapper = component.staticGridState;
		const onGridReadySpyOnEvent = getSpyOnEventAfterGridReady(styleDirective, gridWrapper);

		expect(onGridReadySpyOnEvent).toHaveBeenCalled();
	});

	it("should calculate grid height", () => {
		window.dispatchEvent(new Event("resize"));
		fixture.detectChanges();
		const tableWrap = fixture.debugElement.query(By.css("#agGridTable")).nativeElement;
		const actionsWrap = fixture.debugElement.query(By.css(".actions")).nativeElement;
		const borderIndent = 1;
		const containerHeight = `${actionsWrap.getBoundingClientRect().top - tableWrap.getBoundingClientRect().top - borderIndent}px`;
		const result = `${containerHeight}`;

		expect(tableWrap.style.height).toBe(result);
	});

	it("should not calculate grid height when there is no table", () => {
		component.showTable = false;
		window.dispatchEvent(new Event("resize"));
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#agGridTable"))).toBe(null);
	});
});
