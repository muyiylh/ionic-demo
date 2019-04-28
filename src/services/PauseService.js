/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/28
 * 客户暂停
 */

import request from '../utils/request';
//领导审查
export function dealDeptCheck(param) {
    return request.post("/cdsw-install2/api/0/app/customerPause/dealDeptCheck",param);
}
