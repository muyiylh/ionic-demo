/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 施工合同签订
 */

import request from '../utils/request';

//提交
export function deal(param) {
    return request.post("/cdsw-install/api/0/app/contract/construction/deal",param);
}
//提交
export function getContract(param) {
    return request.post("/cdsw-install/api/0/app/contract/getContract",param);
}




