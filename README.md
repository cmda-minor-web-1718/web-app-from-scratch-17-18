# wafs
The course repo for 'Web App From Scratch'

## Advantages and disadvantages of JavaScript libraries/frameworks
![Framework Joke][coverlibrarie]

_Framework:_
JavaScript libraries are collections of pre-written JavaScript which in turn all perform certain separate functions. They can be used for the development of other JavaScript without the developer having to write his own JavaScript for the functions the library provides him with.

_Libraries:_
A library is an unopinionated piece of software which implements a certain functionality with a defined API a developer can call from their application.

**Pro’s:**
- Efficiency — projects that used to take months and hundreds of lines of code now can be achieved much faster with well-structured prebuilt patterns and functions.
- Usage — Super easy to use.
- Safety — top JavaScript frameworks have firm security arrangements and are supported by large communities where members and users also act as testers.
- Cost — most frameworks are open source and free. Since they help programmers to build custom solutions faster, the ultimate price for web app will be lower.
- Community — An excellent framework has a well-established community as well as support documentation in order, thereby allowing you to refer to the docs or seek help from members of the community if you run into a problem or encounter a bug.
 

**Cons:**
- Memory — owing to a large set of powerful features, most frameworks tend to be bulky regarding functions and code base. It takes up a lot of memory.
- Learning — You don't learn the deep-down JavaScript code because you're using shortcut functions within the framework.
- Lifetime — Frameworks/libraries die all the time. It must be we-written sooner or later. 
- Loading — The loading times are way slower than Vanilla JS.
- Browser — Quite a few frameworks rely on browser detection.
- Editing — The framework’s core behavior can’t be modified, meaning that when you use a framework, you are forced to respect its limits and work the way it is required.
- Bugs —  a bug within a library can be difficult to locate and fix.

![Frameworkcons][coverframeworkcons]

[coverlibrarie]: previewlibrarie.jpg
[coverframeworkcons]: frameworkcons.png
[visualflow]: visualflow.jpg

**Sources:**
*  https://hashnode.com/post/vanilla-javascript-vs-frameworks-and-libraries-finding-a-good-balance-civ1zfus90pphdc53q8vtakz5
*  https://hackernoon.com/5-best-javascript-frameworks-in-2017-7a63b3870282
*  https://www.khanacademy.org/computing/computer-programming/html-css-js/using-js-libraries-in-your-webpage/a/the-world-of-js-libraries
*  https://www.giftofspeed.com/dont-use-javascript-libraries/
*  https://davidwalsh.name/6-reasons-to-use-javascript-libraries-frameworks
*  https://www.noupe.com/development/javascript-frameworks-94897.html
*  https://1stwebdesigner.com/web-frameworks/

## Best practices - Movie App

for the assignment we had to make a single page web app. The subject I chose was movies. The plan I came up with was making 2 pages. A start page that explains what my website does. A second page that shows the movies from the API I'm using (the New York Times Movie APA). And a detail page that shows the individual movie with plot summary and poster from the movie.

### How was my progress?
It was really difficult to start. Lucky for me, the teacher helped me and other students with a basic set up. This helped me understand the basic structure. From here I started adding more functionalities. The first one was making sure the the route will work. It has to be all on one page. I made everything in sections. The sections must not be visible, unless the section is active. I did this by making a loop that will check every section and is looking for the class that must set is.

```javascript
    for (var i = 0; i < document.querySelectorAll("section").length; i++) {
      document.querySelectorAll("section")[i].classList.add("none")
    }
    if (document.querySelector(route)) {
      document.querySelector(route).classList.remove("none")
    } else {
      return
    }
```

After the loop the next task was to use a Routie to correctly. The Routie will handle the routing of the page. This was fairly easy to do. There was a lot of documentation on it online. My basic Routie is:

```javascript
var routes = {
  init() {
    routie({
      'start': function() {
        console.log('test')
        sections.toggle(window.location.hash)
      },
      'movies': function() {
        console.log('start')
        api.call('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=3d8eafd7eaf04aa6a1493eaa050714a7').then(function(data){
          sections.render(data.results.sort((a, b) => a.display_title.localeCompare(b.display_title)))
        })
        sections.toggle(window.location.hash)
      }
```

