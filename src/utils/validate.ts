import { required, confirmed, length, email } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

// vee-validate override extend

const veeExtend = extend

export default veeExtend
