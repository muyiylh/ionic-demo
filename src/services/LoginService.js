/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import request from '../utils/request';

export function login(param) {
    return request.post("/cdsw-install-ocp/system/0/app/admin/login",param);
}
export function loginByPhone(param) {
    return request.post("/cdsw-install/system/0/common/loginApp",param);
    //return request.post("/cdsw-install-ocp/system/0/admin/login",param);
}
