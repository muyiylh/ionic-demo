/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/16
 * 报装受理
 */

import request from '../utils/request';
//报装信息
export function getInstallInfoById(param) {
    return request.post("/cdsw-install/api/0/app/install/getInstallInfoById",param);
}
//生成报装号
export function createInstallNo(param) {
    return request.post("/cdsw-install/api/0/app/install/createInstallNo",param);
}
//报装受理
export function offLineApply(param) {
    return request.post("/cdsw-install/api/0/app/install/offLineApply",param);
}



