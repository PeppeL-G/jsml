import express from 'express'
import { createJsmlEngine } from '../src/index.js'
import { humans } from './data.js'

export const app = express()

app.engine('js', createJsmlEngine({
	defaultLayoutFilename: 'main.js'
}))

app.use(function(request, response, next){
	
	response.locals.randomNumber = Math.random()
	
	next()
	
})

app.get('/', function(request, response){
	
	response.render('start.js')
	
})

app.get('/humans', function(request, response){
	
	const model = {
		humans,
	}
	
	response.render('humans.js', model)
	
})

app.get('/humans/:id', function(request, response){
	
	const id = request.params.id
	
	const human = humans.find(h => h.id == id)
	
	const model = {
		human,
	}
	
	response.render('human.js', model)
	
})