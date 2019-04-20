/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 报装受理
 */

import request from '../utils/request';
//提交踏勘信息
export function saveBindWorkFlow(param) {
    console.log("param-------",param);
    return request.post("/cdsw-install/api/0/exploration/saveBindWorkFlow",param);
}



