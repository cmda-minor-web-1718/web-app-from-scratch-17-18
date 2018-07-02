(function() {
	"use strict"

	const app = {
		init: function() {

			const routes = {
				init: function() {
					window.addEventListener("hashchange", sections.toggle, false);
				}
			}

		routes.init()
		}
	}

	const sections = {
		toggle: function(route) {
			const startscreen = document.getElementById('startscreen')
			const bestPractices = document.getElementById('best-practices')
			const bestPracticesURL = route.newURL.includes("#best-practices")
			const startscreenURL = route.newURL.includes("#startscreen")

			if (bestPracticesURL) {
				startscreen.classList.remove('show')
				bestPractices.classList.add('show')
			
			} else if (startscreenURL) {
				bestPractices.classList.remove('show')
				startscreen.classList.add('show')
			
			}
		}
	} 

	app.init()

})()