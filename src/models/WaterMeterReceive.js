/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/20
 * 水表接收
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import { list, update, reCheck, handOver, getMeterInfoById, deal} from '../services/WaterMeterReceiveServices';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'waterMeterReceive',
    state: {
        loading:false,//加载提示
        HBdataZero: {//户表清单---读数为0
            data:[],
            page: { pageNum:0,pageSize:20,total:20 },
        },
        HBdataNoZero: {//户表清单---读数为非0
            data:[],
            page: { pageNum:0,pageSize:20,total:20 },
        },
        FHBdata: {//非户表清单
            data:[],
            page: { pageNum:0,pageSize:20,total:20 },
        },
        JKBdata: {//监控表
            data:[],
            page: { pageNum:0,pageSize:20,total:20 },
        },
        data:{},//水表详情信息
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //水表列表
        * list({ params }, { call, put, select }) {
            // yield put({type: 'setData', data: {loading: true}});
            let HBdataZero = yield select(state => state.waterMeterReceive.HBdataZero);
            let HBdataNoZero = yield select(state => state.waterMeterReceive.HBdataNoZero);
            let FHBdata = yield select(state => state.waterMeterReceive.FHBdata);
            let JKBdata = yield select(state => state.waterMeterReceive.JKBdata);
            const { refreshing, param, index } = params;
            let _param = {...param};
            let DATA = {
                // data:[],
                // page: { pageNum:0,pageSize:20,total:0 },
            };
            switch (index) {
                case 1:
                    DATA = HBdataZero;
                    break;
                case 2:
                    DATA = HBdataNoZero;
                    break;
                case 3:
                    DATA = FHBdata;
                    break;
                case 4:
                    DATA = JKBdata;
                    break;
                default:
                    break;
            }
            if(refreshing){//下拉
                _param.pageNum = 1;
                _param.pageSize = 20;
            }else{
                _param.pageNum = DATA.page.pageNum+1;
                _param.pageSize = DATA.page.pageSize;
            }
            if((_param.pageNum-1) * _param.pageSize < DATA.page.total){
                const { data, status, message } = yield call(list, _param);
                // console.log("models------data---",index,data);
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
                    switch (index) {
                        case 1:
                            yield put({type: 'setData', data: {HBdataZero: DATA, loading: false} });
                            break;
                        case 2:
                            yield put({type: 'setData', data: {HBdataNoZero: DATA, loading: false} });
                            break;
                        case 3:
                            yield put({type: 'setData', data: {FHBdata: DATA, loading: false} });
                            break;
                        case 4:
                            yield put({type: 'setData', data: {JKBdata: DATA, loading: false} });
                            break;
                        default:
                            break;
                    }
                }
            }
            

        },
        //详情
        * getMeterInfoById({ params }, { call, put, select }) {
            const { data, status, message } = yield call(getMeterInfoById, params);
            if(status === '0'){
                yield put({
                    type: 'setData',
                    data: {data: data},
                })  
            }

        },
        //修改
        * update({ params }, { call, put, select }) {
            let dataObj = yield select(state => state.waterMeterReceive.data);
            const { data, status, message } = yield call(update, params);
            if(status === '0'){
                Toast.success("修改成功");
                yield put({
                    type: 'waterMeterReceive/getMeterInfoById',
                    params: {id: dataObj.id},
                })  
            }

        },
        //复核
        * reCheck({ params }, { call, put, select }) {
            let dataObj = yield select(state => state.waterMeterReceive.data);
            const { data, status, message } = yield call(reCheck, params);
            if(status === '0'){
                Toast.success("复核成功");
                yield put({
                    type: 'waterMeterReceive/getMeterInfoById',
                    params: {id: dataObj.id},
                })  
            }

        },
        //接收
        * handOver({ params }, { call, put, select }) {
            const { data, status, message } = yield call(handOver, params);
            if(status === '0'){
                Toast.success("水表接收成功");
            }

        },
        //接收完成
        * deal({ params }, { call, put, select }) {
            const { data, status, message } = yield call(deal, params);
            if(status === '0'){
                Toast.success("完成接收成功");
                NavigationUtil.navigate('backlog');
                yield put({
                    type: 'backlog/nomalDeal',
                    params: {refreshing: true},
                })
            }

        },
    },
}
