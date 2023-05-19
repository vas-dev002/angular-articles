export class ColDefBuilderValidationItem {
	constructor(
		public requiredErrorMessage: string,
		public duplicateErrorMessage: string,
		public isSet = false
	) { }
}
