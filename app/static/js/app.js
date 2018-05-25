// import api from './api.js'
import routes from './routes.js'

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
    }
  }

  //start the application
  app.init()

})()
