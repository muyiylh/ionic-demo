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
      
        
    },
}
