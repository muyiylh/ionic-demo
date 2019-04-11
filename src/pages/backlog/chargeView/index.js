import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
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
    	const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '缴纳工程款'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={info}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>报装信息</Text>
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
        navigation.setParams({info: this.info})
    }
    //报装信息
    info = () => {
        const { navigate } = this.props.navigation;
        navigate('infoResult');
    }
    //提交
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
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <ScrollView style={styles.projectPage}>
                <Provider>
                    <List>
                    {
                        getFieldDecorator('chargeTime',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请选择收费时间'}
                            ]
                        })(
                            <DatePicker
                                mode="date"
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChange}
                                format="YYYY-MM-DD"
                                >
                                <Item arrow="horizontal" extra="请选择">收费时间:</Item>
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
                            <InputItem labelNumber={5} placeholder="请输入实收金额">实收金额:</InputItem>
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
                    {
                        getFieldDecorator('content',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入收费说明'}
                            ]
                        })(
                            <View>
                                <Item arrow="empty" labelNumber={4}>收费说明:</Item>
                                <TextareaItem style={styles.multilineInput} placeholder="请输入收费说明" rows={3} count={300} />
                            </View>
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
export default createForm()(Index);