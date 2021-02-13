import Vue from 'vue'
import App from './App.vue'

import { message, obj } from './data'
import Handler from './handler'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

Handler(message)

Handler(obj.str)