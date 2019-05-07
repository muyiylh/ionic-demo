import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
import moment from "moment";
import ImageView from '../../../../component/image-view';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize } from '../../../../utils/index';
import CusListItem from "../../../../component/list-item";
const Item = List.Item;
const Brief = Item.Brief;
const screenHeight = Dimensions.get("window").height;
/**
 * 信息
 * 梁丽
 * 2019-04-29
 */


class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        console.log("info-----------",info)
        const params = {
            installNo: info.installNo,
            waitId: info.id,
        }
        dispatch({
            type: `projectCheck/getInfoByInstall`,
            params,
        })
    }

    render() {
        const { info: data } = this.props.projectCheck;
        return (
            <View>
                <List renderHeader="验收基本信息">
                    <CusListItem extra={data.installNo}>报装号:</CusListItem>
                    <CusListItem extra={data.projectName}>项目名称:</CusListItem>
                    <CusListItem extra={data.waterAddress}>用水地址:</CusListItem>
                    <CusListItem extra={data.projectTypeName}>工程类别:</CusListItem>
                    <CusListItem extra={data.waterAddress}>进场时间:</CusListItem>
                    <CusListItem extra={moment(data.checkTime).format("YYYY-MM-DD")}>验收申请日期:</CusListItem>
                    <CusListItem extra={data.contacts}>现场联系人:</CusListItem>
                    <CusListItem extra={data.mobile}>联系方式:</CusListItem>
                    <CusListItem extra={data.checkType == 0?'整体验收':'分段验收'}>验收方式:</CusListItem>
                    {data.checkType == 1 && <View>
                        <CusListItem extra={data.partName}>分段名称:</CusListItem>
                        <CusListItem extra={data.isFinal}>本次为最终阶段验收:</CusListItem>
                    </View>}
                    <CusListItem extra={data.startDept == 'ak'?'安科工程':'管网单位'}>发起单位:</CusListItem>
                </List>
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
    const {formData, projectCheck, index} = state;
    return {formData, projectCheck, index}
}
export default connect(mapStateToProps)(Info);