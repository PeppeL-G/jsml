# JSML - JavaScript Markup Library
This is the official repository for the JavaScript Markup Library; the answer to *What is the best way to create HTML in JS?*

## Introduction
There exists many different template languages one can use to generate HTML code, such as:

* [Handlebars](https://handlebarsjs.com/)
* [Jade](https://jade-lang.com/)
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
	
	A(`Create new`)
		.href(`/todos/create`)
		.id(`create-new-link`)
		.class(`red`),
	
)

const htmlCode = div.getAsHtmlString()
console.log(htmlCode)
```

## Why?
The syntax in JSML is the same as in JavaScript, so the only thing you need to learn are a few new functions and methods to call. Extremely easy compared to learning a new template language!

## Documentation
See the documentation in each package to learn more.

* [@jsml/core](./core/) - Contains all the functions one can use to specify the HTML structure and convert it to HTML
* [@jsml/express-engine](./express-engine) - A rendering engine built on JSML for the Express framework