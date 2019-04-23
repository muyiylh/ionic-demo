/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/04/17
 * 咨询回复
 */

import request from '../utils/request';
//获取客户信息
export function queryPlans(param) {
    return request.post("/cdsw-install/api/0/app/clientRelations/queryPlans",param);
}
//获取客户详细信息
export function queryPlanDetail(param) {
    return request.post("/cdsw-install/api/0/app/clientRelations/queryPlanDetail",param);
}

//创建跟踪计划
export function createTraceRecord(param) {
    return request.post("/cdsw-install/api/0/app/clientRelations/createTraceRecord",param);
}

//跟踪记录查看
export function queryTraceRecord(param) {
    return request.post("/cdsw-install/api/0/app/clientRelations/queryTraceRecord",param);
}

// //水表巡查计划
export function queryExaminePlan(param) {
    return request.post("/cdsw-install/api/0/app/examinePlan/queryExaminePlan",param);
}
//根据计划ID查看巡检列表
export function getPlan(param) {
    return request.post("/cdsw-install/api/0/app/examinePlan/getPlan",param);
}
//检验是否合格
export function qualified(param) {
    return request.post("/cdsw-install/api/0/app/examinePlan/qualified",param);
}
//水表巡检结论
export function queryResult(param) {
    return request.post("/cdsw-install/api/0/app/examinePlan/entiretyRecord",param);
}
//


//检查计划列表
export function findCheckListByAny(param) {
    return request.post("/cdsw-install/api/0/app/checkList/findCheckListByAny",param);
}

//检查清单详情
export function findCheckListDetails(param) {
    return request.post("/cdsw-install/api/0/app/checkList/findCheckListDetails",param);
}

//检查记录
export function getCheckListResult(param) {
    return request.post("/cdsw-install/api/0/app/checkList/getCheckListResult",param);
}
//获取部门机构
export function getDeptForTree(param) {
    return request.post("/cdsw-install-ocp/api/0/app/dept/getDeptForTree",param);
}
//
//获取部门相关的用户
export function queryUserByPage(param) {
    return request.post("/cdsw-install-ocp/api/0/app/user/queryUserByPage",param);
}
//水表巡检总体结论录入
export function saveReport(param) {
    return request.post("/cdsw-install/api/0/app/examinePlan/report",param);
}
//
//报装基本信息
export function getFormDataByInstallNo(param) {
    return request.post("/cdsw-install/api/0/app/waitDeal/getFormDataByInstallNo",param);
}

//结论录入
export function createReviewRecord(param) {
    return request.post("/cdsw-install/api/0/app/checkList/createReviewRecord",param);
}
// //检查结论
// export function getCheckListResult(param) {
//     return request.post("/cdsw-install2/api/0/app/checkList/getCheckListResult",param);
// }
