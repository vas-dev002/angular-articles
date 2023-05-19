export interface IEditorTextValidator {
	maxLength: number;
	maxLengthValidation: (text: string, maxLength: number) => string;
}
