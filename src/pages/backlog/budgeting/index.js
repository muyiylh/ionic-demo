import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {showFormError, filterConfig, textFontSize} from "../../../utils/index";
import { connect } from '../../../utils/dva';
const Item = List.Item;
const Brief = Item.Brief;
import CusInputItems from '../../../component/input-item';
import Dept from '../../../component/dept';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
/*
预算编制
梁丽
2019/04/10
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
    	const designInfo = navigation.getParam("designInfo");
        return {
            title: navigation.getParam('otherParam', '预算编制'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={designInfo}
                    style={[{ marginRight: 10 }]}
                >
                    <Text style={[{color:'#fff',},textFontSize('#fff')]}>设计信息</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({designInfo: this.designInfo})
    }
    //设计信息
    designInfo = () => {
        const { navigate } = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        navigate('designInfo',{info: info});
    }
    //提交审核
    complete = () => {
        const { form, dispatch, navigation } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                console.log("info-----",info);
                const params = {
                    ...values,
                    waitId: info.id,
                    installId: info.installId,
                    installNo: info.installNo,
                    definedId: info.definedId,
                }
                dispatch({
                    type: `budgeting/saveProcesBudget`,
                    params,
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const takanData = [
            {"label":"是","value":'0'},
            {"label":"否","value":'1'},
        ]
        return (
            <ScrollView style={styles.projectPage}>
                {/*<Dept></Dept>*/}
                <Provider>
                <List>
                    
                    {
                        getFieldDecorator('meterWell',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入表井(表池)'}
                            ]
                        })(
                            // <InputItem labelNumber={6} extra="座">表井(表池):</InputItem>
                            <CusInputItems type="number" labelNumber={6}>表井(表池): </CusInputItems>
                        )
                    }
                    {
                        getFieldDecorator('zmWell',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入闸门井'}
                            ]
                        })(
                            <CusInputItems type="number" labelNumber={6}>闸门井: </CusInputItems>
                            // <InputItem extra="座">闸门井:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('zfWell',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入闸阀井'}
                            ]
                        })(
                            <CusInputItems type="number" labelNumber={6}>闸阀井: </CusInputItems>
                            // <InputItem extra="座">闸阀井:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('xfWell',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入消防井'}
                            ]
                        })(
                            <CusInputItems type="number" labelNumber={6}>消防井: </CusInputItems>
                            // <InputItem extra="座">消防井:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('money',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入预算总金额'}
                            ]
                        })(
                            // <InputItem labelNumber={6}>预算总金额:</InputItem>
                            <CusInputItems require="true" labelNumber={6}>预算总金额: </CusInputItems>

                        )
                    }
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请上传计价清单'}
                            ]
                        })(
                            <FileItem title="计价清单"/>
                        )
                    }
                </List>
                
                </Provider>
                <WhiteSpace size="lg" />
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        {/* <Text style={styles.buttonText} onPress={this.stop}>重新填写</Text> */}
                        <Text style={styles.buttonText} onPress={this.complete}>提交审核</Text>
                        </WingBlank>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    button: {
        paddingLeft: 20,
        paddingRight: 20,
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
        paddingLeft: 40,
        paddingRight: 40,
        color: '#40b6ce',
    },
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {budgeting, index} = state;
    return {budgeting, index}
}
export default connect(mapStateToProps)(IndexForm);