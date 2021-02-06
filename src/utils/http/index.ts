import axios from 'axios'

const service = axios.create({
  baseURL: process.env.MOCK_API_TEST, // url = base url + request url,
  timeout: 3000
  // withCredentials: true // send cookies when cross-domain requests
})

export default service
