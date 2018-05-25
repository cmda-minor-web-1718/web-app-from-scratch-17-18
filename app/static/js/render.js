import api from './api.js'

//render / toggle sections
var sections = {
  render: function(data) {

    let dataFilm = data.map(function(i) { // Map function thanks to Keving Wang and Oy
      return {
        display_title: i.display_title.replace(/ /g, "_"),
        mpaa_rating: i.mpaa_rating
      }
    });
    console.log(dataFilm[3].display_title);
    console.log(data)
    dataFilm = dataFilm.filter(data => data.mpaa_rating == "R")
    console.log(data)

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
    var target = document.getElementById('movielist');
    Transparency.render(target, dataFilm, movies);
    // var target = document.getElementById('movieDetail');

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

export default sections
