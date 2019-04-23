/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/18
 * 施工管理
 */

import request from '../utils/request';

//获得施工进度信息
export function getDetail(param) {
    return request.post("/cdsw-install/api/0/app/constructRecord/getDetail",param);
}
//保存土方量
export function saveEarthCounts(param) {
    return request.post("/cdsw-install/api/0/app/constructRecord/saveEarthCounts",param);
}
//保存施工记录
export function save(param) {
    return request.post("/cdsw-install/api/0/app/constructRecord/save",param);
}




