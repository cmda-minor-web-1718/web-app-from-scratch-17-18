(function() {
	"use strict"

	const app = {
		init: function() {
			const routes = {
				init: function() {
					const addVideo = document.getElementById('add-video')
					const detail = document.getElementById('detail')
					const iframe = document.querySelector('#detail iframe')

					routie({
						'add-video': function() {
							detail.classList.remove('showDetail')
							addVideo.classList.add('show')
							addYourVideos.searchVideos()
						},
						'videos': function() {
							detail.classList.remove('showDetail')
							addVideo.classList.remove('show')
							document.querySelector('body').classList.remove('overflow')
							iframe.src = ''
						}
					});

					routie('videos/:id', function(id) {
							detail.classList.add('showDetail')
							document.querySelector('body').classList.add('overflow')
							template.detail(id)
					});
				}
			}
		routes.init()
		api.fetch()
		}
	}

	const api = {
		videos: [],
		searchYoutube: [],
		detailTitle: {},
		fetch: function() {

			let searchVideo = "samuel elkins"
			let queryurl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchVideo}&type=video&maxResults=20&key=AIzaSyAFLVY9mCE3hBE8niWn6wcNs01nWCZcn1s`;

			fetch(queryurl)
			.then(response => response.json()) 

			.then( function(data) {

				let videofetch = data.items

				let videoObject = videofetch.map(function (video) {
					return {title: video.snippet.title, id: video.id.videoId, thumbnail: video.snippet.thumbnails.high.url} 
				})
	
				api.videos = videoObject
	
				// videofetch.forEach( function(video) {
				// 	let videoTitle = video.snippet.title
				// 	let videoTumbnail = video.snippet.thumbnails.high.url
				// 	let videoId = video.id.videoId
				// 	let videoArray = {}
				// 	videoArray.title = videoTitle
				// 	videoArray.tumbnail = videoTumbnail
				// 	videoArray.id = videoId
				// 	api.videos.push(videoArray)
				// })
				console.log(api.videos)	

				template.overview()
	
			})		
		}
	}

	const template = {
		overview: function(id) {

			let directives = {
				tumbnail: {
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

			Transparency.render(document.getElementById('template'), api.videos, directives);

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
					api.detailTitle.title = this.title
				})
			})
		},
		detail: function(id) {
			let detailVideoId = id
			const iframe = document.querySelector('#detail iframe')
			iframe.src = `https://www.youtube.com/embed/${detailVideoId}?rel=0&amp;showinfo=0&amp;autoplay=1`

			console.log(api.detailTitle)
			Transparency.render(document.getElementById('detailTemplate'), api.detailTitle)
		},

		searchYoutube: function() {
			console.log('gelukt?')
			console.log(api.searchYoutube)

			let directives = {
				tumbnail: {
					src: function() {
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

			Transparency.render(document.getElementById('videoContainer'), api.searchYoutube, directives)
			document.getElementById('videoContainer').style.display = "flex"
			
		}
	}

	const addYourVideos = {
		searchVideos: function() {

			const searchGO = document.querySelector('.searchContainer button')

			searchInput.addEventListener("keyup", function (event) {
				event.preventDefault();
				if (event.keyCode === 13) {
					fetchVideos()
				}
			});

			searchGO.addEventListener('click', fetchVideos);
			function fetchVideos() {

				let searchValue = document.getElementById('searchInput').value;

				var queryurl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchValue}&type=video&maxResults=10&key=AIzaSyAFLVY9mCE3hBE8niWn6wcNs01nWCZcn1s`;
		
				fetch(queryurl)
				.then(response => response.json()) 
				.then(function (data) {
					let videofetch = data.items

					let videoObject = videofetch.map(function (video) {
						return {title: video.snippet.title, id: video.id.videoId, thumbnail: video.snippet.thumbnails.high.url} 
					})

					api.searchYoutube = videoObject

					template.searchYoutube()
				})
			}
		}
	}

	app.init()

})()