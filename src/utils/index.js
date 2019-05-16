/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/24
 */
import {Toast, Checkbox} from '@ant-design/react-native';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import BaseComponent from "./BaseComponent";
import RNFS from 'react-native-fs';
import React, { Component } from 'react';
import { func } from 'prop-types';
import {text_font_size} from './theme';
import { scaleSize } from './ScreenUtil';
import { downloadUrl } from "./config";


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
/**
 * 从配置信息的到想要的信息
 * @param arr:config数组，className：参数
 * @returns {boolean}
 */
export function filterConfig(arr,className) {
    let a = [];
    arr.map((item)=>{
        if(item.className == className){
            let o = {
                label: item.paramName,
                value: item.id,
            }
            a.push(o);
        }
    })
    return a;
}
/**
 * 根绝id得到配置信息对应的文字
 * @param arr:config数组，id：参数
 * @returns {boolean}
 */
export function getConfigName(arr,id) {
    let a = '';
    arr.map((item)=>{
        if(item.id == id){
            a = item.paramName;
        }
    })
    return a;
}

/**
 * 下载文件
 * @param fileUrl:文件地址
 * @returns {boolean}
 */

export function downLoadFile  (fileUrl) {
    const ext = fileUrl.substring(fileUrl.lastIndexOf('.'));
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}${ext}`;
    // console.log('download');
    // console.log(fileUrl);
    // console.log(downloadDest);
    const options = {
        fromUrl: fileUrl,
        toFile: downloadDest,
        background: true,
        begin: (res) => {
            console.log('begin', res);
            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        },
        progress: (res) => {
            // let percent = res.bytesWritten / res.contentLength*100;
            // console.log('progress', percent);
            // this.setState({percent});
        }
    };
    try {
        const ret = RNFS.downloadFile(options);
        ret.promise.then(res => {
            console.log('success', res);
            // this.setState({percent:100});
            console.log('file://' + downloadDest)
            Toast.success('文件地址：' + downloadDest)
        }).catch(err => {
            console.log('err', err);
        });
    }
    catch (e) {
        console.log(error);
    }
}
 
export function fileText (files) {
    console.log("files--------",files);
    if(files instanceof Array && files.length>0){
        const fileList = files.map((item,index)=>{
            const flag = item.filePath.indexOf("http://");
            const path = flag == -1?downloadUrl+item.filePath:item.filePath;
            console.log("path--------",path);
            return (
                <Text key={index} onPress={()=>downLoadFile(path)} style={{paddingRight: 10}}>{item.name|| item.fileName}</Text>
            )
        })
        console.log("fileList--------",fileList);
        return fileList;
    }else{
        return ''
    }
    
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
    static getRole = () => {
        console.log("context.role:",context)
        return context ? context.role : null;
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




//表格数据处理
//data---待处理的数据
export function dataTable(data) {
    let arr2 = [],
        arr1 = [];
    data.map((value) => {
        arr1 = [];
        for(var key in value){
            arr1.push(value[key]);
        }
        arr2.push(arr1);
    })
    // console.log("table--data--",arr2)
    return arr2;
}
export function textFontSize(color) {
    const style = {
        fontSize: scaleSize(text_font_size),
        color:"#333"
    };
    if(color){
        style.color = color;
    }
    return style;
}
export function renderText (text) {
    return(
        <View style={{padding: 20,
            justifyContent:"center",
            flexDirection:"row",
            alignItems:'center',
            backgroundColor: '#EBEEF5'}}>
            <Text>{text}</Text>
        </View>
    )
}