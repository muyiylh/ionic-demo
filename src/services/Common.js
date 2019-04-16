/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/15
 * 公共的请求
 */

import request from '../utils/request';
//获取表单信息
export function getFormData(param) {
    console.log("param-------",param);
    return request.post("/cdsw-install/api/0/app/waitDeal/getFormData",param);
}



