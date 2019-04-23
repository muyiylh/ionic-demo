/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 预算编制
 */

import request from '../utils/request';
//设计信息
export function getByInstallId(param) {
    return request.post("/cdsw-install2/api/0/design/getByInstallId",param);
}
//提交预算
export function saveProcesBudget(param) {
    return request.post("/cdsw-install2/api/0/app/processBudget/saveProcesBudget",param);
}




