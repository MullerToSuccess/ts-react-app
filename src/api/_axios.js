'use strict'
import axios from 'axios'
/**  axios基础配置 */
axios.defaults.timeout = 15000
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  // console.log('error', error.response, JSON.stringify(error))
  let response = { 'status': -404, 'statusText': '请检查网络或稍后重试' }
  response = error.response || response
  return Promise.resolve(response)
})

function responseFormat (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    return response.data
  }

  // 异常状态下，保持格式统一
  return {
    status: response.status,
    msg: response.statusText,
    data: response.data
  }
}

class Http {
  constructor() {
    this.axios = axios;
  }
  post (url, data, options) {
    let send = {
      method: 'post',
      url,
      data: data,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };

    return this.axios(Object.assign({}, send, {headers: options.headers})).then(
      (response) => {
        return responseFormat(response)
      }
    )
  }
  get (url, params, options) {
    let send = {
      method: 'get',
      url,
      params: params,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    return this.axios(Object.assign({}, send, {headers: options.headers})).then(
      (response) => {
        return responseFormat(response)
      }
    )
  }
  uploadImage (url, formData) {
    return this.axios({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      (response) => {
        return responseFormat(response)
      }
    )
  }
  create(opt) {
    this.axios = axios.create(opt);
  }
}
export default Http;
