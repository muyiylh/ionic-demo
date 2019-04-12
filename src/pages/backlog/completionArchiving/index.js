import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';


const Item = List.Item;
const Brief = Item.Brief;
/*
竣工归档
梁丽
2019/04/10
*/

class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '现场踏勘'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={info}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>报装信息</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            data: {"name": "XXXXXX"},
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({info: this.info});
    }
    //基础信息
    info = () => {
        const { navigate } = this.props.navigation;
        navigate('infoResult');
    }

    //提交
    submit = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <Item extra={data.name} arrow="empty">
                    施工合同签订:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    通水:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    水表接收:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    费用收取:
                    </Item>
                </List>
                <Provider>
                    <List style={styles.content}>
                        {
                            getFieldDecorator('type',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请上传竣工资料'}
                                ]
                            })(
                                <FileItem title="资料上传"/>
                            )
                        }
                        
                        {
                            getFieldDecorator('acceptRemarks',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入竣工归档说明'}
                                ]
                            })(
                                <View>
                                    <Item arrow="empty">竣工归档说明:</Item>
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入竣工归档说明" rows={3} count={300} />
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
                        <Text style={styles.buttonText} onPress={this.submit}>工程完成确认归档</Text>
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