/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/15
 */
import request from '../utils/request';

//获取用户基本信息
export function queryUserByToken(param) {
    return request.post("/cdsw-install-ocp/api/0/app/user/queryUserByToken",param);
}
//修改用户基本信息
export function updateUserInfo(param) {
    return request.post("/cdsw-install-ocp/api/0/app/user/update",param);
}
// 密码修改
export function updatePwd(param) {
    return request.post("/cdsw-install-ocp/api/0/app/user/updatePwd",param);
}
// 我的通知
export function myNotice(param) {
    return request.post("/cdsw-install2/api/0/app/my/myNotice",param);
}
//我的已办
export function myAlreadyDone(param) {
    return request.post("/cdsw-install2/api/0/app/my/myAlreadyDone",param);
}
