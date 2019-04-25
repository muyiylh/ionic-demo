/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/24
 * 测压申请
 */

import request from '../utils/request';
//领导审查
export function leaderReview(param) {
    return request.post("/cdsw-install2/api/0/app/checkPressure/leaderReview",param);
}

