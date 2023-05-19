import { AgGridModule } from "@ag-grid-community/angular";
import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ModalWindowStyleFixDirective } from "..";
import { StaticGridStateComponent } from "../../../components/static-state/static-state.component";
import { StaticGridComponent } from "../../../components/main/comp";
import { ColumnControllerSGDirective } from "../../../components/main/directives/column.directive";
import { FilterControllerSGDirective } from "../../../components/main/directives/filter.directive";
import { SelectControllerSGDirective } from "../../../components/main/directives/select.directive";
import { SortControllerSGDirective } from "../../../components/main/directives/sort.directive";
import { getSpyOnEventAfterGridReady } from "../../base/_spec/base-test-utils";

@Component({
	template: `
		<static-grid-state modalWindowStyleFix=""></static-grid-state>
		<div id="agGridTable"><div>`
})
class StaticGridStateWrapperComponent {
	@ViewChild(StaticGridStateComponent, { static: true })
	public staticGridState: StaticGridStateComponent;

	@ViewChild(ModalWindowStyleFixDirective, { static: true })
	public modalWindowStyleFixDirective: ModalWindowStyleFixDirective;
}

describe("[Directive]: ModalWindowStyleFixDirective", () => {
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
				ModalWindowStyleFixDirective,
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
		fixture.detectChanges();
	});

	it("should compile", () => {
		window.dispatchEvent(new Event("resize"));
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it("should call onGridReady when grid ready", () => {
		const styleDirective = component.modalWindowStyleFixDirective;
		const gridWrapper = component.staticGridState;
		const onGridReadySpyOnEvent = getSpyOnEventAfterGridReady(styleDirective, gridWrapper);

		expect(onGridReadySpyOnEvent).toHaveBeenCalled();
	});
});
