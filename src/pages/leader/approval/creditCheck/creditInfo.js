import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { FILE_URL } from '../../../../utils/config';
import RNFS from 'react-native-fs';
import ImageView from '../../../../component/image-view';
const Item = List.Item;
const Brief = Item.Brief;
const screenHeight = Dimensions.get("window").height;
/**
 * 资信度信息
 * 梁丽
 * 2019-04-13
 */
const DATA = {
    name: "YYYY",
    files: [
        {fileName: "文件1",filePath: FILE_URL+"jpg/1904/13/884232220573831168.jpg"},
    ],
}
const IMAGES = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
  },
];

class CreditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: DATA,
            images: IMAGES,
        }
    }
    //
    fileText = (files) => {
        return(
            files.map((item)=>{
                return (
                    <Text>{item.fileName},</Text>
                )
            })
        )
    }
    onRef = (ref) => {
        this.child = ref
    }
    //查看图片
    open = () => {
        this.child.open()
    }
    render() {
        const { data, images } = this.state;
        return (
            <View>
                <View>
                    <Text style={styles.listTitle}>资信度信息</Text>
                </View>
                <List>
                    <Item extra={data.name} arrow="empty">
                        客户名称:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                        资信度等级:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                        上报单位:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                        上报人员:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                        上报时间:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                        问题描述:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                        等级设定说明:
                    </Item>
                    <Item extra={this.fileText(data.files)} arrow="empty" onPress={this.open}>
                        附件内容:
                    </Item>
                </List>
                <ImageView onRef={this.onRef} images={images}></ImageView>
            </View>
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
export default CreditInfo;