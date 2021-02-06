import Vue, { DirectiveOptions } from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/vi'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import * as directives from '@/directives'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import validator from '@/plugins/vee-validate'
// Buefy module
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './design/styles/index.sass'
Vue.config.productionTip = false

/**
 * Define global component
 */
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(Buefy)
Vue.use(VueMoment, {
  moment
})
Vue.use(validator as any)

/**
 * Define global directives
 */
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [ key: string ]: DirectiveOptions })[key])
})

// render
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
