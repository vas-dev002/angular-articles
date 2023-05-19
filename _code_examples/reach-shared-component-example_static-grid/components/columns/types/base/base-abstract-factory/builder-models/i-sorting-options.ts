import { SortingOrderOption } from "./sorting-order-option";

export interface ISortingOptions {
	sortingOrder: SortingOrderOption[];
	comparator: (valueA: unknown, valueB: unknown) => number;
}
