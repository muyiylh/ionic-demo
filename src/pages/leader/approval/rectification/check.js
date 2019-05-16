import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import { connect } from '../../../../utils/dva';
import moment from "moment";
import CusInputItem from "../../../../component/input-item";
import FileItem from '../../../../component/file-item';
import Require from "./require";
import CusListItem from "../../../../component/list-item";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 整改子流程
 * 梁丽
 * 2019-05-07
 */
const resultList = [
    {label: "验收合格", value: 0},
    {label: "未通过验收", value: 1},
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
            checkResult: 0,//验收结果---默认验收合格
            userInfo: {},//用户信息---用于设置默认值
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        this.getUserInfo();
        const info = navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `formData/getFormData`,
            params
        })

    }
    getUserInfo = async() => {
        const { dispatch } = this.props;
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        this.setState({userInfo: _user});
    }
    //提交信息
    submit = () => {
        const { form, dispatch, formData: { data } } = this.props;
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
                    case 'XCZG':
                        dispatch({
                            type: `rectification/dealXCZG`,
                            params
                        })
                        break;
                    case 'XCSH':
                        dispatch({
                            type: `rectification/dealXCSH`,
                            params
                        }).then(()=>{
                            if(params.checkResult == 1){//验收不合格，发起整改子流程
                                dispatch({
                                    type: `rectification/rectification`,
                                    params
                                })
                            }
                        })
                        break;
                
                    default:
                        break;
                }
                
            }
        })
    }
    //改变验收结果
    changeResult = (value) => {
        this.setState({checkResult: value});
    }
    //整改详细信息
    resultDetail = (index) => {
        const { navigate } = this.props.navigation;
        navigate('RectificationResultDetail',{index});
    }
    
    render() {
        const info = this.props.navigation.state.params.info;
        const { formData: { data } } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { checkResult, userInfo } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                { info.nodeFlag == 'XCZG' &&<List>
                    {
                        getFieldDecorator('initiator',{
                            validateFirst: true,
                            initialValue: userInfo.realName,
                            rules:[
                                {required:true, message:'请输入发起人员'}
                            ]
                        })(
                            <CusInputItem labelNumber={5} require="true">发起人员:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('launchDate',{
                            validateFirst: true,
                            initialValue: new Date(),
                            rules:[
                                {required:true, message:'请在选择发起日期'}
                            ]
                        })(
                            <DatePicker
                                // value={this.state.value}
                                mode="date"
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChangeDate}
                                format="YYYY-MM-DD"
                            >
                                <Item arrow="horizontal"><Text style={textFontSize()}><Text style={styles.require}>*</Text>发起日期:</Text></Item>
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
                            <FileItem title="现场图片"/>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>整体结果说明:</Text></Item>
                    {
                        getFieldDecorator('checkResult',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入整体结果说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入整体结果说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    
                    
                </List>}
                { info.nodeFlag == 'XCSH' &&<List>
                    {
                        getFieldDecorator('checkResult',{
                            validateFirst: true,
                            initialValue: checkResult,
                            rules:[
                                {required:true, message:'请选择验收结果'}
                            ]
                        })(
                            <SelectItem data={resultList} require="true" onChange={this.changeResult}>验收结果:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('checkDate',{
                            validateFirst: true,
                            initialValue: new Date(),
                            rules:[
                                {required:true, message:'请在选择验收日期'}
                            ]
                        })(
                            <DatePicker
                                // value={this.state.value}
                                mode="date"
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChangeDate}
                                format="YYYY-MM-DD"
                            >
                                <Item arrow="horizontal"><Text style={textFontSize()}><Text style={styles.require}>*</Text>验收日期:</Text></Item>
                            </DatePicker>
                        )
                    }
                    {
                        getFieldDecorator('formBy',{
                            validateFirst: true,
                            initialValue: userInfo.realName,
                            rules:[
                                {required:true, message:'请输入填表人'}
                            ]
                        })(
                            <CusInputItem labelNumber={5} require="true">填表人:</CusInputItem>
                        )
                    }
                    
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入上传文件'}
                            ]
                        })(
                            <FileItem title="现场图片"/>
                        )
                    }
                    
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>整体说明:</Text></Item>
                    {
                        getFieldDecorator('checkRemark',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入整体说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入整体说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    { checkResult == 1?<View>
                        <Item arrow="empty"><Text style={textFontSize()}>整改要求:</Text></Item>
                        {
                            getFieldDecorator('reformRequire',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入整改要求'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入整改要求" rows={3} count={300} style={textFontSize()}/>
                            )
                        }</View>:null
                    }
                    
                </List>}
                {info.nodeFlag == 'XCZG' && <Require navigation={this.props.navigation} ></Require>}
                {info.nodeFlag == 'XCSH' && <List renderHeader="整改的要求及结果">{
                    data.ZGYQ && data.ZGYQ.map((item,index)=>{
                        return <CusListItem arrow="horizontal" extra={moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")} onPress={()=>this.resultDetail(index)}>整改:</CusListItem>
                    })
                }
                </List>}
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
    const {rectification, formData, index} = state;
    return {rectification, formData, index}
}
const CheckForm = createForm()(Check);
export default connect(mapStateToProps)(CheckForm);
// export default createForm()(BuildCheck);