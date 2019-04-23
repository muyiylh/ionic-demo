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
 * 管道复核--建设指挥部审核
 * 梁丽
 * 2019-04-15
 */
class BuildCheck extends Component {
    static navigationOptions = ({ navigation }) => {
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', '管道复核-建设指挥部审核'),
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
                dispatch({
                    type: `pipeLineLeaderCheck/pipelineReviewLeaderReview`,
                    params
                })
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form; 
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <List>
                        {  
                            getFieldDecorator('writeName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入填写人'}
                                ]
                            })(
                                <InputItem placeholder="请输入填写人">填写人:</InputItem>
                            )
                        }
                        {  
                            getFieldDecorator('writeTime',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择填写时间'}
                                ]
                            })(
                                <DatePicker
                                    mode="date"
                                    minDate={new Date(2015, 7, 6)}
                                    maxDate={new Date(2026, 11, 3)}
                                    onChange={this.onChange}
                                    format="YYYY-MM-DD"
                                    >
                                    <Item arrow="horizontal" extra="请选择">填写时间:</Item>
                                </DatePicker>
                            )
                        }
                        <Item arrow="empty">意见说明:</Item>
                        {
                            getFieldDecorator('desc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入意见说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入意见说明" rows={3} count={300} />
                            )
                        }
                        
                    </List>
                    <PipeLineInfo navigation={this.props.navigation}/>
                {/* </Provider> */}

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
const BuildCheckForm = createForm()(BuildCheck);
export default connect(mapStateToProps)(BuildCheckForm);
// export default createForm()(BuildCheck);