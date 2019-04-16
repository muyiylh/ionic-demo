import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
import ImageView from '../../../../component/image-view';
import { connect } from '../../../../utils/dva';
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
        {fileName: "文件1",filePath: "jpg/1904/13/884232220573831168.jpg"},
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
    componentDidMount() {
        const { dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `formData/getFormData`,
            params
        })
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
        const { images } = this.state;
        const { formData: { data } } = this.props;
        let _data = JSON.parse(JSON.stringify(data));
        _data.SBZXDWT = data.SBZXDWT1 && data.SBZXDWT2;
        console.log("data--------",data);
        return (
            <View>
                {_data.SBZXDWT && <View>
                    <View>
                        <Text style={styles.listTitle}>资信度信息</Text>
                    </View>
                    <List>
                        <Item extra={_data.SBZXDWT.clientName} arrow="empty">
                            客户名称:
                        </Item>
                        <Item extra={_data.SBZXDWT.levelClass} arrow="empty">
                            资信度等级:
                        </Item>
                        <Item extra={_data.SBZXDWT.reportUnit} arrow="empty">
                            上报单位:
                        </Item>
                        <Item extra={_data.SBZXDWT.reportUserName} arrow="empty">
                            上报人员:
                        </Item>
                        <Item extra={_data.SBZXDWT.reportTime} arrow="empty">
                            上报时间:
                        </Item>
                        <Item extra={_data.SBZXDWT.proDesc} arrow="empty">
                            问题描述:
                        </Item>
                        <Item extra={_data.SBZXDWT.levelDesc} arrow="empty">
                            等级设定说明:
                        </Item>
                        <Item extra={this.fileText(_data.SBZXDWT.files)} arrow="empty" onPress={this.open}>
                            附件内容:
                        </Item>
                    </List>
                </View>}
                {_data.BMLDSH && _data.BMLDSH.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>部门领导审核信息</Text>
                    </View>
                    {_data.BMLDSH.map((item)=>{
                        return(
                            <List>
                                <Item extra={item.reviewResult} arrow="empty">
                                    审核意见:
                                </Item>
                                <Item extra={item.reviewResultDesc} arrow="empty">
                                    审核说明:
                                </Item>
                            </List>
                        )
                    })}
                </View>:<Text></Text>}
                {_data.BMSJLDSH1 && _data.BMSJLDSH1.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>部门上级领导审核信息</Text>
                    </View>
                    {
                        _data.BMSJLDSH1.map((item)=>{
                            return(
                                <List style={styles.list}>
                                    <Item extra={item.reviewResult} arrow="empty">
                                        审核意见:
                                    </Item>
                                    <Item extra={item.reviewResultDesc} arrow="empty">
                                        审核说明:
                                    </Item>
                                </List>
                            )
                        })
                    }
                </View>:<Text></Text>}
                {_data.FGFZSH1 && _data.FGFZSH1.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>分管副总审核信息</Text>
                    </View>
                    {_data.FGFZSH1.map((item)=>{
                        return(
                            <List>
                                <Item extra={item.reviewResult} arrow="empty">
                                    审核意见:
                                </Item>
                                <Item extra={item.reviewResultDesc} arrow="empty">
                                    审核说明:
                                </Item>
                            </List>
                        )
                    })}
                    
                </View>:<Text></Text>}
                {_data.ZJLSH1 && _data.ZJLSH1.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>总经理审核信息</Text>
                    </View>
                    {_data.ZJLSH1.map(()=>{
                        return(
                            <List>
                                <Item extra={_data.ZJLSH1.reviewResult} arrow="empty">
                                    审核意见:
                                </Item>
                                <Item extra={_data.ZJLSH1.reviewResultDesc} arrow="empty">
                                    审核说明:
                                </Item>
                            </List>
                        )
                        })}
                </View>:<Text></Text>}
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
    list: {
        borderBottomWidth: 2,
        borderBottomColor: '#dede34',
    },
});
// export default CreditInfo;
function mapStateToProps(state) {
    const {formData, index} = state;
    return {formData, index}
}
export default connect(mapStateToProps)(CreditInfo);