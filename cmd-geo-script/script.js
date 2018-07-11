(function () {

    var app = {
        init: function () {
            position.set();
        }
    }

    var position = {
        set: function () {
            helper.isNumber('1');
        },
        update: function () {

        },
        check: function () {
            var el = document.body;
            var self = this;
            this.set();
            
            el.addEventListener('touchart', function(){
                this.update();
            })

        },
        getDistance: function () {

        }
    }

    var googleMap = {
        generate: function () {

        },
        update: function () {

        }
    }

    var helper = {
        isNumber = function () {

        },
        getElement: function (element) {
            return document.querySelector(element);
        }
    }

    var $ = helper.getElement();

    app.init();

})()