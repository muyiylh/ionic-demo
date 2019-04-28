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
 * 2019-04-28
 */


class CreditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
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
        const { formData: { data }, type } = this.props;
        const files = data.SQZTBZ && data.SQZTBZ.installUserProveFiles?fileText(data.SQZTBZ.installUserProveFiles):'';
        console.log("data--------",data);
        return (
            <View>
                {data.SQZTBZ && <View>
                    <View>
                        <Text style={styles.listTitle}>暂停申请信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={data.SQZTBZ.installNo}>报装号:</CusListItem>
                        <CusListItem extra={data.SQZTBZ.projectName}>项目名称:</CusListItem>
                        <CusListItem extra={data.SQZTBZ.unitName}>单位名称:</CusListItem>
                        <CusListItem extra={data.SQZTBZ.taskName}>发起环节:</CusListItem>
                        <CusListItem extra={data.SQZTBZ.applyDept}>申请部门:</CusListItem>
                        <CusListItem extra={moment(data.SQZTBZ.applyDate).format("YYYY-MM-DD")}>申请日期:</CusListItem>
                        <CusListItem extra={data.SQZTBZ.creatName}>申请人:</CusListItem>
                        <CusListItem extra={data.SQZTBZ.reason}>暂停说明:</CusListItem>
                        <CusListItem extra={ files }>报装用户证明文件:</CusListItem>
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