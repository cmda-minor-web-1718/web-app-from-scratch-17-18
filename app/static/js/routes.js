import sections from './render.js'
import api from './api.js'
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
        api.call('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=3d8eafd7eaf04aa6a1493eaa050714a7').then(function(data){
          sections.render(data.results.sort((a, b) => a.display_title.localeCompare(b.display_title)))
        }).catch(function (e) {
          console.log(e)
        })
        sections.toggle(window.location.hash)
      },
      // Thanks to Mo
      'movies/?:name': function(name) {
        console.log(name)
        sections.toggle(name)
        document.getElementById('moviemain').classList.remove('none');
        var names = name

        api.call(`http://www.omdbapi.com/?t=${names}&apikey=b0b13f21`)
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
          } ).catch(function (e) {
            console.log(e)
          })
      },
    })
  }
};

export default routes
