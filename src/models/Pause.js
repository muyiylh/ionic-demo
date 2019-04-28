/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/28
 * 用户暂停
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as PauseService from '../services/PauseService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'pause',
    state: {
    //   loading:false,//加载提示
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //领导审核
        * dealDeptCheck({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PauseService.dealDeptCheck, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
    },
}
