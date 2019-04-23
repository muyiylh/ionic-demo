/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 咨询回复
 */

import request from '../utils/request';
//获取咨询信息
export function getDetail(param) {
    return request.post("/cdsw-install/api/0/app/consultation/getDetail",param);
}
//咨询回复
export function deal(param) {
    return request.post("/cdsw-install/api/0/app/consultation/deal",param);
}



