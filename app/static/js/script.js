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
      // routes.init()
      api.getData()
      routes.init()
    }
  }

  var api = {
    response: {},
    getData: function() {
      var request = new XMLHttpRequest();
      request.open('GET', 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=3d8eafd7eaf04aa6a1493eaa050714a7', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          api.response = JSON.parse(request.responseText);

          console.log(api);
          sections.render(api.response.results);
          //console.log(data);
        } else {
          // We reached our target server, but it returned an error
          console.log('yo hij doet het niet')
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
    }
  }

  //handle routes & state
  var routes = {
    init() {
      routie({
        'start': function() {
          console.log('test')
          sections.toggle(window.location.hash)
        },
        'movies': function() {
          console.log('start')
          sections.toggle(window.location.hash)
        },
        'movies/?:name': function(name) {
          console.log(name)
          sections.toggle(name)
          document.getElementById('moviemain').classList.remove('none');
          var names = name

          fetch(`http://www.omdbapi.com/?t=${names}&apikey=b0b13f21`)
            .then( res => {
              return res.json()
            } )
            .then( res => {
              console.log( res )
              var directives = {
                image: {
                  src: function() {
                    return `${this.Poster}`
                  }
                }
              }
              Transparency.render(document.querySelector('#moviemain'), res, directives);
            } )


        },
      })
    }
  };

  //render / toggle sections
  var sections = {
    render: function(data) {

      let dataFilm = data.map(function(i) { //Map function thanks to Keving Wang and Oy
        return {
          byline: i.byline,
          critics_pick: i.critics_pick,
          date_updated: i.date_updated,
          display_title: i.display_title.replace(/ /g, "_"),
          headline: i.headline
        }
      });

      let movies = {
        display_title: {
          href: function(params) {
            return `/#movies/${this.display_title}`
          },
          headline: {
            class: function(params) {
              return this.headline
            }
          }
        }
      };
      console.log(dataFilm);
      console.log(movies);
      var target = document.getElementById('activities');
      console.log(api.response.results);
      Transparency.render(target, dataFilm, movies);
      var target = document.getElementById('movieDetail');
      // Render Page
      Transparency.render(target, dataFilm, movies);
    },
    toggle: function(route) {
      console.log(route);
      for (var i = 0; i < document.querySelectorAll("section").length; i++) {
        document.querySelectorAll("section")[i].classList.add("none")
      }
      if (document.querySelector(route)) {
        document.querySelector(route).classList.remove("none")
      } else {
        return
      }
    }
  }

  //start the application
  app.init()

})()
