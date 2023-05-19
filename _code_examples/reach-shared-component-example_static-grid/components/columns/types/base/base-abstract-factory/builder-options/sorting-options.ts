import { ISortingOptions, SortingOrderOption } from "../builder-models";

export class SortingOptions implements ISortingOptions {
	readonly sortingOrder: SortingOrderOption[] = [SortingOrderOption.Asc, SortingOrderOption.Desc, null];
	readonly comparator = (valueA: unknown, valueB: unknown) =>
		new Intl.Collator().compare(valueA?.toString(), valueB?.toString())
}
