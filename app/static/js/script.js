console.log('global scope');
//create local scope
(function(){
  console.log('local scope');
  //initialize application
  var app = {
    // is een method wat je kan uitvoeren
    init: function(){
      console.log('app initialised')
      routes.init()
      }
    }
    //handle routes & state
    var routes = {
      init:function(){
        // what's in the hash?
        window.addEventListener("hashchange",function(event){
        var route = location.hash;
        sections.toggle(route)
      })
    }
  }

    //render / toggle sections
    var sections = {
    toggle:function(route){
      console.log(route);
      for (var i = 0; i < document.querySelectorAll("section").length; i++) {
        document.querySelectorAll("section")[i].classList.add("none")
      }
      document.querySelector(route).classList.remove("none")
    }
  }

  //start the application
  app.init()

})()
