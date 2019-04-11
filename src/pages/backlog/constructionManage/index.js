import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
const Item = List.Item;
const Brief = Item.Brief;
/*
工程施工
梁丽
2019/04/11
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
    	const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '施工管理'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={info}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>施工进度</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            combiConduitList: [{}],//管道铺设
            caliberList: [{label:"DN10",value:0},{label:"DN20",value:1}],//口径选择
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({info: this.info})
    }
    //施工进度信息
    info = () => {
        const { navigate } = this.props.navigation;
        navigate('processInfo');
    }
    //保存
    save = () => {

    }
    //管道一行
    addPipe  = () => {
        const { combiConduitList } = this.state;
        let list = JSON.parse(JSON.stringify(combiConduitList));
        list.push({});
        this.setState({combiConduitList: list});
    }
    //添加水表
    addMeter = () => {
        const { navigate } = this.props.navigation;
        navigate('addMeter');
    }
   
    render() {
       const { combiConduitList, caliberList } = this.state;
       const { getFieldDecorator } = this.props.form;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>设计信息填写</Text>
                </View>
                <Provider>
                    <List> 
                        {
                            getFieldDecorator('proposalUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入开挖土方量'}
                                ]
                            })(
                                <InputItem extra="元立方米(m³)" placeholder="请输入开挖土方量" labelNumber={6}>开挖土方量:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('proposalUser',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入回填土方量'}
                                ]
                            })(
                                <InputItem extra="元立方米(m³)" placeholder="请输入回填土方量"labelNumber={6}>回填土方量:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('type',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请上传进场时间文件'}
                                ]
                            })(
                                <FileItem title="进场时间"/>
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
                        <Text style={styles.buttonText} onPress={this.save}>保存</Text>
                        </WingBlank>
                </View>
                <View>
                    <Text style={styles.listTitle}>施工日志填写</Text>
                </View>
                <Provider>
                    <List> 
                        {
                            getFieldDecorator('constructDate',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请选择提出时间'}
                                ]
                            })(
                                <DatePicker
                                    mode="date"
                                    minDate={new Date(2015, 7, 6)}
                                    maxDate={new Date(2026, 11, 3)}
                                    onChange={this.onChange}
                                    format="YYYY-MM-DD"
                                    >
                                    <Item arrow="horizontal" extra="请选择">施工日期:</Item>
                                </DatePicker>
                            )
                        }
                        {
                            getFieldDecorator('earthFinished',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入开挖土方量'}
                                ]
                            })(
                                <InputItem extra="m³" placeholder="请输入开挖土方量" labelNumber={6}>开挖土方量:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('backfillEarthCounts',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入回填土方量'}
                                ]
                            })(
                                <InputItem extra="m³" placeholder="请输入回填土方量" labelNumber={6}>回填土方量:</InputItem>
                            )
                        }
                        <View>
                            <Text style={styles.listTitle}>管道铺设</Text>
                        </View>
                        {combiConduitList.map((item, index)=>{
                            return(
                                <View style={styles.caliberBlock}>
                                    <List>
                                        {
                                            getFieldDecorator('caliber',{
                                                validateFirst: true,
                                                rules:[
                                                    {required:true, message:'请选择口径'}
                                                ]
                                            })(
                                                <SelectItem data={caliberList}>口径:</SelectItem>
                                            )
                                        }
                                        {
                                            getFieldDecorator('length',{
                                                validateFirst: true,
                                                rules:[
                                                    {required:true, message:'请输入长度'}
                                                ]
                                            })(
                                                <InputItem extra="米" placeholder="请输入长度">长度:</InputItem>
                                            )
                                        }
                                        <View>
                                            {index == 0?<Text style={styles.buttonText} onPress={this.addPipe}>增加一项</Text>:<Text></Text>}
                                        </View>
                                    </List>
                                </View>
                            )
                        })}
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
                        <Text style={styles.buttonText} onPress={this.addMeter}>添加水表</Text>
                        
                        
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
                        <Text style={styles.buttonText} onPress={this.save}>保存</Text>
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
    listTitle: {
        padding: 10,
    },
    caliberBlock: {
        paddingBottom: 10,
        backgroundColor: '#EBEEF5',
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