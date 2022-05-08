// Extends functions so Element proxies are callable... -.-
export class ComponentInterface extends Function{
	getAsHtmlString(){
		console.error(`ComponentInterface.getAsHtmlString() is not overridden!`)
	}
}