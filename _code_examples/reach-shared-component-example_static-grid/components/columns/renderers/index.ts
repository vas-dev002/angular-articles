import { FieldRenderComponent } from "../../../../../../objects/details/custom/common/lifecycle/modules/components/field-render/field-render.component";
import { CogMenuSGComponent } from "./cog-menu/comp";
export { CogMenuSGComponent } from "./cog-menu/comp";
import { TextSGRendererComponent } from "../types/text/text.component";
import { NumberSGRendererComponent } from "../types/number/number.component";
import { UniqNumberSGRendererComponent } from "../types/number/uniq.component";
import { DateSGRendererComponent } from "../types/date/date.component";
import { GroupContainerSGComponent } from "./container/group-container.component";
import { DateTimeSGRendererComponent } from "../types/date-time/date-time.component";
import { ReadinessEditorComponent } from "../types/readiness-edit/readiness-editor.component";
import { AssociationTypeEditorComponent } from "../types/association-type-edit/association-type-editor.component";
import { MultiTypeContainerSGComponent } from "./multi-type-container/multi-type-container.component";
import { FlagImageCellRendererComponent } from "../types/flag-image/flag-image-cell-renderer/flag-image-cell-renderer.component";
import { FlagImageComponent } from "../types/flag-image/flag-image/flag-image.component";
import { DateTimeEditorComponent } from "../types/date-time-edit/date-time-editor.component";
import { CapacityDateTimeEditorComponent } from "../types/capacity-date-time-edit/capacity-date-time-edit.component";
import {
	AsyncTeamsSearchValueEditorComponent
} from "../types/async-teams-search-value-editor/async-teams-search-value-editor.component";
import {
	AsyncAssignedToSearchValueEditorComponent
} from "../types/async-assigned-to-search-value-editor/async-assigned-to-search-value-editor.component";
import { SlotCellRendererComponent } from "../types/slot/slot.component";
import { LoadingCellSGComponent } from "./loading-cell/loading-cell.component";
import { LoadingOverlaySGComponent } from "./loading-overlay/loading-overlay.component";
import { RichTextRenderComponent } from "../types/rich-text-editor";
import { TaskEmailsStatusCellRendererComponent } from "../types/task-emails-status/task-emails-status-cell-renderer.component";
import { TaskEmailsStatusComponent } from "../types/task-emails-status/task-emails-status/task-emails-status.component";
import { MultiLineTextEditorComponent } from "../types/line-text-editors/multi-line-text-editor.component";
import { LifecycleStatusRendererComponent } from "../types/lifecycle-status/components/lifecycle-status-renderer/lifecycle-status-renderer.component";

export { TextSGRendererComponent } from "../types/text/text.component";
export * from "./cog-menu/entity";
export * from "./selectAll/entity";

export const StaticGridRenderers = [
	CogMenuSGComponent,
	TextSGRendererComponent,
	NumberSGRendererComponent,
	UniqNumberSGRendererComponent,
	DateSGRendererComponent,
	DateTimeSGRendererComponent,
	GroupContainerSGComponent,
	ReadinessEditorComponent,
	AssociationTypeEditorComponent,
	MultiTypeContainerSGComponent,
	FlagImageCellRendererComponent,
	FlagImageComponent,
	DateTimeEditorComponent,
	CapacityDateTimeEditorComponent,
	AsyncTeamsSearchValueEditorComponent,
	AsyncAssignedToSearchValueEditorComponent,
	MultiLineTextEditorComponent,
	SlotCellRendererComponent,
	LifecycleStatusRendererComponent,
	LoadingCellSGComponent,
	LoadingOverlaySGComponent,
	RichTextRenderComponent,
	TaskEmailsStatusCellRendererComponent,
	TaskEmailsStatusComponent,
	FieldRenderComponent
];
