import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BehaviorSubject, of } from "rxjs";

import { GridMode, IColumnMetaSG } from "../..";
import { onDestroyTest } from "../../../../../../evergreen-shared/utils/common-tests/component.tests";
import { StaticGridComponent } from "../../main/comp";
import { MainGridStateService } from "../../static-state/main-state.service";
import { KeyValueStateComponent } from "../key-value-state.component";
import { KeyValueStateService } from "../key-value-state.service";

declare const expect: jest.Expect;

describe("KeyValueStateComponent", () => {
	let component: KeyValueStateComponent;
	let fixture: ComponentFixture<KeyValueStateComponent>;
	let mainGridStateService: MainGridStateService;
	let keyValueStateService: KeyValueStateService;

	const mainGridStateServiceMock = {
		options$: of({}),
		meta$: of({} as IColumnMetaSG[]),
		grid: null,
		setGridMode: jest.fn(),
		gridReady$: new BehaviorSubject(null),
		initActions: jest.fn(),
		setGroupColumns: jest.fn(),
		columnStateChange: jest.fn(),
		setStaticGridReadyStatus: jest.fn()
	};
	const keyValueGridStateServiceMock = {
		data$: of([]),
		hasData: jest.fn(),
		onCellUpdate: jest.fn()
	};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [
				KeyValueStateComponent
			],
			providers: [
				{
					provide: MainGridStateService,
					useValue: mainGridStateServiceMock
				},
				{
					provide: KeyValueStateService,
					useValue: keyValueGridStateServiceMock
				}
			]
		}).overrideComponent(KeyValueStateComponent, {
			set: {
				providers: [
					{
						provide: MainGridStateService,
						useValue: mainGridStateServiceMock
					},
					{
						provide: KeyValueStateService,
						useValue: keyValueGridStateServiceMock
					}
				],
				template: "<span></span>"
			}
		});

		mainGridStateService = TestBed.inject(MainGridStateService);
		keyValueStateService = TestBed.inject(KeyValueStateService);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(KeyValueStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should compile KeyValueStateComponent", () => {
		expect(component).toBeTruthy();

	});

	describe("Function [ngOnInit]", () => {
		it("should call setGridMode method", () => {
			component.ngOnInit();

			expect(mainGridStateServiceMock.setGridMode).toHaveBeenCalledWith(GridMode.KeyValueMode);
		});
	});

	describe("Function [onReady]", () => {
		it("should be initialized on key-value-grid initialization event", () => {
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
			component.ngOnDestroy();

			onDestroyTest(component);
			expect(mainGridStateServiceMock.setStaticGridReadyStatus).toHaveBeenCalledWith(false);
		});
	});

	describe("Function [columnStateChange]", () => {
		it("should call mainGridStateService.columnStateChange", () => {
			component.columnStateChange([]);
			expect(mainGridStateServiceMock.columnStateChange).toHaveBeenCalledWith([]);
		});
	});

	describe("Function [onCellUpdate]", () => {
		it("should call mainGridStateService.onCellUpdate", () => {
			component.onCellUpdate(null);
			expect(keyValueGridStateServiceMock.onCellUpdate).toHaveBeenCalledWith(null);
		});
	});

});
