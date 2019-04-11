import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
const Item = List.Item;
const Brief = Item.Brief;
/*
添加水表
梁丽
2019/04/11
*/
class AddMeter extends Component {
    static navigationOptions = ({ navigation }) => {
    	const save = navigation.getParam("save");
        return {
            title: navigation.getParam('otherParam', '添加水表'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={save}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>保存</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            typeList: [{label: 'DN12',value: 1},{label: 'DN13',value: 2}],
            meterList: [],
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({save: this.save})
    }
    //保存
    save = () => {
        const { navigate } = this.props.navigation;
        const { form } = this.props;
        form.validateFields((error, values) => {
            console.warn('submit', error, values);
            if (error) {
                // showFormError(form.getFieldsError());
                // alert('error');
                return;
            }else{
                // alert(values);
                navigate('constructionManage',{data:{values}});
            }
        })
    }
    //改变支数
    changeCount = (value) => {
        let list = [];
        let v = Number(value);
        for(let i =0 ;i<v;i++){
            list.push({});
        }
        console.warn(typeof(value), value,list);
        this.setState({meterList: list});
    }
   
    render() {
       const { typeList, meterList } = this.state;
       const { getFieldDecorator } = this.props.form;
        return (
            <ScrollView style={styles.projectPage}>
                <Provider>
                    <List> 
                        {
                            getFieldDecorator('proposalUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表类型'}
                                ]
                            })(
                                <SelectItem data={typeList}>水表类型:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('proposalUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表口径'}
                                ]
                            })(
                                <SelectItem data={typeList}>水表口径:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('proposalUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表类别'}
                                ]
                            })(
                                <SelectItem data={typeList}>水表类别:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('count',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入水表总支数'}
                                ]
                            })(
                                <InputItem extra="支" placeholder="请输入水表总支数" type="number" labelNumber={6} onChange={this.changeCount}>水表总支数:</InputItem>
                            )
                        }
                    </List>
                    <View>
                        {meterList.map((item,index)=>{
                            return (<View>
                                <Text style={styles.listTitle}>水表{index+1}</Text>
                                <List>
                                    {
                                        getFieldDecorator(`names[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                {required:true, message:'请选择用水性质'}
                                            ]
                                        })(
                                            <SelectItem data={typeList}>用水性质:</SelectItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`number[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入条码号" labelNumber={4}>条码号:</InputItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`number[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入初始读数" labelNumber={5}>初始读数:</InputItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`picture[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请上传初始读数照片'}
                                            ]
                                        })(
                                            <FileItem title="初始读数照片"/>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`address[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入安装地址" labelNumber={5}>安装地址:</InputItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`waterAddress[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入用水地址" labelNumber={5}>用水地址:</InputItem>
                                        )
                                    }
                                </List>
                            </View>)
                        })}
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
    listTitle: {
        padding: 10,
    },
});
export default createForm()(AddMeter);