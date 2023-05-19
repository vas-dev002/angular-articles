import { isNullOrUndefined } from "../../../../../../../util/common/common";
import { ISortModel } from "../../../main/entity";
import { IDynamicSortParameter } from "../models/dynamic-sort-parameter";

export abstract class AgGridSortFactory {

	public static createSort(agGridSortModel: ISortModel[]): IDynamicSortParameter[] {
		const sorts: IDynamicSortParameter[] = [];

		if (!isNullOrUndefined(agGridSortModel) && agGridSortModel.every(item => !isNullOrUndefined(item.colId))) {
			for (const agGridSort of agGridSortModel) {
				const sort: IDynamicSortParameter = {
					columnName: agGridSort.colId,
					sort: agGridSort.sort
				};
				sorts.push(sort);
			}
		}

		return sorts;
	}
}
