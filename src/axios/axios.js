import axios from "axios";
import { message } from "antd";
import MOCK_BASE from './config';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;
axios.interceptors.request.use((config) => {
  // message.info("This is a normal message");
  return config;
});

axios.interceptors.response.use((config) => {
  // message.info("This is a normal message");
  return config;
});

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({ url, msg = "接口异常", headers }) =>
  axios
    .get(url, headers)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      message.warn(msg);
    });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url, data, msg = "接口异常", headers }) =>
  axios
    .post(url, data, headers)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      message.warn(msg);
    });

export default {get, post};
