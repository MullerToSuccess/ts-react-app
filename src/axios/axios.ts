import axios from 'axios';
import {message} from 'antd';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;
axios.interceptors.request.use((config: any) => {
    message.info('This is a normal message');
    return config;
})

axios.interceptors.response.use((config: any) => {
    message.info('This is a normal message');
    return config;
})

export default axios;