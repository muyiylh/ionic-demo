import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import { showFormError, textFontSize } from '../../../utils/index';
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
        const installInfo = navigation.getParam("installInfo");
        return {
            title: navigation.getParam('otherParam', '竣工归档'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={installInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>报装信息</Text>
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
    componentDidMount() {
        const { navigation, dispatch } = this.props;
        navigation.setParams({installInfo: this.installInfo});
        const info = navigation.state.params.info;
        const params = {
            installId: info.installId,
            waitId: info.waitId,
        }
        dispatch({
            type: `completionArchiving/getArchiving`,
            params,
        })
    }
    //基础信息
    installInfo = () => {
        const { navigate } = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        navigate('InstallInfo',{info:info});
    }

    //提交
    submit = () => {
        const { navigation, dispatch, form } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    waitId: info.id,
                    installId: info.installId,
                    // installNo: info.installNo,
                    // definedId: info.definedId,
                }
                console.log("params------",params);
                dispatch({
                    type: `completionArchiving/add`,
                    params,
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { completionArchiving: { data }} = this.props;
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <Item extra={data.contractStatus == 0?'已完成':'未完成'} arrow="empty">
                    施工合同签订:
                    </Item>
                    <Item extra={data.waterStatus == 0?'已完成':'未完成'} arrow="empty">
                    通水:
                    </Item>
                    <Item extra={data.transferAccountStatus == 0?'已完成':'未完成'} arrow="empty">
                    水表接收:
                    </Item>
                    <Item extra={data.paymentStatus == 0?'已完成':'未完成'} arrow="empty">
                    费用收取:
                    </Item>
                </List>
                {/* <Provider> */}
                    <List style={styles.content}>
                        {
                            getFieldDecorator('files',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请上传竣工资料'}
                                ]
                            })(
                                <FileItem title="资料上传"/>
                            )
                        }
                        <Item arrow="empty"><Text style={textFontSize()}>竣工归档说明:</Text></Item>
                        {
                            getFieldDecorator('remark',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入竣工归档说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入竣工归档说明" rows={3} count={300} />
                            )
                        }
                    </List>
                {/* </Provider> */}
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
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {completionArchiving, index} = state;
    return {completionArchiving, index}
}
export default connect(mapStateToProps)(IndexForm);