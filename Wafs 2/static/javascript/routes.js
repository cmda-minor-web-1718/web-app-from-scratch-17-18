const routes = {
	init: function() {
		const addVideo = document.getElementById('add-video')
		const detail = document.getElementById('detail')
		const iframe = document.querySelector('#detail iframe')
		const addCategory = document.getElementById('add-category')
		const categories = document.getElementById('categories')

		routie({
			'add-video': function() {
				detail.classList.remove('showDetail')
				addCategory.classList.remove('showPage')
				document.querySelector('body').classList.remove('overflow')
				detail.classList.remove('showDetail')
				categories.classList.remove('show')
				addVideo.classList.add('show')
			},
			'categories': function() {
				detail.classList.remove('showDetail')
				addCategory.classList.remove('showPage')
				document.querySelector('body').classList.remove('overflow')
				addVideo.classList.remove('show')
				detail.classList.remove('showDetail')
				categories.classList.add('show')
			},
			'videos': function() {
				detail.classList.remove('showDetail')
				addCategory.classList.remove('showPage')
				categories.classList.remove('show')
				addVideo.classList.remove('show')
				document.querySelector('body').classList.remove('overflow')
				iframe.src = ''
			},
			'add-category': function() {
				addCategory.classList.add('showPage')
				document.querySelector('body').classList.add('overflow')
			}
		});

		routie('videos/:id', function(id) {
				detail.classList.add('showDetail')
				document.querySelector('body').classList.add('overflow')
				template.detail(id)
		});
	}
}