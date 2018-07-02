const videoOverview = document.querySelector(".video-overview")
const videoItem = document.querySelectorAll(".video-overview li")
const videoPlayer = document.querySelector(".video-player");
const videoLink = document.querySelectorAll(".video-overview a")
const closeVideoButton = document.querySelector(".video-player button")
const video = document.querySelector(".video-player iframe")
const body = document.querySelector("body")
const videoList = document.querySelector("#videoList")




document.onkeydown = function (e) { 
	if (e.keyCode === 27) {
		closeVideoButton.click();
	}   
} 


for (let i = 0; i < videoItem.length; i++) {
	videoLink[i].addEventListener('click', function (e) {
		videoPlayer.classList.add('show-video');
		body.classList.add('overflow');
		closeVideoButton.focus()
		
		e.preventDefault()
	})
}


closeVideoButton.addEventListener('click', function (e) {
	videoPlayer.classList.remove('show-video');
	body.classList.remove('overflow');
	video.src = '';

})

videoPlayer.addEventListener('click', function (e) {
	videoPlayer.classList.remove('show-video');
	body.classList.remove('overflow');
	video.src = '';

	
})

/*
 video links
*/

for (i = 0; i < videoItem.length; i++) {
	videoLink[i].addEventListener('click', function (e) {
		e.preventDefault()
		youtubeURL = this.querySelector('div > img').getAttribute('data-youtube')
		const video = document.querySelector(".video-player iframe")
		video.src = `https://www.youtube.com/embed/${ youtubeURL }?rel=0&amp;showinfo=0&amp;autoplay=1`
	})
}

// ////////////////////////////
//  filter
// ///////////////////////////

filter()

function filter (){
	const filterInput = document.getElementById('filterInput');
	filterInput.addEventListener('keyup', filterResultaten);
	function filterResultaten() {
		let filterValue = document.getElementById('filterInput').value.toUpperCase();
		const ul = document.getElementById('videoList');
		const li = ul.getElementsByTagName('li');

		for (let i = 0; i < li.length; i++) {
			let h2 = li[i].getElementsByTagName('h2')[0];

			if (h2.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
				li[i].style.display = '';
			} else {
				li[i].style.display = 'none';
			}
		}
	}
}

// ////////////////////////////
//  open menu
// ///////////////////////////

openCloseMenu()

function openCloseMenu() {
	const menuButton = document.querySelector('.menu > button')
	const menu = document.querySelector('.menu')

	function foldMenu(){
		menu.classList.toggle('hide-menu')
		videoOverview.classList.toggle('responsive-padding')

		// zet dit in een functie 
		document.querySelector('.menu-item a').focus()
		document.querySelector('.filter input').focus()
		document.querySelector('.add-video input').focus()
	}

	menuButton.addEventListener('click', foldMenu)

	window.onscroll = scrollFunction;
	// request animation tray is wellicht beter
	function scrollFunction() {
		if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			menu.classList.add('hide-menu');
			videoOverview.classList.add('responsive-padding')
		}
	}
}

// ////////////////////////////
//  open menu-item
// ///////////////////////////

openMenuItems()

function openMenuItems() {
const menu = document.querySelector('.menu')
var navItems = document.querySelectorAll('.navigation li');
var menuItem = document.querySelectorAll('.menu-item');

	for (i = 0; i < navItems.length; i++) {
		navItems[i].addEventListener('click', function (e) {
			e.preventDefault()

			menu.classList.remove('hide-menu')
			videoOverview.classList.remove('responsive-padding')

			var selectedNav = this.classList[0]

			// foreach(menuItem in menuItems) {
			//     menuItem.classList.contains()
			// }

			for (i = 0; i < menuItem.length; i++) {

				if (menuItem[i].classList.contains('show-menu-item')) {
					menuItem[i].classList.remove('show-menu-item')
				}
			}

			for (i = 0; i < navItems.length; i++) {
				if (navItems[i].classList.contains('select')) {
					navItems[i].classList.remove('select')
				}
			}

			this.classList.add('select')

			function showMenuItem(cssClass, property) {
				document.querySelector(cssClass).classList.add('show-menu-item')
				if (property) {
					document.querySelector(cssClass, property).focus()
				}
				document.querySelector(cssClass).focus()
			
			}
			

			if (selectedNav == '1') {
				// showMenuItem('.category-menu', 'a')
				document.querySelector('.category-menu').classList.add('show-menu-item')
				document.querySelector('.category-menu a').focus()

			} else if (selectedNav == '2') {
				document.querySelector('.who-watching').classList.add('show-menu-item')
				document.querySelector('.who-watching').focus()

			} else if (selectedNav == '3') {
				document.querySelector('.add-video').classList.add('show-menu-item')
				document.querySelector('.add-video input').focus()

			} else if (selectedNav == '4') {
				document.querySelector('.filter').classList.add('show-menu-item')
				document.querySelector('.filter input').focus()
			}

		})
	}
}


