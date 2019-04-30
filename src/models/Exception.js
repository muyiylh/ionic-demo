/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/28
 * 异常处置
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as ExceptionService from '../services/ExceptionService';
import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'exception',
    state: {
    //   loading:false,//加载提示
        userList: [],//本部门下的人员list
        deptTree: [],//部门树

    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //根绝部门ID获取部门人员
        * findUserByDeptId({ params }, { call, put, select }) {
            // Toast.loading();
            params.flag = true;
            params.pageSize = 2000;
            const {data, status, message} = yield call(ExceptionService.findUserByDeptId, params);
            let DATA = [];
            data.data.map((item)=>{
                DATA.push({label: item.realName, value: item.id});
            })
                if(status === '0'){
                    yield put({
                        type: 'setData',
                        data: { userList: DATA }
                    })
                }
        },
       //根绝部门ID获取部门人员
        * getDeptForTree(_, { call, put, select }) {
           const {data, status, message} = yield call(BusinessService.getDeptForTree, {});
            if(status === '0'){
                yield put({
                    type: 'setData',
                    data: { deptTree: data }
                })
            }
        },
       //处置部门审核
        * dealDeptCheck({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ExceptionService.dealDeptCheck, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
       //部门审核
        * dealExceptionApproval({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ExceptionService.dealExceptionApproval, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
       //经办人填写意见
        * dealOpinion({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ExceptionService.dealOpinion, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("backlog");
                // yield put({
                //     type: 'approval/subProcessDeal',
                //     params: {refreshing: true},
                // })
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
       //经办人填写结果
        * dealResult({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ExceptionService.dealResult, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("backlog");
                // yield put({
                //     type: 'approval/subProcessDeal',
                //     params: {refreshing: true},
                // })
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
    },
}
