/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/05/05
 * 在线会签
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as CountersignService from '../services/CountersignService';
import * as ExceptionService from '../services/ExceptionService';
import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'countersign',
    state: {
        //   loading:false,//加载提示
        deptTree: [],//所属部门
        userList: {},//部门领导审核---处置人员list
        userList3: [],//部门领导负责人接收---处置人员
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //根绝部门ID获取部门
        * getDeptForTree(_, { call, put, select }) {
            const {data, status, message} = yield call(BusinessService.getDeptForTree, {});
             if(status === '0'){
                 yield put({
                     type: 'setData',
                     data: { deptTree: data }
                 })
             }
         },
        //根绝部门ID获取部门人员
        * findUserByDeptId({ params }, { call, put, select }) {
            const _userList = yield select(state => state.countersign.userList);
            // Toast.loading();
            const { param, index } = params;
            param.flag = true;
            param.pageSize = 2000;
            const {data, status, message} = yield call(ExceptionService.findUserByDeptId, param);
            
            if(status === '0'){
                let DATA = [];
                data.data.map((item)=>{
                    DATA.push({label: item.realName, value: item.id});
                })
                _userList[index] = DATA;
                yield put({
                    type: 'setData',
                    data: { userList: _userList }
                })
            }
        },
        //根绝部门ID获取部门人员
        * findUserByDeptId3({ params }, { call, put, select }) {
            params.flag = true;
            params.pageSize = 2000;
            const {data, status, message} = yield call(ExceptionService.findUserByDeptId, params);
            
            if(status === '0'){
                let DATA = [];
                data.data.map((item)=>{
                    DATA.push({label: item.realName, value: item.id});
                })
                yield put({
                    type: 'setData',
                    data: { userList3: DATA }
                })
            }
        },
       //第二步---部门领导审核
        * bmldAudit({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CountersignService.bmldAudit, params);
    
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
       //第三步---部门负责人接收
        * deptFZRRecive({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CountersignService.deptFZRRecive, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //部门经办人审核
        * deptOperator({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CountersignService.deptOperator, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //部门领导审核
        * deptLeader({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CountersignService.deptLeader, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //综合部门意见并审核
        * zhbmyjCheck({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CountersignService.zhbmyjCheck, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //管理部门审核
        * glbmCheck({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(CountersignService.glbmCheck, params);
    
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
