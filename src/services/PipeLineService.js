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



