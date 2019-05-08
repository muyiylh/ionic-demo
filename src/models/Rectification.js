/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/05/07
 * 整改子流程
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as RectificationServices from '../services/RectificationServices';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'rectification',
    state: {
    //   loading:false,//加载提示
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //现场审核
        * dealXCSH({ params }, { call, put, select }) {
           const {data, status, message} = yield call(RectificationServices.dealXCSH, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //现场整改
        * dealXCZG({ params }, { call, put, select }) {
           const {data, status, message} = yield call(RectificationServices.dealXCZG, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //保存验收结论并发起整改子流程
        * rectification({ params }, { call, put, select }) {
           const {data, status, message} = yield call(RectificationServices.rectification, params);
            if(status === '0'){
                // Toast.success("整改子流程发起成功");
            }

        },
    },
}
