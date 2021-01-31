import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import * as directives from '@/directives'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, confirmed, length, email } from 'vee-validate/dist/rules'
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
// override vee-extend
extend('required', {
  ...required,
  message: 'Thông tin không được để trống'
})

extend('email', {
  ...email,
  message: 'Email nhập không hợp lý'
})

extend('confirmed', {
  ...confirmed,
  message: 'Mật khẩu nhập lại chưa đúng'
})

extend('length', {
  ...length,
  message: 'This field must have 2 options'
})

extend('passwords', {
  validate: (value) => {
    const patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return patt.test(String(value))
  },
  message: 'Mật khẩu ít nhất 8 kí tự gồm cả chữ hoa, thường và số'
})

extend('failure-email', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate: (value) => {
    return false
  },
  message: 'Email không tồn tại trên hệ thống !'
})

extend('username', {
  validate: (value) => {
    const patt = /^[a-z0-9_-]{3,16}$/gim
    return patt.test(String(value))
  },
  message: 'Tên tài khoản không phù hợp'
})

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
