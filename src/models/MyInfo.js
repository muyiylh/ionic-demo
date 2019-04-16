/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as MyService from '../services/MyService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";



export default {
    namespace: 'my',
    state: {
        userInfo: {}, // 当前登录用户
    },
    reducers: {
        /**
         * 处理同步的action
         */
        setData(state, { payload}) {
            return { ...state, ...payload};
        }
    },
    effects: {
        //查询用户基本信息
        * queryUserByToken(_, { call, put, select }) {
            const {data: user, status, message} = yield call(MyService.queryUserByToken, {});
           console.warn("test..")
            if(status === '0'){
                yield put({type: setData, payload:{userInfo:user}});
            }
        },
        //更新用户基本信息
        *updateUserInfo({params}, { call, put, select }) {
           
            const {data: user, status, message} = yield call(MyService.updateUserInfo, params);
            if(status === '0'){
               // yield put({type: setData, payload:{userInfo:user}});
            }

        },
        //更新密码
        *updatePwd({params}, { call, put, select }) {
            const {data: user, status, message} = yield call(MyService.updatePwd, params);
            if(status === '0'){
               // yield put({type: setData, payload:{userInfo:user}});
            }

        },
     
    },
}
