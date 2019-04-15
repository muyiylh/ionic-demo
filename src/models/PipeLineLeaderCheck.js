/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/15
 * 管道复核--领导审查
 */
import {
    LOGIN_REQ,
    LOGIN_RESP
} from '../constants/ActionTypes';

import * as PipeLineService from '../services/PipeLineService';
import {AsyncStorage} from 'react-native';
import {Toast} from '@ant-design/react-native';
import md5 from 'react-native-md5';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";


export default {
    namespace: 'pipeLineLeaderCheck',
    state: {
      loading:false,//加载提示
    },
    reducers: {
        setData(state, {data}) {
            return {...state,...data};
          },
    },
    effects: {
       
        * pipelineReviewLeaderReview({ params }, { call, put, select }) {
            Toast.loading();
           const {data, status, message} = yield call(PipeLineService.pipelineReviewLeaderReview, params);
            if(status === '0'){
                Toast.success("提交成功");
                NavigationUtil.navigate("approval");
            }else{
                Toast.fail(message);
            }

        },
    },
}
