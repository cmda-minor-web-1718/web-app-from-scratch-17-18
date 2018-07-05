(function() {
	"use strict"

	const app = {
		init: function() {
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
		addCategory.choose()
		addYourVideos.searchVideos()
		routes.init()
		storage.render()
		}
	}

	const storage = {
		videos: [
			{
				title: "A Framework Author's Case Against Frameworks",
				id: 'VvOsegaN9Wk',
				thumbnail: 'https://i.ytimg.com/vi/k7n2xnOiWI8/hqdefault.jpg',
				category: 'webdev'
			},
			{
				title: 'Material Design',
				id: 'rrT6v5sOwJg',
				thumbnail: 'https://i.ytimg.com/vi/rrT6v5sOwJg/hqdefault.jpg',
				category: 'webdev'
			},
			{
				title: 'The Most Beautiful Shots In Movie History',
				id: 'xBasQG_6p40',
				thumbnail: 'https://i1.wp.com/api.onbeing.org/wp-content/uploads/2016/11/LightsCheekwood.jpg?fit=1600%2C1000&ssl=1',
				category: 'movie'
			},
			{
				title: 'How I Take Portraits - Canon 1DX Mark 2',
				id: '_AuGO05RRN8',
				thumbnail: 'https://i.ytimg.com/vi/_AuGO05RRN8/hqdefault.jpg',
				category: 'other'
			},
			{
				title: 'Khalid - Young Dumb & Broke (Official Video)',
				id: 'IPfJnp1guPc',
				thumbnail: 'https://i.ytimg.com/vi/IPfJnp1guPc/hqdefault.jpg',
				category: 'music'
			},
			{
				title: 'Saitama vs Genos Fight | One Punch Man (60FPS)',
				id: 'km2OPUctni4',
				thumbnail: 'https://i.ytimg.com/vi/km2OPUctni4/hqdefault.jpg',
				category: 'other'
			},
			{
				title: 'De Jeugd van Tegenwoordig - Glasbak',
				id: 'I36tGmo-zKU',
				thumbnail: 'https://i.ytimg.com/vi/I36tGmo-zKU/hqdefault.jpg',
				category: 'music'
			},
			{
				title: '10 rules to help you rule type',
				id: 'QrNi9FmdlxY',
				thumbnail: 'https://cdn-images-1.medium.com/max/1598/1*aom6VwAyjh03cOY15_x4nA.png',
				category: 'webdev'
			},
			{
				title: 'True Hollywood stories - Prince',
				id: 'QrNi9FmdlxY',
				thumbnail: 'https://i.ytimg.com/vi/ff8LEx9Mw54/hqdefault.jpg',
				category: 'ff8LEx9Mw54'
			},
			{
				title: 'Faberyayo X Tom Trago feat. Willem de Bruin - Lekker Niet',
				id: 'KkvTfn_kQgU',
				thumbnail: 'https://i.ytimg.com/vi/KkvTfn_kQgU/maxresdefault.jpg',
				category: 'music'
			},
			{
				title: '10 rules to help you rule type',
				id: 'QrNi9FmdlxY',
				thumbnail: 'https://cdn-images-1.medium.com/max/1598/1*aom6VwAyjh03cOY15_x4nA.png',
				category: 'webdev'
			},
			{
				title: '10 rules to help you rule type',
				id: 'QrNi9FmdlxY',
				thumbnail: 'https://cdn-images-1.medium.com/max/1598/1*aom6VwAyjh03cOY15_x4nA.png',
				category: 'webdev'
			},
		],
		searchYoutube: [],
		detailTitle: {},
		addVideo: {},
		render: function() {

				template.overview()
	
		}
	}

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

	const addYourVideos = {
		searchVideos: function() {

			const searchGO = document.querySelector('.searchContainer button')
			console.log(searchGO)

			searchInput.addEventListener("keyup", function (event) {
				console.log('nani?')
				event.preventDefault()
				if (event.keyCode === 13) {
					fetchVideos()
				}
			})

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

					storage.searchYoutube = videoObject

					template.searchYoutube()
				})
			}
		}
	}

	const addCategory = {
		choose: function() {

			document.querySelector('.addVideo').addEventListener('click', function() {
				let category = document.querySelector('input[name="category"]:checked').id
				storage.addVideo.category = category
				template.createVideo()
			})
		}
	}

	app.init()

})()