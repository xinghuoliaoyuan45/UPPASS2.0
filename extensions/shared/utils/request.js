import axios from 'axios';
import config from 'react-native-config';
import { load, USERJWTTOKEN,NEWTOKEN } from '../../shared';
const { apiBaseUrl } = config;
import { toastRequestError } from './toast';
import { LANGUAGE } from './storageKey';

const instance = axios.create({
    baseURL: 'http://54.255.204.122:8000',
    timeout: 20000,
    headers: {Accept: 'application/json'},
});

instance.interceptors.request.use((configData) => {
    console.log('console log for chrom config', configData);
    return configData;
}, (error) => {
    console.log('console log for chrom error', error);
    return Promise.reject(error);
});
// 500 网络异常，请稍后再试    Network anomalies, please try again later.
// 返回拦截处理
instance.interceptors.response.use((response) => {
    console.log('console log for chrom response', response);
    // 对响应数据做点什么
    return response;
}, (error) => {
    console.log('console log for chrom responseerror', error.response);
    toastRequestError(error.response);
    return Promise.reject(error.response);
});
// 
export const clearHeader = () => {
    axios.defaults.headers.common['app-token'] = '';
    axios.defaults.headers.common['X-space-id'] = '';
};
export const Net = async (type, api, params) => {
    const token = await load(NEWTOKEN);
    console.log('console log for chrom token---------',token);
    if (token) {
        axios.defaults.headers.common['app-token'] = token;
        axios.defaults.headers.common['X-space-id'] = '364';
    }
    const language = await load(LANGUAGE, 'zh');
    axios.defaults.headers.common['Accept-Language'] = language;
    if (type === 'post') {
        return new Promise((resolve, reject) => {
            instance.post(api, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    if (type === 'get') {
        return new Promise((resolve, reject) => {
            instance.get(api, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    if (type === 'put') {
        return new Promise((resolve, reject) => {
            instance.put(api, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    if (type === 'delete') {
        return new Promise((resolve, reject) => {
            instance.delete(api, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    return null;
};
