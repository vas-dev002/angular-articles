import { Inject, Injectable, Optional } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AppState } from "../../../../../../state";
import * as act from "../../state/actions/action";
import { MULTIPLE_STORE_SLICE_NAME } from "../../state/multiple-store/config";
import { createLocalAction } from "../../state/multiple-store/utils";
import { GridSelectors } from "../../state/selectors/selector";
import { CellToUpdate } from "../main/entity";


@Injectable()
export class KeyValueStateService {
	public data$: Observable<Object[]> = this.store.select(this.gridSelectors.selectData);

	constructor(
		protected readonly store: Store<AppState>,
		protected readonly gridSelectors: GridSelectors,
		@Optional() @Inject(MULTIPLE_STORE_SLICE_NAME) protected readonly storeSliceName: string
	) {
	}

	public hasData(): Observable<boolean> {
		return this.data$.pipe(
			map((data: Object[]) => !!data && data.length > 0)
		);
	}

	public onCellUpdate(cellToUpdate: CellToUpdate) {
		this.store.dispatch(createLocalAction(act.StaticGridCellToUpdate({ cellToUpdate }), this.storeSliceName));
	}
}
