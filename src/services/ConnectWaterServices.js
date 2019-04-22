/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/19
 * 通水
 */

import request from '../utils/request';

//通水列表
export function list(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/list",param);
}
//批量通水
export function batchWater(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/batchWater",param);
}
//通水完成
export function deal(param) {
    return request.post("/cdsw-install2/api/0/app/tx/deal",param);
}




