import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
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
                    <Text style={{color:'#fff',fontSize:20}}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props)
        this.state = {
            modeList: [
                {"label":"预算代决算",value:0},
                {"label":"预算+决算",value:1},
            ],
            typeList: [
                {"label":"范本合同",value:0},
                {"label":"非范本合同",value:1},
            ],
            versionList: [
                {"label":"盖章",value:0},
                {"label":"用户盖章",value:1},
            ], 
            objection: false,
            talk: false,
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit})
    }
    //提交信息
    submit = () => {
        const { navigate } = this.props.navigation;
        const { form } = this.props;
        form.validateFields((error, values) => {
            console.log('submit', error, values)
            if (error) {
                // showFormError(form.getFieldsError());
                alert('error');
                return;
            }else{
                alert('提交啦！！！');
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
    render() {
        const { getFieldDecorator } = this.props.form; 
        const { modeList, typeList, versionList, objection, talk } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <Provider>
                <View>
                    <Text style={styles.listTitle}>合同基础信息</Text>
                </View>
                <List>
                    {
                        getFieldDecorator('signFlag',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择是否签署'}
                            ]
                        })(
                            <SelectItem data={signList}>是否签署:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('chargeMode',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择收费模式'}
                            ]
                        })(
                            <SelectItem data={modeList}>收费模式:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择合同类型'}
                            ]
                        })(
                            <SelectItem data={typeList}>合同类型:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('version',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择合同版本'}
                            ]
                        })(
                            <SelectItem data={versionList}>合同版本:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('payType',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入支付方式'}
                            ]
                        })(
                            <InputItem labelNumber={5}>支付方式:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入合同金额'}
                            ]
                        })(
                            <InputItem labelNumber={5}>合同金额:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请上传合同文件'}
                            ]
                        })(
                            <FileItem title="合同文件"/>
                        )
                    }
                    
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
                                getFieldDecorator('proposalDate',{
                                    validateFirst: true,
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
                                        <Item arrow="horizontal" extra="请选择">提出时间</Item>
                                    </DatePicker>
                                )
                            }
                            {
                                getFieldDecorator('proposalUser',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入提出人'}
                                    ]
                                })(
                                    <InputItem >提出人:</InputItem>
                                )
                            }
                            {
                                getFieldDecorator('phoneNumber',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入联系方式'}
                                    ]
                                })(
                                    <InputItem labelNumber={5}>联系方式:</InputItem>
                                )
                            }
                            {
                                getFieldDecorator('content',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入异议内容'}
                                    ]
                                })(
                                    <View>
                                        <Item arrow="empty" labelNumber={4}>异议内容:</Item>
                                        <TextareaItem style={styles.multilineInput} placeholder="请输入异议内容" rows={3} count={300} />
                                    </View>
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
                                getFieldDecorator('date',{
                                    validateFirst: true,
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
                                        <Item arrow="horizontal" extra="请选择">提出时间</Item>
                                    </DatePicker>
                                )
                            }
                            {
                                getFieldDecorator('result',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择洽谈结果'}
                                    ]
                                })(
                                    <SelectItem data={resultList}>洽谈结果:</SelectItem>
                                )
                            }
                            
                            {
                                getFieldDecorator('specification',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入洽谈说明'}
                                    ]
                                })(
                                    <View>
                                        <Item arrow="empty">洽谈说明:</Item>
                                        <TextareaItem style={styles.multilineInput} placeholder="请输入洽谈说明" rows={3} count={300} />
                                    </View>
                                )
                            }
                            {
                                getFieldDecorator('type',{
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
                
                
                </Provider>
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
export default createForm()(Index);