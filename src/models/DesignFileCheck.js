/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/24
 * 设计文件
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as DesignFileCheckService from '../services/DesignFileCheckService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'designFileCheck',
    state: {
    //   loading:false,//加载提示
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //审核流程---领导审核
        * dealBMLDSHConfirm({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(DesignFileCheckService.dealBMLDSHConfirm, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }else{
                Toast.fail(message);
            }

        },
       //修改流程---领导审核
        * dealBMLDSHModify({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(DesignFileCheckService.dealBMLDSHModify, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }else{
                Toast.fail(message);
            }

        },
       //修改流程---设计部门领导审核
        * dealSJDWLDSH({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(DesignFileCheckService.dealSJDWLDSH, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }else{
                Toast.fail(message);
            }

        },
    },
}
