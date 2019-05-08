import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
import { fileText } from '../../../../utils/index';
import { textFontSize } from '../../../../utils';
// import { connect } from 'react-redux';
import CusListItem from "../../../../component/list-item";
import moment from "moment";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 现场整改---整体验收结论
 * 梁丽
 * 2019-05-07
 */

class Require extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        // const info = this.props.navigation.state.params.info;
        // const params = {
        //     id: info.id,
        // }
        // dispatch({
        //     type: `formData/getFormData`,
        //     params
        // })
    }
    render() {
        // const { data } = this.state;
        const { formData: { data } } = this.props;
        const ZGYQ = data.ZGYQ?data.ZGYQ[data.ZGYQ.length-1]:{};
        const files = ZGYQ && ZGYQ.fileList?fileText(ZGYQ.fileList):'';
        return (
            <View>
                {ZGYQ && 
                    <List renderHeader="整体验收结论">
                        <CusListItem extra={ZGYQ.checkResult == 0?'合格':'不合格'}>验收结果:</CusListItem>
                        <CusListItem extra={ZGYQ.formBy}>验收人:</CusListItem>
                        <CusListItem extra={moment(ZGYQ.checkDate).format("YYYY-MM-DD HH:mm:ss")}>验收日期:</CusListItem>
                        <CusListItem extra={files}>验收文件:</CusListItem>
                        <CusListItem extra={ZGYQ.checkRemark}>整改说明:</CusListItem>
                        <CusListItem extra={ZGYQ.reformRequire}>整改要求:</CusListItem>
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
    const {formData, index} = state;
    return {formData, index}
}
export default connect(mapStateToProps)(Require);