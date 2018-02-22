import sections from './render.js'
import localStorageData from './localstorage.js'

var api = {
	call: function (apiURL) {
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', apiURL, true);
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			   // Success!
				var data = JSON.parse(request.responseText);
				resolve(data)
			  } else {
			   // We reached our target server, but it returned an error

			  }
			};

			request.onerror = function() {
			 // There was a connection error of some sort
       reject('Could not get data from ' + apiURL + ', are you connected to the internet?')
			};

			request.send();
		})
		return promise
	}

}

export default api
