import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import {fetch,post} from './utils/service'
import onlineUrl from './interface/index'

Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$onlineUrl = onlineUrl

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')