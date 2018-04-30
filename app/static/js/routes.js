import sections from './sections'
import routie from './routie'

const routes = {
    init: function() {
        routie({

            'start': function() {
                sections.start();
            },

            'pokemon': function() {
                sections.pokemon();
            },

            'pokemon/:id': function() {
                api.openPokemonInfo();
            }
        })
    }
}

export default routes