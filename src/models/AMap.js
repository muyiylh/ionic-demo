/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/24
 */
import {
    AMAP_POI_LOCATION_REQ,
    AMAP_POI_LOCATION_RESP,
    AMAP_POI_KEYWORDS_REQ,
    AMAP_POI_KEYWORDS_RESP
} from '../constants/ActionTypes';

import {
    getPoiByLocation,
    getPoiByKeywords
} from '../services/AMapService';

export default {
    namespace: 'amap',
    state: {
        pois: [],
        poiList: [], //关键字搜索页面数据
        loading: false
    },
    reducers: {
        setLoading(state, {loading}){
            return { ...state, loading };
        },
        [AMAP_POI_LOCATION_RESP](state, { pois }) {
            return { ...state, pois };
        },
        [AMAP_POI_KEYWORDS_RESP](state, { poiList }) {
            return { ...state, poiList };
        }
    },
    effects: {
        * [AMAP_POI_LOCATION_REQ]({ param }, { call, put, select }) {
            yield put({type: 'setLoading', loading: true});
            const {pois} = yield call(getPoiByLocation, param);
            yield put({type: AMAP_POI_LOCATION_RESP, pois});
            yield put({type: 'setLoading', loading: false});
        },
        * [AMAP_POI_KEYWORDS_REQ]({ param }, { call, put, select }) {
            yield put({type: 'setLoading', loading: true});
            const {pois} = yield call(getPoiByKeywords, param);
            yield put({type: AMAP_POI_KEYWORDS_RESP, poiList: pois});
            yield put({type: 'setLoading', loading: false});
        }
    },
}
