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
