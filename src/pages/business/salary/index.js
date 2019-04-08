import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem} from '@ant-design/react-native';
import AddrItem from '../../../component/addr-item';
import SelectItem from '../../../component/select-item';
 class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '新增薪信度'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={() => alert('This is a button!')}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>保存</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
    }
    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        const consultTypes=[];
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    {
                        getFieldDecorator('name',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入单位/用户名称'}
                            ]
                        })(
                            <InputItem placeholder="请输入单位/用户名称">用户名称</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('address',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择单位/用户地址'}
                            ]
                        })(
                            <InputItem placeholder="请输入单位/用户名称">用户名称</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('waterAddress',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择用水地址'}
                            ]
                        })(
                            <InputItem placeholder="请输入单位/用户名称">用户名称</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择咨询类型'}
                            ]
                        })(
                            <SelectItem data={consultTypes}>咨询类型</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('userName',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入您的姓名'}
                            ]
                        })(
                            <InputItem placeholder="请输入您的姓名">您的姓名</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('phoneNumber',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入联系方式'}
                            ]
                        })(
                            <InputItem type="phone" placeholder="请输入联系方式,方便我们联系您">联系方式</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('problemDescription',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入你要咨询的内容'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} rows={8} placeholder="请输入你要咨询的内容" count={150} />
                        )
                    }
                </List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});
export default createForm()(Index);