// ////////////////////////////
//  filter category
// ///////////////////////////

filterCategory()

function filterCategory() {

	window.onload = category
	var videoGenre;
	function category() {
		var category = document.querySelectorAll('.category-menu li:not(:last-of-type)');

		for (i = 0; i < category.length; i++) {
			category[i].addEventListener('click', function (e) {
				e.preventDefault()

				activeCategory = this.querySelector('div')
				activeCategory.classList.toggle('active')
				// comment
				selectedGenre = activeCategory.classList[1] // ??
				// tip van moe, ik snap hem niet
				videoGenre = Array.from(document.querySelectorAll('.video-overview a > i' )).filter( function( el ) {
					return el.classList.contains( selectedGenre )
				} )

				for (i = 0; i < videoGenre.length; i++) {
					videoGenre[i].parentElement.parentElement.classList.toggle('genreActive')
				}

				var videoItem = document.querySelectorAll(".video-overview li")

				for (i = 0; i < videoItem.length; i++) {
					if (videoItem[i].classList.contains('genreActive')) {
						videoItem[i].classList.remove('hidden')
					} else {
						videoItem[i].classList.add('hidden')
					}

					var checkActive = document.querySelector('.genreActive')
					if (checkActive == null) {
						videoItem[i].classList.remove('hidden')
					}
				}
			})
		}
	}
	document.getElementById('clear').addEventListener('click', function (e) {
		document.querySelectorAll('#videoList li').forEach((li) => {
			li.classList.remove('hidden')
			li.classList.remove('genreActive')
		})
		document.querySelectorAll('.category-menu div').forEach((div) =>{
			div.classList.remove('active')
		})
	})
}

// ////////////////////////////
//  youtube API
// ///////////////////////////    

var videoContainer = document.querySelector('.videoContainer')
let searchInput = document.querySelector('#searchInput')
let searchGO = document.querySelector('.addFilter button')

var youtubeID
var youtubeImage
var youtubeTitle

// Execute a function when the user releases a key on the keyboard
searchInput.addEventListener("keyup", function (event) {
	// Cancel the default action, if needed
	event.preventDefault();
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Trigger the button element with a click
		searchGO.click();
	}
});

