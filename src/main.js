import Vue from 'vue'
import App from './App.vue'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import './db'
import { firestorePlugin } from 'vuefire'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
Vue.use(Datetime)
Vue.use(Vuelidate)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
