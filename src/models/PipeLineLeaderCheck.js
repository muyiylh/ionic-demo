/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/15
 * 管道复核
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as PipeLineService from '../services/PipeLineService';
import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'pipeLineLeaderCheck',
    state: {
    //   loading:false,//加载提示
        deptTree: [],//部门树
        userList: [],//用户list
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //领导审核
        * pipelineReviewLeaderReview({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PipeLineService.pipelineReviewLeaderReview, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //建设指挥部审核
        * constructionHeadquartersReview({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PipeLineService.constructionHeadquartersReview, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
        //通知管网单位接收
        * pipelineReviewAssignDealPerson({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PipeLineService.pipelineReviewAssignDealPerson, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //记录复核结果
        * recordingReviewResult({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PipeLineService.recordingReviewResult, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //安科复核基建工程
        * ankeReview({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PipeLineService.ankeReview, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //当前用户的部门树
        * queryCurrentDepts({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(PipeLineService.queryCurrentDepts, params);
            if(status === '0'){
                yield put({
                    type: 'setData',
                    data: {deptTree: data},
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
                    data.push({value:item.id,label:item.realName});
                })
                let _data = [];
                _data =  data.filter((item) => {return item.value != params.userId});
                yield put({type:'setData',data:{userList:_data}});
           //  NavigationUtil.navigate("busPlanList",{id: params.planId})
           }
        },
    },
}
