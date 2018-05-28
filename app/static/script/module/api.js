    import {helper} from './helper.js';
    import {section} from './section.js';
    
    //Make an external api call
    var api = {
        init: function () {
            /*Created promise syntax with the help of Kevin Wang(github: Kyunwang) and stackoverflow:
            https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr*/
            let requestNetwork = new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                let url = "https://api.coinmarketcap.com/v1/ticker/";
                xhr.open("GET", url, true); //create a async request
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) { //change here
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
                    });
                }
                //send request
                xhr.send();
            });

            //handle promise
            requestNetwork
                .then(function (data) {
                    let dataJson = JSON.parse(data);
                    helper.storage = dataJson;
                    section.init(dataJson);
                })
                .catch(function (err) {
                    console.log(err)
                    location.href = '#error/' + err.status //change to error hash
                });
        }
    }

    export {api}