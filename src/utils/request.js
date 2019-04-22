/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/6
 */
import axios from 'axios';
import {baseUrl} from './config';
import {AsyncStorage} from 'react-native';
import {Toast, Portal} from '@ant-design/react-native';
import NavigationUtil from "./NavigationUtil";
import {SystemInfo} from "./index";

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 300000,
    headers: {'X-Custom-Header':'foobar'}
});
const unloading = axios.create({
    baseURL: baseUrl,
    timeout: 300000,
    headers: {'X-Custom-Header':'foobar'}
});
class RequestLoading {
    static loaded;
    static show = () => {
        if(!this.loaded){
            this.loaded = Toast.loading('请稍后...', 0);
        }
    };
    static hide = () => {
        if(this.loaded){
            Portal.remove(this.loaded);
            this.loaded = undefined;
        }
    }
}
instance.interceptors.request.use(config=>{
    RequestLoading.show();
    const token = SystemInfo.getItem('token');
    if(token){
        config.headers.authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
instance.interceptors.response.use(({data})=>{
    RequestLoading.hide();
    if(data.status === '100'){
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        SystemInfo.removeItem('token');
        SystemInfo.removeItem('user');
        NavigationUtil.navigate("AuthLoading");
    }else if(data.status !== '0'){
        Toast.info(data.message);
      
    }
    return data;
}, error => {
    let text = JSON.parse(JSON.stringify(error)).response.status === 404
        ? '404'
        : '网络异常，请重试';
    RequestLoading.hide();
    Toast.info(text);
    return Promise.reject({status: -1, message: text});
});
unloading.interceptors.request.use(config=>{
    const token = SystemInfo.getItem('token');
    if(token){
        config.headers.authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
unloading.interceptors.response.use(({data})=>{
    if(data.status === '100'){
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        SystemInfo.removeItem('token');
        SystemInfo.removeItem('user');
        NavigationUtil.navigate("AuthLoading");
    }else if(data.status !== '0'){
        Toast.info(data.message);
    }
    return data;
}, error => {
    let text = JSON.parse(JSON.stringify(error)).response.status === 404
        ? '404'
        : '网络异常，请重试';
    Toast.info(text);
    return Promise.reject({status: -1, message: text});
});


const request = {
    get: (url)=>{

    },
    post: async (url, param)=>{
        param = param || {};
  
        return instance.post(url,param)
            .then((data)=>{
                if(data){
                  //  console.warn(data);
                   var d =  data
                    return d;
                }
            })
            .catch(error=>{
                return error;
            })
    },
    unLoadPost: async (url, param)=>{

        param = param || {};
        return unloading.post(url,param)
            .then((data)=>{
                if(data){
                    return data;
                }
            })
            .catch(error=>{
                return error;
            })
    },
    upload: (url, fileUri) => {
        const config = {
            Accept: 'Application/json',
            'Content-Type': 'multipart/form-data'
        };
        const formData = new FormData();
        const file = {
            uri: fileUri,
            type: 'multipart/form-data',
            name: fileUri.substring(fileUri.lastIndexOf("/")+1)
        };
        formData.append("file", file);
        return instance.post(url, formData, config).then(({data, status})=>{
            if(status == 0){
                return data;
            }
        }).catch(error=>{
            console.log('upload error', error);
            return error;
        })
    }
};
export default request;


