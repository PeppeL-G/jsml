# Documentation
In this file you find the documentation for how to use the rendering engine from `@jsml/express-engine`.

<div style="font-size: 20px; color: red; font-weight: bold;">
	This npm package is just a test, no official release yet.
</div>

## Basic usage
Simply import the function `createJsmlEngine(options)` and call it to create and get back your Express JSML engine. When you call it you can pass options to it (read more about that below).

The engine will use a layout file that should be placed in project's `/layouts` directory. By default it will use the file in it named `main.js`.

**/app.js**
```js
import express from 'express'
import { createJsmlEngine } from '@jsml/express-engine'

const app = express()

app.engine('js', createJsmlEngine())

app.get('/', function(request, response){
	
	const model = {
		number: Math.random()
	}
	
	response.render('the-view.js', model)
	
})

app.listen(8080)
```

**/layouts/main.js**
```js
import { Html, Head, Title, Body, H1, P, Div } from '@jsml/core'

// A Layout should export a function that should create the HTML structure.
// It will receive the Express "locals" object as argument, which also
// will contain "pageContent", which is the HTML structure of the View
// that should be used.
export default function({
	number,
	pageContent
}){
	
	return Html(
		Head(
			Title(`My Website!`),
		),
		Body(
			H1(`My website!`),
			P(`The number is ${number}.`),
			Div(
				pageContent,
			),
		),
	)
	
}
```

**/views/the-view.js**
```js
// A View should export a function that should create the HTML structure.
// It will receive the Express "locals" object as argument.
import { H1, P } from '@jsml/core'

export default function({
	number
}){
	
	return [
		H1(`The view!`),
		P(`The number in the view is also ${number}.`),
	]
	
}
```

## `createJsmlEngine(options)`
Creates and sends back a new JSML Express engine.

* `options.defaultLayoutFilename` defaults to `"main.js"`. It identifies the layout that should be used when rendering a view