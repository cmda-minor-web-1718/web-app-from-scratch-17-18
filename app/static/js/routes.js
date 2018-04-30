import sections from './sections'
import routie from './routie'
import api from './api'

const routes = {
    init: function() {
        routie({

            'start': function() {
                sections.start();
            },

            'pokemon': function() {
                sections.pokemon();
            },

            'pokemon/:id': function(obj) {
                api.openPokemonInfo(obj)
            }
        })
    }
}

export default routes