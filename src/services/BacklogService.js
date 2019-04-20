/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 代办
 */

import request from '../utils/request';
//获取待办列表
export function nomalDeal(param) {
    console.log("param-------",param);
    return request.post("/cdsw-install/api/0/app/waitDeal/nomalDeal",param);
}



