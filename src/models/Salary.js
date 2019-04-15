/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/12
 * 薪信度 接口
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as SalaryService from '../services/SalaryService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'salary',
    state: {
      loading:false,//加载提示
      reportUnits:[],//上报单位
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       
        * save({ params }, { call, put, select }) {
            Toast.loading();
           const {data, status, message} = yield call(SalaryService.saveSalary, params);
            if(status === '0'){
                Toast.success("添加成功");
                NavigationUtil.navigate("business");
            }

        },
        *queryConfigParams({params},{call,put,select}){
            //Toast.loading();
            const {data, status, message} = yield call(SalaryService.queryConfigParams, params);
            
            if(status === '0'){
                //Toast.success("添加成功");
               // NavigationUtil.navigate("business");
               let list = [];
               if(data && data.length > 0){
                   data.map(item =>{
                       list.push({value:item.id,label:item.paramName});
                   })
               }
               yield put({type: 'setData', data:{reportUnits:list}})
            }
        }
    },
}
