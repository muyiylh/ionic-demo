/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/24
 * 设计文件
 */

import request from '../utils/request';
//设计文件---审核流程---部门领导审核
export function dealBMLDSHConfirm(param) {
    return request.post("/cdsw-install/api/0/app/processDesignDocConfirm/dealBMLDSH",param);
}
//设计文件---修改流程---部门领导审核
export function dealBMLDSHModify(param) {
    return request.post("/cdsw-install/api/0/app/processDesignDocModify/dealBMLDSH",param);
}
//设计文件---修改流程---设计部门领导审核
export function dealSJDWLDSH(param) {
    return request.post("/cdsw-install/api/0/app/processDesignDocModify/dealSJDWLDSH",param);
}

