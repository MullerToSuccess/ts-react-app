import API_ABSTRACT from '@/api/_api.abstract'
import stroage from '@/store/stroage'
import store from '@/store/index'

let apis = {
  'dev': `/api/public/login`,
  'prod': `/api/public/login`
  // 'prod': 'https://jwt.anoah.com/get/'
}

let jwt = new API_ABSTRACT(apis)

// 获取新的或刷新jwt tokent
jwt.getByLoginInfo = (username, password) => {
  let params = {
    "device": "android_phone", // [*必传项*] 访问的设备类型，定义：browser(浏览器）,u-pad(优学派)，pad(第三方pad), 教师机pc端，smartphone,ipad等，需要一起定义
    "module": "teacher_mobile", // [*必传项*] 定义访问的模块，包括“网站”，“教师端服务”，“教师客户端”，“优学帮”等，需要一起定义
    "version": "v1.0", // [*必传项*] module版本号
    "timestamp": "9999999", // [*必传项*]客户端时间戳
    "MAC": "", // （可选项）客户端网卡MAC地址
    "machineid": "", // (可选性)客户端机身编号
    "UUID": "", // (可选项)，设备的UUID,如果是普通的浏览器或者获取不到，则为空
    "username": "", // (可选项)，如要获取带用户身份的jwt需要传递
    "password": "", // (可选项)，如果传递了username,则password必须传递
    "accesstoken": "", // (可选项),第三方授权的TOKEN
    "jwtusertoken": "true"// 需要返回刷新jwt的token，只有当传入了username和password此项才能设为true
  }
  let api = process.env.NODE_ENV === 'production' ? jwt.apis.prod : (jwt.apis.dev);
  params.loginnm = username;
  params.password = password;

  return jwt.fetch(api, params, 'post')
}

// 通过 usertokent取jwt token
jwt.getByUserToken = (jwtusertoken) => {
  let params = {
    "module": "teacher_activity", // [*必传项*] 定义访问的模块，包括“网站”，“教师端服务”，“教师客户端”，“优学帮”等，需要
    "jwtusertoken": ""// 需要返回刷新jwt的token，只有当传入了username和password此项才能设为true
  }

  let api = process.env.NODE_ENV === 'production' ? jwt.apis.prod : (jwt.apis.dev.replace('dev.', store.getters['runEnv/env'] + '.'));
  params.jwtusertoken = jwtusertoken;
  // 如果有usertoken
  return jwt.fetch(api, params, 'post')
}

// 使用用户名 请求jwt 错误时调用
jwt.onUserTokenFail = () => {
  let username = store.getters['loginRelated/loginInfo']['loginnm'];
  let password = store.getters['loginRelated/loginInfo']['password'];
  return jwt.getByLoginInfo(username, password).then(r => {
    stroage['persistent'].set('jwt', r.recordset.jwt);
    return r.recordset;
  }, j => {
    return Promise.reject(j);
  });
}

// api 请求报jwt错误时调用
jwt.apiAuth = () => {
  let jwtusertoken = stroage['persistent'].get('jwt.jwtusertoken');
  if (jwtusertoken) {
    return jwt.getByUserToken(jwtusertoken).then(r => {
      stroage['persistent'].set('jwt', r);
      return r;
    }, j => {
      console.log('jwtusertoken is fail')
      return jwt.onUserTokenFail();
    });
  } else {
    console.log('no jwtusertoken')
    return jwt.onUserTokenFail();
  }
}
export default jwt
