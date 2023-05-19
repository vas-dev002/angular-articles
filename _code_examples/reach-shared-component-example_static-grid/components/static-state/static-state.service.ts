import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { AppState } from "../../../../../../state";
import { MULTIPLE_STORE_SLICE_NAME } from "../../state/multiple-store/config";
import { createLocalAction } from "../../state/multiple-store/utils";
import { GridSelectors } from "../../state/selectors/selector";
import { TopBarSelectors } from "../../state/selectors/topbar";
import { CellToUpdate, IDragAndDropModel } from "../main/entity";
import * as act from "../../state/actions/action";
import * as actTopbar from "../../state/actions/topbar";

@Injectable()
export class StaticGridStateService implements OnDestroy {
	public data$: Observable<Object[]> = this.store.select(this.gridSelectors.selectData);

	protected readonly destroy$ = new Subject();

	constructor(
		protected readonly store: Store<AppState>,
		protected readonly gridSelectors: GridSelectors,
		protected readonly topBarSelectors: TopBarSelectors,
		@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) protected readonly storeSliceName: string
	) {}

	public hasData(): Observable<boolean> {
		return this.data$.pipe(
			map((data: Object[]) => !!data && data.length > 0)
		);
	}

	public displayedRowsCountChange(filteredRowsCount: number) {
		this.store.dispatch(
			createLocalAction(actTopbar.TopBarSetRowsCount({ filteredRowsCount }), this.storeSliceName)
		);
	}

	public dragAndDropUpdate(dragAndDrop: IDragAndDropModel) {
		this.store.dispatch(createLocalAction(act.StaticGridDragAndDrop({ dragAndDrop }), this.storeSliceName));
	}

	public onCellUpdate(cellToUpdate: CellToUpdate) {
		this.store.dispatch(createLocalAction(act.StaticGridCellToUpdate({ cellToUpdate }), this.storeSliceName));
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
