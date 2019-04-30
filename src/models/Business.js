/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 * 客户跟踪计划
 */
import {
    GET_POSITION_INFO
} from '../constants/ActionTypes';

import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";






export default {
    namespace: 'business',
    state: {
      loading:false,//加载提示
      list:[],//上报单位
      conList:{},//巡检结论
      deptTree:[],//上报部门
      userList:[],//用户信息
      record:{},//报装基本信息
      checkResult:{},//检查结论
      planList:[],//水表巡检计划
      
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        *createTraceRecord({params}, { call, put, select }) {
          const response= yield call(BusinessService.createTraceRecord,params);
           if(response.status == '0' ||response.status == 0){
            NavigationUtil.navigate("busPlanList",{id: params.planId})
               
          }

        },
        *qualified({params},{call, put, select}){
            const response= yield call(BusinessService.qualified,params);
            if(response.status == '0' ||response.status == 0){
           //  NavigationUtil.navigate("busPlanList",{id: params.planId})
                
           }
        } ,
        *queryResult({params},{call, put, select}){
            const response= yield call(BusinessService.queryResult,params);
            if(response.status == '0' ||response.status == 0){
                yield put({type:'setData',data:{conList:response.data}});
           //  NavigationUtil.navigate("busPlanList",{id: params.planId})
                
           }
        },
        *getDeptForTree(_,{call, put, select}){
            const response= yield call(BusinessService.getDeptForTree,{});
            if(response.status == '0' ||response.status == 0){
                yield put({type:'setData',data:{deptTree:response.data}});
           //  NavigationUtil.navigate("busPlanList",{id: params.planId})
                
           }
        } ,
        *queryUserByPage({params},{call, put, select}){
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
        *saveReport({params},{call, put, select}){
            const response= yield call(BusinessService.saveReport,params);
            if(response.status == '0' ||response.status == 0){
           NavigationUtil.navigate("busPatrolPlanList",{id: params.planId})
                
           }
        } ,
        //getFormDataByInstallNo
        *getFormDataByInstallNo({params},{call, put, select}){
            const response= yield call(BusinessService.getFormDataByInstallNo,params);
            if(response.status == '0' ||response.status == 0){
                yield put({type:'setData',data:{record:response.data}});
                
           }
        } ,//
        *createReviewRecord({params},{call, put, select}){
            const response= yield call(BusinessService.createReviewRecord,params);
            if(response.status == '0' ||response.status == 0){
                //yield put({type:'setData',data:{record:response.data}});
                NavigationUtil.navigate("busInspectCheck",{id: params.planId})
           }
        } ,
        //
        *getCheckListResult({params},{call, put, select}){
            const response= yield call(BusinessService.getCheckListResult,params);
            if(response.status == '0' ||response.status == 0){//
                yield put({type:'setData',data:{checkResult:response.data}});
                //yield put({type:'setData',data:{record:response.data}});
               // NavigationUtil.navigate("busInspectCheck",{id: params.planId})
           }
        } ,
        *findCheckListDetails({params},{call, put, select}){
            const response= yield call(BusinessService.findCheckListDetails,params);
            if(response.status == '0' ||response.status == 0){//
                yield put({type:'setData',data:{checkResult:response.data}});
                //yield put({type:'setData',data:{record:response.data}});
               // NavigationUtil.navigate("busInspectCheck",{id: params.planId})
           }
        } ,
        //获取水表巡检计划列表
        *getPlan({params},{call, put, select}){
            const response= yield call(BusinessService.getPlan,params);
            if(response.status == '0' ||response.status == 0){//
               // const data = yield select(state=>state.business.planList);
               // const arr = data.concat(response.data);
                yield put({type:'setData',data:{planList:response.data}});
                //yield put({type:'setData',data:{record:response.data}});
               // NavigationUtil.navigate("busInspectCheck",{id: params.planId})
           }
        } ,
    },
}
