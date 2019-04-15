/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/12
 * 薪信度 接口
 */
import {
    GET_POSITION_INFO
} from '../constants/ActionTypes';

import * as HomeService from '../services/HomeService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";




export default {
    namespace: 'home',
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
        *queryList(_, { call, put, select }) {
           // alert("querylist")
           // console.log("model Home...")
          let response = yield call(HomeService.findInstallInfo,{});
        //  response = typeof response =="string" ? JSON.parse(response):response;
        console.warn("response:",response);
           console.warn("response:",typeof response);
           console.warn("response:",response.status);
            if(response.status == '0' || response.status == 0){
                console.warn("test");
                yield put({type: 'setData', data:{list:response.data}})
            }else{
                console.warn("error");
            }

        },
      
        
    },
}
