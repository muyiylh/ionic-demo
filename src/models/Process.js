/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 * 客户跟踪计划
 */
import {
    GET_POSITION_INFO
} from '../constants/ActionTypes';

import * as ProcessService from '../services/ProcessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";







export default {
    namespace: 'process',
    state: {
        bzSelectList:[],//下拉选择报装号
        bzOriginalList:[],//报装信息
        userList:[],//用户列表
      
    },
    reducers: {
        setData(state, {payload}) {
            return {...state,...payload};
          },
    },
    effects: {
        //获取报装号
        *findWaitDealByTaskName({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.findWaitDealByTaskName, payload);
            if(status === '0'){
              //  Toast.success("提交成功");
               // NavigationUtil.navigate("approval");
               var arr =[];
               data && data.map(item=>{
                   arr.push({value:item.id,label:item.installNo})
               })
                yield put({
                    type: 'setData',
                    payload: {bzOriginalList: data,bzSelectList:arr},
                })
            }

        },
        //保存设计文档申请修改
        *startFile({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.startFile, payload);
            if(status === '0'){
                Toast.success("提交成功");
               // if(title=="工程施工-接水"){
                 NavigationUtil.back();
              //  }
               
            
            }

        },
        //保存施工手续待办
        *procedureAgentApply({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.procedureAgentApply, payload);
            if(status === '0'){
                Toast.success("提交成功");
               // if(title=="工程施工-接水"){
                 NavigationUtil.back();
              //  }
               
            
            }

        },
        //获取用户列表
        *queryUserByPage({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.queryUserByPage, payload);
            if(status === '0'){
 
              var arr =[];
               data.data && data.data.map(item=>{
                   arr.push({value:item.id,label:item.name})
               })
                yield put({
                    type: 'setData',
                    payload: {userList:arr},
                }) 
            
            }

        },
        //异常处理流程
        *ReportPauseStart({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.ReportPauseStart, payload);
            if(status === '0'){
                Toast.success("提交成功");
               // if(title=="工程施工-接水"){
                 NavigationUtil.back();
              //  }
               
            
            }
        },
        //客户暂停流程  
        *CustomerPauseStart({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.CustomerPauseStart, payload);
            if(status === '0'){
                Toast.success("提交成功");
            // if(title=="工程施工-接水"){
                NavigationUtil.back();
            //  }
            
            
            }
        },
         //客户撤销流程    
         *CustomerRescindStart({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.CustomerRescindStart, payload);
            if(status === '0'){
                Toast.success("提交成功");
            // if(title=="工程施工-接水"){
                NavigationUtil.back();
            //  }
            
            
            }
        },
         //现场测压申请    
         *checkPressureApply({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.checkPressureApply, payload);
            if(status === '0'){
                Toast.success("提交成功");
            // if(title=="工程施工-接水"){
                NavigationUtil.back();
            //  }
            
            
            }
        },
         //管道复核   
         *pipelineReviewApply({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.pipelineReviewApply, payload);
            if(status === '0'){
                Toast.success("提交成功");
            // if(title=="工程施工-接水"){
                NavigationUtil.back();
            //  }
            
            
            }
        },
         //会签  
         *startSign({payload},{select,put,call}){
            const {data, status, message} = yield call(ProcessService.startSign, payload);
            if(status === '0'){
                Toast.success("提交成功");
            // if(title=="工程施工-接水"){
                NavigationUtil.back();
            //  }
            
            
            }
        },

    
   
     
       
       
      
    },
}
