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

import * as CommonService from '../services/Common';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'formData',
    state: {
      loading:false,//加载提示
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
           console.log("models-----data---",data);
            if(status === '0'){
                let obj = {};
                data.map((item)=>{
                    for(let key in item){
                        obj[key] = item;
                    }
                })
                console.log("models-----obj---",obj);
                yield put({type: 'setData', data: {data: obj} });
            }else{
                Toast.fail(message);
            }

        },
    },
}

//#endregion