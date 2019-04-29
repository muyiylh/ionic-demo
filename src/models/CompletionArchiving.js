/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/20
 * 竣工归档
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import { add, getArchiving } from '../services/CompletionArchivingServices';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'completionArchiving',
    state: {
    //   loading:false,//加载提示
        data:{},
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //信息
        * getArchiving({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(getArchiving, params);
        //    console.log("modela----data--------",data);
            if(status === '0'){
                yield put({type: 'setData', data:{ data: data}});
            }

        },
        //信息
        * add({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(add, params);
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