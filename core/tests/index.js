import { Div, P, IF } from '../src/index.js'

const tests = []

// Test creating element with content.
tests.push({
	name: `Element with content`,
	test: () => Div(`content`),
	expected: `<div>content</div>`,
}, {
	name: `Element with content 2`,
	test: () => Div()(`content`),
	expected: `<div>content</div>`,
})

// Test creating element with content and attributes.
tests.push({
	name: `Element with content and id`,
	test: () => Div(`content`).id('theId'),
	expected: `<div id="theId">content</div>`,
}, {
	name: `Element with content and class`,
	test: () => Div(`content`).class('theClass'),
	expected: `<div class="theClass">content</div>`,
}, {
	name: `Element with content, id and class`,
	test: () => Div(`content`).id("theId").class('theClass'),
	expected: `<div id="theId" class="theClass">content</div>`,
}, {
	name: `Element with content and id 2`,
	test: () => Div.id('theId')('content'),
	expected: `<div id="theId">content</div>`,
}, {
	name: `Element with content and class 2`,
	test: () => Div.class('theClass')(`content`),
	expected: `<div class="theClass">content</div>`,
}, {
	name: `Element with content, id and class 2`,
	test: () => Div.id("theId").class('theClass')(`content`),
	expected: `<div id="theId" class="theClass">content</div>`,
})

// Test creating elements with multiple children.
tests.push({
	name: `Element with children`,
	test: () => Div(P(`1`), P(`2`)),
	expected: `<div><p>1</p><p>2</p></div>`,
}, {
	name: `Element with children 2`,
	test: () => Div()(P(`1`), P(`2`)),
	expected: `<div><p>1</p><p>2</p></div>`,
})

// Test using conditional expressions.
tests.push({
	name: `IF true`,
	test: () => IF(true)(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false`,
	test: () => IF(false)(P(`1`), P(`2`)),
	expected: ``,
}, {
	name: `IF false ELSE`,
	test: () => IF(false).ELSE(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSE 2`,
	test: () => IF(false)().ELSE(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSEIF true`,
	test: () => IF(false).ELSEIF(true)(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSEIF true 2`,
	test: () => IF(false)().ELSEIF(true)(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSEIF false`,
	test: () => IF(false)().ELSEIF(false)(P(`1`), P(`2`)),
	expected: ``,
}, {
	name: `IF false ELSEIF false ELSE`,
	test: () => IF(false).ELSEIF(false).ELSE(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSEIF false ELSE 2`,
	test: () => IF(false).ELSEIF(false)().ELSE(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
})

// Test using conditional expressions with lazy evaluation.
tests.push({
	name: `IF () => true`,
	test: () => IF(true)(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF () => false`,
	test: () => IF(false)(P(`1`), P(`2`)),
	expected: ``,
}, {
	name: `IF true () =>`,
	test: () => IF(true)(() => P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSEIF () => true`,
	test: () => IF(false).ELSEIF(() => true)(P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
}, {
	name: `IF false ELSEIF () => false`,
	test: () => IF(false).ELSEIF(() => false)(P(`1`), P(`2`)),
	expected: ``,
}, {
	name: `IF false ELSE () => `,
	test: () => IF(false).ELSE(() => P(`1`), P(`2`)),
	expected: `<p>1</p><p>2</p>`,
})

// Run all tests.
console.log(`Running tests now...`)

for(const test of tests){
	try{
		test.output = test.test().getAsHtmlString()
		test.failed = test.output != test.expected
	}catch(error){
		test.output = error.message
		test.failed = true
	}
}

// Compute statistics.
console.log("Computing statistics now...")
const failedTests = tests.filter(t => t.failed)

// Show statistics.
if(failedTests.length == 0){
	console.log(`All ${tests.length} tests passed!`)
}else{
	
	console.log(`${failedTests.length} tests failed:`)
	
	for(const test of failedTests){
		console.log('---')
		console.log(JSON.stringify(test, null, 2))
		console.log('---')
	}
	
}