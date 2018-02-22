// import api from './api.js'
import routes from './routes.js'
import localStorageData from './localstorage.js'
console.log('global scope');
//create local scope
(function() {
  var settings = {
    sections: document.querySelectorAll('sections')
  }
  console.log('local scope');
  //initialize application
  var app = {
    // is een method wat je kan uitvoeren
    init: function() {
      console.log('app initialised')
      routes.init()
      localStorageData.getItem()
    }
  }

  //start the application
  app.init()

})()
