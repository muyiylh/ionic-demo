import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
import { textFontSize } from '../../../../utils';
// import { connect } from 'react-redux';
import CusListItem from "../../../../component/list-item";
import moment from "moment";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 资信度信息
 * 梁丽
 * 2019-04-13
 */
const DATA = {
    name: "YYYY",
}
class PipeLineInfo extends Component {
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
    }
    render() {
        // const { data } = this.state;
        const { formData: { data } } = this.props;
        return (
            <View>
                {data.GDFHSQ && <View>
                    <View>
                        <Text style={styles.listTitle}>管道复核信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={data.GDFHSQ.applyName}>申请人:</CusListItem>
                        <CusListItem extra={moment(data.GDFHSQ.applyTime).format("YYYY-MM-DD HH:mm:ss")}>申请日期:</CusListItem>
                        <CusListItem extra={data.GDFHSQ.projectName}>项目名称:</CusListItem>
                        <CusListItem extra={data.GDFHSQ.reviewAddress}>复核地址:</CusListItem>
                        <CusListItem extra={data.GDFHSQ.applyDesc}>申请说明:</CusListItem>

                        {/* <Item extra={data.GDFHSQ.applyName} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>申请人:</Text>
                        </Item>
                        <Item extra={moment(data.GDFHSQ.applyTime).format("YYYY-MM-DD HH:mm:ss")} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>申请日期:</Text>
                        </Item>
                        <Item extra={data.GDFHSQ.projectName} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>项目名称:</Text>
                        </Item>
                        <Item extra={data.GDFHSQ.reviewAddress} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>复核地址:</Text>
                        </Item>
                        <Item extra={data.GDFHSQ.applyDesc} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>申请说明:</Text>
                        </Item> */}
                    </List>
                </View>}
                {data.GDFHLDSH && <View>
                    <View>
                        <Text style={styles.listTitle}>管道审核信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={data.GDFHLDSH.channerAuditCheck == true?"同意":"不同意"}>审核结果:</CusListItem>
                        <CusListItem extra={data.GDFHLDSH.channelExist == true?'已有管道':'在建管道'}>管道情况:</CusListItem>
                        <CusListItem extra={data.GDFHLDSH.reviewDesc}>审核说明:</CusListItem>

                        {/* <Item extra={data.GDFHLDSH.channerAuditCheck} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>审核结果:</Text>
                        </Item>
                        <Item extra={data.GDFHLDSH.channelExist} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>管道情况:</Text>
                        </Item>
                        <Item extra={data.GDFHLDSH.reviewDesc} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>审核说明:</Text>
                        </Item> */}
                    </List>
                </View>}
                {data.GDFHAKFHJJGC && <View>
                    <View>
                        <Text style={styles.listTitle}>管道复核结果</Text>
                    </View>
                    <List>
                        <CusListItem extra={data.GDFHAKFHJJGC.auditResult == true?'存在管网':'不存在管网'}>复核结果:</CusListItem>
                        <CusListItem extra={data.GDFHAKFHJJGC.reviewPersionName}>复核人:</CusListItem>
                        <CusListItem extra={moment(data.GDFHAKFHJJGC.reviewTime.reviewTime).format("YYYY-MM-DD HH:mm:ss")}>复核时间:</CusListItem>
                        <CusListItem extra={data.GDFHAKFHJJGC.reviewDesc}>复核说明:</CusListItem>

                        {/* <Item extra={data.GDFHAKFHJJGC.auditResult} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>复核结果:</Text>
                        </Item>
                        <Item extra={data.GDFHAKFHJJGC.reviewPersionName} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>复核人:</Text>
                        </Item>
                        <Item extra={moment(data.GDFHAKFHJJGC.reviewTime.reviewTime).format("YYYY-MM-DD HH:mm:ss")} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>复核时间:</Text>
                        </Item>
                        <Item extra={data.GDFHAKFHJJGC.reviewDesc} arrow="empty" style={textFontSize()}>
                            <Text style={textFontSize()}>复核说明:</Text>
                        </Item> */}
                    </List>
                </View>}
                
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
    const {formData, index} = state;
    return {formData, index}
}
export default connect(mapStateToProps)(PipeLineInfo);