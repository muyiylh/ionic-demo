import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
class AddTable extends Component {
    static navigationOptions = ({ navigation }) => {
        const save = navigation.getParam("save");
        return {
            title: navigation.getParam('otherParam', '添加水表信息'),
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
            itemType: '',
            itemTypeList: [{"label":"10","value":1},{"label":'20',"value":2}],
        }
    }
    componentDidMount(){
         const {navigation, dispatch} = this.props;
         navigation.setParams({save: this.save})
    }
    //保存
    save = () => {
        this.props.navigation.goBack();
    }
    //改变
    onChange = (value) => {
        this.setState({itemType: value });
    }
    //添加
    add = (value) => {
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { itemTypeList , itemType , tableHead , tableData} = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>水表信息填写</Text>
                </View>
                <Provider>
                    <List style={styles.content}>
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表类型'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    水表类型:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表口径'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    水表口径:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表支数'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    水表支数:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择用水性质'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    用水性质:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表性质'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    水表性质:
                                  </Item>
                                </Picker>
                            )
                        }
                    </List>
                <View style={styles.flex}>
                    <Button type="primary" size="large" onPress={this.add} style={styles.button}>点击添加一行</Button>
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
    content: {
        marginTop: 10,
    },
});
export default createForm()(AddTable);