import { TextFilteringOption } from "./text-filtering-option";

export interface ITextFilterParams {
	defaultOption: TextFilteringOption;
	filterOptions: TextFilteringOption[];
	caseSensitive: boolean;
	textCustomComparator: (filter: TextFilteringOption, value: any, filterText: string) => boolean;
}
