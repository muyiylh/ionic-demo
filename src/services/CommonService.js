/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import request from '../utils/request';

/**
 * 获取系统配置参数
 * @param param {className: string}
 * @param loading
 * @returns {*|Promise}
 */
export function queryConfigParam(param, loading) {
    if(loading){
        return request.post("/cdsw-install/api/0/configParam/queryConfigParams",param);
    }else{
        return request.unLoadPost("/cdsw-install/api/0/configParam/queryConfigParams",param);
    }

}

/**
 * 获取手机验证码
 * @param userPhone
 * @returns {*|Promise}
 */
export function getPhoneValid(userPhone) {
    const param = {userPhone, smsName: 'APP登录短信验证码模板'};
    return request.unLoadPost("/cdsw-install/system/0/common/sendVerificationCode",param);
}
/**
 * 通过报装号获取手机验证码
 * http://192.168.30.167:10103/cdsw-install/system/0/common/sendVeriCodeByInstallNo
 * @param installNo
 * @returns {*|Promise}
 */
export function getPhoneValidByInstallNo(installNo) {
    const param = {installNo, smsName: 'APP登录短信验证码模板'};
    return request.unLoadPost("/cdsw-install/system/0/common/sendVeriCodeByInstallNo",param);
}

/**
 * 验证报装号和手机号是否一至
 * POST /system/0/common/veriInstallNoAndVeriCode
 * @param param
 * @returns {*|Promise}
 */
export function veriInstallNoAndVeriCode(param) {
    return request.unLoadPost("/cdsw-install/system/0/common/veriInstallNoAndVeriCode",param);
}
