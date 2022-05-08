import { ComponentInterface } from "./ComponentInterface.js";

export class HtmlCode extends ComponentInterface{
	
	constructor(htmlCode){
		this.htmlCode = htmlCode
	}
	
	getAsHtmlString(){
		return this.htmlCode
	}
	
}