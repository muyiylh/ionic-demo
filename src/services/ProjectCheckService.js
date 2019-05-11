/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/29
 * 工程验收
 */

import request from '../utils/request';
//根据部门名称查询部门下成员
export function queryDeptUserByDeptName(param) {
    return request.post("/cdsw-install-ocp/api/0/app/dept/queryDeptUserByDeptName",param);
}
//获取工程验收基本信息
export function getInfoByInstall(param) {
    return request.post("/cdsw-install/api/0/app/check/getInfoByInstall",param);
}
//获取工程验收信息
export function getCheck(param) {
    return request.post("/cdsw-install/api/0/app/check/getCheck",param);
}
//获取水表信息
export function listMeterDetail(param) {
    return request.post("/cdsw-install/api/0/app/constructRecord/listMeterDetail",param);
}
//根据ID获取读数照片
export function getImgs(param) {
    return request.post("/cdsw-install/api/0/app/constructRecord/getImgs",param);
}
//管网验收审核
export function dealConstructProcess(param) {
    return request.post("/cdsw-install/api/0/app/check/dealConstructProcess",param);
}
//现场验收结果填写
export function saveCheckResult(param) {
    return request.post("/cdsw-install/api/0/app/check/saveCheckResult",param);
}
//保存验收结论（验收合格时）
export function saveCheckConclusion(param) {
    return request.post("/cdsw-install/api/0/app/check/saveCheckConclusion",param);
}
//查询验收记录
export function findCheckRecord(param) {
    return request.post("/cdsw-install/api/0/app/check/findCheckRecord",param);
}

