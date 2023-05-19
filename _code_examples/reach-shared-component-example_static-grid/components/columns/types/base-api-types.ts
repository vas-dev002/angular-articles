import { FieldEditorSG } from "../../../../../../objects/details/custom/common/lifecycle/modules/components/field-editor.factory";
import { ITypedController } from "../entity";
import { TextFactorySG } from "./text/text.factory";
import { AssociationTypeEditorFactorySG } from "./association-type-edit/async-type-editor.factory";
import { AsyncAssignedToSearchValueEditorFactorySG } from "./async-assigned-to-search-value-editor/async-assigned-to-search-value-editor.factory";
import { AsyncTeamsSearchValueEditorFactorySG } from "./async-teams-search-value-editor/async-teams-search-value-editor.factory";
import { ComplianceFactorySG } from "./compliance/compliance.factory";
import { DateTimeEditorFactorySG } from "./date-time-edit/date-time-editor.factory";
import { DateTimeFactorySG } from "./date-time/date-time.factory";
import { DateFactorySG } from "./date/date.factory";
import { FlagImageFactorySG } from "./flag-image/flag-image.factory";
import { ExternalLinkFactorySG } from "./links/external-link/external-link.factory";
import { FilterLinkFactorySG } from "./links/filter-link/filter-link.factory";
import { InternalLinkFactorySG } from "./links/internal-link/internal-link.factory";
import { LinkFactorySG } from "./links/link.factory";
import { LogOutcomeFactorySG } from "./log-outcome/log-outcome.factory";
import { MailboxPermissionFactorySG } from "./mailbox-permission/mailbox-permission.factory";
import { MultiLineTextEditorFactorySG } from "./line-text-editors/multi-line-text-editor.factory";
import { NumberFactorySG } from "./number/number.factory";
import { UniqNumberFactorySG } from "./number/uniq.factory";
import { RationalisationFactorySG } from "./rationalisation/rationalisation.factory";
import { ReadinessFactorySG } from "./readiness/readiness.factory";
import { SortByDisplayOrderFactorySG } from "./sort-by-display-order/sort-by-display-order.factory";
import { TranslateStringFactorySG } from "./translate-string/translate-string.factory";
import { ReadinessEditorFactorySG } from "./readiness-edit/readiness-editor.factory";
import { BooleanFactorySG } from "./boolean/boolean.factory";
import { SlotFactorySG } from "./slot/slot.factory";
import { CapacityDateTimeEditorFactorySG } from "./capacity-date-time-edit/capacity-date-time-editor.factory";
import { RichTextEditorSG } from "./rich-text-editor/rich-text-editor.factory";
import { TaskEmailsStatusFactorySG } from "./task-emails-status/task-emails-status.factory";
import { LifecycleStatusSG } from "./lifecycle-status/lifecycle-status.factory";

export enum ColumnDisplayType {
	UniqueNumber = "UniqueNumber",
	Int = "Int",
	Decimal = "Decimal",
	["Number"] = "Number",
	["String"] = "String",
	["Date"] = "Date",
	DateTime = "DateTime",
	["Boolean"] = "Boolean",
	BooleanImage = "BooleanImage",
	Compliance = "Compliance",
	Link = "Link",
	LinkToSenior = "LinkToSenior",
	Readiness = "Readiness",
	ReadinessEdit = "ReadinessEdit",
	AssociationTypeEdit = "AssociationTypeEdit",
	Rationalisation = "Rationalisation",
	FullText = "FullText",
	MailboxPermission = "MailboxPermission",
	SortByDisplayOrder = "SortByDisplayOrder",
	TranslateString = "TranslateString",
	ExternalLink = "ExternalLink",
	InternalLink = "InternalLink",
	LogOutcome = "LogOutcome",
	TestOutcome = "TestOutcome",
	ParameterizedLink = "ParameterizedLink",
	FilterLink = "FilterLink",
	TemplateStatus = "TemplateStatus",
	MultiTypeValue = "MultiTypeValue",
	FlagImage = "FlagImage",
	DateTimeEdit = "DateTimeEdit",
	CapacityDateTimeEdit = "CapacityDateTimeEdit",
	TestResultLevel = "TestResultLevel",
	EnvironmentStatus = "EnvironmentStatus",
	AsyncTeamsSearchValue = "AsyncTeamsSearchValue",
	AsyncAssignedToSearchValue = "AsyncAssignedToSearchValue",
	MultiLineTextEditor = "MultiLineTextEditor",
	Slot = "Slot",
	RichTextEditor = "RichTextEditor",
	TaskEmailStatus = "TaskEmailStatus",
	LifecycleStatusEditor = "LifecycleStatusEditor",
	LifecycleStatus = "LifecycleStatus",
	ReplacementReasonEditor = "ReplacementReasonEditor",
	NextDeviceEditor = "NextDeviceEditor"
}

