import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import moment from "moment";
import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {List, InputItem, TextareaItem} from '@ant-design/react-native';
import {deviceHeight, deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import {text_font_size} from '../../../utils/theme';
import {showFormError, textFontSize} from "../../../utils/index";
import CusListItem from "../../../component/list-item";
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
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>保存</Text>
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
        const { form, advisory:{ data }} = this.props;
        const { getFieldDecorator } = form;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>咨询详情</Text>
                </View>
                <List>
                    <CusListItem extra={data.name}>客户名称:</CusListItem>
                    <CusListItem extra={data.userName}>咨询人:</CusListItem>
                    <CusListItem extra={data.phoneNumber}>联系方式:</CusListItem>
                    <CusListItem extra={moment(data.creatAt).format("YYYY-MM-DD HH:mm:ss")}>咨询时间:</CusListItem>
                    <CusListItem extra={data.typeName}>咨询类型:</CusListItem>
                    <CusListItem extra={data.appoint}>指派人员:</CusListItem>
                    <CusListItem extra={data.problemDescription} multipleLine={true}>咨询内容:</CusListItem>
                </List>
                <List style={styles.content}>
                    <Item>
                    <Text style={textFontSize()}>回复内容</Text>
                    {  
                        getFieldDecorator('replyContent',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在此处填写您的回复内容'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请在此处填写您的回复内容" rows={3} count={150}/>
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
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize: scaleSize(text_font_size),
    },
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {advisory, index} = state;
    return {advisory, index}
}
export default connect(mapStateToProps)(IndexForm);