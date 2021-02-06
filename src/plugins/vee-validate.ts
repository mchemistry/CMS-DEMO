import * as Validator from 'vee-validate'
import { required, confirmed, length, email } from 'vee-validate/dist/rules'

Validator.extend('required', {
  ...required,
  message: 'Thông tin không được để trống'
})

Validator.extend('email', {
  ...email,
  message: 'Email nhập không hợp lý'
})

Validator.extend('confirmed', {
  ...confirmed,
  message: 'Mật khẩu nhập lại chưa đúng'
})

Validator.extend('length', {
  ...length,
  message: 'This field must have 2 options'
})

Validator.extend('passwords', {
  validate: (value) => {
    const patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return patt.test(String(value))
  },
  message: 'Mật khẩu ít nhất 8 kí tự gồm cả chữ hoa, thường và số'
})

Validator.extend('failure-email', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate: (value) => {
    return false
  },
  message: 'Email không tồn tại trên hệ thống !'
})

Validator.extend('username', {
  validate: (value) => {
    const patt = /^[a-z0-9_-]{3,16}$/gim
    return patt.test(String(value))
  },
  message: 'Tên tài khoản không phù hợp'
})

export default Validator
