import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem} from '@ant-design/react-native';
// import {showFormError} from "../../../utils/index";
const Item = List.Item;
const Brief = Item.Brief;
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '咨询回复'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={this.save}
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
    //保存
    save = () => {
        const {form, dispatch} = this.props;
        form.validateFields((error, values) => {
            console.log('submit', error, values)
            if (error) {
                // showFormError(form.getFieldsError());
                alert('error');
                return;
            }
            alert(values.replyContent);
        })
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
        const {getFieldDecorator} = form;
        const consultTypes=[];
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
                    <Item extra={data.creatAt} arrow="empty">
                        咨询时间:
                    </Item>
                    <Item extra={data.type} arrow="empty">
                        咨询类型:
                    </Item>
                    <Item extra={data.appoint} arrow="empty">
                        指派人员:
                    </Item>
                </List>
                <List style={styles.content}>
                    <Item
                        wrap
                        extra=""
                        multipleLine
                        align="top"
                        arrow="empty"
                    >
                        咨询内容:
                        {/*<Brief>{data.problemDescription}</Brief>*/}
                        <Text>{data.problemDescription}</Text>
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
export default createForm()(Index);