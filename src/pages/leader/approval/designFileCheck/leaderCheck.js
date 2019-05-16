import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import DesignInfo from './info';
import { connect } from '../../../../utils/dva';
import CusInputItem from "../../../../component/input-item";
import FileItem from '../../../../component/file-item';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 设计文件-确认部门领导人审核，修改领导审核，修改设计部门领导审核
 * 梁丽
 * 2019-04-17
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
const resultList2 = [
    {label: "会影响预算", value: 1},
    {label: "不影响预算", value: 0},
]
class LeaderCheck extends Component {
    static navigationOptions = ({ navigation }) => {
        const submit = navigation.getParam("submit");
        const info = navigation.state.params.info;
        // let title = '';
        // if(info.nodeFlag == 'DDCBMLDSH'){//确认领导审核
        //     title = '设计文件确认审核';
        // }else{
        //     title = '设计文件修改领导审核'
        // }
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
        navigation.setParams({submit: this.submit});
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
                    waitId: info.id,
                }
                switch (info.nodeFlag) {
                    case 'DDCBMLDSH'://确认审核
                        dispatch({
                            type: `designFileCheck/dealBMLDSHConfirm`,
                            params
                        })
                        break;
                    case 'DDMBMLDSH'://修改部门领导审核
                        dispatch({
                            type: `designFileCheck/dealBMLDSHModify`,
                            params
                        })
                        break;
                    case 'SJDWLDSH'://修改部门设计单位领导审核
                        dispatch({
                            type: `designFileCheck/dealSJDWLDSH`,
                            params
                        })
                        break;
                    case 'SJRYXG'://设计人员修改
                        dispatch({
                            type: `designFileCheck/dealSJRYXG`,
                            params
                        })
                        break;
                    case 'FQXGSQ'://修改申请发起
                        dispatch({
                            type: `designFileCheck/dealFQXGSQ`,
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
        const info = this.props.navigation.state.params.info;
        const nodeFlag = info.nodeFlag;
        const { formData: { data } } = this.props;
        const FQXGSQ = data.FQXGSQ || {};
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    {/* 审核 */}
                    {nodeFlag=="DDCBMLDSH" || nodeFlag=="DDMBMLDSH" || nodeFlag=="SJDWLDSH"?
                    <List renderHeader="审核信息">
                        {
                            getFieldDecorator('reviewResult',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择审核结果'}
                                ]
                            })(
                                <SelectItem data={resultList} require="true">审核结果:</SelectItem>
                                )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>受理描述说明:</Text></Item>
                        {
                            getFieldDecorator('reviewResultDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入受理描述说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入受理描述说明" rows={3} count={300} style={textFontSize()}/>
                                )
                            }
                        
                    </List>:null}
                    {/* 设计人员修改 */}
                    {nodeFlag=="SJRYXG" &&
                    <List>
                        {
                            getFieldDecorator('files',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请上传设计文件'}
                                ]
                            })(
                                <FileItem title="设计文件"/>
                                )
                            }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>设计修改说明:</Text></Item>
                        {
                            getFieldDecorator('description',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入设计修改说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入设计修改说明" rows={3} count={300} style={textFontSize()}/>
                                )
                            }
                        
                    </List>}
                    {/* 发起设计文件修改申请 */}
                    {nodeFlag=="FQXGSQ" &&
                    <List>
                        {                           
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                initialValue: FQXGSQ.projectName,
                                rules:[
                                    {required:true, message:'请输入项目名称'}
                                ]
                            })(
                                <CusInputItem require="true">项目名称:</CusInputItem>
                            )
                        }
                        {                           
                            getFieldDecorator('constructionAddress',{
                                validateFirst: true,
                                initialValue: FQXGSQ.constructionAddress,
                                rules:[
                                    {required:true, message:'请输入施工地址'}
                                ]
                            })(
                                <CusInputItem require="true">施工地址:</CusInputItem>
                            )
                        }
                        {                           
                            getFieldDecorator('applyUser',{
                                validateFirst: true,
                                initialValue: FQXGSQ.applyUser,
                                rules:[
                                    {required:true, message:'请输入申请人'}
                                ]
                            })(
                                <CusInputItem require="true">申请人:</CusInputItem>
                            )
                        }
                        {  
                            getFieldDecorator('applyDate',{
                                validateFirst: true,
                                initialValue: new Date(FQXGSQ.applyDate),
                                rules:[
                                    {required:true, message:'请选择申请时间'}
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
                                    <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>申请时间:</Text></Item>
                                </DatePicker>
                            )
                        }
                        {
                            getFieldDecorator('influenceBudget',{
                                validateFirst: true,
                                initialValue: FQXGSQ.influenceBudget,
                                rules:[
                                    {required:true, message:'请选择影响预算'}
                                ]
                            })(
                                <SelectItem data={resultList2} require="true">影响预算:</SelectItem>
                                )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>修改说明描述:</Text></Item>
                        {
                            getFieldDecorator('description',{
                                validateFirst: true,
                                initialValue: FQXGSQ.description,
                                rules:[
                                    {required:true, message:'请输入修改说明描述'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入修改说明描述" rows={3} count={300} style={textFontSize()}/>
                                )
                            }
                        
                    </List>}

                    <DesignInfo info={info} navigation={this.props.navigation}></DesignInfo>
                    
                {/* </Provider> */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    listTitle: {
        padding: 10,
    },
    require:{
        color:"#ff5151"
    }
});

function mapStateToProps(state) {
    const {designFileCheck, formData, index} = state;
    return {designFileCheck, formData, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);
// export default createForm()(BuildCheck);