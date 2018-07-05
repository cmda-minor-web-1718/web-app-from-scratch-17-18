const addCategory = {
	choose: function() {

		document.querySelector('.addVideo').addEventListener('click', function() {
			let category = document.querySelector('input[name="category"]:checked').id
			storage.addVideo.category = category
			template.createVideo()
		})
	}
}