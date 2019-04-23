/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/23
 * 审批
 */

import request from '../utils/request';
//审批列表
export function subProcessDeal(param) {
    return request.post("/cdsw-install/api/0/app/waitDeal/subProcessDeal",param);
}



