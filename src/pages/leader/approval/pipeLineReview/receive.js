import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import PipeLineInfo from './pipeLineInfo';
import { connect } from '../../../../utils/dva';
import {showFormError, filterConfig, textFontSize} from "../../../../utils/index";
import SelectTree from "../../../../component/select-tree";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 管道复核--通知管网单位接收，，，测压---指定现场测压人
 * 梁丽
 * 2019-05-08
 */

class LeaderCheck extends Component {
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
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        dispatch({
            type: 'pipeLineLeaderCheck/queryCurrentDepts',
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.navigation.state.params != nextProps.navigation.state.params &&  nextProps.navigation.state.params.checkInfo){
            const {dispatch} = this.props;
            const {id} =  nextProps.navigation.state.params.checkInfo;
            this.queryUserByPage(id);
        }
    }
    //获取部门下人员
    queryUserByPage = async(id) => {
        const { dispatch } = this.props;
        let params = {};
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        params.deptId = id;
        params.userId = _user.id;
        dispatch({
            type: 'pipeLineLeaderCheck/queryUserByPage',
            params,
        })
    }
    //提交信息
    submit = () => {
        const { form, dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const { pipeLineLeaderCheck: { userList } } = this.props;
                let executeName = '';
                userList.map((item)=>{
                    if(item.value == values.appointUserId){
                        executeName = item.label;
                    }
                })
                const params = {
                    executeId: values.appointUserId,
                    executeName: executeName,
                    installId: info.installId,
                    installNo: info.installNo,
                    waitId: info.id,
                }
                switch(info.nodeFlag){
                    case 'GDFHTZGWDWJS'://管网复核--通知管网单位接收
                        dispatch({
                            type: `pipeLineLeaderCheck/pipelineReviewAssignDealPerson`,
                            params
                        })
                        break; 
                    case 'CYZDCYR'://现场测压------指定现场测压人
                        dispatch({
                            type: `pressureTest/assignDealPerson`,
                            params
                        })
                        break; 
                }
            }
        })
    }
    
    render() {
        const {state:{params}} = this.props.navigation;
        const { getFieldDecorator } = this.props.form; 
        const returnParam = {url:'PipeLineReviewReceive',payload:{}};
        const { pipeLineLeaderCheck: { deptTree, userList } } = this.props;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {
                            getFieldDecorator('deptId',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请选择部门'}
                                ]
                            })(
                                    <SelectTree required data={deptTree} extra={params.checkInfo&&params.checkInfo.name?params.checkInfo.name:"请选择"} returnData={returnParam} title="选择部门" labelNumber="5" >
                                        选择部门:
                                    </SelectTree>
                            )
                        }
                        {   params.checkInfo&&params.checkInfo.name && userList.length>0 &&
                            getFieldDecorator('appointUserId',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择负责人'}
                                ]
                            })(
                                <SelectItem require data={userList}>负责人:</SelectItem>
                            )
                        }
                       
                        
                    </List>
                {/* <PipeLineInfo navigation={this.props.navigation}/> */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
});
function mapStateToProps(state) {
    const {pipeLineLeaderCheck, pressureTest, index} = state;
    return {pipeLineLeaderCheck, pressureTest, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);