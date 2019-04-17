/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 配置信息
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
    namespace: 'configParams',
    state: {
    //   loading:false,//加载提示
      data: [],//
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //报装信息
        * queryConfigParams({ params }, { call, put, select }) {
            // Toast.loading();
            const {data, status, message} = yield call(CommonService.queryConfigParams, params);
            if(status === '0'){
                yield put({type: 'setData', data:{ data: data}});
            }else{
                Toast.fail(message);
            }

        },
        
    },
}

//#endregion