export abstract class DasHTMLHelper {

	public static getElementClientHeight(className: string, container: Element | Document = document): number {
		const elements = container.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
		return (elements && elements.length > 0) ? elements[0].getBoundingClientRect().height : 0;
	}

}
