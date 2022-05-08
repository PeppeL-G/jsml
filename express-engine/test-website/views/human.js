import { Dd, Div, Dl, Dt, H1, IF, P } from '../../../core/src/index.js'

export default function({
	human,
}){
	
	return Div(
		H1(`Human`),
		IF(!human)(
			P(`No human with the given id.`)
		).ELSE(
			() => Dl(
				
				Dt(`Id`),
				Dd(human.id),
				
				Dt(`Name`),
				Dd(human.name),
				
				Dt(`Age`),
				Dd(human.age),
				
			)
		)
	)
	
}