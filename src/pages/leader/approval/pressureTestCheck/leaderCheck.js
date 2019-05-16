import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import moment from "moment";
import SelectItem from '../../../../component/select-item';
import { connect } from '../../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import CusListItem from "../../../../component/list-item";
import CusInputItem from "../../../../component/input-item";
import FileItem from "../../../../component/file-item";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 测压申请-部门领导人审核
 * 梁丽
 * 2019-04-15
 */
const resultList = [
    {label: "同意", value: 'true'},
    {label: "不同意", value: 'false'},
]
class LeaderCheck extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.state.params.info;
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', info.taskName),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={submit}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit})
        const info = this.props.navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `formData/getFormData`,
            params
        })
    }
    //提交信息
    submit = () => {
        const { form, dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    installId: info.installId,
                    installNo: info.installNo,
                    waitId: info.id,
                }
                switch (info.nodeFlag) {
                    case 'CYLDSH'://领导审核
                        dispatch({
                            type: `pressureTest/leaderReview`,
                            params
                        })
                        break;
                    case 'CYJLJG'://记录测压结果
                        dispatch({
                            type: `pressureTest/recordResult`,
                            params
                        })
                        break;
                
                    default:
                        break;
                }
                
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formData: { data } } = this.props;
        const info = this.props.navigation.state.params.info;
        return (
            <ScrollView style={styles.projectPage}>
                {/* 测压领导审核 */}
                { info.nodeFlag == "CYLDSH" && <List>
                    {
                        getFieldDecorator('agree',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择审核意见'}
                            ]
                        })(
                            <SelectItem data={resultList} require="true">审核意见:</SelectItem>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核说明:</Text></Item>
                    {
                        getFieldDecorator('reviewDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入审核说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入审核说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    
                </List>}
                {/* 记录测压结果 */}
                { info.nodeFlag == "CYJLJG" && <List>
                    {
                        getFieldDecorator('checkPlace',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入测压地点'}
                            ]
                        })(
                            <CusInputItem require="true">测压地点:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('checkValue',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入测压值'},
                                {pattern:/^\d*$/, message:'测压值为数值'},
                            ]
                        })(
                            <CusInputItem require="true" extra="MPa">测压值:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('checkName',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入测压人'}
                            ]
                        })(
                            <CusInputItem require="true">测压人:</CusInputItem>
                        )
                    }
                    {  
                        getFieldDecorator('applyTime',{
                            validateFirst: true,
                            initialValue: new Date(),
                            rules:[
                                {required:true, message:'请选择测压日期'}
                            ]
                        })(
                            <DatePicker
                                mode="date"
                                minDate={new Date()}
                                // maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChange}
                                format="YYYY-MM-DD"
                                style={textFontSize()}
                                >
                                <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>测压日期:</Text></Item>
                            </DatePicker>
                        )
                    }
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入上传文件'}
                            ]
                        })(
                            <FileItem title="上传附件"/>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>测压说明:</Text></Item>
                    {
                        getFieldDecorator('checkDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入测压说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入测压说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    
                    
                </List>}
                <List renderHeader="申请信息">
                    <CusListItem extra={data.CYSQ?data.CYSQ.applyName:''}>申请人:</CusListItem>
                    <CusListItem extra={data.CYSQ?moment(data.CYSQ.applyTime).format("YYYY-MM-DD HH:mm:ss"):''}>申请日期:</CusListItem>
                    <CusListItem extra={data.CYSQ?data.CYSQ.checkPlace:''}>测压地点:</CusListItem>
                    <CusListItem extra={data.CYSQ?data.CYSQ.contactName:''}>联系人:</CusListItem>
                    <CusListItem extra={data.CYSQ?data.CYSQ.contactTel:''}>联系方式:</CusListItem>
                    <CusListItem extra={data.CYSQ?data.CYSQ.reason:''}>申请原因:</CusListItem>
                </List>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    require:{
        color:"#ff5151"
    }
});
function mapStateToProps(state) {
    const {pressureTest, formData, index} = state;
    return {pressureTest,formData,  index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);