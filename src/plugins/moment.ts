import * as moment from 'moment'
moment.locale('vi')

export default function install(Vue: any) {
  Object.defineProperties(Vue.prototype, {
    $moment: {
      get() {
        return moment
      }
    }
  })
}
