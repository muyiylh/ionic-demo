/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 竣工归档
 */

import request from '../utils/request';

//完成
export function add(param) {
    return request.post("/cdsw-install/api/0/app/completion/add",param);
}
//获得施工进度信息
export function getArchiving(param) {
    return request.post("/cdsw-install/api/0/app/completion/getArchiving",param);
}
//整体竣工归档
export function overallCompletion(param) {
    return request.post("/cdsw-install/api/0/app/completion/overallCompletion",param);
}




