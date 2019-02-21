'use strict'
import Http from './_axios';
import { Message } from 'element-ui'
import store from '../store/index'

class API_ABSTRACT {
  // 为对象添加属性
  constructor (apis = [], axiosOption) {
    this.apis = apis;
    this.http = new Http();
  }

  // 检查返回数据，status非1时，默认弹出轻提示
  checkStatus (data, opt) {
    if (data.status === 1) {
      return data
    }
    // 取数据异常
    if (data.status === -100 || data.status === -102 || data.status === -101) {
      return new Promise((resolve, reject) => {
        this.$Message({
          message: data.msg,
          type: 'error',
          onClose() {
            reject(data);
          }
        });
      })
    } else {
      if (opt.errorTips) {
        if (data.msg === 'OK' && typeof data.recordset === 'string') {
          data.msg = data.recordset
        }
        let msg = data.msg;
        if (opt.Auth) {
          // msg += '(' + data.status + ')'
        }
        // this.$Message({
        //   message: msg,
        //   type: 'error'
        // });
      }
      return Promise.resolve(data)
    }
  }

  // 获取数据通用方法
  fetch (url, data, type = 'post', options = {'errorTips': true, 'api': 'api2'}) {
    options = Object.assign({ 'errorTips': true, 'api': 'api2', 'auth': true }, options);
    const apiDomain = store.getters['runEnv/' + options.api];
    // url = !~url.indexOf('http') ? apiDomain + url : url;
    if (type === 'post') {
      // data = qs.stringify(data)
      return this.http.post(url, data, options).then(r => {
        return this.checkStatus(r, options)
      })
    } else if (type === 'get') {
      // data = options.api === 'old' ? { 'info': JSON.stringify(data) } : JSON.stringify(data)
      return this.http.get(url, data, options).then(r => {
        // if (url.indexOf('VerifyQrcode') > 0) {
        //   return r
        // }
        return this.checkStatus(r, options)
      })
    }
  }

  uploadImage (url, formData, options = {'errorTips': true, 'api': 'old'}) {
    const apiDomain = store.getters['runEnv/' + options.api] ? store.getters['runEnv/' + options.api] : store.getters['runEnv/' + options.api]
    url = !~url.indexOf('http') ? apiDomain + url : url
    return this.http.uploadImage(url, formData).then(r => {
      r.recordset = {'result': r.result}
      return this.checkStatus(r, options)
    })
  }

  $Message(p) {
    Message(Object.assign({}, {
      duration: 1000,
      showClose: true
    }, p))
  }
}

export default API_ABSTRACT
