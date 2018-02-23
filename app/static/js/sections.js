const elStart = document.querySelector('#start'),
    elPokemon = document.querySelector('#pokemon')

const sections = {
    
    
    start: function() {
        elStart.classList.remove('no-display')
        elPokemon.classList.add('no-display')
    },

    pokemon: function() {
        elPokemon.classList.remove('no-display')
        elStart.classList.add('no-display')
    }
}

export default sections