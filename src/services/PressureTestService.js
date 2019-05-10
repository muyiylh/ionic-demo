/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/24
 * 测压申请
 */

import request from '../utils/request';
//领导审查
export function leaderReview(param) {
    return request.post("/cdsw-install/api/0/app/checkPressure/leaderReview",param);
}
//指定现场测压人
export function assignDealPerson(param) {
    return request.post("/cdsw-install/api/0/app/checkPressure/assignDealPerson",param);
}
//记录测压结果
export function recordResult(param) {
    return request.post("/cdsw-install/api/0/app/checkPressure/recordResult",param);
}

