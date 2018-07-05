const template = {
	overview: function(id) {

		let directives = {
			thumbnail: {
				"data-src": function() {
				return this.thumbnail
				}
			},

			videoId: {
				href: function() {
					return "#videos/" + this.id
				},
				title: function() {
					return this.title
				}
			}
		}

		Transparency.render(document.getElementById('template'), storage.videos, directives);

		const loadingSpinner = document.querySelector('.loadingSpinner') // spinner while loading
		loadingSpinner.classList.add('showSpinner');

		[].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) { //lazy loader
			img.setAttribute('src', img.getAttribute('data-src'))
			img.onload = function() {
			  img.removeAttribute('data-src')
			  loadingSpinner.classList.remove('showSpinner')
			}
		})

		let selectedVideo = document.querySelectorAll('.videoId')
		selectedVideo.forEach( function(video) {
			video.addEventListener('click', function() {
				storage.detailTitle.title = this.title
			})
		})
	},
	detail: function(id) {
		let detailVideoId = id
		const iframe = document.querySelector('#detail iframe')
		iframe.src = `https://www.youtube.com/embed/${detailVideoId}?rel=0&amp;showinfo=0&amp;autoplay=1`

		console.log(storage.detailTitle)
		Transparency.render(document.getElementById('detailTemplate'), storage.detailTitle)

		const closeVideo = document.querySelector('#detail button a')

		console.log(closeVideo)
		document.onkeydown = function (e) { 
			if (e.keyCode === 27) {
				closeVideo.click()
			}   
		} 

		const detail = document.getElementById('detail')

		detail.addEventListener('click', function() {
			closeVideo.click()
		})
	},

	searchYoutube: function() {
		console.log('gelukt?')
		console.log(storage.searchYoutube)

		let directives = {
			thumbnail: {
				src: function() {
				return this.thumbnail
				}
			},

			videoId: {
				href: function() {
					return "#add-category" 
				},
				title: function() {
					return this.title
				},
				id: function() {
					return this.id
				},
				thumbnail: function() {
					return this.thumbnail
				}
			}
		}
		
		Transparency.render(document.getElementById('videoContainer'), storage.searchYoutube, directives)
		document.getElementById('videoContainer').style.display = "flex"

		let youtubeVideos = document.querySelectorAll('.individualContainer a')
		youtubeVideos.forEach( function(video) {
			video.addEventListener('click', function() {
				let videoTitle = this.title
				let videoThumbnail = this.thumbnail
				let videoId = this.id
				let videoArray = {}
				videoArray.title = videoTitle
				videoArray.thumbnail = videoThumbnail
				videoArray.id = videoId
				storage.addVideo = videoArray
				console.log(storage.addVideo)
				template.videoPreview()
			})
		})
	},

	videoPreview: function() {
		let directives = {
			thumbnail: {
				"src": function() {
				return this.thumbnail
				}
			}
		}
		Transparency.render(document.getElementById('addVideoContainer'), storage.addVideo, directives);
	},

	createVideo: function() {
		storage.videos.unshift(storage.addVideo)
		template.overview()
	}
}