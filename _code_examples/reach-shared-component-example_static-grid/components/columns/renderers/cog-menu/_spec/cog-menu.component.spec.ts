import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { OverlayModule } from "@angular/cdk/overlay";

import { TranslateModule } from "@ngx-translate/core";
import { CogMenuSGComponent } from "../comp";
import { ICellCogMenuParams, ICogMenuItem } from "../entity";
import { OverlayMenuComponent } from "../../../../../../../../evergreen-shared/modules/custom-elements/overlay-menu/overlay-menu.component";
import { of } from "rxjs";

describe("[Component]: AssociationTypeEditorComponent", () => {
	let component: CogMenuSGComponent;
	let fixture: ComponentFixture<CogMenuSGComponent>;
	let params: ICellCogMenuParams;
	const a1ClickCall = jest.fn();
	const a2ClickCall = jest.fn();
	const a1HideCall = jest.fn();
	const a2HideCall = jest.fn();
	const cogMenuItems: ICogMenuItem[] = [
		{
			name: "A1",
			onClick: a1ClickCall,
			hide: a1HideCall
		},
		{
			name: "A2",
			onClick: a2ClickCall,
			hide: a2HideCall
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				CogMenuSGComponent,
				OverlayMenuComponent
			],
			imports: [
				OverlayModule,
				TranslateModule.forRoot()
			]
		}).overrideTemplate(CogMenuSGComponent, "<span></span>");
		fixture = TestBed.createComponent(CogMenuSGComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		params = {
			rowIndex: 1,
			api: {
				forEachNodeAfterFilterAndSort: jest.fn()
			},
			menuItems: cogMenuItems,
			isDisabled: jest.fn(() => true),
			getGogMenuTooltip: jest.fn(() => of("Test tooltip"))
		} as unknown as ICellCogMenuParams;
	});

	describe("[Method]: agInit", () => {
		it("should initialize component correctly", () => {
			component.agInit(params);
			expect(component.items).toBe(cogMenuItems);
		});
	});

	describe("[Method]: refresh", () => {
		it("should return false", () => {
			expect(component.refresh()).toBeFalsy();
		});
	});

	describe("[Method]: show", () => {
		it("should call hide", () => {
			component.agInit(params);
			component.show(cogMenuItems[0]);
			expect(a1HideCall).toHaveBeenCalled();
		});
	});

	describe("[Method]: onClick", () => {
		it("should call onClick", () => {
			component.agInit(params);
			component.onClick(cogMenuItems[0]);
			expect(a1ClickCall).toHaveBeenCalled();
		});
	});

	describe("[Method]: isDisabled", () => {
		it("should return true", () => {
			component.agInit(params);
			expect(component.isDisabled).toBeTruthy();
			expect(params.isDisabled).toHaveBeenCalled();
		});
	});
});
