import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import { connect } from '../../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import { scaleSize } from '../../../../utils/ScreenUtil';
import { text_font_size } from '../../../../utils/theme';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 现场验收----提交验收结果
 * 梁丽
 * 2019-05-11
 */

const resultList = [
    {label: "验收合格", value: 0},
    {label: "未通过验收", value: 1},
]
class Submit extends Component {
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
                    <Text style={[textFontSize('#fff')]}>确定</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            checkResult: 0,//验收结果，默认是验收合格
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
        const data = this.props.navigation.state.params.data;
        const { navigate } = this.props.navigation;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    conditionMap: {
                        xcCheckStatus: values.checkResult == 0?true:false,
                        engineeringCheckType: data.checkType,
                    },
                    chectResultDTO: {
                        ...values,
                    },
                    definedId: info.definedId,
                    installId: info.installId,
                    installNo: info.installNo,
                    waitId: info.id,
                }
                dispatch({
                    type: `projectCheck/dealConstructProcess`,
                    params
                }).then(()=>{
                    navigate("backlog");//跳转到代办
                    dispatch({
                        type: 'backlog/nomalDeal',
                        params: {refreshing: true},
                    })
                })
            }
        })
    }
    //验收结果改变
    changeResult = (value) => {
        this.setState({checkResult:value});
    }
    
    render() {
        const { getFieldDecorator } = this.props.form; 
        const { checkResult } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {                           
                            getFieldDecorator('checkResult',{
                                validateFirst: true,
                                initialValue: checkResult,
                                rules:[
                                    {required:true, message:'请选择验收结果'}
                                ]
                            })(
                                <SelectItem data={resultList} require="true" onChange={this.changeResult}>验收结果:</SelectItem>
                            )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>总体验收说明:</Text></Item>
                        {
                            getFieldDecorator('checkRemark',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入总体验收说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入总体验收说明" rows={3} count={300} />
                            )
                        }
                       { checkResult == 1?<View><Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>整改要求:</Text></Item>
                        {
                            getFieldDecorator('reformRequire',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入整改要求'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入整改要求" rows={3} count={300} />
                            )
                        }</View>:null}
                        
                    </List>

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
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize: scaleSize(text_font_size),
    },
});
function mapStateToProps(state) {
    const {projectCheck, index} = state;
    return {projectCheck, index}
}
const SubmitForm = createForm()(Submit);
export default connect(mapStateToProps)(SubmitForm);
// export default createForm()(BuildCheck);