# @jsml/core
This npm package contains the core functionality of JSML, namely the functions you use to specify the structure of your HTML code, and to generate HTML code from it.

## Quickstart
1. `npm install @jsml/core`
```js
import { Div, H1, P } from '@jsml/core'

const rootElement = Div.id('welcome-page').class('page')(
	H1(`Welcome!`),
	P(`Welcome to this page!`).class('bold'),
)

const htmlString = rootElement.getAsHtmlString()
/*
htmlString = `
<div id="welcome-page" class="page">
	<h1>Welcome!</h1>
	<p class="bold">Welcome to this page!</p>
</div>
`
(but without the unnecessary white-spaces)
*/
```

## Documentation
See the file [documentation.md](./documentation.md)