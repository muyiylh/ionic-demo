/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 资信度审核，处置
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as CreditCheckService from '../services/CreditCheckService';
import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'creditCheck',
    state: {
    //   loading:false,//加载提示
        userList:[],//用户list
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //领导审核
        * dealBMLDSH({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealBMLDSH, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //部门上级领导审核
        * dealBMSJLDSH({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealBMSJLDSH, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //分管副总审核
        * dealFGFZSH({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealFGFZSH, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //总经理审核
        * dealZJLSH({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealZJLSH, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //处置---领导审核
        * dealBMLDSHCZ({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealBMLDSHCZ, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //处置----分管副总审核
        * dealFGFZSHCZ({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealFGFZSHCZ, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //处置----总经理审核
        * dealZJLSHCZ({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealZJLSHCZ, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //上报资信度问题
        * dealSBZXDWT({ params }, { call, put, select }) {
           const {data, status, message} = yield call(CreditCheckService.dealSBZXDWT, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //单位下用户
        *queryUserByPage({params},{call, put, select}){
            params.pageSize = 10000;
            params.pageNum = 1;
            const response= yield call(BusinessService.queryUserByPage,params);
            if(response.status == '0' ||response.status == 0){
                let data =[];
                response.data.data && response.data.data.map(item=>{
                    data.push({value:item.id,label:item.name});
                })
                yield put({type:'setData',data:{userList:data}});
           //  NavigationUtil.navigate("busPlanList",{id: params.planId})
           }
        },
    },
}
