/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/26
 * 撤销流程
 */

import request from '../utils/request';
//负责人审核
export function dealManagerAudit(param) {
    return request.post("/cdsw-install/api/0/app/customerRescind/dealManagerAudit",param);
}
//填写复核情况
export function dealReCheck(param) {
    return request.post("/cdsw-install/api/0/app/customerRescind/dealReCheck",param);
}
//客户撤销信息
export function getRescindInfo(param) {
    return request.post("/cdsw-install/api/0/app/customerRescind/getRescindInfo",param);
}

