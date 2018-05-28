    import {helper} from './helper.js'    
    
    //This is the object Function where will manipulate the DOM elements
    var section = {
        init: function (data) {
            this.overview(data);
            this.loading.remove();
        },
        overview: function (data) {
            document.querySelector('#start').classList.remove('inactive'); //active overview container
            document.querySelector('.detail-container').classList.remove('active'); //remove active container
            this.insert(data);
        },
        detail: function (data, coinID) {
            function findCoin(name) {
                return name.id === coinID;
            }
            let pastAllongData = [data.find(findCoin)];
            let detailPage = true;
            this.insert(this.map(pastAllongData), detailPage);
            document.querySelector('#start').classList.add('inactive');
            document.querySelector('.detail-container').classList.add('active');
        },
        error: function (status) {
            document.querySelector('.error').classList.add('active');
            let error = {
                error: status
            };
            Transparency.render(document.querySelector('.error'), error);
        },
        map: function (data) {
            let dataCoin = data.map(function (i) { //Map function thanks to Keving Wang?
                let max_supply1 = "";
                if (i.max_supply == null) {
                    max_supply1 = "No data"
                }

                return {
                    id: i.id,
                    rank: i.rank,
                    name: i.name,
                    price: i.price_usd,
                    price_btc: i.price_btc,
                    volume: i['24h_volume_usd'],
                    market_cap: i.market_cap_usd,
                    supply: i.available_supply,
                    max_supply: max_supply1,
                    percent_change_1h: i.percent_change_1h,
                    percent_change_24h: i.percent_change_24h,
                    percent_change_7day: i.percent_change_7d,
                    name_abbreviation: i.symbol
                }
            });
            return dataCoin;
        },
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
                percent_change_7day: {
                    class: function () {
                        let value = this.percent_change_7day;
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
                            url = 'https://www.livecoinwatch.com//images/icons32/' + name + '.png';
                        } else {
                            url = 'https://www.livecoinwatch.com//images/icons64/' + name + '.png';
                        }
                        return url;
                    },
                    alt: function () {
                        return this.id;
                    }
                },
                coin_market_cap: {
                    href: function () {
                        return "https://coinmarketcap.com/currencies/" + this.id;
                    }
                },
            };

            if (extraInfo === true) {
                //Render Detail page
                Transparency.render(document.querySelector('#detail'), data, directives);
            } else {
                //Render Overview page
                Transparency.render(document.querySelector('#start div'), data, directives);

            }
        },
        loading: {
            set: function () {
                let loader = document.querySelectorAll('.loader');
                loader.forEach(function (i) { //add active state to loader to activate it
                    i.classList.add('active');
                })
            },
            remove: function () { //instead of remove class, we're removing the whole loader element
                let loader = document.querySelectorAll('.loader');
                loader.forEach(function (i) {
                    i.parentNode.removeChild(i);
                })
            }
        }
    }

    export {section}