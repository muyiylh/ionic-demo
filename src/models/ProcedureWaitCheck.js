/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 手续代办
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as ProcedureWaitCheckService from '../services/ProcedureWaitCheckService';
import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";

export default {
    namespace: 'procedureWait',
    state: {
    //   loading:false,//加载提示
        info: {},//进度信息
        userList:[],//代办人list
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //领导审核
        * procedureAgentLeaderReview({ params }, { call, put, select }) {
           const {data, status, message} = yield call(ProcedureWaitCheckService.procedureAgentLeaderReview, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
       //提交代办信息
        * procedureAgentSubmitResult({ params }, { call, put, select }) {
           const {data, status, message} = yield call(ProcedureWaitCheckService.procedureAgentSubmitResult, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
       //查看代办进度
        * findProcedureAgentSchedule({ params }, { call, put, select }) {
           const {data, status, message} = yield call(ProcedureWaitCheckService.findProcedureAgentSchedule, params);
           console.log("models------data",data);
            if(status === '0'){
                yield put({
                    type: 'setData',
                    data: { info: data }
                })
            }

        },
        //部门下用户
        *queryUserByPage({params},{call, put, select}){
            params.pageSize = 10000;
            params.pageNum = 1;
            const response= yield call(BusinessService.queryUserByPage,params);
           console.log("models------response",response);
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
