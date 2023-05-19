import * as moment from "moment";
import { isString, isEmptyStringifyDate } from "../../../../../../../queries/util/input";

export abstract class DateDasType {
	public static IsEmpty<T>(value: T): boolean {
		return !!value && value.toString() !== "null";
	}

	// generic T should be replaced by our custom Date entity type
	public static getValue<T>(value: T): string {
		return this.valueToFormattedString(value);
	}

	private static valueToFormattedString<T>(value: T): string {
		return isString(value) && !isEmptyStringifyDate(value) ? moment(value).format("ll") : "";
	}
}
