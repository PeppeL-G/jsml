import path from 'path'

export function createJsmlEngine({layoutFileName}){
	
	const layoutFilePath = path.join(
		process.cwd(),
		'./layouts',
		layoutFileName,
	)
	
	return function jsmlEngine(pageFilePath, options, callback){
		
		const importPromises = [
			import(`${layoutFilePath}#${Math.random()}`),
			import(`${pageFilePath}#${Math.random()}`),
		]
		
		Promise.all(importPromises).then(function([
			{ default: LayoutComponent },
			{ default: PageComponent }
		]){
			
			const page = PageComponent(options)
			
			options.pageContent = page
			
			const layoutAndPage = LayoutComponent(options)
			
			callback(null, layoutAndPage.getAsHtmlString())
			
		}).catch(function(error){
			callback(error)
		})
		
	}
	
}