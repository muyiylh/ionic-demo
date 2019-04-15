import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import CreditInfo from './creditInfo';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 资信度---领导审核
 * 梁丽
 * 2019-04-13
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
class Depaetment extends Component {
    static navigationOptions = ({ navigation }) => {
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', '资信度-领导审核'),
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
                            getFieldDecorator('result',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择审核意见'}
                                ]
                            })(
                                <SelectItem data={resultList}>审核意见:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('remarks',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入审核说明'}
                                ]
                            })(
                                <View>
                                    <Item arrow="horizontal">审核说明:</Item>
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入审核说明" rows={3} count={300} />
                                </View>
                            )
                        }
                        
                    </List>
                    <CreditInfo navigation={this.props.navigation} />
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

export default createForm()(Depaetment);