'use strict'
import API_ABSTRACT from '@/api/_api.abstract';
import jwt from '@/api/jwt';
import stroage from '@/store/stroage';
import store from '../store/index';
class BasicApi extends API_ABSTRACT {
  constructor(apis = []) {
    super(apis);
    let tempApis = Array.isArray(apis) && apis || Object.entries(apis).map(([api, val]) => {
      if (val.constructor === Object) {
        return Object.assign({method: 'post'}, val, {api})
      } else if (val instanceof String) {
        return Object.assign({method: 'post', url: val}, {api})
      } else {
        console.error('Invalid apis: Expected Object, String, got ' + typeof val + ' .');
        return {}
      }
    });
    tempApis.forEach(({api, url, method, options = {}, before}) => {
      if (api) {
        if (typeof before === 'function') {
          this[api] = (p = {}, opt) => {
            let nUrl = url,
              nMethod = method,
              nOptions = options,
              data = p;
            before.call(this, {
              url,
              method,
              options: Object.assign(options, opt),
              data: p,
            }, (param = {}) => {
              ({url: nUrl, method: nMethod, options: nOptions, data = p} = Object.assign({url, method, options}, param));
            });
            return this.fetch(nUrl, data, nMethod, nOptions);
          };
        } else {
          this[api] = (p, opt) => this.fetch(url, p, method, Object.assign(options, opt));
        }
      }
    });
  }

  refreshAuthFetch(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2'}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true}, options);
    let jwtToken = stroage['persistent'].get('jwt.jwt');

    return jwt.apiAuth().then(r => {
      /* 获取到新jwt后 */
      options['headers'] = options.headers || {};
      options['headers']['authorization'] = jwtToken;
      // 再调一次接口
      return this.fetch(url, data, type, options);
    }, j => {
      // 去登录
      window.location.hash = "#/login?clearAutoLogin=1";
      return Promise.reject(j)
    });
  };

  authFetch(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2'}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true}, options);
    let jwtToken = stroage['persistent'].get('jwt.jwt');
    // 有jwt
    if (jwtToken) {
      options['headers'] = options.headers || {};
      options['headers']['authorization'] = jwtToken;
      if (store.state.loginRelated.loginInfo.userid !== stroage['persistent'].get('loginInfo.userid')) {
        /* 多个账号登录时，退出前一个账号 */
        this.$Message({
          message: '登录失效，请重新登录！',
          type: 'error',
          onClose() {
            window.location.hash = "/login?clearAutoLogin=1&storage=keep";
          }
        });
        return Promise.reject(new Error('登录失效'))
      }
      return super.fetch(url, data, type, options).then(r => {
        if (r.status === -200) { // jwt验证失败
          if (/^#\/login\?/.test(hash)) {
            window.location.reload();
          } else {
            window.location.hash = "#/login?clearAutoLogin=1";
          }
        }
        return r;
      }, j => { // jwt失效
        if (j.status === -100 || j.status === -101 || j.status === -102) { // jwt验证失败
          let hash = window.location.hash;
          if (/^#\/login\?/.test(hash)) {
            window.location.reload();
          } else {
            window.location.hash = "#/login?clearAutoLogin=1";
          }
          // return this.refreshAuthFe tch(url, data, type, options);
        } else {
          return Promise.reject(j);
        }
      });
    } else {
      // // 没有jwt
      if (stroage['persistent'].get('user.autoLogin')) {
        /* 可自动登录 */
        return this.refreshAuthFetch(url, data, type, options);
      }
      this.$Message({
        message: '登录失效，请重新登录！',
        type: 'error',
        duration: 1500,
        onClose() {
          // 去登录
          window.location.hash = "#/login?clearAutoLogin=1";
        },
      });
      return Promise.reject(jwtToken)
    }
  };

  fetch(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2', 'auth': true}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true}, options);
    if (!options['auth']) {
      return super.fetch(url, data, type, options);
    } else { // 需要检测jwt
      return this.authFetch(url, data, type, options);
    }
  };
}

/* 用户管理AXIOS */
class API extends BasicApi {
  constructor(apis) {
    super(apis);
    /* dev环境配置baseURL */
    if (!store.getters['runEnv/develop']) {
      this.http.create({
        baseURL: store.getters['runEnv/api2'],
      });
    }
  }
}

/* 教材管理AXIOS */
class AgileApi extends BasicApi {
  constructor(apis) {
    /* axios默认配置 */
    let options = {
      headers: {
        orgId: store.getters['loginRelated/currentCompany'].org_id,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [
        function(data, headers) {
          if (headers['Content-Type'] !== 'multipart/form-data') {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
          }
          return data
        }
      ],
    };

    let tempApis = Array.isArray(apis) && apis.map(val => {
      let url = val.url;
      /* 开发环境将 ^/api 替换为 /book ，以便区分其他项目的接口 */
      if (store.getters['runEnv/develop']) {
        if (/^\/api\//.test(url)) {
          url = url.replace(/^\/api\//, '/book/');
        }
      }
      return Object.assign(val, {
        url,
      })
    }) || Object.entries(apis).map(([api, val]) => {
      let url = val.url;
      /* 开发环境将 ^/api 替换为 /book ，以便区分其他项目的接口 */
      if (store.getters['runEnv/develop']) {
        if (/^\/api\//.test(url)) {
          url = url.replace(/^\/api\//, '/book/');
        }
      }
      return Object.assign({
        method: 'post',
      }, val, {
        api,
        url,
      })
    });
    /* 生产环境配置baseURL */
    if (!store.getters['runEnv/develop']) {
      Object.assign(options, {
        baseURL: store.getters['textbook/baseUrl'],
      });
    }
    super(tempApis);

    this.http.create(options);
  }
}

export default API

export {
  AgileApi,
}
