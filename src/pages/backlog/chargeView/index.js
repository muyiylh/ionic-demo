import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import moment from "moment";
import { connect } from '../../../utils/dva';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
import CusInputItem from "../../../component/input-item";
import {showFormError, filterConfig, textFontSize } from "../../../utils/index";
const Item = List.Item;
const Brief = Item.Brief;
const statusList = [
    {label:"费用已完全缴清",value:0},
    {label:"未缴清",value:1},
]
/*
缴纳工程款
梁丽
2019/04/10
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
    	const installInfo = navigation.getParam("installInfo");
        return {
            title: navigation.getParam('otherParam', '缴纳工程款'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={installInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>报装信息</Text>
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
        navigation.setParams({installInfo: this.installInfo})
    }
    //报装信息
    installInfo = () => {
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        const info = navigation.state.params.info;
        navigate('InstallInfo',{info: info});
    }
    //提交
    submit = () => {
        const { navigate } = this.props.navigation;
        const { form, navigation, dispatch } = this.props;
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
                if(params.chargeTime){
                    params.chargeTime = moment(params.chargeTime).format("YYYY-MM-DD");
                }
   
                dispatch({
                    type: `chargeView/saveChargeInfo`,
                    params,
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
                        getFieldDecorator('chargeTime',{
                            validateFirst: true,
                            initialValue: new Date(),
                            rules:[
                                // {required:true, message:'请选择收费时间'}
                            ]
                        })(
                            <DatePicker
                                mode="date"
                                minDate={new Date()}
                                // maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChange}
                                format="YYYY-MM-DD"
                                >
                                <Item arrow="horizontal" extra="请选择"><Text style={textFontSize()}>收费时间:</Text></Item>
                            </DatePicker>
                        )
                    }
                    {
                        getFieldDecorator('chargeMoney',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入实收金额'}
                            ]
                        })(
                            <CusInputItem labelNumber={5} require="true">实收金额:</CusInputItem>
                            // <InputItem labelNumber={5} placeholder="请输入实收金额">实收金额:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('chargeStatus',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请选择是否结清'}
                            ]
                        })(
                            <SelectItem data={statusList}>是否结清:</SelectItem>
                        )
                    }
                    <Item arrow="empty" labelNumber={4}><Text style={textFontSize()}>收费说明:</Text></Item>
                    {
                        getFieldDecorator('remark',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入收费说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入收费说明" rows={3} count={300} style={textFontSize()}/>
                        )
                    }
                    </List>
                    <View style={{backgroundColor: '#fff',padding: 10}}>
                        <WingBlank
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                            >
                            <Text style={styles.buttonText} onPress={this.submit}>提交</Text>
                        </WingBlank>
                    </View>
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
    buttonText: {
        backgroundColor: '#ecf8fa',
        color: '#40b6ce',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 80,
        paddingRight: 80,
        color: '#40b6ce',
    },
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {chargeView, index} = state;
    return {chargeView, index}
}
export default connect(mapStateToProps)(IndexForm);