import Vue from "vue"
import App from "./App.vue"
import BootstrapVue from "bootstrap-vue"
import { rtdbPlugin } from 'vuefire'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.use(rtdbPlugin)
Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");