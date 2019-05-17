import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import Info from './info';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError } from '../../../../utils/index';
import { scaleSize } from '../../../../utils/ScreenUtil';
import { text_font_size } from '../../../../utils/theme';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 客户暂停--领导审核
 * 梁丽
 * 2019-04-28
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
const handelWayList = [
    {label: "继续报装", value: 'continue'},
    {label: "暂停报装", value: 'pause'},
]
class Check extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.state.params.info;
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', info.taskName),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={submit}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            type: '',
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        const info = navigation.state.params.info;
    }
    //提交信息
    submit = () => {
        const { form, navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{

                const params = {
                    ...values,
                    installId: info.installId,
                    waitId: info.id,
                }
                dispatch({
                    type: `pause/dealDeptCheck`,
                    params
                })
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form; 
        const { type } = this.state;
        const info = this.props.navigation.state.params.info;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核结果说明:</Text></Item>
                        {
                            getFieldDecorator('reviewResultDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入审核结果说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入审核结果说明" rows={3} count={300} />
                            )
                        }
                        
                    </List>
                    <Info navigation={this.props.navigation}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    require:{
        color:"#ff5151"
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize: scaleSize(text_font_size),
    },
});

const  CheckForm = createForm()(Check);
function mapStateToProps(state) {
    const {pause, formData, index} = state;
    return {pause, formData, index}
}
export default connect(mapStateToProps)(CheckForm);