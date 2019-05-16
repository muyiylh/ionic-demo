/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 手续代办
 */

import request from '../utils/request';
//领导审查
export function procedureAgentLeaderReview(param) {
    return request.post("/cdsw-install/api/0/app/procedureAgent/procedureAgentLeaderReview",param);
}
//提交代办信息
export function procedureAgentSubmitResult(param) {
    return request.post("/cdsw-install/api/0/app/procedureAgent/procedureAgentSubmitResult",param);
}
//查看代办进度
export function findProcedureAgentSchedule(param) {
    return request.post("/cdsw-install/api/0/app/procedureAgent/findProcedureAgentSchedule",param);
}

