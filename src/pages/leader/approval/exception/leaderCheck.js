import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import Info from './info';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError } from '../../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 异常处置---审核
 * 梁丽
 * 2019-04-28
 */
const resultList = [
    {label: "同意列为异常", value: 0},
    {label: "不需要作为异常", value: 1},
]
const handelWayList = [
    {label: "本部门负责处置", value: 0},
    {label: "其他责任部门处置", value: 1},
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
            type: '',
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        const info = navigation.state.params.info;
        dispatch({
            type: 'exception/findUserByDeptId',
            params:{},
        })
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
                    installId: info.installId,
                    waitId: info.id,
                }
                switch (info.nodeFlag) {
                    case '':
                        dispatch({
                            type: `exception/dealExceptionApproval`,
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
                                    // {required:true, message:'请选择审核意见'}
                                ]
                            })(
                                <SelectItem data={resultList}>审核意见:</SelectItem>
                            )
                        }
                        {                                
                            getFieldDecorator('selfDept',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请选择处置部门'}
                                ]
                            })(
                                <SelectItem data={handelWayList}>处置部门:</SelectItem>
                            )
                        }
                        {                                
                            getFieldDecorator('appointUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择处置人员'}
                                ]
                            })(
                                <SelectItem data={}>处置人员:</SelectItem>
                            )
                        }
                    </List>
                    <Info navigation={this.props.navigation}/>
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

const  LeaderCheckForm = createForm()(LeaderCheck);
function mapStateToProps(state) {
    const {exception, formData, index} = state;
    return {exception, formData, index}
}
export default connect(mapStateToProps)(LeaderCheckForm);