/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/05/07
 * 整改子流程
 */

import request from '../utils/request';
//现场审核
export function dealXCSH(param) {
    return request.post("/cdsw-install/api/0/app/rectification/dealXCSH",param);
}
//现场整改
export function dealXCZG(param) {
    return request.post("/cdsw-install/api/0/app/rectification/dealXCZG",param);
}
//保存验收结论并发起整改子流程
export function rectification(param) {
    return request.post("/cdsw-install/api/0/app/rectification/rectification",param);
}

