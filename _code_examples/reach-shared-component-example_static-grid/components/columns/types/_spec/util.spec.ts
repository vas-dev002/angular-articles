import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ColDef } from "@ag-grid-community/core";
import { Type } from "@angular/core";
import { allApiTypes, getControllerByApiType } from "..";
import { ITypeControllerSG } from "../../entity";
import { AssociationTypeEditorFactorySG } from "../association-type-edit/async-type-editor.factory";
import { ColumnDisplayType } from "../base-api-types";
import { IColDefAbstractFactory } from "../base/base-abstract-factory/models";
import { BooleanFactorySG } from "../boolean/boolean.factory";
import { ComplianceFactorySG } from "../compliance/compliance.factory";
import { DateTimeFactorySG } from "../date-time/date-time.factory";
import { DateFactorySG } from "../date/date.factory";
import { ExternalLinkFactorySG } from "../links/external-link/external-link.factory";
import { FilterLinkFactorySG } from "../links/filter-link/filter-link.factory";
import { InternalLinkFactorySG } from "../links/internal-link/internal-link.factory";
import { LinkFactorySG } from "../links/link.factory";
import { LogOutcomeFactorySG } from "../log-outcome/log-outcome.factory";
import { MailboxPermissionFactorySG } from "../mailbox-permission/mailbox-permission.factory";
import { MultiTypeValueFactorySG } from "../multi-type-value/multi-type-value.factory";
import { NumberFactorySG } from "../number/number.factory";
import { UniqNumberFactorySG } from "../number/uniq.factory";
import { RationalisationFactorySG } from "../rationalisation/rationalisation.factory";
import { ReadinessEditorFactorySG } from "../readiness-edit/readiness-editor.factory";
import { ReadinessFactorySG } from "../readiness/readiness.factory";
import { SortByDisplayOrderFactorySG } from "../sort-by-display-order/sort-by-display-order.factory";
import { TextFactorySG } from "../text/text.factory";
import { TranslateStringFactorySG } from "../translate-string/translate-string.factory";

describe("[Function getControllerByApiType]", () => {
	class TestFactory implements IColDefAbstractFactory {
		createColDef(): ColDef {
			const controller = new TestController();
			return controller.columnDefinition();
		}
	}

	class TestController implements ITypeControllerSG {
		renderComponent: Type<ICellRendererAngularComp>;
		columnDefinition(): ColDef {
			throw new Error("Method not implemented.");
		}
	}

	it("should return valid controller", () => {
		expect(getControllerByApiType(ColumnDisplayType.String, allApiTypes)).toEqual(TextFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.BooleanImage, allApiTypes)).toEqual(BooleanFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Link, allApiTypes)).toEqual(LinkFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.LinkToSenior, allApiTypes)).toEqual(LinkFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Rationalisation, allApiTypes)).toEqual(RationalisationFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Int, allApiTypes)).toEqual(NumberFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Decimal, allApiTypes)).toEqual(NumberFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Number, allApiTypes)).toEqual(NumberFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.UniqueNumber, allApiTypes)).toEqual(UniqNumberFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Date, allApiTypes)).toEqual(DateFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.DateTime, allApiTypes)).toEqual(DateTimeFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Readiness, allApiTypes)).toEqual(ReadinessFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.ReadinessEdit, allApiTypes)).toEqual(ReadinessEditorFactorySG);
		expect(getControllerByApiType(
			ColumnDisplayType.AssociationTypeEdit,
			allApiTypes)).toEqual(AssociationTypeEditorFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.Compliance, allApiTypes)).toEqual(ComplianceFactorySG);
		expect(getControllerByApiType(
			ColumnDisplayType.MailboxPermission,
			allApiTypes)).toEqual(MailboxPermissionFactorySG);
		expect(getControllerByApiType(
			ColumnDisplayType.SortByDisplayOrder,
			allApiTypes)).toEqual(SortByDisplayOrderFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.TranslateString, allApiTypes)).toEqual(TranslateStringFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.ExternalLink, allApiTypes)).toEqual(ExternalLinkFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.InternalLink, allApiTypes)).toEqual(InternalLinkFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.LogOutcome, allApiTypes)).toEqual(LogOutcomeFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.ParameterizedLink, allApiTypes)).toEqual(FilterLinkFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.FilterLink, allApiTypes)).toEqual(FilterLinkFactorySG);
		expect(getControllerByApiType(ColumnDisplayType.MultiTypeValue, allApiTypes)).toEqual(MultiTypeValueFactorySG);
	});

	it("should return valid default controller", () => {
		expect(getControllerByApiType("NewType" as ColumnDisplayType, allApiTypes)).toEqual(TextFactorySG);
	});

	it("should use passed custom columns collection", () => {
		const customColumnTypesCollection  = [{ key: "NewType" as ColumnDisplayType, factory: TestFactory }];
		expect(getControllerByApiType("NewType" as ColumnDisplayType, customColumnTypesCollection))
	.toEqual(TestFactory);
	});

	it("should use passed custom columns collection (overriding default type)", () => {
		const customColumnTypesCollection  = [{ key: ColumnDisplayType.String, factory: TestFactory }];
		expect(getControllerByApiType(ColumnDisplayType.String, customColumnTypesCollection)).toEqual(TestFactory);
	});
});
