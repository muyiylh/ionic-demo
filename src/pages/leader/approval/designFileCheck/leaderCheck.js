import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import DesignInfo from './info';
import { connect } from '../../../../utils/dva';
import FileItem from '../../../../component/file-item';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 设计文件-确认部门领导人审核，修改领导审核，修改设计部门领导审核
 * 梁丽
 * 2019-04-17
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
class LeaderCheck extends Component {
    static navigationOptions = ({ navigation }) => {
        const submit = navigation.getParam("submit");
        const info = navigation.state.params.info;
        // let title = '';
        // if(info.nodeFlag == 'DDCBMLDSH'){//确认领导审核
        //     title = '设计文件确认审核';
        // }else{
        //     title = '设计文件修改领导审核'
        // }
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
        navigation.setParams({submit: this.submit})
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
                    waitId: info.id,
                }
                switch (info.nodeFlag) {
                    case 'DDCBMLDSH'://确认审核
                        dispatch({
                            type: `designFileCheck/dealBMLDSHConfirm`,
                            params
                        })
                        break;
                    case 'DDMBMLDSH'://修改部门领导审核
                        dispatch({
                            type: `designFileCheck/dealBMLDSHModify`,
                            params
                        })
                        break;
                    case 'SJDWLDSH'://修改部门设计单位领导审核
                        dispatch({
                            type: `designFileCheck/dealSJDWLDSH`,
                            params
                        })
                        break;
                    case 'SJRYXG'://设计人员修改
                        dispatch({
                            type: `designFileCheck/dealSJRYXG`,
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
        const data = {
            name: '12',
        }
        const { getFieldDecorator } = this.props.form;
        const info = this.props.navigation.state.params.info;
        const nodeFlag = info.nodeFlag;
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    {nodeFlag=="DDCBMLDSH" || nodeFlag=="DDMBMLDSH" || nodeFlag=="SJDWLDSH"?
                    <List renderHeader="审核信息">
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
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>受理描述说明:</Text></Item>
                        {
                            getFieldDecorator('reviewResultDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入受理描述说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入受理描述说明" rows={3} count={300} style={textFontSize()}/>
                                )
                            }
                        
                    </List>:null}
                    {nodeFlag=="SJRYXG" &&
                    <List>
                        {
                            getFieldDecorator('files',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请上传设计文件'}
                                ]
                            })(
                                <FileItem title="设计文件"/>
                                )
                            }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>设计修改说明:</Text></Item>
                        {
                            getFieldDecorator('description',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入设计修改说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入设计修改说明" rows={3} count={300} style={textFontSize()}/>
                                )
                            }
                        
                    </List>}
                    <DesignInfo info={info} navigation={this.props.navigation}></DesignInfo>
                    
                {/* </Provider> */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    listTitle: {
        padding: 10,
    },
    require:{
        color:"#ff5151"
    }
});

function mapStateToProps(state) {
    const {designFileCheck, index} = state;
    return {designFileCheck, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);
// export default createForm()(BuildCheck);