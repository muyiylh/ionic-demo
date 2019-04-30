/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 客户撤销
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as RevokeService from '../services/RevokeService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'revoke',
    state: {
    //   loading:false,//加载提示
    data: {},//客户撤销信息
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //领导审核
        * dealManagerAudit({ params }, { call, put, select }) {
           const {data, status, message} = yield call(RevokeService.dealManagerAudit, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        * getRescindInfo({ params }, { call, put, select }) {
           const {data, status, message} = yield call(RevokeService.getRescindInfo, params);
            if(status === '0'){
                yield put({type: 'setData', data:{ data: data}});
            }

        },
    },
}
