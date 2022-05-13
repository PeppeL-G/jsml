import path from 'path'

export function createJsmlEngine({defaultLayoutFilename='main.js'}){
	
	const layoutFilePath = path.join(
		process.cwd(),
		'./layouts',
		defaultLayoutFilename,
	)
	
	return function jsmlEngine(pageFilePath, options, callback){
		
		// Add hashes at the end so the modules are reloaded each
		// time requested (so one doesn't have to restart the app)
		// each time a layout or view is changed.
		// TODO: Should only work like this during development,
		//       and not in production.
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