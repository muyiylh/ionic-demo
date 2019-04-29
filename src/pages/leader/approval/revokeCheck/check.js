import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import { connect } from '../../../../utils/dva';
import moment from "moment";
import CusListItem from "../../../../component/list-item";
import FileItem from '../../../../component/file-item';
import Info from "./info";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 客户撤销--负责人审核
 * 梁丽
 * 2019-04-26
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
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
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
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
                dispatch({
                    type: `revoke/dealManagerAudit`,
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
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核结果说明:</Text></Item>
                    {
                        getFieldDecorator('reviewResultDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入审核结果说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入审核结果说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入上传文件'}
                            ]
                        })(
                            <FileItem title="文件上传"/>
                        )
                    }
                    
                </List>
                <Info navigation={this.props.navigation}></Info>

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
    const {revoke, formData, index} = state;
    return {revoke, formData, index}
}
const CheckForm = createForm()(Check);
export default connect(mapStateToProps)(CheckForm);
// export default createForm()(BuildCheck);