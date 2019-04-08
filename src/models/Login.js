/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import {
    login,loginByPhone
} from '../services/LoginService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";

export default {
    namespace: 'login',
    state: {
        user: null, // 当前登录用户
        token: null
    },
    reducers: {
        /**
         * 处理同步的action
         */
        [LOGIN_RESP](state, { user, token }) {
            return { ...state, user, token };
        }
    },
    effects: {
        * [LOGIN_REQ]({ loginUser }, { call, put, select }) {
            loginUser.password = md5.hex_md5(loginUser.password);
            const {data: user, status, message} = yield call(login, loginUser);
            if(status === '0'){
                AsyncStorage.setItem('token', user.token);
                AsyncStorage.setItem('user', JSON.stringify(user));
                SystemInfo.setItem("token",user.token);
                SystemInfo.setItem("user",JSON.stringify(user));
                yield put({type: LOGIN_RESP, user, token: user.token});
                NavigationUtil.navigate('InitLoading', {});
            }

        },
        * loginAppByPhone({ loginUser }, { call, put, select }) {
            const {data: user, status, message} = yield call(loginByPhone, loginUser);
            console.log('aafsdfsf',user, status, message)
            if(status === '0'){
                AsyncStorage.setItem('token', user.token);
                AsyncStorage.setItem('user', JSON.stringify(user));
                SystemInfo.setItem("token",user.token);
                SystemInfo.setItem("user",JSON.stringify(user));
                yield put({type: LOGIN_RESP, user, token: user.token});
                NavigationUtil.navigate('InitLoading', {});
            }

        }
    },
}
