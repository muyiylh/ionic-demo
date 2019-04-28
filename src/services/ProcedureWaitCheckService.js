/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 手续代办
 */

import request from '../utils/request';
//领导审查
export function procedureAgentLeaderReview(param) {
    return request.post("/cdsw-install2/api/0/app/procedureAgent/procedureAgentLeaderReview",param);
}

