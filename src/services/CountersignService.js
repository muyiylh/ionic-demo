/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/05/05
 * 在线会签
 */

import request from '../utils/request';
//在线会签---部门领导审核
export function bmldAudit(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/bmldAudit",param);
}
//在线会签---部门领导负责人接收
export function deptFZRRecive(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/deptFZRRecive",param);
}
//在线会签---部门经办人审核
export function deptOperator(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/deptOperator",param);
}
//在线会签---部门领导审核
export function deptLeader(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/deptLeader",param);
}
//在线会签---综合部门意见并审核
export function zhbmyjCheck(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/zhbmyjCheck",param);
}
//在线会签---管理部门审核
export function glbmCheck(param) {
    return request.post("/cdsw-install/api/0/app/joinSign/glbmCheck",param);
}

