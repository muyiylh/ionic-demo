/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/04/17
 * 咨询回复
 */

import request from '../utils/request';
//获取客户信息
export function queryPlans(param) {
    return request.post("/cdsw-install2/api/0/app/clientRelations/queryPlans",param);
}
//获取客户详细信息
export function queryPlanDetail(param) {
    return request.post("/cdsw-install2/api/0/app/clientRelations/queryPlanDetail",param);
}

//创建跟踪计划
export function createTraceRecord(param) {
    return request.post("/cdsw-install2/api/0/app/clientRelations/createTraceRecord",param);
}

//跟踪记录查看
export function queryTraceRecord(param) {
    return request.post("/cdsw-install2/api/0/app/clientRelations/queryTraceRecord",param);
}

// //水表巡查计划
export function queryExaminePlan(param) {
    return request.post("/cdsw-install2/api/0/app/examinePlan/queryExaminePlan",param);
}
//根据计划ID查看巡检列表
export function getPlan(param) {
    return request.post("/cdsw-install2/api/0/app/examinePlan/getPlan",param);
}
