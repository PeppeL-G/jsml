# JSML - JavaScript Markup Language
This is the official repository for JavaScript Markup Language.

## Introduction
There exists many different template languages one can use to generate dynamic HTML code, such as:

* Handlebars
* Jade
* ...

However, JavaScript is quite powerful on its own, and it is possible to generate dynamic HTML code using only JavaScript in a quite readable way. That's what JSML is: a collection of JavaScript functions you can use to generate dynamic HTML code! For an example, see the code below.

```js
const todos = [{
	id: 1,
	title: `Feed the cat`,
}, {
	id: 2,
	title: `Feed the dog`
}]

const div = Div.id(`main`)(
	
	H1(`Todos!`),
	
	IF(todos.length == 0)(
		P(`There are no Todos.`).id(`no-todos`),
		P(`You can create a `, B(`new`), ` Todo yourself.`),
	).ELSE(
		Div(
			P(`Here are your ${todos.length} Todos: `),
			Ul.class('links')(
				todos.map(
					t => Li(
						A(t.title).href(`/todos/${t.id}`),
					),
				),
			),
		),
	),
	
	Button(`Create new`).id(`create-new-button`).class(`red`),
	
)

const htmlCode = div.getAsHtmlString()
console.log(htmlCode)
```

## Why?
The syntax in JSML is the same as in JavaScript, so the only thing you need to learn are a few new functions and methods to call. Extremely easy!

## Documentation
See the documentation in each package to learn more.

* [@jsml/core](./core/) - Contains all the functions one can use to specify the HTML structure and convert it to HTML
* [@jsml/express-engine](./express-engine) - A rendering engine built on JSML for the Express framework