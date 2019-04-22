/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/20
 * 水表接收
 */

import request from '../utils/request';

//水表列表
export function list(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/list",param);
}
//水表类别
export function meterPandect(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/meterPandect",param);
}
//根据水表的ID查询水表详情
export function getMeterInfoById(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/getMeterInfoById",param);
}
//水表修改
export function update(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/update",param);
}
//水表复核
export function reCheck(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/reCheck",param);
}
//水表接收
export function handOver(param) {
    return request.post("/cdsw-install2/api/0/app/meterInfo/handOver",param);
}
//接收完成
export function deal(param) {
    return request.post("/cdsw-install2/api/0/app/yjlh/deal",param);
}




