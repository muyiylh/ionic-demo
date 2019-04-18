import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import PipeLineInfo from './pipeLineInfo';
import { connect } from '../../../../utils/dva';
const Item = List.Item;
const Brief = Item.Brief;
/**
 *手续待办-部门领导人审核
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
            title: navigation.getParam('otherParam', '手续待办审核'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={submit}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>提交</Text>
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
        const info = this.props.navigation.state.params.innfo;
        form.validateFields((error, values) => {
            console.warn('submit', error, values)
            if (error) {
                // showFormError(form.getFieldsError());
                alert(error);
                return;
            }else{
                const params = {
                    ...values,
                    // installId: info.installId,
                    // installNo: info.installNo,
                    // waitId: info.id,
                }
                // dispatch({
                //     type: `pipeLineLeaderCheck/pipelineReviewLeaderReview`,
                //     params
                // })
            }
        })
    }
    
    render() {
        const data = {
            name: '12',
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <ScrollView style={styles.projectPage}>
                <Provider>
                    <List>
                        <Item extra={data.name} arrow="empty">
                            申请人:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            申请日期:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            手续待办名称:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            预计开始时间:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            预计完成时间:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            待办人姓名:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            待办人联系方式:
                        </Item>
                        <Item extra={data.name} arrow="empty">
                            待办说明:
                        </Item>
                        {
                            getFieldDecorator('channerAuditCheck',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择审核结果'}
                                ]
                            })(
                                <SelectItem data={resultList}>审核结果:</SelectItem>
                            )
                        }
                        <Item arrow="empty">审核意见:</Item>
                        {
                            getFieldDecorator('reviewDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入审核意见'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入审核意见" rows={3} count={300} />
                            )
                        }
                        
                    </List>
                    
                </Provider>

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
    const {pipeLineLeaderCheck, index} = state;
    return {pipeLineLeaderCheck, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheck);
// export default createForm()(BuildCheck);