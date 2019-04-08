/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/2/14
 */
import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native';
import ChooseFile from './choose-file';
import {scaleSize} from '../utils/ScreenUtil';
import {ImagePicker, ActionSheet} from '@ant-design/react-native'
import request from '../utils/request';
import {uploadUrl} from "../utils/config";

class ImageItem extends React.Component{
    static propTypes = {
        title: PropTypes.string,
        subTitle: PropTypes.string,
        value: PropTypes.array,
        onChange: PropTypes.func
    };
    constructor(props){
        super(props);
        this.state = {
            images: [],
        }
    }
    showActionSheet = () => {
        const BUTTONS = [
            '相机',
            '文件管理',
            '关闭',
        ];
        ActionSheet.showActionSheetWithOptions(
            {
                title: '选择文件',
                message: '',
                options: BUTTONS,
                cancelButtonIndex: 2,
                destructiveButtonIndex: 2,
            },
            buttonIndex => {
                switch (buttonIndex){
                    case 0:
                        this.onCameraFile();
                        break;
                    case 1:
                        this.onOpenMultFile();
                        break;
                }
            }
        );
    };
    doUploads = async (files:Array) => {

        const url = `${uploadUrl}api/0/cloud/disk/fileUpload/upload`;
        const p = files.map(file =>{
            return request.upload(url,file.path);
        });
        const result = await Promise.all(p);
        console.log('doUploads', result);
        const {images} = this.state;
        const {onChange} = this.props;
        const imgs = [...images, ...result];
        this.setState({images: imgs});
        onChange && onChange(imgs);
    };
    /**
     * 打开文件管理选择图片
     * @returns {Promise.<void>}
     */
    onOpenMultFile = async()=>{
        const files = await ChooseFile.openMultFile();
        if(files instanceof Array){
            this.doUploads(files);
        }
    };
    onCameraFile = async() => {
        const file = await ChooseFile.openCameraFile();
        if(file instanceof Object){
            this.doUploads([file]);
        }
    };
    onChooseImage = async() => {
        this.showActionSheet();
    };
    onFilesChange = (files: Object, operationType: string, index: number) => {
        console.log('onFilesChange', files);
        this.setState({images:files});
        const {onChange} = this.props;
        onChange && onChange(files);
    };
    render(){
        const {images} = this.state;
        return (
            <View style={styles.container}>
                <ImagePicker
                    files={images}
                    onChange={this.onFilesChange}
                    onImageClick={()=>{}}
                    onAddImageClick={this.onChooseImage}
                    selectable={true}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: scaleSize(10)
    },
});
export default ImageItem;


