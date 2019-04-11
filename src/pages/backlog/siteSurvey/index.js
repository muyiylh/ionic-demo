import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';


const Item = List.Item;
const Brief = Item.Brief;
/*
现场踏勘
梁丽
2019/04/10
*/


const signList =  [
    {"label":"接水",value:0},
    {"label":"报装",value:1},
    {"label":"接水+报装",value:2},
];
const obj_cla = [
    {"label":"新装水表",value:0},
    {"label":"水表改造",value:1},
    {"label":"改迁表",value:2},
    {"label":"水表增容",value:3},
    {"label":"水表减容",value:4},
    {"label":"升降表",value:5},
];
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const sceneInfo = navigation.getParam("sceneInfo");
        return {
            title: navigation.getParam('otherParam', '现场踏勘'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={sceneInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>基础信息</Text>
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
        navigation.setParams({sceneInfo: this.sceneInfo});
    }
    //基础信息
    sceneInfo = () => {
        const { navigate } = this.props.navigation;
        navigate('sceneInfoResult');
    }

    //重新填写
    stop = () => {

    }
    //提交审核
    complete = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>踏勘信息录入</Text>
                </View>
                <Provider>
                    <List style={styles.content}>
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入约定踏勘日期'}
                                ]
                            })(
                                <InputItem placeholder="请输入约定踏勘日期" labelNumber={7}>约定踏勘日期:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入实际踏勘日期'}
                                ]
                            })(
                                <InputItem placeholder="请输入实际踏勘日期" labelNumber={7}>实际踏勘日期:</InputItem>
                            )
                        }
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请上传踏勘现场文件'}
                            ]
                        })(
                            <FileItem title="踏勘现场文件"/>
                        )
                    }
                    {
                        getFieldDecorator('signFlag',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择流转方式'}
                            ]
                        })(
                            <SelectItem data={signList}>流转方式:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('acceptRemarks',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入与用户沟通情况'}
                            ]
                        })(
                            <View>
                                <Item arrow="horizontal">与用户沟通情况:</Item>
                                <TextareaItem style={styles.multilineInput} placeholder="请输入与用户沟通情况" rows={3} count={300} />
                            </View>
                        )
                    }
                    </List>
                    <View>
                        <Text style={styles.listTitle}>多层住宅</Text>
                    </View>
                    <List>
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入居民户数'}
                                ]
                            })(
                                <InputItem placeholder="请输入居民户数" labelNumber={7}>居民户数（户）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入隔断商铺'}
                                ]
                            })(
                                <InputItem placeholder="请输入隔断商铺" labelNumber={7}>隔断商铺（户）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入其它'}
                                ]
                            })(
                                <InputItem placeholder="请输入其它" labelNumber={7}>其它:</InputItem>
                            )
                        }
                    </List>
                    <View>
                        <Text style={styles.listTitle}>高层住宅</Text>
                    </View>
                    <List>
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入居民户数'}
                                ]
                            })(
                                <InputItem placeholder="请输入居民户数" labelNumber={7}>居民户数（户）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入隔断商铺'}
                                ]
                            })(
                                <InputItem placeholder="请输入隔断商铺" labelNumber={7}>隔断商铺（户）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入其它'}
                                ]
                            })(
                                <InputItem placeholder="请输入其它" labelNumber={7}>其它:</InputItem>
                            )
                        }
                    </List>
                    <View>
                        <Text style={styles.listTitle}>非住宅建筑</Text>
                    </View>
                    <List>
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入建筑面积'}
                                ]
                            })(
                                <InputItem placeholder="请输入建筑面积" labelNumber={9}>建筑面积（m³）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入隔断商铺'}
                                ]
                            })(
                                <InputItem placeholder="请输入隔断商铺" labelNumber={7}>隔断商铺（户）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入其它'}
                                ]
                            })(
                                <InputItem placeholder="请输入其它" labelNumber={7}>其它:</InputItem>
                            )
                        }
                    </List>
                    <View>
                        <Text style={styles.listTitle}>其他</Text>
                    </View>
                    <List>
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入建筑面积'}
                                ]
                            })(
                                <InputItem placeholder="请输入建筑面积" labelNumber={9}>建筑面积（m³）:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入其它'}
                                ]
                            })(
                                <InputItem placeholder="请输入其它" labelNumber={7}>其它:</InputItem>
                            )
                        }
                    {
                        getFieldDecorator('signFlag',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择工程类别'}
                            ]
                        })(
                            <SelectItem data={obj_cla}>工程类别:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('acceptRemarks',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入现场总体说明'}
                            ]
                        })(
                            <View>
                                <Item arrow="horizontal">现场总体说明:</Item>
                                <TextareaItem style={styles.multilineInput} placeholder="请输入现场总体说明" rows={3} count={300} />
                            </View>
                        )
                    }
                    {
                        getFieldDecorator('acceptRemarks',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入备注'}
                            ]
                        })(
                            <View>
                                <Item arrow="horizontal">备注:</Item>
                                <TextareaItem style={styles.multilineInput} placeholder="请输入备注" rows={3} count={300} />
                            </View>
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
                        <Text style={styles.buttonText} onPress={this.stop}>重新填写</Text>
                        <Text style={styles.buttonText} onPress={this.complete}>提交审核</Text>
                        </WingBlank>
                </View>

                <WhiteSpace size="lg" />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    content: {
        marginTop: 10,
    },
    listTitle: {
        padding: 10,
    },
    button: {
        paddingLeft: 60,
        paddingRight: 60,
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
export default createForm()(Index);