searchGO.addEventListener('click', searchResultaten);
function searchResultaten() {

	videoContainer.innerHTML = ''

	let searchValue = document.getElementById('searchInput').value;
	var searchVideo = searchValue

	var queryurl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchVideo}&type=video&maxResults=10&key=AIzaSyAFLVY9mCE3hBE8niWn6wcNs01nWCZcn1s`;
	// fetch de gegevens van de wikipedia url
	fetch(queryurl)
		.then(response => response.json()) // transform the data into json
		// .then(data => console.log(data))
		.then(function (data) {

			// data.items.map( function() {
			//     // ...
			// } ).forEach( function( el ) {
			//     // ...
			//     var videoId = el.id.videoId
			// } )

			for (i = 0; i < data.items.length; i++) {

				var videoId = data.items[i].id.videoId
				var videoTitle = data.items[i].snippet.title
				var videoUrl = data.items[i].snippet.thumbnails.high.url

				var createVideoWrapper = document.createElement('div')
				createVideoWrapper.classList.add('videoWrapper')
				videoContainer.appendChild(createVideoWrapper)

				var videoWrapperLink = document.createElement('a')
				videoWrapperLink.setAttribute('data-youtube', videoId)
				videoWrapperLink.href = '#'
				createVideoWrapper.appendChild(videoWrapperLink)

				var createVideoImage = document.createElement('img')
				createVideoImage.src = videoUrl
				createVideoImage.classList.add('videoImage')
				videoWrapperLink.appendChild(createVideoImage)

				var createVideoTitle = document.createElement('h2')
				videoTitle2 = videoTitle.slice(0, 50)
				createVideoTitle.innerHTML = videoTitle2
				createVideoTitle.classList.add('videoTitle')
				videoWrapperLink.appendChild(createVideoTitle)

				var createVideoPlus = document.createElement('i')
				createVideoPlus.classList.add('plus')
				videoWrapperLink.appendChild(createVideoPlus)

			}

			var videoCategory
			var videoWrapperLink = document.querySelectorAll('.videoWrapper a')



			for (i = 0; i < videoWrapperLink.length; i++) {
				videoWrapperLink[i].addEventListener('click', function (e) {

					youtubeID = this.getAttribute('data-youtube')
					youtubeImage = this.querySelector('img').src
					youtubeTitle = this.querySelector('h2').innerHTML

					console.log(youtubeID)
					console.log(youtubeImage)
					console.log(youtubeTitle)

					var addCategory = document.querySelector('.addCategory')
					addCategory.classList.add('showAddCategory')
					body.classList.add('overflow');

					document.querySelector('.addCategory a').focus()

					var previewImage = document.querySelector('.selectedVideo img')
					var previewTitle = document.querySelector('.selectedVideo h2')
					previewImage.src = youtubeImage
					previewTitle.innerHTML = youtubeTitle

				})
			}
		})
}

// ////////////////////////////
//  Choose category for video
// ///////////////////////////    

var addCategoryItems = document.querySelectorAll('.addCategory li')
for (i = 0; i < addCategoryItems.length; i++) {
	addCategoryItems[i].addEventListener('click', function (e) {
		e.preventDefault()
		var categoryItemsDiv = document.querySelectorAll('.addCategory .genre')
		for (i = 0; i < categoryItemsDiv.length; i++) {
			categoryItemsDiv[i].classList.remove('active')
		}

		var chosenCategory = this.querySelector('div')
		chosenCategory.classList.toggle('active')

		videoCategory = chosenCategory.classList[1]

		var categoryIcon = document.querySelector('.selectedVideo i')
		categoryIcon.className = ' '
		categoryIcon.classList.add('genre')
		categoryIcon.classList.add(videoCategory)
	})
}

var addCategory = document.querySelector('.addCategory')
var cancel = document.querySelector('.cancel')
cancel.addEventListener('click', function () {
	addCategory.classList.remove('showAddCategory')
	body.classList.remove('overflow');
})




// ////////////////////////////
//  Create new video
// ///////////////////////////    

var videoCategory = 'music'
var addNewVideo = document.querySelector('.add')
addNewVideo.addEventListener('click', function () {

	addCategory.classList.remove('showAddCategory')
	body.classList.remove('overflow');

	var newVideoLi = document.createElement('li')
	newVideoLi.classList.add('.module')
	videoList.prepend(newVideoLi)

	var newVideoA = document.createElement('a')
	newVideoA.href = '#'
	newVideoLi.appendChild(newVideoA)

	var newVideoI = document.createElement('i')
	newVideoI.classList.add('genre')
	newVideoI.classList.add(videoCategory)
	newVideoA.appendChild(newVideoI)

	var newVideoH2 = document.createElement('h2')
	newVideoH2.innerHTML = youtubeTitle
	newVideoA.appendChild(newVideoH2)

	var newVideoDiv = document.createElement('div')
	newVideoA.appendChild(newVideoDiv)

	var newVideoI2 = document.createElement('i')
	newVideoI2.classList.add('play')
	newVideoDiv.appendChild(newVideoI2)

	var newVideoImg = document.createElement('img')
	newVideoImg.src = youtubeImage
	newVideoImg.setAttribute('data-youtube', youtubeID)
	newVideoDiv.appendChild(newVideoImg)

	document.querySelector('#videoList a').focus()

	var checkGenre = document.querySelector('.category-menu .' + videoCategory + '')

	if (document.querySelector('.genreActive') !== null)
		if (checkGenre.classList.contains('active')) {
			newVideoLi.classList.add('genreActive')
		} else {
			newVideoLi.classList.add('hidden')
		}

	var videoItem = document.querySelectorAll(".video-overview li")
	var videoLink = document.querySelectorAll(".video-overview a")

	function event() {
		for (i = 0; i < videoItem.length; i++) {
			videoLink[i].addEventListener('click', function (e) {
				e.preventDefault()
				videoPlayer.classList.add('show-video');
				body.classList.add('overflow');
				closeVideoButton.focus()
			})
		}
	}

	event()

	for (i = 0; i < videoItem.length; i++) {
		videoLink[i].addEventListener('click', function (e) {
			e.preventDefault()
			youtubeURL = this.querySelector('div > img').getAttribute('data-youtube')
			const video = document.querySelector(".video-player iframe")
			video.src = `https://www.youtube.com/embed/${youtubeURL}?rel=0&amp;showinfo=0&amp;autoplay=1`
		})
	}
})