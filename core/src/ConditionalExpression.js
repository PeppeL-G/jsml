import escapeHTML from 'escape-html'
import { ComponentInterface } from './ComponentInterface.js'

export class ConditionalExpression extends ComponentInterface{
	
	lastAddedCondition
	cases = []
	
	constructor(condition){
		super()
		
		this.lastAddedCondition = condition
		
		const proxy = new Proxy(this, {
			get(target, prop, receiver){
				return Reflect.get(...arguments)
			},
			set(obj, prop, value) {
				return Reflect.set(...arguments)
			},
			apply(target, thisArg, argumentsList){
				
				target.cases.push({
					condition: target.lastAddedCondition,
					content: argumentsList,
				})
				
				return proxy
				
			}
		})
		
		return proxy
		
	}
	
	ELSEIF(condition){
		
		this.lastAddedCondition = condition
		
		return this
		
	}
	
	ELSE(...content){
		
		this.cases.push({
			condition: true,
			content,
		})
		
		return this
		
	}
	
	getAsHtmlString(){
		
		const content = this.cases.find(
			c => (
				typeof c.condition == 'function' ?
				c.condition() :
				c.condition
			)
		)?.content ?? []
		
		return content.flat().map(child => {
			
			const childContent = (
				(typeof child == 'function' && child.constructor == Function) ?
				child() :
				child
			)
			
			if(typeof childContent == 'string'){
				return escapeHTML(childContent)
			}else{
				return childContent.getAsHtmlString()
			}
			
		}).join(``)
		
	}
	
}