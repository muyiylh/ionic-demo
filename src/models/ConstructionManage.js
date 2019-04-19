/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 施工管理
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import { getDetail, saveEarthCounts, save } from '../services/ConstructionManageServices';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'constructionManage',
    state: {
    //   loading:false,//加载提示
      data: {
        progress:{}
      },//信息
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //报装信息
        * getDetail({ params }, { call, put, select }) {
            // Toast.loading();
            const {data, status, message} = yield call(getDetail, params);
            if(status === '0'){
                console.log('models-----data---',data)
                yield put({type: 'setData', data:{ data: data}});
            }

        },
        //保存土方量
        * saveEarthCounts({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(saveEarthCounts, params);
            if(status === '0'){
                Toast.success("保存成功！！");
                // NavigationUtil.navigate('backlog');
                // yield put({
                //     type: 'backlog/nomalDeal',
                //     params: {refreshing: true},
                // })
            }

        },
        //保存施工日志
        * save({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(save, params);
            if(status === '0'){
                Toast.success("保存成功！！");
                // NavigationUtil.navigate('backlog');
                // yield put({
                //     type: 'backlog/nomalDeal',
                //     params: {refreshing: true},
                // })
            }

        },
        
    },
}

//#endregion