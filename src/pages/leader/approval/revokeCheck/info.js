import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize } from '../../../../utils/index';
import CusListItem from "../../../../component/list-item";
import moment from "moment";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 撤销信息
 * 梁丽
 * 2019-04-26
 */
const DATA = {
    name: "YYYY",
}
class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: DATA,
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
        dispatch({
            type: `revoke/getRescindInfo`,
            params: {installId: info.installId},
        })
    }
    render() {
        // const { data } = this.state;
        const { formData: { data }, revoke: { data: revokeInfo } } = this.props;
        const files = data.TXFHQK && data.TXFHQK.files?fileText(data.TXFHQK.files):'';
        return (
            <View>
                {data.CXSQ &&
                    <List renderHeader="客户撤销申请信息">
                        <CusListItem extra={data.CXSQ.communication}>沟通情况:</CusListItem>

                    </List>
                }
                {revokeInfo && revokeInfo.rescindReason &&
                    <List renderHeader="客户撤销信息">
                        <CusListItem extra={revokeInfo.rescindReason}>撤销原因:</CusListItem>
                        <CusListItem extra={revokeInfo.handleReason}>办理原因:</CusListItem>

                    </List>
                }
                {data.TXFHQK &&
                    <List renderHeader="复核情况">
                        <CusListItem extra={data.TXFHQK.reviewResultDesc}>处理意见:</CusListItem>
                        <CusListItem extra={data.TXFHQK.solveWaterDescription}>解决用水需求说明:</CusListItem>
                        <CusListItem extra={data.TXFHQK.solveWaterNeedFlag == 0?'已解决':'未解决'}>是否已解决用水需求:</CusListItem>
                        <CusListItem extra={data.TXFHQK.solveWaterNeedWay}>解决用水需求方法:</CusListItem>
                        <CusListItem extra={data.TXFHQK.waterNeedFlag == 0?'没有':'有'}>是否还有用水需求:</CusListItem>
                        <CusListItem extra={data.TXFHQK.waterNeedDescription}>是否还有用水需求情况详细说明:</CusListItem>
                        <CusListItem extra={files}>设计文件:</CusListItem>

                    </List>
                }
                
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
});
function mapStateToProps(state) {
    const {formData, revoke, index} = state;
    return {formData, revoke, index}
}
export default connect(mapStateToProps)(Info);