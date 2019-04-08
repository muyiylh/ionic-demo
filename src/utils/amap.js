/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/6
 */
import axios from 'axios';
import {amapUrl} from './config';

const instance = axios.create({
    baseURL: amapUrl,
    timeout: 10000,
    headers: {'X-Custom-Header':'foobar'}
});
instance.interceptors.request.use(config=>{
    return config;
}, error => {
    return Promise.reject(error);
});


const request = {
    get: (url)=>{
        return instance.get(url).then(({data, status})=>{
            if(status === 200){
                if(data.status === 0){
                    return data.data;
                }else{
                    throw data
                }
            }else{
                throw {status: -1, message: '服务正忙'}
            }
        }).catch(error=>{
            console.log(error);
            return error;
        })
    },
};
export default request;


