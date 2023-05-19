import { ValueGetterParams } from "@ag-grid-community/core";
import { ANY_VALUES } from "./common.set";

function getValueGetterParamsFromValue(value: any): ValueGetterParams {
	return {
		data: { field: value },
		column: {
			getColDef: () => ({ field: "field" })
		}
	} as any as ValueGetterParams;
}

export function getValueGetterResults(
	customValueGetter: ((params: ValueGetterParams) => any) | string,
	anyValues: any[] = ANY_VALUES
): { [key: string]: string } {
	if (typeof customValueGetter === "string") { return {}; }
	const getterResults = anyValues.reduce((results, value) => {
		const params: ValueGetterParams = getValueGetterParamsFromValue(value);
		results[value + ""] = customValueGetter(params);
		return results;
	}, {});
	// The data can be null when grouping.
	getterResults["NullData"] = customValueGetter({} as ValueGetterParams);
	return getterResults;
}
