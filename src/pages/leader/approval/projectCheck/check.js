import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import Info from './info';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError, filterConfig, getConfigName } from '../../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 工程验收----管网验收审核
 * 梁丽
 * 2019-04-29
 */
const resultList = [
    {label: "不予验收", value: 0},
    {label: "准予验收", value: 1},
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
            type: '',
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        const info = navigation.state.params.info;
        dispatch({
            type: `configParams/queryConfigParams`,
        })
        const params = {
            installNo: info.installNo,
            waitId: info.id,
        }
        dispatch({
            type: `projectCheck/getCheck`,
            params,
        })
        const _params = {
            installId: info.installId,
            waitId: info.waitId,
            pageNum: 1,
            pageSize: 1000,
            status: 0,
        }
        dispatch({
            type: `projectCheck/listMeterDetail`,
            params: _params,
        })
    }
    //改变验收单位
    changeDept = (value) => {
        const { dispatch, configParams:{ data: configData }, } = this.props;
        const params = {
            id: getConfigName(configData,value),
        }
        dispatch({
            type: `projectCheck/queryDeptUserByDeptName`,
            params,
        })
    }
    //查看详细信息
    viewDetail = (index) => {
        const { navigate } = this.props.navigation;
        
    }
    //提交信息
    submit = () => {
        const { form, navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{

                const params = {
                    conditionMap: {
                        gwdwCheckStatus: values.gwdwCheckStatus,
                    },
                    chectResultDTO: {
                        appointUser: values.appointUser,
                        checkDept: value.checkDept,
                    },
                    definedId: info.definedId,
                    installId: info.installId,
                    installNo: info.installNo,
                    waitId: info.id,
                }
                dispatch({
                    type: `projectCheck/dealConstructProcess`,
                    params
                })
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form; 
        const { configParams:{ data: configData }, projectCheck: { info, userList } } = this.props;
        const { type } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {                           
                            getFieldDecorator('gwdwCheckStatus',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择验收意见'}
                                ]
                            })(
                                <SelectItem data={resultList} require="true">验收意见:</SelectItem>
                            )
                        }
                        {                           
                            getFieldDecorator('checkDept',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择验收单位'}
                                ]
                            })(
                                <SelectItem data={filterConfig(configData,'管网分公司')} require="true" onChange={this.changeDept}>验收单位:</SelectItem>
                            )
                        }
                        {                           
                            getFieldDecorator('appointUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择人员指派'}
                                ]
                            })(
                                <SelectItem data={userList} require="true">人员指派:</SelectItem>
                            )
                        }
                        
                    </List>
                    <Info navigation={this.props.navigation}/>
                    <List>
                        <Item extra="查看" arrow="horizontal" onPress={()=>{this.viewDetail(1)}}>
                            表节点验收
                        </Item>
                        <Item extra="查看" arrow="horizontal" onPress={()=>{this.viewDetail(2)}}>
                            井室构筑物
                        </Item>
                        <Item extra="查看" arrow="horizontal" onPress={()=>{this.viewDetail(3)}}>
                            安装工程
                        </Item>
                        <Item extra="查看" arrow="horizontal" onPress={()=>{this.viewDetail(4)}}>
                            管道试压
                        </Item>
                        <Item extra="查看" arrow="horizontal" onPress={()=>{this.viewDetail(5)}}>
                            冲洗消毒
                        </Item>
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

const  CheckForm = createForm()(Check);
function mapStateToProps(state) {
    const {projectCheck, formData, configParams, index} = state;
    return {projectCheck, formData, configParams, index}
}
export default connect(mapStateToProps)(CheckForm);