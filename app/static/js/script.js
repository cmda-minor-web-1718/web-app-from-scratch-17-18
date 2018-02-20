(function() {
	'use strict'

	const elStart = document.querySelector('#start'),
		elPokemon = document.querySelector('#pokemon'),
		elPokemonList = document.querySelector('.pokemon-list'),
		template = document.querySelector('.template'),
		cross = document.querySelector('.template a'),
		pokemonLink = document.querySelector('.pokemonlink'),
		data = {},
		newData = {}
	let obj = {},
		newObj = {}

	// Initialize appliciation
  	const app = {
		
		init: function() {
			api.call();
			routes.init()
				// Global app stuff
		}
	}

	const api = {

		call: function() {
			
			const request = new XMLHttpRequest()
			request.open('GET', 'https://www.pokeapi.co/api/v2/pokemon/?limit=151', true)

			request.onload = function() {

				if (request.status >= 200 && request.status < 400) {	

					this.data = JSON.parse(request.responseText)
					const pokemon = this.data.results
					api.makeList(pokemon);
				}	
			}
			request.onerror = function() {
				console.log('hallo')
			}

			request.send()
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
							
					Transparency.render(template, pokeInfo)

					setTimeout(function() {
						template.classList.add('showPokemon')
					}, 1)
				}
			}
				
			newRequest.onerror = function() {
				console.log('het werkt niettttt')
			}
				
			newRequest.send()
		}
	}

	const routes = {
		init: function() {
			routie({
				'start': function() {
					sections.start();
				},

				'pokemon': function() {
					sections.pokemon();
				}
			})
		}
	}


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
	pokemonLink.addEventListener('click', function() {
		template.classList.remove('showPokemon')
	})
	cross.addEventListener('click', function() {
		template.classList.remove('showPokemon')
	})
	// Start Application
	app.init()
})()
