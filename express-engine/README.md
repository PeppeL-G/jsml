# @jsml/express-engine
This npm package exports a rendering engine one can use in [Express](https://expressjs.com/) applications to render layouts and views in JSML.

## Quickstart
1. `npm install express @jsml/core @jsml/express-engine`

**/app.js**
```js
import express from 'express'
import { createJsmlEngine } from '@jsml/express-engine'

const app = express()

app.engine('js', createJsmlEngine({
	layoutFileName: 'main.js'
}))

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

## Documentation
See the file [documentation.md](./documentation.md)