import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../utils/index";
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
import CusInputItem from "../../../component/input-item";
import moment from "moment";
const Item = List.Item;
const Brief = Item.Brief;
/*
签订施工合同
梁丽
2019/04/10
*/
const signList =  [
    {"label":"需要签订合同",value:0},
    {"label":"无需签订合同",value:1},
];
const resultList = [
    {"label":"达成一致",value:0},
    {"label":"未能达成一致",value:1},
];
const typeList = [
    {"label":"范本合同",value:1},
    {"label":"非范本合同",value:2},
];
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', '签订施工合同'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={submit}
                    style={{ marginRight: 10 }}
                >
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props)
        this.state = {
            objection: false,
            talk: false,
            signFlag: 0,//是否签署
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
        const { navigation, form, dispatch } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    waitId: info.id,
                    installId: info.installId,
                    installNo: info.installNo,
                    definedId: info.definedId,
                }
                if(params.objection && params.objection.proposalDate){
                    params.objection.proposalDate = moment(params.objection.proposalDate).format("YYYY-MM-DD");
                }
                if(params.discuss && params.discuss.date){
                    params.discuss.date = moment(params.discuss.date).format("YYYY-MM-DD");
                }
                dispatch({
                    type: `construction/deal`,
                    params,
                })
            }
        })
    }
    //添加异议信息
    objection = () => {
        this.setState({objection: !this.state.objection});
    }
    //添加洽谈信息
    talk = () => {
        this.setState({talk: !this.state.talk});
    }
    //是否签署合同
    signFlagChange = (value) => {
        this.setState({signFlag: value});
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form; 
        const {configParams:{ data: configData }} = this.props;
        const { objection, talk, signFlag } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                <View>
                    <Text style={styles.listTitle}>合同基础信息</Text>
                </View>
                <List>
                    {
                        getFieldDecorator('construction.signFlag',{
                            validateFirst: true,
                            initialValue: signFlag,
                            rules:[
                                {required:true, message:'请选择是否签署'}
                            ]
                        })(
                            <SelectItem data={signList} onChange={this.signFlagChange} require="true">是否签署:</SelectItem>
                        )
                    }
                    {!signFlag?
                        getFieldDecorator('construction.chargeMode',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择收费模式'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,"合同收费模式")} require="true">收费模式:</SelectItem>
                        )
                    :null}
                    {!signFlag?
                        getFieldDecorator('construction.type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择合同类型'}
                            ]
                        })(
                            <SelectItem data={typeList} require="true">合同类型:</SelectItem>
                        )
                    :null}
                    {!signFlag? 
                        getFieldDecorator('construction.version',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择合同版本'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,"合同版本")} require="true">合同版本:</SelectItem>
                        )
                        :null}
                    {!signFlag? 
                        getFieldDecorator('construction.payType',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入支付方式'}
                            ]
                        })(
                            <CusInputItem labelNumber={5} require="true">支付方式:</CusInputItem>
                            // <InputItem labelNumber={5}>支付方式:</InputItem>
                        )
                        :null}
                    {!signFlag? 
                        getFieldDecorator('construction.money',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入合同金额'}
                            ]
                        })(
                            <CusInputItem labelNumber={5} extra="元" require="true">合同金额:</CusInputItem>
                            // <InputItem labelNumber={5} extra="元">合同金额:</InputItem>
                        )
                        :null}
                    {!signFlag?
                        getFieldDecorator('construction.files',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请上传合同文件'}
                            ]
                        })(
                            <FileItem title="合同文件" require="true"/>
                        )
                        :null}
                    
                </List>
                {/* <WhiteSpace size="lg" /> */}
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={styles.buttonText} onPress={this.objection}>添加合同异议信息</Text>
                        <Text style={styles.buttonText} onPress={this.talk}>添加合同洽谈信息</Text>
                    </WingBlank>
                </View>
                {
                    objection?
                    <View>
                        {/* <WhiteSpace size="lg" /> */}
                        <View>
                            <Text style={styles.listTitle}>添加合同异议信息</Text>
                        </View>
                        <List>
                            
                            {
                                getFieldDecorator('objection.proposalDate',{
                                    validateFirst: true,
                                    initialValue: new Date(),
                                    rules:[
                                        {required:true, message:'请选择提出时间'}
                                    ]
                                })(
                                    <DatePicker
                                        mode="date"
                                        minDate={new Date(2015, 7, 6)}
                                        maxDate={new Date(2026, 11, 3)}
                                        onChange={this.onChange}
                                        format="YYYY-MM-DD"
                                        >
                                        <Item arrow="horizontal" extra="请选择"><Text style={textFontSize()}>提出时间:</Text></Item>
                                    </DatePicker>
                                )
                            }
                            {
                                getFieldDecorator('objection.proposalUser',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入提出人'}
                                    ]
                                })(
                                    <CusInputItem require="true">提出人:</CusInputItem>
                                    // <InputItem >提出人:</InputItem>
                                )
                            }
                            {
                                getFieldDecorator('objection.phoneNumber',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入联系方式'}
                                    ]
                                })(
                                    <CusInputItem labelNumber={5} require="true">联系方式:</CusInputItem>
                                    // <InputItem labelNumber={5}>联系方式:</InputItem>
                                )
                            }
                            <Item arrow="empty" labelNumber={4}><Text style={textFontSize()}>异议内容:</Text></Item>
                            {
                                getFieldDecorator('objection.content',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入异议内容'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入异议内容" rows={3} count={300} />
                                )
                            }
                            
                        </List>
                    </View>:<Text></Text>
                }
                {
                    talk?
                    <View>
                        {/* <WhiteSpace size="lg" /> */}
                        <View>
                        <Text style={styles.listTitle}>添加合同洽谈信息</Text>
                        </View>
                        <List>
                            
                            {
                                getFieldDecorator('discuss.date',{
                                    validateFirst: true,
                                    initialValue: new Date(),
                                    rules:[
                                        {required:true, message:'请选择提出时间'}
                                    ]
                                })(
                                    <DatePicker
                                        mode="date"
                                        minDate={new Date(2015, 7, 6)}
                                        maxDate={new Date(2026, 11, 3)}
                                        onChange={this.onChange}
                                        format="YYYY-MM-DD"
                                        >
                                        <Item arrow="horizontal" extra="请选择"><Text style={textFontSize()}>提出时间:</Text></Item>
                                    </DatePicker>
                                )
                            }
                            {
                                getFieldDecorator('discuss.result',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择洽谈结果'}
                                    ]
                                })(
                                    <SelectItem data={resultList}>洽谈结果:</SelectItem>
                                )
                            }
                            <Item arrow="empty"><Text style={textFontSize()}>洽谈说明:</Text></Item>
                            {
                                getFieldDecorator('discuss.specification',{
                                    validateFirst: true,
                                    rules:[
                                        // {required:true, message:'请输入洽谈说明'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入洽谈说明" rows={3} count={300} />

                                )
                            }
                            {
                                getFieldDecorator('discuss.files',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请上传附件'}
                                    ]
                                })(
                                    <FileItem title="附件上传"/>
                                )
                            }
                            
                        </List>
                    </View>:<Text></Text>
                }
                
                
                {/* </Provider> */}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    listTitle: {
        padding: 10,
    },
    buttonText: {
        backgroundColor: '#ecf8fa',
        color: '#40b6ce',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#40b6ce',
    },
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {configParams, construction, index} = state;
    return {configParams, construction, index}
}
export default connect(mapStateToProps)(IndexForm);