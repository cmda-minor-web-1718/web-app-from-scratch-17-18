# wafs
The course repository for 'Web App From Scratch'

The goal from this course is to make a web app from scratch, only using pure HTML/CSS/JS without any big framework or library.

The link to the live prototype is https://rick712.github.io/wafs/app/index.html

## Functionality of the website
On the website, you can choose a particular Pokémon, and you will get some information about that Pokémon. The website achieves this by using PokéApi: https://www.pokeapi.co/ .

First it makes an API call to the root of the API where all the names and the URL of the Pokémon are stored. The web app puts all the names in a list. When a user clicks on a Pokémon, the URL of the Pokémon is given to another API call, that retrieves more information about that Pokemon, and shows it to the user.

## Micro libraries
We did need to use two micro libraries:

Transparency js: https://github.com/leonidas/transparency
Routie: https://github.com/jgallen23/routie

Transparency let's you render certain parts of your website based on data in an object, and Routie makes it easy to toggle area's based on hash change.
