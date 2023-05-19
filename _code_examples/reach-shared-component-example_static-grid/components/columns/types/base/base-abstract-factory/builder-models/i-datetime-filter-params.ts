import { DateTimeFilteringOption } from "./datetime-filtering-option";

export interface IDateTimeFilterParams {
	defaultOption: DateTimeFilteringOption;
	filterOptions: DateTimeFilteringOption [];
	comparator: (filter: Date, value: any) => number;
	inRangeInclusive: boolean;
	suppressAndOrCondition: boolean;
}
