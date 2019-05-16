import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import PipeLineInfo from './pipeLineInfo';
import { connect } from '../../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import CusInputItem from '../../../../component/input-item';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 管道复核--记录复核记过
 * 梁丽
 * 2019-05-08
 */
const resultList = [
    {label: "存在", value: 'true'},
    {label: "不存在", value: 'false'},
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
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        dispatch({
            type: `configParams/queryConfigParams`,
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
                switch (info.nodeFlag) {
                    case 'GDFHJLFHJG':
                        dispatch({
                            type: `pipeLineLeaderCheck/recordingReviewResult`,
                            params
                        })
                        break;
                    case 'GDFHAKFHJJGC':
                        dispatch({
                            type: `pipeLineLeaderCheck/ankeReview`,
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
        const { configParams: { data } } = this.props;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {
                            getFieldDecorator('auditResult',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择复核结果'}
                                ]
                            })(
                                <SelectItem require data={resultList}>复核结果:</SelectItem>
                            )
                        }
                        {  
                            getFieldDecorator('pipelineMaterial',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入管道材质'}
                                ]
                            })(
                                <CusInputItem require="true">管道材质:</CusInputItem>
                            )
                        }
                        {
                            getFieldDecorator('pipelineCaliber',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择管道口径'}
                                ]
                            })(
                                <SelectItem require data={filterConfig(data,'管道口径')}>管道口径:</SelectItem>
                            )
                        }
                        {  
                            getFieldDecorator('reviewPersionName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入复核人'}
                                ]
                            })(
                                <CusInputItem require="true">复核人:</CusInputItem>
                            )
                        }
                        {  
                            getFieldDecorator('reviewTime',{
                                validateFirst: true,
                                initialValue: new Date(),
                                rules:[
                                    {required:true, message:'请选择复核时间'}
                                ]
                            })(
                                <DatePicker
                                    mode="date"
                                    minDate={new Date()}
                                    // maxDate={new Date(2026, 11, 3)}
                                    onChange={this.onChange}
                                    format="YYYY-MM-DD"
                                    style={textFontSize()}
                                    >
                                    <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>复核时间:</Text></Item>
                                </DatePicker>
                            )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}>复核说明:</Text></Item>
                        {
                            getFieldDecorator('reviewDesc',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入复核说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入复核说明" rows={3} count={300} style={textFontSize()}/>
                            )
                        }
                        
                    </List>
                <PipeLineInfo navigation={this.props.navigation}/>

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
    const {pipeLineLeaderCheck, configParams, index} = state;
    return {pipeLineLeaderCheck, configParams, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);