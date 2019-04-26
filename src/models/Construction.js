/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 施工合同签订
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as ConstructionService from '../services/ConstructionService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'construction',
    state: {
    //   loading:false,//加载提示
      
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //提交施工合同
        * deal({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ConstructionService.deal, params);
           console.log("modela----data--------",data);
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
}

//#endregion