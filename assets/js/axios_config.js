import axios from 'axios'

import {
  getToken,
  removeUserInfo,
  skipHome
} from './userinfo_init.js'

export const http = axios.create({
  baseURL: 'http://localhost:3000'
})


http.interceptors.request.use(function (config) {
  if (config.url !== '/login' && config.url !== '/register' && config.url !== '/captcha'&&config.url!=='/register/email') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})


http.interceptors.response.use(function (response) {
  var code = response.data.code;
  if (code === 403) {
    removeUserInfo();
    skipHome();
  }
  return response
}, function (error) {
  return Promise.reject(error)
})



const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  Vue.prototype.$http = http
}

export default httpPlugin
