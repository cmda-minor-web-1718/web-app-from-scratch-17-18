//Use IIFE to create variable but only in the IIFE scope
(function () {
    'use strict'; //use strict mode only in this scope

    var app = {
        init: function () {
            let xhr = new XMLHttpRequest();
            let url = "https://api.coinmarketcap.com/v1/ticker/";

            xhr.open("GET", url, true); //create a async request
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText); //Create object from the string that we get
                        routes.init(data); //init route
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    }

    //Handel the route 
    var routes = {
        init: function (data) {
            this.routie(data);
        },
        routie(data) {
            routie({
                '': function () { //start page
                    section.insert(data);
                },
                '/detail/*': function () {
                    section.insert(data);
                }
            });
        }
    }

    //This is the object Function where will manipulate the DOM elements
    var section = {
        toggle: function (route) {
            //remove all active class
            let section = document.querySelectorAll('section');
            section.forEach(function (i) {
                i.classList.remove('active');
            });
            //Add active class to the page-link that you've clicked
            document.querySelector(route).classList.add('active');
        },

        //The insert function will insert data to element with the same 'data-bind' name.
        insert: function (data) {
            let dataCoin = data.map(function (i) { //Map function thanks to Keving Wang
                let price;
                
                function lol (){
                    let roundUpPrice = Math.round(i.price_usd * 100) / 100;
                    
                    price = roundUpPrice;
                }

                console.log(price);
                

                return {
                    id: i.id,
                    rank: i.rank,
                    name: i.name,
                    price: i.price_usd,
                    percent_change_1h: i.percent_change_1h,
                    percent_change_24h: i.percent_change_24h,
                    name_abbreviation: i.symbol
                }
            });

            //directive add extra information to the element for example 'class' or 'href'
            let directives = {
                coin_id: {
                    href: function () {
                        return "index.html/detail/" + this.id
                    }
                },
                percent_change_1h: {
                    class: function () {
                        let value = this.percent_change_1h;
                        let className = helper.assignClass(value); // assign class to the value
                        return 'change ' + className //'change' is just a classt  css that add a '%' sign
                    }
                },
                percent_change_24h: {
                    class: function () {
                        let value = this.percent_change_24h;
                        let className = helper.assignClass(value); // assign class to the value
                        return 'change ' + className //'change' is just a classt  css that add a '%' sign
                    }
                },
                coin_image: {
                    src: function () {
                        let name = this.id;
                        let url = 'https://files.coinmarketcap.com/static/img/coins/128x128/' + name + '.png';
                        return url;
                    },
                    alt: function () {
                        return this.id;
                    }
                }
            };

            //Call Transparency to inject our objects into the Dom
            Transparency.render(document.querySelector('#start div'), dataCoin, directives);
        }
    }

    var helper = {
        assignClass: function (value) {
            /*This function assign a class to an element if the value is higher or
                        lower than 0*/
            let className = '';

            //Check value
            if (value < 0) {
                className = 'minus';
            } else if (value > 0) {
                className = 'plus';
            } else {
                className = 'neutral';
            }

            return className;
        }
    }

    app.init(); //start application
})();