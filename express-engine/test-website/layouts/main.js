import { Html, Head, Title, Body, Header, Nav, Ul, Li, A, Footer, Main, Div } from '../../../core/src/index.js'

export default function({
	randomNumber,
	pageContent,
}){
	
	return Html(
		Head(
			Title(`My Website!`),
		),
		Body(
			Header(`My website!`),
			Nav(
				Ul(
					Li(
						A(`Start`).href(`/`),
					),
					Li(
						A(`Humans`).href(`/humans`),
					)
				)
			),
			Main(
				Div(`The random number is ${randomNumber}.`),
				Div(pageContent),
			),
			Footer(`Created by Peter L-G 2022`)
		),
	)
	
}