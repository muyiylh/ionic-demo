/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 现场踏勘
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as SiteSurveyService from '../services/SiteSurveyService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'siteSurvey',
    state: {
    //   loading:false,//加载提示
      data: {},//咨询信息
      installNo: '',//报装号
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       
        //提交踏勘信息
        * saveBindWorkFlow({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(SiteSurveyService.saveBindWorkFlow, params);
        //    console.log("modela----data--------",data);
            if(status === '0'){
                Toast.success("现场踏勘成功");
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
            // dispatch({type: 'setData', data:{ installNo: ''}});
        //    console.log('subscriptions');
        }
    }
}

//#endregion