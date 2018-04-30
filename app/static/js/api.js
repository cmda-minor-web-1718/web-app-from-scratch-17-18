import sections from './sections'
import routie from './routie'
import order from './order'

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

            if (request.status >= 200 && request.status < 400) {	

                this.data = JSON.parse(request.responseText)
                const pokemon = this.data.results
                order.makeList(pokemon);
                order.pokemon(pokemon)

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

    openPokemonInfo: function(obj) {
        const newRequest = new XMLHttpRequest()
        newRequest.open('GET', 'https://www.pokeapi.co/api/v2/pokemon/' + obj, true)

        newRequest.onload = function() {

        if (newRequest.status >= 200 && newRequest.status < 400) {
                    
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
                },	

            sprites = {
                front_default: {
                    src: function src() {
                        return '' + pokemonInfo.sprites.front_default
                    }
                },
                back_default: {
                    src: function src() {
                        return '' + pokemonInfo.sprites.back_default
                    }
                },
                front_shiny: {
                    src: function src() {
                        return '' + pokemonInfo.sprites.front_shiny
                    }
                },
                back_shiny: {
                    src: function src() {
                        return '' + pokemonInfo.sprites.back_shiny
                    }
                }
            }

            if (pokemonInfo.types.length > 1) {
                document.querySelector('.type1').innerHTML = "Type: " + pokemonInfo.types[0].type.name + " & "
                document.querySelector('.type2').innerHTML = pokemonInfo.types[1].type.name
            } else {
                document.querySelector('.type1').innerHTML = "Type: " + pokemonInfo.types[0].type.name
                document.querySelector('.type2').innerHTML = ""
            }
                        
                setTimeout(function(){
                    template.classList.add('showPokemon')
                }, 1)

                Transparency.render(template, pokeInfo, sprites)
                
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