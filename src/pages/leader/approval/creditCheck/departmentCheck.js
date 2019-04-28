import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import CreditInfo from './creditInfo';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError } from '../../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 资信度---审核流程
 * 梁丽
 * 2019-04-13
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
const handelWayList = [
    {label: "继续报装", value: 'continue'},
    {label: "暂停报装", value: 'pause'},
]
class Depaetment extends Component {
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
        let type = "check";
        if(info.nodeFlag == 'BMLDSH1' || info.nodeFlag == 'BMLDSH2' || info.nodeFlag == 'BMSJLDSH1' 
        || info.nodeFlag == 'FGFZSH1' || info.nodeFlag == 'ZJLSH1'){
            type = "check";
        }else{
            type = 'handel'
        }
        this.setState({type})
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
                    ...values,
                    id: info.installNo,
                    waitId: info.id,
                }
                switch (info.nodeFlag) {
                    case 'BMLDSH1'://一类---领导审核
                        dispatch({
                            type: `creditCheck/dealBMLDSH`,
                            params
                        })
                        break;
                    case 'BMLDSH2'://二类---领导审核
                        dispatch({
                            type: `creditCheck/dealBMLDSH`,
                            params
                        })
                        break;
                    case 'BMSJLDSH1'://一类---部门上级领导审核
                        dispatch({
                            type: `creditCheck/dealBMSJLDSH`,
                            params
                        })
                        break;
                    case 'FGFZSH1'://一类---分管副总审核
                        dispatch({
                            type: `creditCheck/dealFGFZSH`,
                            params
                        })
                        break;
                    case 'ZJLSH1'://一类---总经理审核
                        dispatch({
                            type: `creditCheck/dealZJLSH`,
                            params
                        })
                        break;
                    case 'BMLDSH'://部门领导审核
                        dispatch({
                            type: `creditCheck/dealBMLDSHCZ`,
                            params
                        })
                        break;
                    case 'FGFZSH'://分管副总审核
                        dispatch({
                            type: `creditCheck/dealFGFZSHCZ`,
                            params
                        })
                        break;
                    case 'ZJLSH'://总经理审核
                        dispatch({
                            type: `creditCheck/dealZJLSHCZ`,
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
        const { type } = this.state;
        const info = this.props.navigation.state.params.info;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {
                            getFieldDecorator('reviewResult',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择审核意见'}
                                ]
                            })(
                                <SelectItem data={resultList} require="true">审核意见:</SelectItem>
                            )
                        }
                        {info.nodeFlag == 'BMLDSH'?
                            
                                getFieldDecorator('handleWay',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择处理方式'}
                                    ]
                                })(
                                    <SelectItem data={handelWayList} require="true">处理方式:</SelectItem>
                                )
                            
                            :null
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核说明:</Text></Item>
                        {
                            getFieldDecorator('reviewResultDesc',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入审核说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入审核说明" rows={3} count={300} />
                            )
                        }
                        
                    </List>
                    <CreditInfo navigation={this.props.navigation} type={type}/>
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

const  DepaetmentForm = createForm()(Depaetment);
function mapStateToProps(state) {
    const {creditCheck, formData, index} = state;
    return {creditCheck, formData, index}
}
export default connect(mapStateToProps)(DepaetmentForm);