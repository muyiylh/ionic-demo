/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import request from '../utils/amap';

/**
 * 通过坐标
 * @param param
 * @returns {*}
 */
export function getPoiByLocation(param) {
    let p = '';
    for (const key in param){
        p += `${key}=${param[key]}&`
    }
    return request.get(`place/around?${p}`);
}

/**
 * 通过关键字
 * @param param
 * @returns {*}
 */
export function getPoiByKeywords(param) {
    let p = '';
    for (const key in param){
        p += `${key}=${param[key]}&`
    }
    return request.get(`place/text?${p}`);
}
