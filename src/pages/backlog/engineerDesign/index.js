import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { Row, Rows } from '../../../component/rows';
import { Col, Cols } from '../../../component/cols';
import { Table, TableWrapper } from '../../../component/table';
import { Cell } from '../../../component/cell';
import FileItem from '../../../component/file-item';



const Item = List.Item;
const Brief = Item.Brief;
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const InstallInfo = navigation.getParam("InstallInfo");
        const add_table = navigation.getParam("add_table");
        return {
            title: navigation.getParam('otherParam', '工程设计'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={InstallInfo}
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
            itemType: '',
            itemTypeList: [{"label":"10","value":1},{"label":'20',"value":2}],
            add_table_show: true,
            add_table_manage: true,
            add_table_Head: ['水表类型', '水表口径', '水表支数', '用水性质' , '水表性质'],
            add_table_Data: [
                ['1', '2', '3', '4', '4'],
                ['a', 'b', 'c', 'd', 'd'],
                ['1', '2', '3', '456', '456'],
                ['a', 'b', 'c', 'd', 'd']
            ],
            add_manage_Head: ['管道口径', '管道材质', '管道长度'],
            add_manage_Data: [
                ['1', '2', '3'],
                ['a', 'b', 'c'],
                ['1', '2', '3'],
                ['a', 'b', 'c']
            ],
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({InstallInfo: this.InstallInfo});
        navigation.setParams({add_table: this.add_table});
        navigation.setParams({add_manage: this.add_manage});
    }
    //基础信息
    InstallInfo = () => {
        const { navigate } = this.props.navigation;
        navigate('InstallInfo');
    }
    //改变
    onChange = (value) => {
      this.setState({itemType: value });
    }
    //添加水表
    add_table = () => {
        const { navigate } = this.props.navigation;
        navigate('add_tableResult');
    }
    //添加管道
    add_manage = () => {
        const { navigate } = this.props.navigation;
        navigate('add_manageResult');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { itemTypeList , itemType , add_table_show, add_manage_show , add_table_Head , add_table_Data , add_manage_Head , add_manage_Data } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>设计信息填写</Text>
                </View>
                {/* <Provider> */}
                    <List style={styles.content}>
                    {
                        getFieldDecorator('type',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请上传设计文件'}
                            ]
                        })(
                            <FileItem title="设计文件"/>
                        )
                    }
                        {
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入设计周期'}
                                ]
                            })(
                                <InputItem placeholder="请输入设计周期">设计周期:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择用户分类'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    用户分类:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择用水类别'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    用水类别:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('acceptRemarks',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入备注信息'}
                                ]
                            })(
                                <View>
                                    <Item arrow="horizontal">备注信息:</Item>
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入备注信息" rows={3} count={300} />
                                </View>
                            )
                        }
                    </List>
                {
                    add_table_show === false ? (null) : (
                        <View style={styles.container}>
                            <Text style={styles.listTitle}>水表信息</Text>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={add_table_Head} style={styles.head} textStyle={styles.text}/>
                                <Rows data={add_table_Data} textStyle={styles.text}/>
                            </Table>
                        </View>
                    )
                }
                <WhiteSpace size="lg" />
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={styles.buttonText} onPress={this.add_table}>添加水表</Text>
                        </WingBlank>
                </View>
                <WhiteSpace size="lg" />
                {
                    add_manage_show === false ? (null) : (
                        <View style={styles.container}>
                            <Text style={styles.listTitle}>管道信息</Text>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={add_manage_Head} style={styles.head} textStyle={styles.text}/>
                                <Rows data={add_manage_Data} textStyle={styles.text}/>
                            </Table>
                        </View>
                    )
                }
                <WhiteSpace size="lg" />
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={styles.buttonText} onPress={this.add_manage}>添加管道</Text>
                        </WingBlank>
                </View>
                <WhiteSpace size="lg" />
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
    content: {
        marginTop: 10,
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});
export default createForm()(Index);