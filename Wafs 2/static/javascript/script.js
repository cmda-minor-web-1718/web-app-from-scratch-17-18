(function() {
	"use strict"

	const app = {
		init: function() {
			addCategory.choose()
			addYourVideos.searchVideos()
			routes.init()
			storage.render()
			filterCategory.filter()
		}
	}
	
	

	

	


	

	app.init()

})()