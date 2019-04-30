/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/29
 * 工程验收
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as ProjectCheckService from '../services/ProjectCheckService';
import * as BusinessService from '../services/BusinessService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo, dataTable} from "../utils/index";

const head1 = ["水表类型","水表口径","水表类别","用水性质","初始读数","安装地址","用水地址","水表状态"];
const head2 = ["管径","管材","安装长度","桩号","接口形式","外观检查","接头质量"];
const head3 = ["型号","数量","公称直径(mm)","生产厂家","总公司检验号","外观检查","外防腐","出厂日期","备注"];
const head4 = ["型号","数量","公称直径(mm)","三通法兰距管顶高度(mm)","开孔与井孔中心距离(mm)","备注"];
export default {
    namespace: 'projectCheck',
    state: {
    //   loading:false,//加载提示
        info: {},//基本信息
        userList: [],//指派人员list
        tabsData: {},//表节点验收等等数据
        meter: {},//水表信息
        gdVoList:[],//管道情况
        fmVoList:[],//阀门情况
        xhsVoList:[],//消火栓情况
        pqfVoList:[],//排气阀情况
        clkVoList:[],//测流孔情况
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       //基本信息
        * getInfoByInstall({ params }, { call, put, select }) {
            const {data, status, message} = yield call(ProjectCheckService.getInfoByInstall, params);
            console.log("models---data----",data);
            if(status === '0'){
                yield put({
                    type: 'setData',
                    data: { info: data }
                })
            }
        },
       //信息
        * getCheck({ params }, { call, put, select }) {
            const {data, status, message} = yield call(ProjectCheckService.getCheck, params);
            console.log("models---data----",data);
            if(status === '0'){
                let obj = {};
                data.map((item)=>{
                    for( let key in item){
                        obj[key] = item[key];
                    }
                })
                console.log("models---obj---",obj);
                let gdVoList = [];
                obj[3].gdVoList.map((item)=>{
                    gdVoList.push({
                        caliber: item.caliber,
                        material: item.material,
                        length: item.length,
                        pileNo: item.pileNo,
                        interfaceMode: item.interfaceMode,
                        facadeCheck: item.facadeCheck,
                        jointQuality: item.jointQuality,
                    })
                })
                let _gdVoList =  dataTable(gdVoList);_gdVoList.unshift(head2);
                let fmVoList = [];
                obj[3].fmVoList.map((item)=>{
                    fmVoList.push({
                        model: item.model,
                        count: item.count,
                        gongChenDiameter: item.gongChenDiameter,
                        producter: item.producter,
                        checkNo: item.checkNo,
                        facadeCheck: item.facadeCheck,
                        facadeFangFu: item.facadeFangFu,
                        productDate: item.productDate,
                        remark: item.remark,
                    })
                })
                let _fmVoList =  dataTable(fmVoList);_fmVoList.unshift(head3);
                let xhsVoList = [];
                obj[3].xhsVoList.map((item)=>{
                    xhsVoList.push({
                        model: item.model,
                        count: item.count,
                        gongChenDiameter: item.gongChenDiameter,
                        producter: item.producter,
                        checkNo: item.checkNo,
                        facadeCheck: item.facadeCheck,
                        facadeFangFu: item.facadeFangFu,
                        productDate: item.productDate,
                        remark: item.remark,
                    })
                })
                let _xhsVoList =  dataTable(xhsVoList);_xhsVoList.unshift(head3);
                let pqfVoList = [];
                obj[3].pqfVoList.map((item)=>{
                    pqfVoList.push({
                        model: item.model,
                        count: item.count,
                        gongChenDiameter: item.gongChenDiameter,
                        producter: item.producter,
                        checkNo: item.checkNo,
                        facadeCheck: item.facadeCheck,
                        facadeFangFu: item.facadeFangFu,
                        productDate: item.productDate,
                        remark: item.remark,
                    })
                })
                let _pqfVoList =  dataTable(pqfVoList);_pqfVoList.unshift(head3);
                let clkVoList = [];
                obj[3].clkVoList.map((item)=>{
                    clkVoList.push({
                        model: item.model,
                        count: item.count,
                        gongChenDiameter: item.gongChenDiameter,
                        sanTongHigh: item.sanTongHigh,
                        centerDistance: item.centerDistance,
                        remark: item.remark,
                    })
                })
                let _clkVoList =  dataTable(clkVoList);_clkVoList.unshift(head4);
                yield put({
                    type: 'setData',
                    data: { 
                        tabsData: obj, 
                        gdVoList: _gdVoList, 
                        fmVoList: _fmVoList,
                        xhsVoList: _xhsVoList,
                        pqfVoList: _pqfVoList,
                        clkVoList: _clkVoList,
                    }
                })
            }
        },
       //水表信息
        * listMeterDetail({ params }, { call, put, select }) {
            const {data, status, message} = yield call(ProjectCheckService.listMeterDetail, params);
            console.log("models---data----",data);
            if(status === '0'){
                let arr = [];
                data.meterDetail && data.meterDetail.data && data.meterDetail.data.map((item)=>{
                    arr.push({
                        meterTypeName: item.meterTypeName,
                        meterCaliberName: item.meterCaliberName,
                        meterCategoryName: item.meterCategoryName,
                        waterNatureName: item.waterNatureName,
                        initialReading: item.initialReading,
                        installAddress: item.installAddress,
                        waterAddress: item.waterAddress,
                        status: item.status,
                    });
                })
                let table = dataTable(arr);
                table.unshift(head1);
                data.table = table;
                yield put({
                    type: 'setData',
                    data: { meter: data }
                })
            }
        },
       //根绝部门ID获取部门人员
        * queryDeptUserByDeptName({ params }, { call, put, select }) {
            const {data, status, message} = yield call(ProjectCheckService.queryDeptUserByDeptName, params);
            console.log("models---data----",data);
            let arr = [];
            data.map((item)=>{
                arr.push({label: item.realName, value: item.id});
            })
            if(status === '0'){
                yield put({
                    type: 'setData',
                    data: { userList: arr }
                })
            }
        },
       //处置部门审核
        * dealConstructProcess({ params }, { call, put, select }) {
            // Toast.loading();
           const {data, status, message} = yield call(ProjectCheckService.dealConstructProcess, params);
            console.log("models---data----",data);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
                yield put({
                    type: 'approval/subProcessDeal',
                    params: {refreshing: true},
                })
            }

        },
    },
}
