import {routes} from './module/routes.js';
import {api} from './module/api.js';
import {section} from './module/section.js';
import {helper} from './module/helper.js';

var app = {
    init: function () {
        routes.init();
    }
}

app.init ();

