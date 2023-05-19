import { ICellRendererParams } from "@ag-grid-community/core";

export interface ICogMenuEvent {
	params: ICellRendererParams;
	rowIndex: number;
}
export interface ICogMenuItem {
	css?: string;
	hide?: (event: ICogMenuEvent) => boolean;
	name: string;
	onClick: (event: ICogMenuEvent) => void;
}
export interface ICellCogMenuParams extends ICellRendererParams {
	menuItems: ICogMenuItem[];
	isDisabled?: (cellData: unknown) => boolean;
	getCogMenuTooltip?: (cellData: unknown) => string;
}
