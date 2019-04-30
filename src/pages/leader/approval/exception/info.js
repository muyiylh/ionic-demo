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


class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        // const params = {
        //     id: info.id,
        // }
        // dispatch({
        //     type: `formData/getFormData`,
        //     params
        // })
    }

    render() {
        // const { formData: { data }, type } = this.props;
        const info = this.props.navigation.state.params.info;
        const { data, lastNodeFlag, } = this.props;
        const BMSHData = data.BMSH?data.BMSH[data.BMSH.length - 1]:{};
        const files = data.YCSQ && data.YCSQ.files?fileText(data.YCSQ.files):'';
        const files2 = data.JBRTXJG && data.JBRTXJG.files?fileText(data.JBRTXJG.files):'';
        console.log("data--------",data);
        return (
            <View>
                {data.YCSQ && <View>
                    <List renderHeader="异常申请信息">
                        <CusListItem extra={data.YCSQ.installNo}>报装号:</CusListItem>
                        <CusListItem extra={data.YCSQ.projectName}>项目名称:</CusListItem>
                        <CusListItem extra={data.YCSQ.unitName}>单位名称:</CusListItem>
                        <CusListItem extra={data.YCSQ.waterAddress}>用水地址:</CusListItem>
                        <CusListItem extra={data.YCSQ.taskName}>发起环节:</CusListItem>
                        <CusListItem extra={data.YCSQ.reason}>异常说明:</CusListItem>
                        <CusListItem extra={ files }>报装用户证明文件:</CusListItem>
                    </List>
                </View>}
                {BMSHData && info.nodeFlag=="JBRTXYJ" && lastNodeFlag == 'BMSH' &&<View>
                    <List renderHeader="部门审核信息">
                        <CusListItem extra={BMSHData.reviewResult==0?'同意列为异常':'不需要作为异常'}>审核意见:</CusListItem>
                        <CusListItem extra={BMSHData.selfDept==0?'本部门负责处置':'其他责任部门处置'}>处置部门:</CusListItem>
                        <CusListItem extra={BMSHData.appointUser}>处置人员:</CusListItem>
                    </List>
                </View>}
                {BMSHData && info.nodeFlag=="CZBMSH" && lastNodeFlag == 'BMSH' &&<View>
                    <List renderHeader="部门审核信息">
                        <CusListItem extra={BMSHData.reviewResult==0?'同意列为异常':'不需要作为异常'}>审核意见:</CusListItem>
                        <CusListItem extra={BMSHData.selfDept==0?'本部门负责处置':'其他责任部门处置'}>处置部门:</CusListItem>
                    </List>
                </View>}
                {data.JBRTXYJ && info.nodeFlag=="BMSH" && lastNodeFlag == 'JBRTXYJ' &&<View>
                    <List renderHeader="经办人填写意见信息">
                        <CusListItem extra={data.JBRTXYJ.reviewResultDesc}>处置意见:</CusListItem>
                    </List>
                </View>}
                {BMSHData && info.nodeFlag=="JBRTXJG" && lastNodeFlag == 'BMSH' &&<View>
                    <List renderHeader="部门审核信息">
                        <CusListItem extra={BMSHData.reviewResult==0?'同意按处置意见处置':'不同意处置意见'}>处置意见审核:</CusListItem>
                        <CusListItem extra={BMSHData.reviewResultDesc}>处置意见:</CusListItem>
                    </List>
                </View>}
                {data.JBRTXJG && info.nodeFlag=="BMSH" && lastNodeFlag == 'JBRTXJG' &&<View>
                    <List renderHeader="经办人填写结果信息">
                        <CusListItem extra={data.JBRTXJG.reviewResultDesc}>处置意见审核:</CusListItem>
                        <CusListItem extra={files2}>相关文件:</CusListItem>
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
export default connect(mapStateToProps)(Info);