export const baseApiTypes: ITypedController[] = [
	{ key: ColumnDisplayType.String, factory: TextFactorySG },
	{ key: ColumnDisplayType.BooleanImage, factory: BooleanFactorySG },
	{ key: ColumnDisplayType.Link, factory: LinkFactorySG },
	{ key: ColumnDisplayType.LinkToSenior, factory: LinkFactorySG },
	{ key: ColumnDisplayType.Rationalisation, factory: RationalisationFactorySG },
	{ key: ColumnDisplayType.Int, factory: NumberFactorySG },
	{ key: ColumnDisplayType.Decimal, factory: NumberFactorySG },
	{ key: ColumnDisplayType.Number, factory: NumberFactorySG },
	{ key: ColumnDisplayType.UniqueNumber, factory: UniqNumberFactorySG },
	{ key: ColumnDisplayType.Date, factory: DateFactorySG },
	{ key: ColumnDisplayType.DateTime, factory: DateTimeFactorySG },
	{ key: ColumnDisplayType.Readiness, factory: ReadinessFactorySG },
	{ key: ColumnDisplayType.ReadinessEdit, factory: ReadinessEditorFactorySG },
	{ key: ColumnDisplayType.AssociationTypeEdit, factory: AssociationTypeEditorFactorySG },
	{ key: ColumnDisplayType.Compliance, factory: ComplianceFactorySG },
	{ key: ColumnDisplayType.MailboxPermission, factory: MailboxPermissionFactorySG },
	{ key: ColumnDisplayType.SortByDisplayOrder, factory: SortByDisplayOrderFactorySG },
	{ key: ColumnDisplayType.TranslateString, factory: TranslateStringFactorySG },
	{ key: ColumnDisplayType.ExternalLink, factory: ExternalLinkFactorySG },
	{ key: ColumnDisplayType.InternalLink, factory: InternalLinkFactorySG },
	{ key: ColumnDisplayType.LogOutcome, factory: LogOutcomeFactorySG },
	{ key: ColumnDisplayType.ParameterizedLink, factory: FilterLinkFactorySG },
	{ key: ColumnDisplayType.FilterLink, factory: FilterLinkFactorySG },
	{ key: ColumnDisplayType.FlagImage, factory: FlagImageFactorySG },
	{ key: ColumnDisplayType.DateTimeEdit, factory: DateTimeEditorFactorySG },
	{ key: ColumnDisplayType.CapacityDateTimeEdit, factory: CapacityDateTimeEditorFactorySG },
	{ key: ColumnDisplayType.AsyncTeamsSearchValue, factory: AsyncTeamsSearchValueEditorFactorySG },
	{ key: ColumnDisplayType.AsyncAssignedToSearchValue, factory: AsyncAssignedToSearchValueEditorFactorySG },
	{ key: ColumnDisplayType.MultiLineTextEditor, factory: MultiLineTextEditorFactorySG },
	{ key: ColumnDisplayType.Slot, factory: SlotFactorySG },
	{ key: ColumnDisplayType.RichTextEditor, factory: RichTextEditorSG },
	{ key: ColumnDisplayType.TaskEmailStatus, factory: TaskEmailsStatusFactorySG },
	{ key: ColumnDisplayType.LifecycleStatusEditor, factory: FieldEditorSG },
	{ key: ColumnDisplayType.LifecycleStatus, factory: LifecycleStatusSG },
	{ key: ColumnDisplayType.ReplacementReasonEditor, factory: FieldEditorSG },
	{ key: ColumnDisplayType.NextDeviceEditor, factory: FieldEditorSG }
];
