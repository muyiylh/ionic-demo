/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 资信度审核，处置
 */

import request from '../utils/request';

//审核
//领导审核
export function dealBMLDSH(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditReview/dealBMLDSH",param);
}
//部门上级领导审核
export function dealBMSJLDSH(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditReview/dealBMSJLDSH",param);
}
//分管副总审核
export function dealFGFZSH(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditReview/dealFGFZSH",param);
}
//总经理审核
export function dealZJLSH(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditReview/dealZJLSH",param);
}
//处置
//领导审核
export function dealBMLDSHCZ(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditHandle/dealBMLDSH",param);
}
//分管副总审核
export function dealFGFZSHCZ(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditHandle/dealFGFZSH",param);
}
//总经理审核
export function dealZJLSHCZ(param) {
    return request.post("/cdsw-install2/api/0/app/processCreditHandle/dealZJLSH",param);
}




