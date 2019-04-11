import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
/*
报装受理
梁丽
2019/04/09
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const search = navigation.getParam("search");
        return {
            title: navigation.getParam('otherParam', '报装受理'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={search}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>智能检索</Text>
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
        navigation.setParams({search: this.search})
    }
    //检索
    search = () => {
        const { navigate } = this.props.navigation;
        navigate('searchResult');
    }
    //生成报装号
    generatorInstallNo = () => {
        const {form, dispatch} = this.props;
        from.setFieldsValue({installNo: '1233333'});
    }
    //改变
    onChange = (value) => {
      this.setState({itemType: value });
    }
    //暂不受理
    stop = () => {

    }
    //完成受理
    complete = () => {

    }
    render() {
        const data = {
            name: "YYYY",
            userName: "YYYY",
            phoneNumber: "YYYY",
            creatAt: "2019-04-09",
            type: "YYYY",
            appoint: "YYYY",
            problemDescription: "辅助文字内容辅助文字内容辅助文字内容辅助文字内容",
        }
        const {form} = this.props;
        const { itemTypeList } = this.state;
        const {getFieldDecorator, getFieldProps} = form;
        const consultTypes=[];
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>报装信息</Text>
                </View>
                <List>
                    <Item extra={data.name} arrow="empty">
                        报装方式:
                    </Item>
                    <Item extra={data.userName} arrow="empty">
                        统一社会信用代码:
                    </Item>
                    <Item extra={data.phoneNumber} arrow="empty">
                        单位名称:
                    </Item>
                    <Item extra={data.creatAt} arrow="empty">
                        单位地址:
                    </Item>
                    <Item extra={data.type} arrow="empty">
                        用水地址:
                    </Item>
                    <Item extra={data.appoint} arrow="empty">
                        负责人:
                    </Item>
                    <Item extra={data.appoint} arrow="empty">
                        负责人电话:
                    </Item>
                    <Item extra={data.appoint} arrow="empty">
                        经办人:
                    </Item>
                    <Item extra={data.appoint} arrow="empty">
                        经办人电话:
                    </Item>
                </List>
                <View>
                    <Text style={styles.listTitle}>受理信息录入</Text>
                </View>
                <Provider>
                    <List style={styles.content}>
                        <InputItem
                            {...getFieldProps('registerusername', {
                                initialValue: '122222'
                            })}
                            clear
                            placeholder="6-12位字母或数字"
                        >用户名:
                        </InputItem>
                        {  
                            getFieldDecorator('installNo',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请生成报装号'}
                                ]
                            })(
                            
                                <View>
                                    <WingBlank
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                        <InputItem readOnly>报装号:</InputItem>
                                        <Button type="primary" size="small" onPress={this.generatorInstallNo}>
                                        生成报装号
                                        </Button>
                                    </WingBlank>
                                    
                                </View>
                            )
                        }
                        {  
                            getFieldDecorator('projectName',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请在输入项目名称'}
                                ]
                            })(
                                <InputItem placeholder="请在输入项目名称" labelNumber={4}>项目名称:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('itemType',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请在选择项目类别'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    项目类别:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('companyType',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请在选择企业类别'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    企业类别:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('marketingUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请在选择营销单位'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    营销单位:
                                  </Item>
                                </Picker>
                            ) 
                        }
                        {
                            getFieldDecorator('designUnit',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请在选择设计单位'}
                                ]
                            })(
                                <Picker
                                  data={itemTypeList}
                                  cols={2}
                                  onChange={this.onChange}
                                >
                                  <Item arrow="horizontal" onPress={this.onChange}>
                                    设计单位:
                                  </Item>
                                </Picker>
                            )
                        }
                        {
                            getFieldDecorator('agreedTime',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请在选择预约踏勘日期'}
                                ]
                            })(
                                <DatePicker
                                  // value={this.state.value}
                                  mode="date"
                                  minDate={new Date(2015, 7, 6)}
                                  maxDate={new Date(2026, 11, 3)}
                                  onChange={this.onChangeDate}
                                  format="YYYY-MM-DD"
                                >
                                  <Item arrow="horizontal">预约踏勘:</Item>
                                </DatePicker>
                            )
                        }
                        {
                            getFieldDecorator('acceptRemarks',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入受理说明'}
                                ]
                            })(
                                <View>
                                    <Item arrow="horizontal">受理说明:</Item>
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入受理说明" rows={3} count={300} />
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
                        <Text style={styles.buttonText} onPress={this.stop}>暂不受理</Text>
                        <Text style={styles.buttonText} onPress={this.complete}>完成受理</Text>
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