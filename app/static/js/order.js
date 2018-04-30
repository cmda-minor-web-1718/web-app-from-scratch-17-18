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
    }
}
export default order