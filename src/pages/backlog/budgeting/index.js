import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import Accordion from 'react-native-collapsible/Accordion';
const Item = List.Item;
const Brief = Item.Brief;
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
    	const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '预算编制'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={info}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>设计信息</Text>
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
    //设计信息
    info = () => {
        const { navigate } = this.props.navigation;
        navigate('designInfo');
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
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入表井(表池)'}
                            ]
                        })(
                            <InputItem labelNumber={6} extra="座">表井(表池):</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入闸门井'}
                            ]
                        })(
                            <InputItem extra="座">闸门井:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入闸阀井'}
                            ]
                        })(
                            <InputItem extra="座">闸阀井:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入消防井'}
                            ]
                        })(
                            <InputItem extra="座">消防井:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入预算总金额'}
                            ]
                        })(
                            <InputItem labelNumber={5}>预算总金额:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('type',{
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
});
export default createForm()(Index);