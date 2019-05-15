/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/19
 * 通水
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import { list, batchWater, deal } from '../services/ConnectWaterServices';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo,dataTable} from "../utils/index";


export default {
    namespace: 'connectWater',
    state: {
    //   loading:false,//加载提示
      data: [],//水表信息,对象数组
      table: [],//手表信息，二维数组
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
        //水表列表
        * list({ params }, { call, put, select }) {
            const p = {
                ...params,
                pageSize: 2000,
                pageNum: 1,
                status: 1,
            }
            // Toast.loading();
            const {data, status, message} = yield call(list, p);
            if(status === '0'){
                let DATA = [];
                data.data.map((item)=>{
                    let o = {
                        meterTypeName: item.meterTypeName,
                        meterCaliberName: item.meterCaliberName,
                        meterCategoryName: item.meterCategoryName,
                        waterNatureName: item.waterNatureName,
                        barCode: item.barCode,
                        initialReading: item.initialReading,
                        installAddress: item.installAddress,
                        waterAddress: item.waterAddress,
                    }
                    DATA.push(o);
                })
                const table_Head = ['水表类型', '水表口径' , '水表性质' , '水表用途' , '条码号' , '初始读数' , '安装地址' , '用水地址'];
                let table = dataTable(DATA);
                table.unshift(table_Head);
                yield put({type: 'setData', data:{ data: data.data, table: table}});
            }

        },
        //批量通水
        * batchWater({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(batchWater, params);
            if(status === '0'){
                Toast.success("批量通水成功");
                yield put({
                    type: 'connectWater/list',
                })
            }
        },
        //通水完成
        * deal({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(deal, params);
            if(status === '0'){
                Toast.success("通水完成");
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