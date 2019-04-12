/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/12
 * 薪信度 接口
 */

import request from '../utils/request';
//新增薪信度
export function saveSalary(param) {
    return request.post("/cdsw-install/api/0/app/processCreditReview/start",param);
}