In my routie I also call for the Api (the New York Times ). The API Key is also activated when this happens. I also sort the data from the API. This will give a more pleasant use for the user. After the API has been succesfully called, it was time for the data to display into my HTML. This was done by using a templating tool. Transparancy. This will collect the data from the API and it will let me place it. For the transparancy I used a map function. This will let collect the data and place it into a by my giving name.

```javascript
   var sections = {
  render: function(data) {

    let dataFilm = data.map(function(i) { // Map function thanks to Keving Wang and Oy
      return {
        display_title: i.display_title.replace(/ /g, "_")
      }
    });

    let movies = {
      display_title: {
        href: function(params) {
          return `/#movies/${this.display_title}`
        },
        headline: {
          class: function(params) {
            return this.headline
          }
        }
      } 
```

This was also really usefull for my detail page. This page must show the title, plot and a poster from the movie. Unfortunately, my API didn't had that much information. This was really dissapointing, but more about that later. In the let datafilm I bind the data with the by my chosen name. I also replace white space with a underscore. This must be done so the URL will be displayed correctly.

### A second API?
Because my first API didn't had much unformation, I searched for a second API. The one I found was Omdbapi. This one had more (usefull) info. I called the data from this API in my routie. When the ID (title from the movie) is being used, the API will set that ID in his search. The page that will be shown is the information from the movie. How I used it was doing the following:

```javascript
      'movies/?:name': function(name) {
        console.log(name)
        sections.toggle(name)
        document.getElementById('moviemain').classList.remove('none');
        var names = name

        fetch(`http://www.omdbapi.com/?t=${names}&apikey=b0b13f21`)
          .then( res => {
            return res.json()
          } )
          .then( res => {
            console.log( res )
            var directives = {
              image: {
                src: function() {
                  return `${this.Poster}`
                }
              }
            }
            Transparency.render(document.querySelector('#moviemain'), res, directives);
          } )
```

I had trouble with this, so I asked my good friend Mo to help me out with this. We did it with ES6, because this was the most easy and fastest way to produce it. The api will be fetched and I gather the plot info and the poster. With the information gathered I splitted the Javascript into multiple modules. This is easier to find your code and reads better. The next thing I did was thinking about what will happen in the case of no Wi Fi. There would be no information to display. I solved this by using a localstorage. This will save the data from the API for use in a offline environment. I did it by doing:

```javascript
    var localStorageData = {
  setItem: function(data){
    localStorage.setItem('filmdata', JSON.stringify(data))
  },
  getItem: function(){
    if (JSON.parse(localStorage.getItem('filmdata')) !=null ) {
      console.log('filmdata bestaat')
      this.use()
    }
  else{
    console.log('geen filmdata')
  }
  },
  use: function(){
    var savedata = JSON.parse(localStorage.getItem('filmdata'))
    sections.render(savedata)
  }
}
```

This will collect the data and set the data in a object. If the data is available it will be used.
After this was done all I did was clean the code.

### Visual flow
![Visual flow][visualflow]

### What am I most proud of?
Actually, coming this far is what I'm most proud of. It was really difficult, but I didn't give up. I asked for a lot of help and I dived into the code.

### What do I find most disappointing
What I did find most disappointing was my lack of skill. I had to ask for help A LOT of times and I felt bad about it. I need to improve my own skill to keep up with what is coming.

### Retry
After receiving the feedback I started by cleaning the code. I got some imports that didn't do anything and my localstorage was activated at a wrong (and confusing) time. The localstorage must be activated if the user can't connect to the NY Times API.
I also added a filter option, so only the movies with a 'R' rated movie will be shown. This was easily done by doing 

``` dataFilm = dataFilm.filter(data => data.mpaa_rating == "R") ```

I also didn't have any error handling. I fixed this by saying that if the user can't make the api call, as in no connection with the website, the user will see a message that the website isn't connected to the internet.

## Actor Diagram
![actor][actor]
![interaction][interaction]

## Interaction Diagram
![interaction][interaction]


[actor]: actor.jpg
[interaction]: interaction.jpg
