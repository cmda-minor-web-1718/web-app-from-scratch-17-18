import {section} from './section.js';
import {api} from './api.js';
import {helper} from './helper.js';

var routes = {
    init() {
        routie({
            '': function () { //start page
                section.loading.set();
                api.init();
            },
            'detail/:id': function (id) { //load the detail page
                let data = helper.storage;
                section.detail(data, id);
            },
            'error/:status': function (status) { // load the error page
                section.error(status);
            }
        });
    }
}

export {routes}