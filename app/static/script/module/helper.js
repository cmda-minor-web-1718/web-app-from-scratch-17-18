    //Helper functions
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
        },
        storage: {}
    }

    export {helper}