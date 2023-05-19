import { GridApi, IServerSideGetRowsParams } from "@ag-grid-community/core";
import { HttpErrorResponse } from "@angular/common/http";
import { EventEmitter } from "@angular/core";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of, Subscription, throwError } from "rxjs";

import { onDestroyTest } from "../../../../../../evergreen-shared/utils/common-tests/component.tests";
import { ApiService } from "../../../../../../services/api";
import { MULTIPLE_STORE_SLICE_NAME } from "../../../state/multiple-store/config";
import { GridSelectors } from "../../../state/selectors/selector";
import { TopBarSelectors } from "../../../state/selectors/topbar";
import { DynamicGridKeySetIdService } from "../dynamic-grid-key-set-id.service";
import { DynamicGridStateService } from "../dynamic-state.service";

declare const expect: jest.Expect;

describe("[Service]: DynamicGridStateService", () => {
	const storeSliceName = "TestKey";
	const url = "api/data/get";
	const apiErrorOccurs = new EventEmitter();
	const gridApi = new GridApi();
	const apiServiceMock = {
		getRequest: jest.fn().mockReturnValue(of({
				data: [{ id: "1" }, { id: "2" }, { id: "3" }],
				keyCount: 15
			})
		)
	};
	const params: IServerSideGetRowsParams = {
		request: {
			startRow: 0,
			endRow: 3,
			rowGroupCols: [],
			valueCols: [],
			pivotCols: [],
			pivotMode: false,
			groupKeys: [],
			filterModel: {},
			sortModel: null
		},
		parentNode: null,
		successCallback: jest.fn(),
		success: jest.fn(),
		failCallback: jest.fn(),
		fail: jest.fn(),
		api: gridApi,
		columnApi: null
	};

	const dynamicGridKeySetIdServiceMock = {
		resetKeySetId: jest.fn(),
		setKeySetId: jest.fn(),
		getKeySetId: jest.fn()
	};

	let store: MockStore;
	let service: DynamicGridStateService;
	let topBarSelectors: TopBarSelectors;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DynamicGridStateService,
				provideMockStore(),
				GridSelectors,
				TopBarSelectors,
				{
					provide: MULTIPLE_STORE_SLICE_NAME,
					useValue: storeSliceName
				},
				{
					provide: ApiService,
					useValue: apiServiceMock
				},
				{
					provide: DynamicGridKeySetIdService,
					useValue: dynamicGridKeySetIdServiceMock
				}
			]
		});

		store = TestBed.inject(MockStore);
		service = TestBed.inject(DynamicGridStateService);
		topBarSelectors = TestBed.inject(TopBarSelectors);

		gridApi.showLoadingOverlay = jest.fn();
		gridApi.hideOverlay = jest.fn();
		gridApi.refreshServerSideStore = jest.fn();
	});

	describe("Function [constructor]", () => {
		it("should compile", () => {
			expect(service).toBeTruthy();
		});
	});

	describe("Function [dataSource getRows]", () => {
		it("should request data from server", () => {
			const spyOnSuccess = jest.spyOn(params, "success");

			service.dataSource(url, apiErrorOccurs).getRows(params);

			expect(apiServiceMock.getRequest).toBeCalledWith(url, ["skip=0", "top=3"]);
			expect(spyOnSuccess).toBeCalledWith({
				rowData: [{ id: "1" }, { id: "2" }, { id: "3" }],
				rowCount: 15
			});
		});

		it("should call fail callback method and emit apiErrorOccurs event", () => {
			const error = { status: 500 };
			jest.spyOn(apiServiceMock, "getRequest").mockReturnValue(throwError(error));
			const spyOnFail = jest.spyOn(params, "fail");
			const spyOnEmit = jest.spyOn(apiErrorOccurs, "emit");

			service.dataSource(url, apiErrorOccurs).getRows(params);

			expect(spyOnFail).toBeCalled();
			expect(spyOnEmit).toBeCalledWith(error);
		});
	});

	describe("Function [getTotalRowsCount]", () => {
		it("should call request to get the total number of rows", () => {
			apiServiceMock.getRequest.mockReturnValue(of(12345));
			const spyOnDispatch = jest.spyOn(store, "dispatch");

			service.getTotalRowsCount(url, apiErrorOccurs);

			expect(apiServiceMock.getRequest).toBeCalledWith(`${url}/count`);
			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					sliceName: storeSliceName
				},
				totalRowCount: 12345,
				type: "Dynamic.Grid.Total.Row.Count"
			});
		});

		it("should call handleApiError method when an error occurs", () => {
			const error = { status: 500 };
			apiServiceMock.getRequest.mockReturnValue(throwError(error));
			const spyOnEmit = jest.spyOn(apiErrorOccurs, "emit");

			service.getTotalRowsCount(url, apiErrorOccurs);

			expect(spyOnEmit).toBeCalledWith(error);
		});
	});

	describe("Function [metadataRequest]", () => {
		it("should dispatch action to request metadata", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");
			const spyOnEmit = jest.spyOn(apiErrorOccurs, "emit");
			const error = new HttpErrorResponse({
				status: 500
			});

			service.metadataRequest(url, apiErrorOccurs);

			expect(spyOnDispatch).toHaveBeenCalledWith({
				__multipleStoreMeta: {
					sliceName: storeSliceName
				},
				payload: {
					errorActions: expect.any(Function),
					params: [],
					transformMeta: expect.any(Function),
					url: "api/data/get/metadata"
				},
				type: "Static.Grid.Metadata.Request"
			});

			(spyOnDispatch.mock.calls[0][0] as any).payload.errorActions(error);

			expect(spyOnEmit).toHaveBeenCalledWith(error);
		});
	});

	describe("Function [hasData]", () => {
		it("should return true", done => {
			service.hasRowData.next(true);
			const hasData = service.hasData();

			hasData.subscribe(res => {
				expect(res).toBeTruthy();
				done();
			});
		});

		it("should return false", done => {
			service.hasRowData.next(false);
			const hasData = service.hasData();

			hasData.subscribe(res => {
				expect(res).toBeFalsy();
				done();
			});
		});
	});

	describe("Function [onDestroy]", () => {
		it("should proper handle destroy", ()=> {
			onDestroyTest(service);
		});
	});

	describe("Function [onLoadingRows]", () => {
		it("should call showLoadingOverlay method from ag-grid api when isLoading is true", fakeAsync(() => {
			const spyOnShowLoadingOverlay = jest.spyOn(gridApi, "showLoadingOverlay");

			service.onLoadingRows(gridApi);
			service.isRowsLoading$.next(true);

			tick(2000);
			expect(spyOnShowLoadingOverlay).toHaveBeenCalled();
		}));

		it("should call hideOverlay method from ag-grid api when isLoading is false", fakeAsync(() => {
			const spyOnHideOverlay = jest.spyOn(gridApi, "hideOverlay");

			service.onLoadingRows(gridApi);
			service.isRowsLoading$.next(false);

			tick(2000);
			expect(spyOnHideOverlay).toHaveBeenCalled();
		}));
	});

	describe("Function [onRefreshDataAction]", () => {
		it("should call refresh method from ag-grid api", () => {
			store.overrideSelector(topBarSelectors.selectRefreshDataAction, "123");
			service.onRefreshDataAction(url, apiErrorOccurs, gridApi);
			store.refreshState();

			expect(gridApi.refreshServerSideStore).toBeCalledWith({
				purge: true
			});
		});

		it("should call totalRowCounSubscription.unsubscribe", () => {
			service.totalRowCounSubscription = new Subscription();
			const spyOnUnsubscribe = jest.spyOn(service.totalRowCounSubscription, "unsubscribe");
			store.overrideSelector(topBarSelectors.selectRefreshDataAction, "321");
			service.onRefreshDataAction(url, apiErrorOccurs, gridApi);
			store.refreshState();

			expect(spyOnUnsubscribe).toHaveBeenCalled();
		});
	});

	describe("Function [filteredRowsCountChange]", () => {
		it("should dispatch action when the filtered number of rows is changed", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");
			service.filteredRowsCountChange(33);

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					sliceName: storeSliceName
				},
				"filteredRowsCount": 33,
				"type": "Static.Grid.TopBar.Set.RowsCount"
			});
		});
	});

	describe("Function [clearGridState]", () => {
		it("should dispatch StaticGridReset action", () => {
			const spyOnDispatch = jest.spyOn(store, "dispatch");

			service.clearGridState();

			expect(spyOnDispatch).toBeCalledWith({
				__multipleStoreMeta: {
					sliceName: storeSliceName
				},
				"type": "Static.Grid.Reset"
			});
		});
	});
});
