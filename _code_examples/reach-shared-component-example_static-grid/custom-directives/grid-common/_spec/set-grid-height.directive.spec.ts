import { Component, ViewChild, Self } from "@angular/core";
import { StaticGridStateComponent } from "../../../components/static-state/static-state.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AgGridModule } from "@ag-grid-community/angular";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { FilterControllerSGDirective } from "../../../components/main/directives/filter.directive";
import { ColumnControllerSGDirective } from "../../../components/main/directives/column.directive";
import { SortControllerSGDirective } from "../../../components/main/directives/sort.directive";
import { SelectControllerSGDirective } from "../../../components/main/directives/select.directive";
import { StaticGridComponent } from "../../../components/main/comp";
import { ServiceSGDictionary } from "../../../components/main-service/entity";
import { StaticGridServiceComponent } from "../../../components/main-service/main-service.component";
import { StaticGridService } from "../../../components/main-service/static-grid.service";
import { GridHeightStyleFixDirective } from "../grid-height-style-fix.directive";
import { getSpyOnEventAfterGridReady } from "../../base/_spec/base-test-utils";
import { By } from "@angular/platform-browser";

@Component({
	template: `<static-grid-state id="agGridTable" gridHeightStyleFix=""></static-grid-state>`
})
class StaticGridStateWrapperComponent {
	@ViewChild(StaticGridStateComponent, { static: true })
	public staticGridState: StaticGridStateComponent;

	@ViewChild(GridHeightStyleFixDirective, { static: true })
	public gridHeightStyleFixDirective: GridHeightStyleFixDirective;
}

describe("[Directive]: GridHeightStyleFixDirective", () => {
	let store: MockStore<any>;
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
				GridHeightStyleFixDirective,
				FilterControllerSGDirective,
				ColumnControllerSGDirective,
				SortControllerSGDirective,
				SelectControllerSGDirective,
				StaticGridComponent,
				StaticGridStateComponent
			]
		});
		store = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(StaticGridStateWrapperComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("should call onGridReady when grid ready", () => {
		const styleDirective = component.gridHeightStyleFixDirective;
		const gridWrapper = component.staticGridState;
		const onGridReadySpyOnEvent = getSpyOnEventAfterGridReady(styleDirective, gridWrapper);

		expect(onGridReadySpyOnEvent).toHaveBeenCalled();
	});

	it("[Method: setGridHeight]", () => {
		window.dispatchEvent(new Event("resize"));
		fixture.detectChanges();
		const tableWrap = fixture.debugElement.query(By.css("#agGridTable")).nativeElement;
		const result = `${window.innerHeight - tableWrap.getBoundingClientRect().top}px`;

		expect(tableWrap.style.height).toBe(result);
	});
});

@Component({
	template: `
		<static-grid-service
			gridHeightStyleFix=""
			[options]="{ disableGroupBy: true }">
		</static-grid-service>`,
	viewProviders: [{
		provide: ServiceSGDictionary,
		useValue: new ServiceSGDictionary([])
	}]
})
class StaticGridServiceWrapperComponent {
	@ViewChild(StaticGridServiceComponent, { static: true })
	public staticGridState: StaticGridServiceComponent;

	@ViewChild(GridHeightStyleFixDirective, { static: true })
	public setStateGridHeightCommonDirective: GridHeightStyleFixDirective;

	constructor(@Self() private readonly srvDictionary: ServiceSGDictionary) {
		const randomKey = "static-grid-key";

		if (!this.srvDictionary.has(randomKey)) {
			this.srvDictionary.add(randomKey, new StaticGridService());
		}
	}
}

describe("Set grid height directive with grid service wrapper", () => {
	let store: MockStore<any>;
	const initialState = {
		details: {
			staticGrid: {
				options: {}
			}
		}
	};
	let component: StaticGridServiceWrapperComponent;
	let fixture: ComponentFixture<StaticGridServiceWrapperComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				AgGridModule.withComponents([])
			],
			providers: [
				provideMockStore({ initialState }),
				TranslateService,
				StaticGridService
			],
			declarations: [
				StaticGridServiceWrapperComponent,
				StaticGridComponent,
				StaticGridServiceComponent,
				GridHeightStyleFixDirective,
				FilterControllerSGDirective,
				ColumnControllerSGDirective,
				SortControllerSGDirective,
				SelectControllerSGDirective
			]
		}).compileComponents();
		store = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(StaticGridServiceWrapperComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});
});
