/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/15
 * 管道复核--
 */

import request from '../utils/request';
//领导审查
export function pipelineReviewLeaderReview(param) {
    return request.post("/cdsw-install/api/0/pipelineReview/pipelineReviewLeaderReview",param);
}



