/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/24
 */
import {Toast} from '@ant-design/react-native';
import BaseComponent from "./BaseComponent";
import RNFS from 'react-native-fs';

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
/**
 * 检测表单是否有异常
 * @param fieldsError
 * @returns {boolean}
 */
export function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/**
 * 显示表单错误信息
 * @param fieldsError
 * @returns {boolean}
 */
export function showFormError(fieldsError) {
    for(const key in fieldsError){
        if(fieldsError[key]){
            for(let i = 0; i < fieldsError[key].length; i++){
                Toast.fail(fieldsError[key][i]);
                return true;
            }
        }
    }
    return false
}
let context;
let props;
export class SystemInfo extends BaseComponent{
    static getToken = () => {
        return context ? context.token : null;
    };
    static getUser = () => {
        return context ? context.user : null;
    };
    static removeItem = (key) => {
        if(context){
            const {setContext} = context;
            const data = {};
            data[key] = null;
            setContext(data)
        }
    };
    static setItem = (key, value) => {
        if(context){
            const {setContext} = context;
            const data = {};
            data[key] = value;
            setContext(data)
        }
    };
    static getItem = (key) => {
        return context ? context[key] : null;
    };
    static forward = (routeName) => {
        if(props){
            const {navigation:{navigate}} = props;
            const {token, user} = context;
            if(!(token && user)){
                navigate(routeName);
            }
        }
    };
    render(){
        context = this.context;
        props = this.props;
        return null;
    }
}

/*下载文件*/
export function download({fileUrl, begin, progress, success, fail}) {
    const ext = fileUrl.substring(fileUrl.lastIndexOf('.'));
    const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}${ext}`;
    // const options = {
    //     fromUrl: fileUrl,
    //     toFile: downloadDest,
    //     background: true,
    //     begin,
    //     progress
    // };
    // console.log(options);
    // try {
    //     const ret = RNFS.downloadFile(options);
    //     ret.promise.then(success).catch(fail);
    // } catch (e) {
    //     console.log('download err', e);
    //     fail && fail(e)
    // }
    const options = {
        fromUrl: fileUrl,
        toFile: downloadDest,
        background: true,
        begin: (res) => {
            console.log('begin', res);
            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        },
        progress: (res) => {
            let pro = res.bytesWritten / res.contentLength;
            console.log('progress', pro);
        }
    };
    try {
        const ret = RNFS.downloadFile(options);
        ret.promise.then(res => {
            console.log('success', res);
            console.log('file://' + downloadDest)
        }).catch(err => {
            console.log('err', err);
        });
    }
    catch (e) {
        console.log(error);
    }
}