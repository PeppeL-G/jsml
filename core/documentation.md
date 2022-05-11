# Documentation
In this file you find the documentation for how to use the functions from `@jsml/core` to create your own HTML structures, and how to generate HTML code from them.



## HTML elements
For each HTML element, this package exports a function with the same name:

* For `<h1>`, the package exports the function `H1()`
* For `<form>`, the package exports the function `Form()`
* For `<a>`, the package exports the function `A()`
* ...




### Basic usage
Simply call the corresponding function to create a new HTML element of that type. When you call it, you can pass it its content as the arguments. Call the method `getAsHtmlString()` to get the HTML structure as HTML code.

```js
import { H1 } from '@jsml/core'

const h1Element = H1(`Hello`)

console.log(h1Element.getAsHtmlString())
// <h1>Hello</h1>
```

```js
import { Div, H1, P } from '@jsml/core'

const divElement = Div(
	H1(`Hello`),
	P(`How are you?`),
)

console.log(divElement.getAsHtmlCode())
// <div><h1>Hello</h1><p>How are you?</p></div>
```


### Adding attributes
Adding attributes is done by calling the method with the same name as the attribute, and pass it the value as argument to the method. These methods are also chainable (they return the element instance itself), so you can call them multiple times.

```js
const h1Element = H1(`Hello`).id(`title`).class(`important`)

console.log(h1Element.getAsHtmlString())
// <h1 id="title" class="important">Hello</h1>
```




### Setting the content
As you should know by now, you can pass the content to the element when you create it. But that makes the code hard to read for an element containing attributes and many children, as seen below.

```js
const divElement = Div(
	P(`A line`),
	P(`A line`),
	P(`A line`),
	P(`A line`),
	P(`A line`),
	P(`A line`),
).class(`the-page`) // Hard to read that this belongs to the Div element!
```

Therefor an alternative method is available to set the content: call the element as a function!

```js
const divElement = Div.class('the-page')( // Calling the element as a function here.
	P(`A line`),
	P(`A line`),
	P(`A line`),
	P(`A line`),
	P(`A line`),
	P(`A line`),
)
```

```js
const h1Element = H1.id(`title`).class(`important`)(`Since this text is quite long, it might be a good idea to set the attributes first to make the code more readable.`)
```

Use whichever method you think makes your code most readable.

If you pass arrays as content (no matter which method), they will be flattened, so you don't need to worry about that.

```js
import { Div, P } from '@jsml/core'

const divElement = Div(
	P(`Line 1`),
	[P(`Line 2`)],
	P(`Line 3`),
	[P(`Line 4`), [P(`Line 5`)]],
	[[[[P(`Line 6`)]]]],
)

console.log(divElement.getAsHtmlCode())
// <div><p>Line 1</p><p>Line 2</p><p>Line 3</p><p>Line 4</p><p>Line 5</p><p>Line 6</p></div>
```





## Escaping HTML code
Content and attribute values containing HTML code in strings will be escaped to avoid introducing Cross-Site Scripting (XSS) vulnerabilities. 

```js
import { Div, P } from '@jsml/core'
const pElement = P(`<b>Hello</b>`)

console.log(pElement.getAsHtmlString())
// <p>&lt;b&gt;Hello&lt;/b&gt;</p>
```

```js
const pElement = P(`Hello`).id(`>hi!`)

console.log(pElement.getAsHtmlString())
// <p id="&gt;hi!">Hello</p>
```

If you want a string containing HTML code to be displayed as HTML code, wrap the string in the `HTML()` function.

```js
const pElement = P(HTML(`<b>Hello</b>`))

console.log(pElement.getAsHtmlString())
// <p><b>Hello</b></p>
```

**Only use `HTML()` if you have a complete understanding of how XSS vulnerabilities work, so you don't introduce one in your own application by mistake!**




## Conditional expressions
You can use plain JavaScript to conditionally create the elements you need.

```js
const names = [`Alice`, `Bob`, `Claire`]

let pageContent

if(names.length == 0){
	pageContent = P(`There are no names.`)
}else{
	pageContent = P(`There are ${names.length} names.`)
}

const element = Div.class(`names-page`)(
	H1(`Names`),
	pageContent,
)
```

```js
const names = [`Alice`, `Bob`, `Claire`]

const element = Div.class(`names-page`)(
	H1(`Names`),
	names.length == 0 ? P(`There are no names.`) : P(`There are ${names.length} names.`),
)
```

However, this can make the code hard to read. An alternative is to use the package's *conditional expression* class. You create a new instance of it by calling the `IF` function, and passing it the condition. Just as for elements, the methods in this class are chainable (i.e. they return the conditional expression object itself), and it's also callable as a function. Call it as a function to specify which content to use if the condition is true. See the example below.

```js
const names = [`Alice`, `Bob`, `Clair`]

const element = Div.class(`names-page`)(
	
	H1(`Names`),
	
	IF(names.length == 0)(
		P(`There are no names.`),
	).ELSEIF(names.length == 1)(
		P(`There is only the name ${names[0]}.`),
	).ELSEIF(names.length == 2)(
		P(`There are only the two names ${names[0]} and ${names[1]}.`),
	).ELSE(
		P(`There are ${names.length} names: `),
		Ul(
			names.map(
				n => Li(n)
			),
		),
	),
	
)
```

As you can see above, `ELSEIF()` and `ELSE` are also supported.

As for all functions and methods, the arguments passed to `IF()`, `ELSEIF()` and `ELSE()` are always evaluated, including the ones that won't be used. That can be a problem in some cases, like below:

```js
const x = 99

// Imagine 2^x is an expensive computation,
// and we should only compute it if x is smaller than 10.
const component = IF(10 <= x)(
	P(`x is too big!`),
).ELSE(
	P(`2^${x} = ${2**x}.`), // 2^x will be computed anyway...
)
```

In these cases, you can pass the arguments (conditions and content) as functions that will only be called when needed. Simply add `() =>` in front of the argument.

```js
const x = 99

const component = IF(10 <= x)(
	P(`x is too big!`),
).ELSE(
	() => P(`2^${x} = ${2**x}.`), // This anonymous function will only be called if this content will be used.
)
```