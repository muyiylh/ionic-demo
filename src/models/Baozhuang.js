/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 报装受理
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as BaozhuangService from '../services/BaozhuangService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'baozhuang',
    state: {
    //   loading:false,//加载提示
      data: {},//咨询信息
      installNo: '',//报装号
      ZNData:{},//智能咨询
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //报装信息
        * getInstallInfoById({ params }, { call, put, select }) {
            // Toast.loading();
            const {data, status, message} = yield call(BaozhuangService.getInstallInfoById, params);
            if(status === '0'){
                data.projectName = data.unitName + data.projectTypeName + "项目";
                yield put({type: 'setData', data:{ data: data}});
            }

        },
        //生成报装号
        * createInstallNo({ params }, { call, put, select }) {
            // Toast.loading();
            const {data, status, message} = yield call(BaozhuangService.createInstallNo, params);
            if(status === '0'){
                yield put({type: 'setData', data:{ installNo: data}});
            }

        },
        //报装受理
        * offLineApply({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(BaozhuangService.offLineApply, params);
            if(status === '0'){
                Toast.success("报装受理成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //暂停受理
        * timeOutAccept({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(BaozhuangService.timeOutAccept, params);
            if(status === '0'){
                Toast.success("暂停受理成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //智能检索
        * intelligentRetrieval({ params }, { call, put, select }) {
            const {data, status, message} = yield call(BaozhuangService.intelligentRetrieval, params);
            if(status === '0'){
                yield put({type: 'setData', data:{ ZNData: data}});
            }

        },
        //受理审核
        * dealSLSH({ params }, { call, put, select }) {
            const {data, status, message} = yield call(BaozhuangService.dealSLSH, params);
            if(status === '0'){
                Toast.success("受理成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        //上门报装----上门记录情况
        * doorInstallRecord({ params }, { call, put, select }) {
            const {data, status, message} = yield call(BaozhuangService.doorInstallRecord, params);
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
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'setData', data:{ installNo: ''}});
        //    console.log('subscriptions');
        }
    }
}

//#endregion