/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/28
 */
import {NativeModules} from 'react-native'

const ImagePicker = NativeModules.ImageCropPicker;
/**
 * 多文件选择
 */
const openMultFile = () => {
    return ImagePicker.openPicker({
        multiple: true,
        includeBase64: true
    }).catch(e => alert(e));
};
/**
 * 相册拍照
 * @returns {Promise.<TResult>}
 */
const openCameraFile = () => {
    return ImagePicker.openCamera({
        includeBase64: true
    }).catch(e => alert(e));
};

export default {
    openMultFile,
    openCameraFile
}