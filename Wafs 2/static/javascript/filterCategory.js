const filterCategory = {
	filter: function() {

		let categorySelection = {}
		let filterCategory = document.querySelectorAll('input[name="filterCategory"]')
		filterCategory.forEach( function (filter) {
			
			if (filter.checked == true) {
				let checkboxValue = filter.id
				categorySelection.push(checkboxValue)
			} else if (filter.checked != true) {
				let checkboxValue = filter.id
				categorySelection.pop(checkboxValue)
			}

		})

	}
}