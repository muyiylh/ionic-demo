import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import moment from "moment";
import SelectItem from '../../../../component/select-item';
import { connect } from '../../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import CusListItem from "../../../../component/list-item";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 测压申请-部门领导人审核
 * 梁丽
 * 2019-04-15
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
class LeaderCheck extends Component {
    static navigationOptions = ({ navigation }) => {
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', '测压申请审核'),
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
                dispatch({
                    type: `pressureTest/leaderReview`,
                    params
                })
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formData: { data } } = this.props;
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <List>
                        <CusListItem extra={data.CYSQ?data.CYSQ.applyName:''}>申请人:</CusListItem>
                        <CusListItem extra={data.CYSQ?moment(data.CYSQ.applyTime).format("YYYY-MM-DD HH:mm:ss"):''}>申请日期:</CusListItem>
                        <CusListItem extra={data.CYSQ?data.CYSQ.reason:''}>申请原因:</CusListItem>

                        {/* <Item extra={data.name} arrow="empty">
                            申请人:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            申请日期:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            申请原因:
                        </Item> */}
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
                        
                    </List>
                    
                {/* </Provider> */}

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