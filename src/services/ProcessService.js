/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/5/9
 * 发起流程
 */

import request from '../utils/request';

//获取号报装号
export function findWaitDealByTaskName(param) {
    return request.post("/cdsw-install/api/0/app/waitDeal/findWaitDealByTaskName",param);
}
//保存设计文档修改申请
export function startFile(param) {
    return request.post("/cdsw-install/api/0/app/processDesignDocModify/start",param);
}
//保存施工手续待办
export function procedureAgentApply(param) {
    return request.post("/cdsw-install/api/0/app/procedureAgent/procedureAgentApply",param);
}
//获取用户信息
export function queryUserByPage(param) {
    return request.post("/cdsw-install-ocp/api/0/app/user/queryUserByPage",param);
}

//异常处理流程
export function ReportPauseStart(param) {
    return request.post("/cdsw-install/api/0/app/installReportPause/start",param);
}
//客户暂停流程  
export function CustomerPauseStart(param) {
    return request.post("/cdsw-install/api/0/app/customerPause/start",param);
}
//客户撤销流程  
export function CustomerRescindStart(param) {
    return request.post("/cdsw-install/api/0/app/customerRescind/start",param);
}
//管道测压 
export function checkPressureApply(param) {
    return request.post("/cdsw-install/api/0/app/checkPressure/checkPressureApply",param);
}
//管道复核
export function pipelineReviewApply(param) {
    return request.post("/cdsw-install/api/0/app/pipelineReview/pipelineReviewApply",param);
}
//管道复核
export function startSign(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/startSign",param);
}