import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import moment from "moment";
import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {List, InputItem, TextareaItem} from '@ant-design/react-native';
import {deviceHeight, deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import {showFormError} from "../../../utils/index";
const Item = List.Item;
const Brief = Item.Brief;
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const save = navigation.getParam("save");
        return {
            title: navigation.getParam('otherParam', '咨询回复'),
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
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `advisory/getDetail`,
            params,
        })
        navigation.setParams({save: this.save});
    }
    //保存
    save = () => {
        const { form, dispatch, navigation, advisory:{ data } } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                console.log("info-----",info);
                const params = {
                    replyContent: values.replyContent,
                    acceptId: data.acceptId,
                    id: data.id,
                    orderPersonId: data.orderPersonId,
                }
                dispatch({
                    type: `advisory/deal`,
                    params,
                })
            }
        })
    }
    render() {
        // const data = {
        //     name: "YYYY",
        //     userName: "YYYY",
        //     phoneNumber: "YYYY",
        //     creatAt: "2019-04-09",
        //     type: "YYYY",
        //     appoint: "YYYY",
        //     problemDescription: "辅助文字内容辅助文字内容辅助文字内容辅助文字内容",
        // }
        const { form, advisory:{ data }} = this.props;
        const { getFieldDecorator } = form;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>咨询详情</Text>
                </View>
                <List>
                    <Item extra={data.name} arrow="empty">
                        客户名称:
                    </Item>
                    <Item extra={data.userName} arrow="empty">
                        咨询人:
                    </Item>
                    <Item extra={data.phoneNumber} arrow="empty">
                        联系方式:
                    </Item>
                    <Item extra={moment(data.creatAt).format("YYYY-MM-DD HH:mm:ss")} arrow="empty">
                        咨询时间:
                    </Item>
                    <Item extra={data.typeName} arrow="empty">
                        咨询类型:
                    </Item>
                    <Item extra={data.appoint} arrow="empty">
                        指派人员:
                    </Item>
                    <Item
                        wrap
                        extra=""
                        multipleLine
                        align="top"
                        arrow="empty"
                    >
                        咨询内容:
                        {/*<Brief>{data.problemDescription}</Brief>*/}
                        <Text style={{fontSize: scaleSize(34)}}>{data.problemDescription}</Text>
                    </Item>
                </List>
                <List style={styles.content}>
                    <Item>
                    回复内容
                    {  
                        getFieldDecorator('replyContent',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在此处填写您的回复内容'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请在此处填写您的回复内容" rows={3} count={150} />
                        )
                    }
                    </Item>
                </List>
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
    }
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {advisory, index} = state;
    return {advisory, index}
}
export default connect(mapStateToProps)(IndexForm);