import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView , AsyncStorage} from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import SelectTree from '../../../../component/select-tree';
import FileItem from '../../../../component/file-item';
import Info from './info';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError } from '../../../../utils/index';
import { scaleSize } from '../../../../utils/ScreenUtil';
import { text_font_size } from '../../../../utils/theme';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 异常处置---审核
 * 梁丽
 * 2019-04-28
 */
const resultList = [
    {label: "同意列为异常", value: 0},
    {label: "不需要作为异常", value: 1},
]
const resultList2 = [
    {label: "同意按处置意见处置", value: 0},
    {label: "不同意处置意见", value: 1},
]
const resultList3 = [
    {label: "符合处置要求,完成处置", value: 0},
    {label: "不合格,需重新处置", value: 1},
]
const handelWayList = [
    {label: "本部门负责处置", value: 0},
    {label: "其他责任部门处置", value: 1},
]
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
            selfDept: 0,//部门审核----处置部门
            selfDept2: 1,//处置部门审核----处置部门
            lastNodeFlag: '',//上一节点的nodeFlag
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        const info = navigation.state.params.info;
        const _params = {
            id: info.id,
        }
  
        dispatch({
            type: `formData/getFormData`,
            params: _params,
        }).then(()=>{
            const { formData: { objData } } = this.props;
            let currentData = objData[objData.length - 1];
            let lastNodeFlag = '';
            for(let key in currentData){
                lastNodeFlag = key;
            }
            this.setState({lastNodeFlag});
        })
        this.findUserByDeptId();
        
        dispatch({
            type: 'exception/getDeptForTree',
        })
    }
    //获取部门下人员
    findUserByDeptId = async() => {
        const { dispatch } = this.props;
        let params = {};
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        params.deptId = _user.deptId;
        dispatch({
            type: 'exception/findUserByDeptId',
            params,
        })
    }
    //选择处置部门
    selectDept = (value) => {
        this.setState({selfDept: value});
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
                const { lastNodeFlag } = this.state;
                const { formData: { data } } = this.props; 
                const BMSHData = data.BMSH?data.BMSH[data.BMSH.length - 1]:{};
                const params = {
                    ...values,
                    installId: info.installId,
                    waitId: info.id,
                    nodeFlag: lastNodeFlag,
                    selfDept: values.selfDept || BMSHData.selfDept,
                    reviewResult: values.reviewResult || BMSHData.selfDept,
                }
                switch (info.nodeFlag) {
                    case 'BMSH'://部门审核
                        dispatch({
                            type: `exception/dealExceptionApproval`,
                            params
                        })
                        break;
                    case 'JBRTXYJ'://经办人填写意见
                        dispatch({
                            type: `exception/dealOpinion`,
                            params
                        })
                        break;
                    case 'JBRTXJG'://经办人填写结果
                        dispatch({
                            type: `exception/dealResult`,
                            params
                        })
                        break;
                    case 'CZBMSH':
                        dispatch({
                            type: `exception/dealDeptCheck`,
                            params
                        })
                        break;
                    default:
                        break;
                }
            }
        })
    }
    
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form; 
        const { exception: { deptTree, userList }, formData: { data } } = this.props; 
        const { selfDept, selfDept2, lastNodeFlag} = this.state;
        const {state:{params}} = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        const returnParam = {url:'ExceptionLeaderCheck',payload:{info:info}};
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {/* 部门审核 */}
                        {info.nodeFlag == 'BMSH' && lastNodeFlag == 'YCSQ' && <View>
                            {                           
                                getFieldDecorator('reviewResult',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择审核意见'}
                                    ]
                                })(
                                    <SelectItem data={resultList} require="true">审核意见:</SelectItem>
                                )
                            }
                            {                           
                                getFieldDecorator('selfDept',{
                                    validateFirst: true,
                                    initialValue: selfDept,
                                    rules:[
                                        {required:true, message:'请选择处置部门'}
                                    ]
                                })(
                                    <SelectItem data={handelWayList} onChange={this.selectDept} require="true">处置部门:</SelectItem>
                                )
                            }
                            {   selfDept == 0 ?                             
                                getFieldDecorator('appointUser',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择处置人员'}
                                    ]
                                })(
                                    <SelectItem data={userList} require="true">处置人员:</SelectItem>
                                ):null
                            }
                            {    selfDept == 1 ?                             
                                getFieldDecorator('deptId',{
                                    validateFirst: true,
                                    initialValue:params.checkInfo && params.checkInfo.id ? params.checkInfo.id:"",
                                    rules:[
                                            {required:true, message:'请选择所属部门'}
                                        ]
                                })(
                                <SelectTree required tree="comTreeLeader" data={deptTree} extra={params.checkInfo&&params.checkInfo.name?params.checkInfo.name:"请选择"} returnData={returnParam} title="所属部门" labelNumber="5" >所属部门:</SelectTree>
                                ):null
                            }</View>
                            
                        }
                        {/* 处置部门审核 */}
                        {info.nodeFlag == 'CZBMSH' && <View>
                            {                           
                                getFieldDecorator('selfDept',{
                                    validateFirst: true,
                                    initialValue: selfDept2,
                                    rules:[
                                        {required:true, message:'请选择处置部门'}
                                    ]
                                })(
                                    <SelectItem data={handelWayList} onChange={this.selectDept} require="true">处置部门:</SelectItem>
                                )
                            }
                            {   selfDept2 == 0 ?                             
                                getFieldDecorator('appointUser',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择处置人员'}
                                    ]
                                })(
                                    <SelectItem data={userList} require="true">处置人员:</SelectItem>
                                ):null
                            }
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>备注:</Text></Item>
                            {
                                getFieldDecorator('remark',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入备注'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入备注" rows={3} count={300} />
                                )
                            }</View>
                        }
                        {/* 经办人填写意见 */}
                        {info.nodeFlag == 'JBRTXYJ' && <View>
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核说明:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入审核说明'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入审核说明" rows={3} count={300} />
                                )
                            }</View>
                        }
                        {/* 经办人填写意见后部门审核 */}
                        {info.nodeFlag == 'BMSH' && lastNodeFlag == "JBRTXYJ" && <View>
                            {                           
                                getFieldDecorator('reviewResult',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择处置意见'}
                                    ]
                                })(
                                    <SelectItem data={resultList2} require="true">处置意见审核:</SelectItem>
                                )
                            }
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核备注说明:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入审核备注说明'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入审核备注说明" rows={3} count={300} />
                                )
                            }</View>
                        }
                        {/* 经办人填写结果 */}
                        {info.nodeFlag == 'JBRTXJG' && lastNodeFlag == "BMSH" && <View>
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>处置结果:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入处置结果'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入处置结果" rows={3} count={300}/>
                                )
                            }
                            {
                                getFieldDecorator('files',{
                                    validateFirst: true,
                                    rules:[
                                        // {required:true, message:'请上传计价清单'}
                                    ]
                                })(
                                    <FileItem title="上传附件"/>
                                )
                            }
                            </View>
                        }
                        {/* 经办人填写结果后部门审核 */}
                        {info.nodeFlag == 'BMSH' && lastNodeFlag == "JBRTXJG" && <View>
                            {                           
                                getFieldDecorator('reviewResult',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择处置结果审核'}
                                    ]
                                })(
                                    <SelectItem data={resultList3} require="true">处置结果审核:</SelectItem>
                                )
                            }
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>审核备注说明:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入审核备注说明'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入审核备注说明" rows={3} count={300} />
                                )
                            }</View>
                        }
                    </List>
                    <Info navigation={this.props.navigation} data={data} lastNodeFlag={lastNodeFlag}/>
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

const  LeaderCheckForm = createForm()(LeaderCheck);
function mapStateToProps(state) {
    const {exception, formData, index} = state;
    return {exception, formData, index}
}
export default connect(mapStateToProps)(LeaderCheckForm);