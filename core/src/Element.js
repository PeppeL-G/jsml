import escapeHtml from 'escape-html'
import { ComponentInterface } from './ComponentInterface.js'

export class Element extends ComponentInterface{
	
	constructor(tagName, content){
		super()
		
		this.tagName = tagName
		this.content = content
		this.attributes = []
		
		let lastAccessedAttribute = ""
		const setLastAccessedAttribute = (value) => {
			this.attributes.push({
				name: lastAccessedAttribute,
				value
			})
			return proxy
		}
		
		const proxy = new Proxy(this, {
			get(target, prop, receiver){
				if(target[prop]){
					return Reflect.get(...arguments)
				}else{
					lastAccessedAttribute = prop
					return setLastAccessedAttribute
				}
			},
			apply(target, thisArg, argumentsList){
				target.content = argumentsList
				return proxy
			}
		})
		
		return proxy
		
	}
	
	getAsHtmlString(){
		
		const attributes = this.attributes.map(
			a => ` ${a.name}="${a.value}"`
		).join(``)
		
		const startTag = `<${this.tagName}${attributes}>`
		
		let content
		
		if(this.content == undefined || this.content == null){
			content = ``
		}else if(this.content.constructor == Array){
			content = this.content.flat().map(child => {
				if(child == undefined || child == null){
					return ''
				}else if(child instanceof ComponentInterface){
					return child.getAsHtmlString()
				}else{
					(this.content, child, JSON.stringify(child))
					return escapeHtml(child.toString())
				}
			}).join(``)
		}else{
			content = escapeHtml(this.content.toString())
		}
		
		const endTag = (
			(content == ``) ?
			`` :
			`</${this.tagName}>`
		)
		
		return startTag+content+endTag
		
	}
	
}