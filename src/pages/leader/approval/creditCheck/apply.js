import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import CusInputItem from "../../../../component/input-item";
import FileItem from "../../../../component/file-item";
import { connect } from '../../../../utils/dva';
import { fileText, filterConfig, textFontSize, showFormError } from '../../../../utils/index';
import CreditInfo from './creditInfo';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 资信度---新增资信度
 * 梁丽
 * 2019-05-13
 */
const resultList = [
    {label: "一类资信度", value: 0},
    {label: "二类资信度", value: 1},
]
class Apply extends Component {
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
        const info = navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `formData/getFormData`,
            params
        })
        dispatch({
            type: `configParams/queryConfigParams`,
        })
        dispatch({
            type: `creditCheck/queryUserByPage`,
            params:{}
        })
    }
    //提交信息
    submit = () => {
        const { form, navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        const { formData: { data } } = this.props;
        _data = data.SBZXDWT1 || data.SBZXDWT2 || {};
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    id: _data.id,
                    waitId: info.id,
                }
                console.log("params--------",params);
                dispatch({
                    type: `creditCheck/dealSBZXDWT`,
                    params
                })
            }
        })
    }
    //单位
    filterConfig = (arr,className) => {
        let a = [];
        arr.map((item)=>{
            if(item.className == className){
                let o = {
                    label: item.paramName,
                    value: item.paramName,
                }
                a.push(o);
            }
        })
        return a;
    }
    
    render() {
        const { getFieldDecorator } = this.props.form; 
        const { type } = this.state;
        const info = this.props.navigation.state.params.info;
        const {configParams:{ data: configData }} = this.props;
        const { formData: { data }, creditCheck: { userList } } = this.props;
        _data = data.SBZXDWT1 || data.SBZXDWT2 || {};
        console.log("_data--------",_data);
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {                           
                            getFieldDecorator('clientName',{
                                validateFirst: true,
                                initialValue: _data.clientName,
                                rules:[
                                    {required:true, message:'请输入客户名称'}
                                ]
                            })(
                                <CusInputItem require="true">客户名称:</CusInputItem>
                            )
                        }
                        {
                            getFieldDecorator('levelClass',{
                                validateFirst: true,
                                initialValue: _data.levelClass,
                                rules:[
                                    {required:true, message:'请选择资信度等级'}
                                ]
                            })(
                                <SelectItem data={resultList} require="true">资信度等级:</SelectItem>
                            )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>问题描述:</Text></Item>
                        {
                            getFieldDecorator('proDesc',{
                                validateFirst: true,
                                initialValue: _data.proDesc,
                                rules:[
                                    {required:true, message:'请输入问题描述'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入问题描述" rows={3} count={300} />
                            )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>等级设定说明:</Text></Item>
                        {
                            getFieldDecorator('levelDesc',{
                                validateFirst: true,
                                initialValue: _data.levelDesc,
                                rules:[
                                    {required:true, message:'请输入等级设定说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入等级设定说明" rows={3} count={300} />
                            )
                        }
                        {
                            getFieldDecorator('reportUnit',{
                                validateFirst: true,
                                initialValue: _data.reportUnit,
                                rules:[
                                    {required:true, message:'请选择上报单位'}
                                ]
                            })(
                                <SelectItem data={this.filterConfig(configData,"营销单位")} require="true">上报单位:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('reportUserId',{
                                validateFirst: true,
                                initialValue: _data.reportUserId,
                                rules:[
                                    // {required:true, message:'请选择上报人员'}
                                ]
                            })(
                                <SelectItem data={userList} require="true">上报人员:</SelectItem>
                            )
                        }
                        {   
                            getFieldDecorator('files',{
                                validateFirst: true,
                                initialValue: _data.files,
                                rules:[
                                    // {required:true, message:'请输入上传文件'}
                                ]
                            })(
                                <FileItem title="文件上传"/>
                            )
                        }
                        
                    </List>
                    <CreditInfo navigation={this.props.navigation} type="check" info={false}/>
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

const  ApplyForm = createForm()(Apply);
function mapStateToProps(state) {
    const {creditCheck, formData, configParams, index} = state;
    return {creditCheck, formData, configParams, index}
}
export default connect(mapStateToProps)(ApplyForm);