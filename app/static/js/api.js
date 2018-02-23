import sections from './sections'
import routie from './routie'

const template = document.querySelector('.template'),
    data = {},
    newData = {},
    elPokemonList = document.querySelector('.pokemon-list')
let obj = {},
	newObj = {} // JS declared de variables boven aan de scope

const api = { // object met .call, .orderPokemon, .makeList en .openPokemonInfo method,
    call: function() {
            const request = new XMLHttpRequest()
            request.open('GET', 'https://www.pokeapi.co/api/v2/pokemon/?limit=151', true)

            request.onload = function() {


                console.log(request.status)

                if (request.status >= 200 && request.status < 400) {	

                    this.data = JSON.parse(request.responseText)
                    const pokemon = this.data.results
                    api.makeList(pokemon);
                    api.orderPokemon(pokemon)

                    // closure is een functie in een functie waar de parent functie nog steeds bij de child functie kan

                    const loading = document.querySelector('.loading')
                    loading.style.display = "none"
                }	
            }
            request.onerror = function() {
                const loading = document.querySelector('.error')
                    loading.style.display = "block" // callback voor als er wat fout gaat
            }

            request.timeout = function() {
                const loading = document.querySelector('.error')
                    loading.style.display = "block"
            }

            request.send()
    },

    orderPokemon: function(pokemon) {

        const pokemonButton = document.querySelector('.button'),
            listPokemon = document.querySelectorAll('.pokemon')
        pokemonButton.addEventListener('click', function() {
            const inputPokemon = document.querySelector('.input').value
            console.log(inputPokemon)
            const filteredPokemon = pokemon.filter(function(x, i) {
                    return x.name.startsWith(inputPokemon) == false
            })
            console.log(filteredPokemon)
            filteredPokemon.forEach( el => {

                const currPokemon = document.querySelector( '[href="#' + el.name + '"]' )
                currPokemon.parentNode.classList.add( 'weg' )

            } )
        })
    },

    makeList: function(pokemon) {

        pokemon.forEach(i => {
            obj = i
            const pokemonListItem = document.createElement('li'),
                elPokemonLink = document.createElement('a'),
                name = document.createTextNode(obj.name)

            pokemonListItem.appendChild(elPokemonLink)
            elPokemonLink.setAttribute('href', '#' + obj.name)
            elPokemonLink.appendChild(name)
            elPokemonList.appendChild(pokemonListItem)
            pokemonListItem.className = 'pokemon'
            
            // console.log(obj.name)
            routie(obj.name, function() {
                console.log(window.location.hash.split('#')[1])
                api.openPokemonInfo(obj)
            })
        })
    },

    openPokemonInfo: function(obj) {
        const pokeHash = window.location.hash.split('#')[1]
        const newRequest = new XMLHttpRequest()
        newRequest.open('GET', 'https://www.pokeapi.co/api/v2/pokemon/' + pokeHash, true)

        newRequest.onload = function() {

            console.log(newRequest.status)

        if (newRequest.status >= 200 && newRequest.status < 400) {
            
            console.log(newRequest.status)
                    
            this.newData = JSON.parse(newRequest.responseText)
            const pokemonImages = this.newData.sprites,
                pokemonInfo = this.newData,
                pokeInfo = {
                    name: pokemonInfo.name,
                    height: 'Height: ' + pokemonInfo.height / 10 + ' meter',
                    weight: 'Weight: ' + pokemonInfo.weight / 10 + ' kilogram',
                    statsHP: 'HP: ' + pokemonInfo.stats[5].base_stat,
                    statsDef: 'Defense: ' + pokemonInfo.stats[3].base_stat,
                    statsAtt: 'Attack: ' + pokemonInfo.stats[4].base_stat,
                    statsSpeed: 'Speed: ' + pokemonInfo.stats[0].base_stat,
                    statsSpDef: 'Special Defense: ' + pokemonInfo.stats[1].base_stat,
                    statsSpAtt: 'Special Attack: ' + pokemonInfo.stats[2].base_stat,							
                }	

                if (pokemonInfo.types.length > 1) {
                    document.querySelector('.type1').innerHTML = "Type: " + pokemonInfo.types[0].type.name + " & "
                    document.querySelector('.type2').innerHTML = pokemonInfo.types[1].type.name
                } else {
                    document.querySelector('.type1').innerHTML = "Type: " + pokemonInfo.types[0].type.name
                    document.querySelector('.type2').innerHTML = ""
                }

                document.querySelector('.sprite_front').setAttribute('src', pokemonInfo.sprites.front_default)
                document.querySelector('.sprite_back').setAttribute('src', pokemonInfo.sprites.back_default)
                document.querySelector('.sprite_shiny_front').setAttribute('src', pokemonInfo.sprites.front_shiny)
                document.querySelector('.sprite_shiny_back').setAttribute('src', pokemonInfo.sprites.back_shiny)
                        
                setTimeout(function(){
                    template.classList.add('showPokemon')
                }, 1)

                Transparency.render(template, pokeInfo)
                
            }
        }
            
        newRequest.onerror = function() {
            const loading = document.querySelector('.error')
                loading.style.display = "none"
        }

        newRequest.timeout = function () {
            const loading = document.querySelector('.error')
                loading.style.display = "none"
        }
            
        newRequest.send()
    }
}

export default api