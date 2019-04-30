/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/28
 * 异常
 */

import request from '../utils/request';
//部门审核
export function dealExceptionApproval(param) {
    return request.post("/cdsw-install/api/0/app/installReportPause/dealExceptionApproval",param);
}
//经办人填写意见
export function dealOpinion(param) {
    return request.post("/cdsw-install/api/0/app/installReportPause/dealOpinion",param);
}
//经办人填写结果
export function dealResult(param) {
    return request.post("/cdsw-install/api/0/app/installReportPause/dealResult",param);
}
//处置部门审查
export function dealDeptCheck(param) {
    return request.post("/cdsw-install/api/0/app/installReportPause/dealDeptCheck",param);
}
//根据部门ID获取部门下人员
export function findUserByDeptId(param) {
    return request.post("/cdsw-install-ocp/api/0/app/user/findUserByDeptId",param);
}
