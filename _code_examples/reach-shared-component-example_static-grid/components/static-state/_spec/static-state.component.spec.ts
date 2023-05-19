import { TestBed, waitForAsync, ComponentFixture } from "@angular/core/testing";
import { onDestroyTest } from "../../../../../../evergreen-shared/utils/common-tests/component.tests";

import { BehaviorSubject, of } from "rxjs";

import { StaticGridStateComponent } from "../static-state.component";
import { StaticGridComponent } from "../../main/comp";
import { GridMode } from "../..";
import { MainGridStateService } from "../main-state.service";
import { StaticGridStateService } from "../static-state.service";

declare const expect: jest.Expect;

describe("StaticGridStateComponent", () => {
	let component: StaticGridStateComponent;
	let fixture: ComponentFixture<StaticGridStateComponent>;
	let mainGridStateService: MainGridStateService;
	let staticGridStateService: StaticGridStateService;

	const mainGridStateServiceMock = {
		options$: of({}),
		grid: null,
		setGridMode: jest.fn(),
		showCheckboxes$: new BehaviorSubject(false),
		gridReady$: new BehaviorSubject(null),
		initActions: jest.fn(),
		setStaticGridReadyStatus: jest.fn(),
		customFilterRulesChanges$: new BehaviorSubject(null),
		setGroupColumns: jest.fn(),
		setFilters: jest.fn(),
		visibleColumnsChange: jest.fn(),
		columnStateChange: jest.fn(),
		sortModelChange: jest.fn(),
		selectedDataRowsChange: jest.fn()
	};
	const staticGridStateServiceMock = {
		data$: of([]),
		hasData: jest.fn(),
		dragAndDropUpdate: jest.fn(),
		onCellUpdate: jest.fn(),
		displayedRowsCountChange: jest.fn()
	};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [
				StaticGridStateComponent
			],
			providers: [
				{
					provide: MainGridStateService,
					useValue: mainGridStateServiceMock
				},
				{
					provide: StaticGridStateService,
					useValue: staticGridStateServiceMock
				}
			]
		}).overrideComponent(StaticGridStateComponent, {
			set: {
				providers: [
					{
						provide: MainGridStateService,
						useValue: mainGridStateServiceMock
					},
					{
						provide: StaticGridStateService,
						useValue: staticGridStateServiceMock
					}
				],
				template: "<span></span>"
			}
		});

		mainGridStateService = TestBed.inject(MainGridStateService);
		staticGridStateService = TestBed.inject(StaticGridStateService);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StaticGridStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should compile StaticGridStateComponent", () => {
		expect(component).toBeTruthy();
	});

	describe("Function [ngOnInit]", () => {
		it("should call setGridMode method", () => {
			component.ngOnInit();

			expect(mainGridStateServiceMock.setGridMode).toHaveBeenCalledWith(GridMode.StaticMode);
		});
	});

	describe("Function [onReady]", () => {
		it("should be initialized on static-grid initialization event", () => {
			const spyOnNext = jest.spyOn(mainGridStateServiceMock.gridReady$, "next");
			const staticGrid = {} as unknown as StaticGridComponent;

			component.onReady(staticGrid);

			expect(spyOnNext).toHaveBeenCalledWith(staticGrid);
			expect(mainGridStateServiceMock.initActions).toHaveBeenCalled();
			expect(mainGridStateServiceMock.setStaticGridReadyStatus).toHaveBeenCalledWith(true);
		});
	});

	describe("Function [ngOnDestroy]", () => {
		it("should call methods on destroy component", () => {
			const staticGrid = {} as unknown as StaticGridComponent;

			component.ngOnDestroy();

			onDestroyTest(component);
			expect(staticGridStateServiceMock.dragAndDropUpdate).toHaveBeenCalledWith(null);
			expect(mainGridStateServiceMock.setStaticGridReadyStatus).toHaveBeenCalledWith(false);
		});
	});

	describe("Function [setGroupColumns]", () => {
		it("should call mainGridStateService.setGroupColumns", () => {
			component.setGroupColumns([]);
			expect(mainGridStateServiceMock.setGroupColumns).toHaveBeenCalledWith([]);
		});
	});

	describe("Function [setFilters]", () => {
		it("should call mainGridStateService.setFilters", () => {
			component.setFilters({});
			expect(mainGridStateServiceMock.setFilters).toHaveBeenCalledWith({});
		});
	});

	describe("Function [displayedRowsCountChange]", () => {
		it("should call mainGridStateService.displayedRowsCountChange", () => {
			component.displayedRowsCountChange(10);
			expect(staticGridStateServiceMock.displayedRowsCountChange).toHaveBeenCalledWith(10);
		});
	});

	describe("Function [visibleColumnsChange]", () => {
		it("should call mainGridStateService.visibleColumnsChange", () => {
			component.visibleColumnsChange([]);
			expect(mainGridStateServiceMock.visibleColumnsChange).toHaveBeenCalledWith([]);
		});
	});

	describe("Function [columnStateChange]", () => {
		it("should call mainGridStateService.columnStateChange", () => {
			component.columnStateChange([]);
			expect(mainGridStateServiceMock.columnStateChange).toHaveBeenCalledWith([]);
		});
	});

	describe("Function [sortModelChange]", () => {
		it("should call mainGridStateService.sortModelChange", () => {
			component.sortModelChange([]);
			expect(mainGridStateServiceMock.sortModelChange).toHaveBeenCalledWith([]);
		});
	});

	describe("Function [selectedDataRowsChange]", () => {
		it("should call mainGridStateService.selectedDataRowsChange", () => {
			component.selectedDataRowsChange([]);
			expect(mainGridStateServiceMock.selectedDataRowsChange).toHaveBeenCalledWith([]);
		});
	});

	describe("Function [dragAndDropUpdate]", () => {
		it("should call mainGridStateService.dragAndDropUpdate", () => {
			component.dragAndDropUpdate(null);
			expect(staticGridStateServiceMock.dragAndDropUpdate).toHaveBeenCalledWith(null);
		});
	});

	describe("Function [onCellUpdate]", () => {
		it("should call mainGridStateService.onCellUpdate", () => {
			component.onCellUpdate(null);
			expect(staticGridStateServiceMock.onCellUpdate).toHaveBeenCalledWith(null);
		});
	});

});
