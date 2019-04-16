/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 咨询回复
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as AdvisoryService from '../services/AdvisoryService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'advisory',
    state: {
    //   loading:false,//加载提示
      data: {},//咨询信息
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       
        * getDetail({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(AdvisoryService.getDetail, params);
           console.log("modela----data--------",data);
            if(status === '0'){
                yield put({type: 'setData', data: {data: data} });
            }else{
                Toast.fail(message);
            }

        },
        * deal({ params }, { call, put, select }) {
            // Toast.loading();
            console.log("models----parmas",params);
            const {data, status, message} = yield call(AdvisoryService.deal, params);
            if(status === '0'){
                Toast.success("咨询回复成功！！");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }else{
                Toast.fail(message);
            }

        },
    },
}

//#endregion