import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import { connect } from '../../../../utils/dva';
import moment from "moment";
import CusListItem from "../../../../component/list-item";
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
class LeaderCheck extends Component {
    static navigationOptions = ({ navigation }) => {
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', '手续待办审核'),
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
                    id: data.SXDBSQ?data.SXDBSQ.id:'',
                    installId: info.installId,
                    installNo: info.installNo,
                    waitId: info.id,
                }
                dispatch({
                    type: `procedureWait/procedureAgentLeaderReview`,
                    params
                })
            }
        })
    }
    
    render() {
        const { formData: { data }, info } = this.props;
        const { getFieldDecorator } = this.props.form;
        let SXDBSQ = data.SXDBSQ?data.SXDBSQ:{};
        return (
            <ScrollView style={styles.projectPage}>
                <List renderHeader="申请信息">
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
                        
                    </List>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
});
function mapStateToProps(state) {
    const {procedureWait, formData, index} = state;
    return {procedureWait, formData, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);
// export default createForm()(BuildCheck);