import app from './app'

(function() {
	'strict mode' // doet een aantal semantische dingetjes, zoals het veranderen van silent errors in throw errors en andere dingetjes
	const template = document.querySelector('.template')

	const cross = document.querySelector('.template a'),
		pokemonLink = document.querySelector('.pokemonlink')

	pokemonLink.addEventListener('click', function() {
		template.classList.remove('showPokemon')
	})
	cross.addEventListener('click', function() {
		template.classList.remove('showPokemon')
	})
	// Start Application
	app.init()
})()