const order = {
    pokemon: function(pokemon) {

        const pokemonButton = document.querySelector('.button'),
            listPokemon = document.querySelectorAll('.pokemon')

        pokemonButton.addEventListener('click', function () {

            const inputPokemon = document.querySelector('.input').value,
            
                filteredPokemon = pokemon.filter(function (x, i) {
                return x.name.startsWith(inputPokemon) == false
            })
            
            filteredPokemon.forEach(function(el) {

                const currPokemon = document.querySelector('[href="' + el.name + '"]')
                currPokemon.parentNode.classList.add('gone')

            })
        })
    },

    makeList: function (pokemon) {

        pokemon.forEach(function(i) {
            let obj = i
            const pokemonListItem = document.createElement('li'),
                elPokemonLink = document.createElement('a'),
                name = document.createTextNode(obj.name),
                elPokemonList = document.querySelector('.pokemon-list')

            pokemonListItem.appendChild(elPokemonLink)
            elPokemonLink.setAttribute('href', '#pokemon/' + obj.name)
            elPokemonLink.appendChild(name)
            elPokemonList.appendChild(pokemonListItem)
            pokemonListItem.className = 'pokemon'
        })
    }
}
export default order