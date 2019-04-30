import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace, Toast} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
const Item = List.Item;
const Brief = Item.Brief;
const screenHeight = Dimensions.get("window").height;
/**
 * 图片查看
 * 梁丽
 * 2019-04-13
 */

class ImageView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            animating: true,
            index: 0,
            images: [],//[{url:''}],图片路径对象数组
        }
        // this.savePhoto = this.savePhoto.bind(this);
    }
    componentDidMount(){
        this.props.onRef(this);
        const { images } = this.props;
        if(images && Array.isArray(images)){
            let img = [];
            images.map((item)=>{
                img.push({url:item.filePath});
            })
            this.setState({images:img});
        }
    }
    
    //查看图片
    open = () => {
        const { images } = this.props;
        if(images && Array.isArray(images) && images.length>0){
            this.setState({visible: true});
        }else{
            Toast.info("没有图片可查看");
        }
    }
    close = () => {
        this.setState({visible: false});
    }
    onChange = (index) => {
        this.setState({index})
    }
    // renderLoad() { //这里是写的一个loading
    //     return (
    //         <View style={{ marginTop: (screenHeight / 2) - 20 }}>
    //             <ActivityIndicator animating={this.state.animating} size={"large"} />
    //         </View>
    //     )
    // }
    savePhoto() {
        let androidDownPath = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
        let { index } = this.state;
        // let url = this.props.images[index].url;
        let url = this.state.images[index].url;
        if (Platform.OS === 'ios') {  //ios图片保存
            let promise = CameraRoll.saveToCameraRoll(url);
            promise.then(function (result) {
                alert("已保存到系统相册")
            }).catch(function (error) {
                alert('保存失败！\n' + error);
            });
        } else {  //Android  先下载到本地
            let DownloadFileOptions = {
                fromUrl: url,          //下载路径
                toFile: androidDownPath     // Local filesystem path to save the file to
            }
            try{
                let result = RNFS.downloadFile(DownloadFileOptions);
                let _this = this;
                result.promise.then(function (val) {
                    let promise = CameraRoll.saveToCameraRoll(androidDownPath);
                    promise.then(function (result) {
                        // console.error(JSON.stringify(result))
                        alert("已保存到系统相册")
                    }).catch(function (error) {
                        alert('保存失败！\n' + error);
                    });

                }, function (val) {
                    console.log('Error Result:' + JSON.stringify(val));
                }
                ).catch(function (error) {
                    console.log(error.message);
                });
            }catch(e){
                console.error(e);
            }
            
        }
    }
    render() {
        // const { images } = this.props;
        const { visible, index, images } = this.state;
        return (
            <Modal visible={visible} transparent={true} onRequestClose={this.close}>
                <View style={{ flex: 1 }}>
                    <ImageViewer 
                    imageUrls={images}
                    enableSwipeDown={true}
                    onCancel={this.close}
                    menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                    index={index}
                    onChange={this.onChange}
                    failImageSource={{
                        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                    // loadingRender={this.renderLoad}
                    onSave={(url) => { this.savePhoto(url) }}
                    />
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    listTitle: {
        padding: 10,
    },
    img: {
        width: 500,
        height: 500,
    }
});
export default ImageView;