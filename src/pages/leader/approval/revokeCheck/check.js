import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import { connect } from '../../../../utils/dva';
import moment from "moment";
import CusInputItem from "../../../../component/input-item";
import FileItem from '../../../../component/file-item';
import Info from "./info";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 客户撤销--负责人审核
 * 梁丽
 * 2019-04-26
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
const resultList2 = [
    {label: "已解决", value: 0},
    {label: "未解决", value: 1},
]
const resultLis3 = [
    {label: "没有", value: 0},
    {label: "有", value: 1},
]
class Check extends Component {
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
        navigation.setParams({submit: this.submit});
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
                    case 'FZRSH':
                        dispatch({
                            type: `revoke/dealManagerAudit`,
                            params
                        })
                        break;
                    case 'TXFHQK':
                        dispatch({
                            type: `revoke/dealReCheck`,
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
        const { formData: { data } } = this.props;
        const { getFieldDecorator } = this.props.form;
        const info = this.props.navigation.state.params.info;
        return (
            <ScrollView style={styles.projectPage}>
                {info.nodeFlag == "TXFHQK" && <List>
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>处理意见:</Text></Item>
                    {
                        getFieldDecorator('reviewResultDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入处理意见'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入处理意见" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>解决用水需求说明:</Text></Item>
                    {
                        getFieldDecorator('solveWaterDescription',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入解决用水需求说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入解决用水需求说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    {
                        getFieldDecorator('solveWaterNeedFlag',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择是否已解决用水需求'}
                            ]
                        })(
                            <SelectItem data={resultList2} require="true">是否已解决用水需求:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('solveWaterNeedWay',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入解决用水需求方法'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">解决用水需求方法:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('waterNeedFlag',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择是否还有用水需求'}
                            ]
                        })(
                            <SelectItem data={resultLis3} require="true">是否还有用水需求:</SelectItem>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>是否还有用水需求情况详细说明:</Text></Item>
                    {
                        getFieldDecorator('waterNeedDescription',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入是否还有用水需求情况详细说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入是否还有用水需求情况详细说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入上传文件'}
                            ]
                        })(
                            <FileItem title="文件上传"/>
                        )
                    }
                    
                </List>}
                {info.nodeFlag == "FZRSH" && <List renderHeader="审核信息">
                    
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
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核结果说明:</Text></Item>
                    {
                        getFieldDecorator('reviewResultDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入审核结果说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入审核结果说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入上传文件'}
                            ]
                        })(
                            <FileItem title="文件上传"/>
                        )
                    }
                    
                </List>}
                <Info navigation={this.props.navigation}></Info>

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
    const {revoke, formData, index} = state;
    return {revoke, formData, index}
}
const CheckForm = createForm()(Check);
export default connect(mapStateToProps)(CheckForm);
// export default createForm()(BuildCheck);