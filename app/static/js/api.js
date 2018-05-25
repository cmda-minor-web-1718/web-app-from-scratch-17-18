
var loader = {
	 hide: function(){
		 var loader = document.getElementById('loader');
		 loader.classList.add('none')
	 },
	 show: function(){
		 var loader = document.getElementById('loader');
		 loader.classList.remove('none');
	 }
 }

var api = {

	call: function (apiURL) {
		loader.show()
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', apiURL, true);
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			   // Success!
				var data = JSON.parse(request.responseText);
				resolve(data)
				loader.hide()
			  } else {
					console.log("yo")
			   // We reached our target server, but it returned an error

			  }
			};

			request.onerror = function() {
			 // There was a connection error of some sort
			 document.body.innerHTML += 'Could not get the data. Are you connected to the internet?'
       reject('Could not get data from ' + apiURL + ', are you connected to the internet?')
			};

			request.send();
		})
		return promise
	}
}

export default api
