/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 预算编制
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as BudgetingService from '../services/BudgetingService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'budgeting',
    state: {
    //   loading:false,//加载提示
      data: {
        meterList: [],
        gDList: [],
      },//设计信息
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //报装信息
        * getByInstallId({ params }, { call, put, select }) {
            // Toast.loading();
            const {data, status, message} = yield call(BudgetingService.getByInstallId, params);
            if(status === '0'){
                console.log('models-----data---',data)
                yield put({type: 'setData', data:{ data: data}});
            }

        },
        //提交预算编制
        * saveProcesBudget({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(BudgetingService.saveProcesBudget, params);
           console.log("modela----data--------",data);
            if(status === '0'){
                Toast.success("提交成功！！");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
        
    },
}

//#endregion