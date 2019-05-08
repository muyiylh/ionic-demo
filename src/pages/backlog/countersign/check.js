import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView , AsyncStorage} from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import SelectItem from '../../../component/select-item';
import SelectTree from '../../../component/select-tree';
import FileItem from '../../../component/file-item';
import { connect } from '../../../utils/dva';
import { fileText, textFontSize, showFormError } from '../../../utils/index';
import CheckboxItem from '../../../component/checkbox-item';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 在线会签
 * 梁丽
 * 2019-05-05
 */
const resultList = [
    {label: "同意", value: 'true'},
    {label: "不同意", value: 'false'},
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
            deptList: [{}],//会签部门
            index: 0,//选择所属部门第几个
            deptId: [],//所属部门
            deptName: [],//所属部门名称
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        const info = navigation.state.params.info;
        console.log("info------",info);
        dispatch({
            type: 'countersign/getDeptForTree',
        })
        this.findUserByDeptId3();
    }
    //获取部门下人员
    findUserByDeptId3 = async() => {
        const { dispatch } = this.props;
        let params = {};
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        params.deptId = _user.deptId;
        dispatch({
            type: 'countersign/findUserByDeptId3',
            params,
        })
    }
    componentWillReceiveProps(nextProps) {
        this.selectDept(nextProps);
    }
    
    //list
    _renderItem = (data,rowMap) => {
        const self = this;
        console.log("data----rowMap---",data,rowMap);
        const info = this.props.navigation.state.params.info;
        const returnParam = {url:'CountersignCheck',payload:{info:info}};
        const { countersign: { deptTree, userList } } = this.props; 
        const {state:{params}} = this.props.navigation;
        const { getFieldDecorator } = this.props.form;
        const { deptId, deptName } = this.state;
        console.log(" deptId---------", deptId);
        const { item, index } = data;
        return(
            <SwipeRow
                // disableRightSwipe={parseInt(rowId) % 2 !== 0}
                // disableLeftSwipe={parseInt(rowId) % 2 === 0}
                disableRightSwipe
                rightOpenValue={-70}
            >
                <TouchableHighlight style={styles.rowBack} onPress={()=>this.del(index)}>
                    <Text display={styles.rowRight}>删除</Text>
                </TouchableHighlight>
                <View style={styles.rowFront}>
                    {/* <Text>2222</Text> */}
                    <View style={styles.front}>{                   
                        getFieldDecorator(`deptId[${index}]`,{
                            validateFirst: true,
                            initialValue: deptId[index] ? deptId[index]:"",
                            rules:[
                                    {required:true, message:'请选择所属部门'}
                                ]
                        })(
                            <SelectTree required onSelect={()=> {this.changeTree(index)}} required tree="comTreeLeader" data={deptTree} extra={deptName[index]?deptName[index]:"请选择"} returnData={returnParam} title="所属部门" labelNumber="5" >所属部门:</SelectTree>
                        )
                    }</View>
                    <View style={styles.front}>{                           
                        getFieldDecorator(`appointUser[${index}]`,{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择处置人员'}
                            ]
                        })(
                            <SelectItem extra='请选择' data={userList && userList[index]?userList[index]:[]} require="true">处置人员:</SelectItem>
                        )
                    }</View>
                </View>
            </SwipeRow>
        )      
    }
    changeTree = (index) => {
        this.setState({index});
    }
        
    //获取部门下人员
    findUserByDeptId = (dept) => {
        const { dispatch } = this.props;
        const { index } = this.state;
        let params = {
            param: {
                deptId: dept,
            },
            index: index,
        };
        dispatch({
            type: 'countersign/findUserByDeptId',
            params,
        })
    }
    //选择处置部门
    selectDept = (nextProps) => {
        const { index, deptId, deptName } = this.state;
        const {state:{params}} = this.props.navigation;
        const checkInfo = params.checkInfo?params.checkInfo:{}
        const  _checkInfo = nextProps.navigation.state.params.checkInfo;
        if(_checkInfo && _checkInfo.id && checkInfo && _checkInfo.id != checkInfo.id){
            deptId[index] = _checkInfo.id;
            deptName[index] = _checkInfo.name;
            this.setState({deptId,deptName});
            this.findUserByDeptId(_checkInfo.id);
        }
    }
    //add
    add = () => {
        const { deptList } = this.state;
        let _d = JSON.parse(JSON.stringify(deptList));
        _d.push({});
        this.setState({deptList: _d});
    }
    //del
    del = (index) => {
        const { deptList } = this.state;
        let _d = JSON.parse(JSON.stringify(deptList));
        _d.splice(index,1);
        this.setState({deptList: _d});
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
                    reviewResultDesc: values.reviewResultDesc,
                    installId: info.installId,
                    installNo: info.installNo,
                    processInstanceId: info.processInstanceId,
                    waitId: info.id,
                }
                console.log("params--------",params);
                switch (info.nodeFlag) {
                    case 'JOIN_BMLDSH'://第二部--部门领导审核审核
                        let deptEmployeeList = [];
                        values.appointUser && values.appointUser.map((item, index)=>{
                            const a = {
                                subDeptLeader : values.deptId[index],//所属部门
                                subDeptPersonInCharge: item,//处置人员
                            }
                            deptEmployeeList.push(a);
                            })
                            params.deptEmployeeList = deptEmployeeList;
                        dispatch({
                            type: `countersign/bmldAudit`,
                            params
                        })
                        break;
                    case 'JOIN__CHILD_BMFZRJS'://部门负责人接收
                        params.subDeptOperatorList = values.subDeptOperatorList.split(",");
                        dispatch({
                            type: `countersign/deptFZRRecive`,
                            params
                        })
                        break;
                    case 'JOIN__CHILD_BMJBRSH'://部门经办人审核
                        dispatch({
                            type: `countersign/deptOperator`,
                            params
                        })
                        break;
                    case 'JOIN__CHILD_BMLDSH'://部门领导人审核
                        dispatch({
                            type: `countersign/deptLeader`,
                            params
                        })
                        break;
                    case 'JOIN_ZHBMYJSH'://综合部门意见并审核
                        params.managerDeptCheck = values.managerDeptCheck;
                        dispatch({
                            type: `countersign/zhbmyjCheck`,
                            params
                        })
                        break;
                    case 'JOIN_GLBMSH'://管理部门审核
                        params.managerDeptCheck = values.managerDeptCheck;
                        dispatch({
                            type: `countersign/glbmCheck`,
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
        const { countersign: {  userList3 } } = this.props;
        const info = this.props.navigation.state.params.info;
        const { deptId, index, deptList } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {/* 第二步---部门领导审核 */}
                        {info.nodeFlag == 'JOIN_BMLDSH' && <View>
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>处理意见:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入处理意见'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入处理意见" rows={3} count={300} />
                                )
                            }
                            <WhiteSpace size="lg" />
                            <WingBlank
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                >
                                <Text style={styles.buttonText} onPress={this.add}>添加会签部门</Text>
                            </WingBlank>
                            <WhiteSpace size="lg" />
                             <SwipeListView
                                useFlatList
                                data={deptList}
                                renderItem={this._renderItem}
                            />
                            
                            </View>
                            
                        }
                        {/* 第三步-- 部门负责人接收*/}
                        {info.nodeFlag == 'JOIN__CHILD_BMFZRJS' && <View>
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>处理意见:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入处理意见'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入处理意见" rows={3} count={300} />
                                )
                            }
                            {
                                getFieldDecorator('subDeptOperatorList',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择处置人员'}
                                    ]
                                })(
                                    <CheckboxItem data={userList3} required><Text style={textFontSize()}>处置人员:</Text></CheckboxItem>
                                )
                            } 
                            
                            </View>
                            
                        }
                        {/* 第四步-- 部门经办人接收，第五步------部门领导人审核*/}
                        {info.nodeFlag == 'JOIN__CHILD_BMJBRSH' || info.nodeFlag == 'JOIN__CHILD_BMLDSH' && <View>
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>处理意见:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入处理意见'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入处理意见" rows={3} count={300} />
                                )
                            }
                            
                            </View>
                            
                        }
                        {/* 第六步-- 综合部门意见并审核*/}
                        {info.nodeFlag == 'JOIN_ZHBMYJSH' || info.nodeFlag == 'JOIN_GLBMSH' && <View>
                            <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>处理意见:</Text></Item>
                            {
                                getFieldDecorator('reviewResultDesc',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请输入处理意见'}
                                    ]
                                })(
                                    <TextareaItem style={styles.multilineInput} placeholder="请输入处理意见" rows={3} count={300} />
                                )
                            }
                            {                           
                                getFieldDecorator('managerDeptCheck',{
                                    validateFirst: true,
                                    rules:[
                                        {required:true, message:'请选择审核结果'}
                                    ]
                                })(
                                    <SelectItem data={resultList} require="true">审核结果:</SelectItem>
                                )
                            }
                            
                            </View>
                            
                        }
                        
                    </List>
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
    multilineInput: textFontSize(),
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
    rowBack: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E61D1D',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
    },
    rowRight: {
        color: '#fff',
    },
    rowFront: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    front: {
        flex: 1,
        height: 40,
    }

});

const  CheckForm = createForm()(Check);
function mapStateToProps(state) {
    const {countersign, formData, index} = state;
    return {countersign, formData, index}
}
export default connect(mapStateToProps)(CheckForm);