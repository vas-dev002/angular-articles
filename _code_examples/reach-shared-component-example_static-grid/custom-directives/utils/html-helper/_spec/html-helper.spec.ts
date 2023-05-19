import { DasHTMLHelper } from "../html-helper";


describe("[Abstract class]: DasHTMLHelper", () => {
	const mockNode = { height: 10 };
	const mockElement = {
		getBoundingClientRect: () => mockNode
	};
	// Actually it should be e2e test. Here we just check function for errors (not a real clientHeight).
	describe("[Function]: getElementClientHeight", () => {
		it("should process an array with data", () => {
			document.getElementsByClassName = (str: string) => ([mockElement, { clientHeight: 0 }]) as any;
			expect(DasHTMLHelper.getElementClientHeight("")).toEqual(10);
		});

		it("should process an empty array", () => {
			document.getElementsByClassName = (str: string) => ([]) as any;
			expect(DasHTMLHelper.getElementClientHeight("")).toEqual(0);
		});

		it("should process 'undefined'", () => {
			document.getElementsByClassName = (str: string) => undefined as any;
			expect(DasHTMLHelper.getElementClientHeight("")).toEqual(0);
		});

		it("should process 'null'", () => {
			document.getElementsByClassName = (str: string) => null as any;
			expect(DasHTMLHelper.getElementClientHeight("")).toEqual(0);
		});


	});

});
