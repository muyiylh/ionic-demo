import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '工程设计'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={info}
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
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({info: this.info})
    }
    //基础信息
    info = () => {
        const { navigate } = this.props.navigation;
        navigate('infoResult');
    }
    //改变
    onChange = (value) => {
      this.setState({itemType: value });
    }
    //导入水表清单
    impo = () => {

    }
    //添加一行
    add = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { itemTypeList , itemType , tableHead , tableData} = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>设计信息填写</Text>
                </View>
                <Provider>
                    <List style={styles.content}>
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
                <View style={styles.flex}>
                    <Button type="primary" size="large" onPress={this.impo} style={styles.button}>添加水表</Button>
                    <Button type="primary" size="large" onPress={this.add} style={styles.button}>添加管道</Button>
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
    content: {
        marginTop: 10,
    },
    listTitle: {
        padding: 10,
    },
    button: {
        paddingLeft: 60,
        paddingRight: 60,
        flex: 1
    },
    flex: {
        flex: 1,
    }
});
export default createForm()(Index);