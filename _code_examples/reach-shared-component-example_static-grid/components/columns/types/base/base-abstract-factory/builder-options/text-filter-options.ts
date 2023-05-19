import { customTextComparator } from "../../../../../../../util/column";
import { TextFloatingFilterComponent } from "../../../../../../../filter/floatingTextInput/comp";
import { ITextFilterOptions, TextFilteringOption } from "../builder-models";

export class TextFilterOptions implements ITextFilterOptions {
	readonly floatingFilterComponentFramework = TextFloatingFilterComponent;
	readonly floatingFilterComponentParams = {
		suppressFilterButton: true
	};
	readonly filterParams = {
		defaultOption: TextFilteringOption.Contains,
		filterOptions: [
			TextFilteringOption.Contains,
			TextFilteringOption.NotContains,
			TextFilteringOption.StartsWith,
			TextFilteringOption.EndsWith
		],
		caseSensitive: true,
		textCustomComparator: (filter: TextFilteringOption, value: unknown, filterText: string) =>
			customTextComparator(filter, this.filterValueGetter(value), filterText)
	};

	protected filterValueGetter = (value: unknown): unknown => value;
}
