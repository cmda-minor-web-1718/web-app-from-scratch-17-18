//Use IIFE to create variable but only in the IIFE scope
(function () {
    'use strict'; //use strict mode only in this scope

    var app = {
        init: function () {

            /*Created promise syntax with the help of Kevin Wang(github: Kyunwang) and stackoverflow:
            https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr*/
            let requestNetwork = new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                let url = "https://api.coinmarketcap.com/v1/ticker/";
                xhr.open("GET", url, true); //create a async request

                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        } else {
                            reject({
                                status: this.status
                            });
                        }
                    }
                };

                //Extra error handle if the onload doesn't work
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        test: 2
                    });
                }

                //send request
                xhr.send();
            });

            //handle promise
            requestNetwork.then(function (data) {
                    let dataJson = JSON.parse(data);
                    routes.init(dataJson);
                })
                .catch(function (err) {
                    console.log(err)
                });
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
                    section.hideDetailPage();
                    section.insert(section.mapData(data));
                },
                'detail/:id': function (id) {
                    section.detail(data, id);
                }
            });
        }
    }

    //This is the object Function where will manipulate the DOM elements
    var section = {
        //The insert function will insert data to element with the same 'data-bind' name.
        insert: function (data, extraInfo) {
            //directive add extra information to the element for example 'class' or 'href'
            let directives = {
                coin_id: {
                    href: function () {
                        name = this.id
                        return "#detail/" + this.id; // Use this as base for going to detail
                    }
                },
                percent_change_1h: {
                    class: function () {
                        let value = this.percent_change_1h;
                        let className = helper.assignClass(value); // assign class to the value
                        return 'change ' + className; //'change' is just a classt  css that add a '%' sign
                    }
                },
                percent_change_24h: {
                    class: function () {
                        let value = this.percent_change_24h;
                        let className = helper.assignClass(value); // assign class to the value
                        return 'change ' + className; //'change' is just a classt  css that add a '%' sign
                    }
                },
                coin_image: {
                    src: function () {
                        /*We want to give a lower resolution picture on mobile. The if/else check
                        if the screen is a small(mobile) screen*/
                        let bigScreen = 799;
                        let width = helper.checkViewWidth();
                        let url;
                        let name = this.id; // name of the coin we want to get
                        if (width < bigScreen) {
                            url = 'https://files.coinmarketcap.com/static/img/coins/64x64/' + name + '.png';
                        } else {
                            url = 'https://files.coinmarketcap.com/static/img/coins/128x128/' + name + '.png';
                        }
                        return url;
                    },
                    alt: function () {
                        return this.id;
                    }
                }
            };

            if (extraInfo === true) {
                //Call Transparency to inject our objects into the Dom
                Transparency.render(document.querySelector('#detail'), data, directives);
            } else {
                //Call Transparency to inject our objects into the Dom
                Transparency.render(document.querySelector('#start div'), data, directives);
            }
        },
        detail: function (data, coinID) {
            function findCoin(name) {
                return name.id === coinID;
            }
            let pastAllongData = [data.find(findCoin)];
            let detailPage = true;
            this.insert(this.mapData(pastAllongData), detailPage);
            document.querySelector('.detail-container').classList.add('active');
            event.backToHome();
        },
        mapData: function (data) {
            let dataCoin = data.map(function (i) { //Map function thanks to Keving Wang?
                return {
                    id: i.id,
                    rank: i.rank,
                    name: i.name,
                    price: i.price_usd,
                    price_btc: i.price_btc,
                    volume: i['24h_volume_usd'],
                    market_cap: i.market_cap_usd,
                    supply: i.available_supply,
                    percent_change_1h: i.percent_change_1h,
                    percent_change_24h: i.percent_change_24h,
                    name_abbreviation: i.symbol
                }
            });
            return dataCoin;
        },
        hideDetailPage: function () {
            document.querySelector('.detail-container').classList.remove('active');
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
        },
        checkViewWidth: function () {
            let width = window.innerWidth;
            return width;
        }
    }

    var event = {
        backToHome() {
            document.querySelector('.detail-container button').addEventListener('click', function () {
                location.replace("");
            })
        }
    }

    app.init(); //start application
})();