/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/15
 */
import request from '../utils/request';

//获取地图信息
export function findInstallInfo(param) {
    return request.post("/cdsw-install2/api/0/app/install/findInstallInfo",param);
}

