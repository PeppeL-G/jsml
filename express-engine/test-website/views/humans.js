import { A, Div, H1, IF, Li, P, Ul } from '../../../core/src/index.js'

export default function({
	humans,
}){
	
	return Div(
		H1(`Humans`),
		IF(humans.length == 0)(
			P(`There are no humans.`)
		).ELSE(
			Ul(
				humans.map(
					h => Li(
						A(h.name).href(`/humans/${h.id}`)
					)
				)
			)
		)
	)
	
}