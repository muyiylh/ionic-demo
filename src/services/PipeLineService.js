/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/24
 * 管道复核--
 */

import request from '../utils/request';
//领导审查
export function pipelineReviewLeaderReview(param) {
    return request.post("/cdsw-install/api/0/app/pipelineReview/pipelineReviewLeaderReview",param);
}
//建设指挥部审核
export function constructionHeadquartersReview(param) {
    return request.post("/cdsw-install/api/0/app/pipelineReview/constructionHeadquartersReview",param);
}
//通知管网单位接收
export function pipelineReviewAssignDealPerson(param) {
    return request.post("/cdsw-install/api/0/app/pipelineReview/pipelineReviewAssignDealPerson",param);
}
//记录复核结果
export function recordingReviewResult(param) {
    return request.post("/cdsw-install/api/0/app/pipelineReview/recordingReviewResult",param);
}
//安科复核基建工程
export function ankeReview(param) {
    return request.post("/cdsw-install/api/0/app/pipelineReview/ankeReview",param);
}
//当前用户的部门树
export function queryCurrentDepts(param) {
    return request.post("/cdsw-install-ocp/api/0/app/dept/queryCurrentDepts",param);
}



