/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 撤销流程
 */

import request from '../utils/request';
//负责人审核
export function dealManagerAudit(param) {
    return request.post("/cdsw-install2/api/0/app/customerRescind/dealManagerAudit",param);
}
//客户撤销信息
export function getRescindInfo(param) {
    return request.post("/cdsw-install2/api/0/app/customerRescind/getRescindInfo",param);
}

