/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 报装信息
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
    namespace: 'installInfo',
    state: {
    //   loading:false,//加载提示
      data: {},//报装信息
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //报装信息
        * getInstallInfoByInstallNo({ params }, { call, put, select }) {
            // Toast.loading();
            const {data, status, message} = yield call(CommonService.getInstallInfoByInstallNo, params);
            if(status === '0'){
                yield put({type: 'setData', data:{ data: data}});
            }

        },
        
    },
    subscriptions: {
        setup({dispatch}) {
            // dispatch({type: 'setData', data:{ installNo: ''}});
        //    console.log('subscriptions');
        }
    }
}

//#endregion