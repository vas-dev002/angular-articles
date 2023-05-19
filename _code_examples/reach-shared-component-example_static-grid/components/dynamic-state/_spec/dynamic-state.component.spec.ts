import { TestBed, waitForAsync, ComponentFixture } from "@angular/core/testing";
import { BehaviorSubject, of } from "rxjs";

import { StaticGridComponent } from "../../main/comp";
import { GridMode } from "../..";
import { onDestroyTest } from "../../../../../../evergreen-shared/utils/common-tests/component.tests";
import { DynamicGridStateComponent } from "../dynamic-state.component";
import { DynamicGridStateService } from "../dynamic-state.service";
import { MainGridStateService } from "../../static-state/main-state.service";
import { DynamicGridKeySetIdService } from "../dynamic-grid-key-set-id.service";
declare const expect: jest.Expect;

describe("StaticGridStateComponent", () => {
	let component: DynamicGridStateComponent;
	let fixture: ComponentFixture<DynamicGridStateComponent>;
	let mainGridStateService: MainGridStateService;
	let dynamicGridStateService: DynamicGridStateService;

	const dataUrl = "get/data";

	const mainGridStateServiceMock = {
		options$: of({}),
		grid: null,
		setGridMode: jest.fn(),
		showCheckboxes$: new BehaviorSubject(false),
		gridReady$: new BehaviorSubject(null),
		customFilterRulesChanges$: new BehaviorSubject(null),
		initActions: jest.fn(),
		setStaticGridReadyStatus: jest.fn(),
		setGroupColumns: jest.fn(),
		setFilters: jest.fn(),
		visibleColumnsChange: jest.fn(),
		columnStateChange: jest.fn(),
		sortModelChange: jest.fn(),
		selectedDataRowsChange: jest.fn()
	};
	const dynamicGridStateServiceMock = {
		dynamicOptions$: of({
			dataUrl
		}),
		hasData: jest.fn(),
		getTotalRowsCount: jest.fn(),
		metadataRequest: jest.fn(),
		clearGridState: jest.fn(),
		dataSource: jest.fn().mockReturnValue({}),
		onLoadingRows: jest.fn(),
		onRefreshDataAction: jest.fn()
	};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [
				DynamicGridStateComponent
			],
			providers: [
				{
					provide: MainGridStateService,
					useValue: mainGridStateServiceMock
				},
				{
					provide: DynamicGridStateService,
					useValue: dynamicGridStateServiceMock
				},
				DynamicGridKeySetIdService
			]
		}).overrideComponent(DynamicGridStateComponent, {
			set: {
				providers: [
					{
						provide: MainGridStateService,
						useValue: mainGridStateServiceMock
					},
					{
						provide: DynamicGridStateService,
						useValue: dynamicGridStateServiceMock
					},
					DynamicGridKeySetIdService
				],
				template: "<span></span>"
			}
		});

		mainGridStateService = TestBed.inject(MainGridStateService);
		dynamicGridStateService = TestBed.inject(DynamicGridStateService);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicGridStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should compile StaticGridStateComponent", () => {
		expect(component).toBeTruthy();
	});

	describe("Function [ngOnInit]", () => {
		it("should call setGridMode method", () => {
			component.ngOnInit();

			expect(component.dataUrl).toEqual(dataUrl);
			expect(mainGridStateServiceMock.setGridMode).toHaveBeenCalledWith(GridMode.DynamicMode);
			expect(dynamicGridStateServiceMock.getTotalRowsCount).toHaveBeenCalled();
			expect(dynamicGridStateServiceMock.metadataRequest).toHaveBeenCalled();
		});
	});

	describe("Function [onReady]", () => {
		it("should be initialized on static-grid initialization event", () => {
			const spyOnNext = jest.spyOn(mainGridStateServiceMock.gridReady$, "next");
			const staticGrid = {
				gridApi: {
					setServerSideDatasource: jest.fn()
				}
			} as unknown as StaticGridComponent;

			component.onReady(staticGrid);

			expect(spyOnNext).toHaveBeenCalledWith(staticGrid);
			expect(mainGridStateServiceMock.initActions).toHaveBeenCalled();
			expect(mainGridStateServiceMock.setStaticGridReadyStatus).toHaveBeenCalledWith(true);
			expect(dynamicGridStateServiceMock.dataSource).toHaveBeenCalled();
			expect(dynamicGridStateServiceMock.onLoadingRows).toHaveBeenCalled();
			expect(dynamicGridStateServiceMock.onRefreshDataAction).toHaveBeenCalled();
		});
	});

	describe("Function [ngOnDestroy]", () => {
		it("should call methods on destroy component", () => {
			component.ngOnDestroy();

			onDestroyTest(component);
			expect(dynamicGridStateServiceMock.clearGridState).toHaveBeenCalled();
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
});
