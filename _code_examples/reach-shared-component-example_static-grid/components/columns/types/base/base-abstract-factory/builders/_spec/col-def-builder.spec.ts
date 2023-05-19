import { BooleanImageRendererComponent } from "../../../../../../../../cellRenderer/booleanImage/boolean-renderer.component";
import { RichTextEditorTooltipOptions } from "../../../../rich-text-editor/builder";
import { MenuTab } from "../../builder-models";
import { ColDefBuilderValidationError } from "../../builder-models/col-def-builder-validation-error";
import { ColDefBuilderValidationState } from "../../builder-models/col-def-builder-validation-state";
import { WidthOptions } from "../../builder-options";
import { ColDefBuilder } from "../col-def-builder";

declare const expect: jest.Expect;

describe("[Builder]: ColDefBuilder", () => {
	let сolDefBuilder: ColDefBuilder;

	beforeEach(() => {
		сolDefBuilder = new ColDefBuilder();
	});

	describe("[сolDefBuilder instantiate]", () => {
		it("should be successfully created", () => {
			expect(сolDefBuilder).toBeTruthy();
		});
	});

	describe("[сolDefBuilder build]", () => {
		it("should be successfully if everything is set", () => {
			const colDef = сolDefBuilder
				.setColId("test")
				.setWidth(new WidthOptions())
				.setTooltipOptionsByFunction(new RichTextEditorTooltipOptions())
				.setMenuTabs([MenuTab.GeneralMenuTab, MenuTab.FilterMenuTab, MenuTab.ColumnsMenuTab])
				.setCellClass({ cellClass: null, cellClassRules: null })
				.setHeaderName("test")
				.setVisibility({ hide: false, lockVisible: false })
				.setCellRenderer(BooleanImageRendererComponent)
				.setSorting({ sortingOrder: null, comparator: null })
				.setValueGetterByFunction({ getterFunction: null })
				.setValueSetter({ setterFunction: null })
				.setValueFormatter({ formatterFunction: null })
				.setGrouping({ getGroupKey: null })
				.setTextFiltering({
					filterParams: null,
					floatingFilterComponentFramework: null,
					floatingFilterComponentParams: null
				})
				.build();


				expect(colDef).toBeTruthy();
		});

		it("should be successfully if everything is set", () => {
			const colDef = сolDefBuilder
				.setColId("test")
				.setWidth(new WidthOptions())
				.setTooltipOptionsByField({ tooltipField: "test", tooltipComponentFramework: null })
				.setMenuTabs([MenuTab.GeneralMenuTab, MenuTab.FilterMenuTab, MenuTab.ColumnsMenuTab])
				.setCellClass({ cellClass: null, cellClassRules: null })
				.setHeaderName("test")
				.setVisibility({ hide: false, lockVisible: false })
				.setCellRenderer(BooleanImageRendererComponent)
				.setSorting({ sortingOrder: null, comparator: null })
				.setValueGetterByProperty({ propertyName: null })
				.setValueSetter({ setterFunction: null })
				.setValueFormatter({ formatterFunction: null })
				.setGrouping({ getGroupKey: null })
				.setDateTimeFiltering({ filterParams: null })
				.build();

				expect(colDef).toBeTruthy();
		});

		it("should throw exception if anything was not set", () => {
			const validator = new ColDefBuilderValidationState();

			const errorFunction = () => {
				new ColDefBuilder()
					.setColId("test")
					.setWidth(new WidthOptions())
					.setTooltipOptionsByFunction(new RichTextEditorTooltipOptions())
					.setMenuTabs([MenuTab.GeneralMenuTab, MenuTab.FilterMenuTab, MenuTab.ColumnsMenuTab])
					.setCellClass({ cellClass: null, cellClassRules: null })
					.setHeaderName("test")
					.setVisibility({ hide: false, lockVisible: false })
					.setCellRenderer(BooleanImageRendererComponent)
					.setSorting({ sortingOrder: null, comparator: null })
					.setValueGetterByFunction({ getterFunction: null })
					.setValueSetter({ setterFunction: null })
					.setValueFormatter({ formatterFunction: null })
					.setGrouping({ getGroupKey: null })
					.build();
			};

			expect(errorFunction).toThrow(ColDefBuilderValidationError);
			expect(errorFunction).toThrowError(validator.filtering.requiredErrorMessage);
		});

		it("should throw exception if anything was set twice", () => {
			const validator = new ColDefBuilderValidationState();

			const errorFunction = () => {
				new ColDefBuilder()
					.setColId("test")
					.setColId("test2");
			};

			expect(errorFunction).toThrow(ColDefBuilderValidationError);
			expect(errorFunction).toThrowError(validator.colId.duplicateErrorMessage);
		});

		it("should throw exception if anything was set twice", () => {
			const colDef = new ColDefBuilder()
				.ignoreColId()
				.ignoreValueGetter()
				.ignoreValueSetter()
				.ignoreValueFormatter()
				.ignoreSorting()
				.ignoreFiltering()
				.ignoreGrouping()
				.ignoreCellRenderer()
				.ignoreWidth()
				.ignoreMenuTabs()
				.ignoreCellClass()
				.ignoreHeaderName()
				.ignoreVisibility()
				.ignoreTooltip()
				.build();

			expect(colDef).toMatchSnapshot();
		});
	});
});
