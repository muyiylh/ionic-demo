/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 待办
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as BacklogService from '../services/BacklogService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'backlog',
    state: {
        loading:false,//加载提示
        data: {
          data:[],
          page: { pageNum:0,pageSize:20,total:0 },
        },//
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       
        * nomalDeal({ params }, { call, put, select }) {
            // yield put({type: 'setData', data: {loading: true}});
            let DATA = yield select(state => state.backlog.data);
            const { refreshing } = params;
            let param = {};
            if(refreshing){//下拉
                param.pageNum = 1;
                param.pageSize = 20;
            }else{
                param.pageNum = DATA.page.pageNum+1;
                param.pageSize = DATA.page.pageSize;
            }
            const { data, status, message } = yield call(BacklogService.nomalDeal, param);
            if(status === '0'){
                let page = {
                    pageNum: data.pageNum,
                    pageSize: data.pageSize,
                    total: data.total,
                }
                DATA.page = page;
                if(!refreshing){//如果不是下拉刷新，是上拉加载
                    DATA.data = DATA.data.concat(data.data);
                }else{
                    DATA.data = data.data;
                }
                console.log("models-----data---",data);
                yield put({type: 'setData', data: {data: DATA, loading: false} });
            }else{
                    Toast.fail(message);
                }

        },
    },
}
