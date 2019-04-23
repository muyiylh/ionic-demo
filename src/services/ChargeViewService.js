/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 缴纳工程款
 */

import request from '../utils/request';

//提交
export function saveChargeInfo(param) {
    return request.post("/cdsw-install/api/0/app/chargeFee/saveChargeInfo",param);
}




