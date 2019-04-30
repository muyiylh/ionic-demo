/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/15
 * 表单信息
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as CommonService from '../services/CommonService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'formData',
    state: {
    //   loading:false,//加载提示
        objData:{},//表单原始数据
        data: {},//表单数据
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       
        * getFormData({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CommonService.getFormData, params);
            if(status === '0'){
                let obj = {
                    BMLDSH: [],//资信度部门领导审核
                    BMSJLDSH1: [],////一类资信度部门上级领导审核
                    FGFZSH1 :[],//一类资信度分管副总审核
                    ZJLSH1: [],//一类资信度总经理审核
                    DDMBMLDSH: [],//设计文件部门领导审核
                    SJDWMLDSH: [],//设计文件设计部门领导审核
                    BMSH: [],//异常处置----部门审核
                };
                data.map((item)=>{
                    for(let key in item){
                        //资信度审核有重复的流程
                        if(key == 'BMLDSH1' || key == 'BMLDSH2'){
                            obj.BMLDSH.push(item[key]);
                        }
                        else if(key == 'BMSJLDSH1'){
                            obj.BMSJLDSH1.push(item[key]);
                        }
                        else if(key == 'FGFZSH1'){
                            obj.FGFZSH1.push(item[key]);
                        }
                        else if(key == 'ZJLSH1'){
                            obj.ZJLSH1.push(item[key]);
                        }
                        else if(key == 'DDMBMLDSH'){
                            obj.DDMBMLDSH.push(item[key]);
                        }
                        else if(key == 'SJDWMLDSH'){
                            obj.SJDWMLDSH.push(item[key]);
                        }else if(key == 'BMSH'){
                            obj.BMSH.push(item[key]);
                        }
                        else{
                            obj[key] = item[key];
                        }
                    }
                })
                // console.log("models-----obj---",obj);
                yield put({type: 'setData', data: {data: obj, objData: data} });
            }else{
                Toast.fail(message);
            }

        },
    },
}

//#endregion