import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import CusListItem from "../../../../component/list-item";
import CusInputItem from "../../../../component/input-item";
import FileItem from "../../../../component/file-item";
import { Table, Row, Rows } from 'react-native-table-component';
import { connect } from '../../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 工程验收----填写整体验收报告（验收结论）
 * 梁丽
 * 2019-05-11
 */

const resultList = [
    {label: "验收合格", value: 0},
    {label: "未通过验收", value: 1},
]
class Submit extends Component {
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
                    <Text style={[textFontSize('#fff')]}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            checkResult: 0,//验收结果，默认是验收合格
            userInfo: {},
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        navigation.setParams({submit: this.submit});
        this.getUserInfo();
        const params = {
            id: info.installId,
            waitId: info.id,
        };
        dispatch({
            type: 'projectCheck/findCheckRecord',
            params,
        })
    }
    //获得用户信息
    getUserInfo = async() => {
        const { dispatch } = this.props;
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        this.setState({userInfo: _user});
    }
    //提交信息
    submit = () => {
        const { form, dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        const data = this.props.navigation.state.params.data;
        const { navigate } = this.props.navigation;
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
                if(values.checkResult == 0){//验收合格
                    dispatch({
                        type: `projectCheck/saveCheckConclusion`,
                        params
                    })
                }else{//验收不合格，发起整改子流程
                    dispatch({
                        type: `projectCheck/rectification`,
                        params
                    })

                }
                
            }
        })
    }
    //验收结果改变
    changeResult = (value) => {
        this.setState({checkResult:value});
    }
    
    render() {
        const { getFieldDecorator } = this.props.form; 
        const { checkResult, userInfo } = this.state;
        const { projectCheck: { checkList, checkListTable, widthArr } } = this.props;
        const checkTypeName = checkList && checkList[0]?checkList[0].checkTypeName:'';
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        <CusListItem extra={checkTypeName}>验收方式:</CusListItem>
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
                                    {required:true, message:'请选择验收日期'}
                                ]
                            })(
                                <DatePicker
                                    mode="date"
                                    minDate={new Date(2015, 7, 6)}
                                    maxDate={new Date(2026, 11, 3)}
                                    onChange={this.onChange}
                                    format="YYYY-MM-DD"
                                    style={textFontSize()}
                                    >
                                    <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>验收日期:</Text></Item>
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
                                <CusInputItem require="true">填表人:</CusInputItem>
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
                                <TextareaItem style={textFontSize()} placeholder="请输入整体说明" rows={3} count={300} />
                            )
                        }
                       { checkResult == 1?<View><Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>整改要求:</Text></Item>
                        {
                            getFieldDecorator('reformRequire',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入整改要求'}
                                ]
                            })(
                                <TextareaItem style={textFontSize()} placeholder="请输入整改要求" rows={3} count={300} />
                            )
                        }</View>:null}
                        
                    </List>
                    {checkListTable && checkListTable.length>1 && <ScrollView horizontal={true}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        {
                            checkListTable.map((rowData, index) => (
                                <Row
                                key={index}
                                data={rowData}
                                widthArr={widthArr}
                                style={[styles.row]}
                                textStyle={styles.text}
                                />
                            ))
                        }
                        </Table>
                    </ScrollView>}

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
    },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1'},
    text: {
        margin: 10,
        textAlign: 'center'
    },
});
function mapStateToProps(state) {
    const {projectCheck, index} = state;
    return {projectCheck, index}
}
const SubmitForm = createForm()(Submit);
export default connect(mapStateToProps)(SubmitForm);
// export default createForm()(BuildCheck);