import api from './api'
import routes from './routes'

const app = {
    init: function() {
        api.call()
        routes.init()
        // call api.call and routes.init
    }
}

export default app