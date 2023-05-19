import { Component, Directive, Self, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StaticGridStateComponent } from "../../../components/static-state/static-state.component";
import { BaseGridStyleDirective } from "../base-grid-style.directive";
import { AgGridModule } from "@ag-grid-community/angular";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { StaticGridComponent } from "../../../components/main/comp";
import { FilterControllerSGDirective } from "../../../components/main/directives/filter.directive";
import { ColumnControllerSGDirective } from "../../../components/main/directives/column.directive";
import { SortControllerSGDirective } from "../../../components/main/directives/sort.directive";
import { SelectControllerSGDirective } from "../../../components/main/directives/select.directive";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { StaticGridServiceComponent } from "../../../components/main-service/main-service.component";
import { ServiceSGDictionary } from "../../../components/main-service/entity";
import { StaticGridService } from "../../../components/main-service/static-grid.service";

@Directive({
	selector: "[testDirective]"
})
class TestDirective extends BaseGridStyleDirective {
	onGridReady() {}
}

@Component({
	template: `
		<div testDirective=""></div>
		<static-grid-state testDirective=""></static-grid-state>
		<static-grid-service testDirective="" [options]="{ disableGroupBy: true }"></static-grid-service>
	`,
	viewProviders: [{
		provide: ServiceSGDictionary,
		useValue: new ServiceSGDictionary([])
	}]
})
class TestComponent {
	@ViewChild(StaticGridStateComponent, { static: true })
	public staticGridState: StaticGridStateComponent;

	@ViewChild(StaticGridServiceComponent, { static: true })
	public staticGridService: StaticGridServiceComponent;

	@ViewChild(TestDirective, { static: true })
	public myTestDirective: TestDirective;

	constructor(@Self() private readonly srvDictionary: ServiceSGDictionary) {
		const randomKey = "static-grid-key";

		if (!this.srvDictionary.has(randomKey)) {
			this.srvDictionary.add(randomKey, new StaticGridService());
		}
	}
}

describe("Base grid style directive", () => {
	let store: MockStore<any>;
	const initialState = {
		details: {
			staticGrid: {
				options: {}
			}
		}
	};
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

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
				TestComponent,
				TestDirective,

				FilterControllerSGDirective,
				ColumnControllerSGDirective,
				SortControllerSGDirective,
				SelectControllerSGDirective,

				StaticGridComponent,
				StaticGridStateComponent,
				StaticGridServiceComponent
			]
		});
		store = TestBed.inject(MockStore);

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it("should compile", () => {
		expect(component).toBeTruthy();
	});

	it("should call on destory function in base directive component when fixture destroyed", () => {
		const spyOnEvent = jest.spyOn(component.myTestDirective, "ngOnDestroy");
		fixture.destroy();
		expect(spyOnEvent).toHaveBeenCalled();
	});
});
