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
