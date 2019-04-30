/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 缴纳工程款
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as ChargeViewService from '../services/ChargeViewService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'chargeView',
    state: {
    //   loading:false,//加载提示
      
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //提交
        * saveChargeInfo({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ChargeViewService.saveChargeInfo, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        
    },
}

//#endregion