import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, Accordion, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize, fileText} from "../../../../utils/index";
import { connect } from '../../../../utils/dva';
import moment from "moment";
import CusListItem from "../../../../component/list-item";
import FileItem from "../../../../component/file-item";
import {text_font_size} from '../../../../utils/theme';
import {scaleSize} from "../../../../utils/ScreenUtil";
const Item = List.Item;
const Brief = Item.Brief;
/**
 *手续待办-部门领导人审核
 * 梁丽
 * 2019-04-26
 */
const resultList = [
    {label: "同意", value: 'true'},
    {label: "不同意", value: 'false'},
]
const resultList2 = [
    {label: "尚未完成办理", value: 0},
    {label: "已经完成办理", value: 2},
    {label: "终止手续办理", value: 1},
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
            userInfo: {},//用户信息
            activeSections: [],//默认都不打开
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
            type: `procedureWait/findProcedureAgentSchedule`,
            params:{installNo: info.installNo}
        })
        this.queryUserByPage();
    }
    //获取部门下人员
    queryUserByPage= async() => {
        const { dispatch } = this.props;
        let params = {};
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        this.setState({userInfo: _user});
        params.deptId = _user.deptId;
        dispatch({
            type: 'procedureWait/queryUserByPage',
            params,
        })
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
                    case 'SXDBLDSH'://审核
                        params.id = data.SXDBSQ?data.SXDBSQ.id:'';
                        dispatch({
                            type: `procedureWait/procedureAgentLeaderReview`,
                            params
                        })
                        break;
                    case 'SXDBTJDBXX'://提交代办信息
                        dispatch({
                            type: `procedureWait/procedureAgentSubmitResult`,
                            params
                        })
                        break;
                    default:
                        break;
                }
                
            }
        })
    }
    //进度---打开
    onChange = (value) => {
        this.setState({activeSections: value});
    }
    
    render() {
        const { formData: { data }, procedureWait: { userList, info:processInfo} } = this.props;
        const { getFieldDecorator } = this.props.form;
        const info = this.props.navigation.state.params.info;
        const { userInfo, activeSections } = this.state;
        let SXDBSQ = data.SXDBSQ?data.SXDBSQ:{};
        return (
            <ScrollView style={styles.projectPage}>
                {info.nodeFlag == 'SXDBLDSH' && <View><List renderHeader="申请信息">
                    <CusListItem extra={SXDBSQ.name}>申请人:</CusListItem>
                        <CusListItem extra={moment(SXDBSQ.createAt).format("YYYY-MM-DD HH:mm:ss")}>申请日期:</CusListItem>
                        <CusListItem extra={SXDBSQ.procedureAgentName}>手续待办名称:</CusListItem>
                        <CusListItem extra={moment(SXDBSQ.startTime).format("YYYY-MM-DD HH:mm:ss")}>预计开始时间:</CusListItem>
                        <CusListItem extra={moment(SXDBSQ.endTime).format("YYYY-MM-DD HH:mm:ss")}>预计完成时间:</CusListItem>
                        <CusListItem extra={SXDBSQ.agentName}>待办人姓名:</CusListItem>
                        <CusListItem extra={SXDBSQ.contact}>待办人联系方式:</CusListItem>
                        <CusListItem extra={SXDBSQ.procedureAgentDesc}>待办说明:</CusListItem>
                    </List>
                    <List renderHeader="审核信息">
                       
                        {
                            getFieldDecorator('awaitHandler',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择审核结果'}
                                ]
                            })(
                                <SelectItem data={resultList} require="true">审核结果:</SelectItem>
                            )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核意见:</Text></Item>
                        {
                            getFieldDecorator('reviewDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入审核意见'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入审核意见" rows={3} count={300} style={textFontSize()}/>
                            )
                        }
                        
                    </List></View>}
                    {
                        info.nodeFlag == 'SXDBTJDBXX' && <View>
                            <List>
                                {
                                    getFieldDecorator('writeTime',{
                                        validateFirst: true,
                                        initialValue: new Date(),
                                        rules:[
                                            {required:true, message:'请在选择填写日期'}
                                        ]
                                    })(
                                        <DatePicker
                                            // value={this.state.value}
                                            mode="date"
                                            minDate={new Date()}
                                            // maxDate={new Date(2026, 11, 3)}
                                            onChange={this.onChangeDate}
                                            format="YYYY-MM-DD"
                                        >
                                            <Item arrow="horizontal"><Text style={textFontSize()}><Text style={styles.require}>*</Text>填写日期:</Text></Item>
                                        </DatePicker>
                                    )
                                }
                                {
                                    getFieldDecorator('writeId',{
                                        validateFirst: true,
                                        initialValue: userInfo.id,
                                        rules:[
                                            {required:true, message:'请选择代办人'}
                                        ]
                                    })(
                                        <SelectItem data={userList} require="true" onChange={this.changeResult}>代办人:</SelectItem>
                                    )
                                }
                                {
                                    getFieldDecorator('governmentHandleTime',{
                                        validateFirst: true,
                                        initialValue: new Date(),
                                        rules:[
                                            {required:true, message:'请在选择政府承诺办理时间'}
                                        ]
                                    })(
                                        <DatePicker
                                            // value={this.state.value}
                                            mode="date"
                                            minDate={new Date()}
                                            // maxDate={new Date(2026, 11, 3)}
                                            onChange={this.onChangeDate}
                                            format="YYYY-MM-DD"
                                        >
                                            <Item arrow="horizontal"><Text style={textFontSize()}><Text style={styles.require}>*</Text>政府承诺办理时间:</Text></Item>
                                        </DatePicker>
                                    )
                                }
                                <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>办理进度说明:</Text></Item>
                                {
                                    getFieldDecorator('handleDesc',{
                                        validateFirst: true,
                                        rules:[
                                            {required:true, message:'请输入办理进度说明'}
                                        ]
                                    })(
                                        <TextareaItem style={styles.multilineInput} placeholder="请输入办理进度说明" rows={3} count={300} style={textFontSize()}/>
                                    )
                                }
                                {
                                    getFieldDecorator('handleResult',{
                                        validateFirst: true,
                                        rules:[
                                            {required:true, message:'请选择当前代办结果'}
                                        ]
                                    })(
                                        <SelectItem data={resultList2} require="true">当前代办结果:</SelectItem>
                                    )
                                }
                                {
                                    getFieldDecorator('files',{
                                        validateFirst: true,
                                        rules:[
                                            // {required:true, message:'请输入上传文件'}
                                        ]
                                    })(
                                        <FileItem title="代办手续文件"/>
                                    )
                                }
                            </List>
                            {processInfo.schedule && processInfo.schedule.length>0 && <View><Text style={styles.text}>{processInfo.procedureAgentName} - 办理进度</Text>
                            <Accordion
                                onChange={this.onChange}
                                activeSections={activeSections}
                                style={styles.accordion}
                                >
                                {processInfo.schedule && processInfo.schedule.map((item) => {
                                    const title = moment(item.writeTime).format("YYYY-MM-DD") + "-" + item.result;
                                    const files = item && item.files?fileText(item.files):'';
                                    return (
                                            <Accordion.Panel header={title}>
                                                <List style={styles.list}>
                                                    <CusListItem extra={item.writeName}>填写人:</CusListItem>
                                                    <CusListItem extra={moment(item.governmentHandleTime).format("YYYY-MM-DD")}>政府承诺时间:</CusListItem>
                                                    <CusListItem extra={item.desc}>办理进度说明:</CusListItem>
                                                    <CusListItem extra={files}>已上传文件:</CusListItem>
                                                </List>
                                            </Accordion.Panel>
                                        )
                                })}
                            </Accordion></View>}
                        </View>
                    }

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
    accordion: {
		backgroundColor: '#fff',
		marginBottom: 10,
		fontSize: scaleSize(text_font_size),
    },
    text: {
        padding: 10,
    }
});
function mapStateToProps(state) {
    const {procedureWait, formData, index} = state;
    return {procedureWait, formData, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);
// export default createForm()(BuildCheck);