/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import {
    SET_GETUI_INFO,
    SET_CURRENT_POSITION, COMMON_QUERY_CONFIG_PARAM_REQ, COMMON_QUERY_CONFIG_PARAM_RESP, WEB_SOCKET_CONNECT,
    LOCAL_NOTIFY_INIT
} from '../constants/ActionTypes';
import {queryConfigParam, veriInstallNoAndVeriCode} from "../services/CommonService";
import {ConfigParam} from '../constants/constant-enum';
import ReconnectingWebSocket from 'reconnecting-websocket';
import NotifService from "../utils/NotifService";
import {imUrl} from "../utils/config";
import NavigationUtil from "../utils/NavigationUtil";

export default {
    namespace: 'index',
    state: {
        getuiInfo: {},
        location: {},
        paramTypes: {}
    },
    reducers: {
        /**
         * 设置个推登陆成功信息
         */
        [SET_GETUI_INFO](state, { getuiInfo }) {
            return { ...state, getuiInfo };
        },
        /**
         * 设置当前位置
         */
        [SET_CURRENT_POSITION](state, { location }) {
            return { ...state, location };
        },
        [COMMON_QUERY_CONFIG_PARAM_RESP](state, {paramTypes}){
            return {...state, paramTypes};
        },
    },
    effects: {
        *[COMMON_QUERY_CONFIG_PARAM_REQ](_, {call, put}){
            const result = yield call(queryConfigParam);
     
            const {data, status, message} = result;
            if(status === '0'){
                const paramTypes = {};
                data.map(item=>{
                    for(let key in ConfigParam){
                        if(item.className === ConfigParam[key]){
                            if(paramTypes[key] instanceof Array){
                                paramTypes[key].push({value: item.id, label: item.paramName});
                            }else{
                                paramTypes[key] = [{value: item.id, label: item.paramName}];
                            }
                        }
                    }
                });
                yield put({type: COMMON_QUERY_CONFIG_PARAM_RESP, paramTypes});
            }
        },
        *[WEB_SOCKET_CONNECT]({user}, {call, put, select}){
            const socket = new ReconnectingWebSocket(`${imUrl}cdsw-install/websocket?nickname=${user.id}`);
            socket.addEventListener('message', (e) => {
                try{
                    const data = JSON.parse(e.data);
                    NotifService.localNotif({
                        title: '系统消息',
                        message: data.msg,
                        bigText: data.msg,
                        actions: null
                    });
                }catch (e){}

            })
        },
        *[LOCAL_NOTIFY_INIT](_, {call, put, select}){
            const onRegister = (token) => {

            };
            const onNotif = (notif) => {

            };
            NotifService.configure(onRegister, onNotif);
        },
        *veriInstallNoAndVeriCode({param, pathname}, {call, put, select}){
            const {data, status, message} = yield call(veriInstallNoAndVeriCode, param);
           // console.log(data, status, message);
            if(status === '0'){
                NavigationUtil.navigate(pathname, {...param})
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {
            //{dispatch, history}
           // console.log('subscriptions');
        }
    }
}
