import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
import {showFormError, filterConfig, textFontSize} from "../../../utils/index";
import BuildItem from '../../../component/report/build-item';
import CheckboxItem from '../../../component/checkbox-item';
import moment from 'moment';


const Item = List.Item;
const Brief = Item.Brief;
/*
现场踏勘
梁丽
2019/04/10
*/


const processClassifyList =  [
    {"label":"接水",value:'A'},
    {"label":"报装",value:"B"},
    {"label":"接水+报装",value:"C"},
];
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const installInfo = navigation.getParam("installInfo");
        return {
            title: navigation.getParam('otherParam', '现场踏勘'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={installInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>基础信息</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            agreedTime: '',//约定踏勘日期  
            actualTime: new Date(),//实际踏勘日期
            changeTime: false,
            constuctQkVO: {},//建筑信息
            projectType:'',
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({installInfo: this.installInfo});
        const info = navigation.state.params.info;
        const params = {
            installNo: info.installNo,
        }
        dispatch({
            type: `configParams/queryConfigParams`,
        })
        dispatch({
            type: `installInfo/getInstallInfoByInstallNo`,
            params,
        }).then(()=>{
            const { data } = this.props.installInfo;
            const time = new Date(data.agreedTime);
            this.setState({agreedTime: time, constuctQkVO: data.constuctQkVO,projectType: data.projectType});
        })
    }
    //基础信息
    installInfo = () => {
        const { navigate } = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        navigate('InstallInfo',{info:info});
    }
    //改变约定时间
    changeAgreedTime = (value) => {
        if(value != this.state.agreedTime){
            this.setState({changeTime: true});
        }else{
            this.setState({changeTime: false});
        }
    }
    //重新填写
    stop = () => {

    }
    //提交审核
    complete = () => {
        const { form, dispatch, navigation } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const constructQk = {
                    multi: values.multi?values.multi:{},
                    high: values.high?values.high:{},
                    noBulid: values.noBulid?values.noBulid:{},
                    other: values.otherBuild?values.otherBuild:{},
                }
                const params = {
                    ...values,
                    processClassify: values.processClassify != "C"?values.processClassify:'',
                    waitId: info.id,
                    installId: info.installId,
                    installNo: info.installNo,
                    definedId: info.definedId,
                    agreedTime: moment(values.agreedTime).format("YYYY-MM-DD"),
                    actualTime: moment(values.actualTime).format("YYYY-MM-DD"),
                    fileId: values.fileId?JSON.stringify(values.fileId):'',
                    agreedTimeChangeFileIds: values.agreedTimeChangeFileIds?JSON.stringify(values.agreedTimeChangeFileIds):'',
                    constructQk: JSON.stringify(constructQk),
                }
                delete params.multi;
                delete params.noBulid;
                delete params.otherBuild;
                delete params.high;
                dispatch({
                    type: `siteSurvey/saveBindWorkFlow`,
                    params,
                })
            }
        })
    }
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { configParams:{ data: configData } } = this.props;
        const { agreedTime, changeTime, constuctQkVO, projectType } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <List style={styles.content} renderHeader="踏勘信息录入">
                        {
                            getFieldDecorator('agreedTime',{
                                validateFirst: true,
                                initialValue: agreedTime,
                                rules:[
                                    // {required:true, message:'请输入约定踏勘日期'}
                                ]
                            })(
                                <DatePicker
                                  // value={this.state.value}
                                  mode="date"
                                  minDate={new Date()}
                                //   maxDate={new Date(2026, 11, 3)}
                                  onChange={this.changeAgreedTime}
                                  format="YYYY-MM-DD"
                                  style={textFontSize()}
                                >
                                  <Item arrow="horizontal" labelNumber={7}>
                                    <Text style={textFontSize()}>约定踏勘日期:</Text>
                                  </Item>
                                </DatePicker>
                            )
                        }
                        {
                            getFieldDecorator('actualTime',{
                                validateFirst: true,
                                initialValue: this.state.actualTime,
                                rules:[
                                    // {required:true, message:'请输入实际踏勘日期'}
                                ]
                            })(
                                <DatePicker
                                  // value={this.state.value}
                                  mode="date"
                                  minDate={new Date()}
                                //   maxDate={new Date(2026, 11, 3)}
                                  format="YYYY-MM-DD"
                                  style={textFontSize()}
                                >
                                <Item arrow="horizontal" labelNumber={7}>
                                    <Text style={textFontSize()}>实际踏勘日期:</Text>
                                    </Item>
                                </DatePicker>
                                // <InputItem placeholder="请输入实际踏勘日期" labelNumber={7}>实际踏勘日期:</InputItem>
                            )
                        }
                    {   changeTime && 
                        getFieldDecorator('agreedTimeChangeFileIds',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请上传日期修改证明文件'}
                            ]
                        })(
                            <FileItem title="日期修改证明"/>
                        )
                    }
                    {
                        getFieldDecorator('fileId',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请上传踏勘现场文件'}
                            ]
                        })(
                            <FileItem title="踏勘现场文件"/>
                        )
                    }
                    {
                        getFieldDecorator('processClassify',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择流转方式'}
                            ]
                        })(
                            <SelectItem data={processClassifyList} require="true">流转方式:</SelectItem>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}>与用户沟通情况:</Text></Item>
                    {
                        getFieldDecorator('communicationRemark',{
                            validateFirst: true,
                            initialValue: '',
                            rules:[
                                // {required:true, message:'请输入与用户沟通情况'}
                            ]
                        })(
                                
                            <TextareaItem style={styles.multilineInput} placeholder="请输入与用户沟通情况" rows={3} count={300} style={textFontSize()}/>

                        )
                    }
                    </List>
                    <List renderHeader="建筑情况">
                    {
                        getFieldDecorator('multi', {
                            validateFirst: true,
                            initialValue: constuctQkVO && constuctQkVO.multi?constuctQkVO.multi:{},
                            rules: []
                        })(
                            <BuildItem
                                title="多层住宅"
                                first={{name: 'jm', unit: '户', label: '居民户数', placeholder: '请输入居民户数'}}
                                second={{name: 'gd', unit: '户', label: '隔断商铺', placeholder: '请输入隔断商铺数'}}
                                three={{name: 'qt', unit: '', label: '其它', placeholder: '请输入其他类型的报装说明'}}
                            />
                        )
                    }
                    {
                        getFieldDecorator('high', {
                            validateFirst: true,
                            initialValue: constuctQkVO && constuctQkVO.high?constuctQkVO.high:{},
                            rules: []
                        })(
                            <BuildItem
                                title="高层住宅"
                                first={{name: 'jm', unit: '户', label: '居民户数', placeholder: '请输入居民户数'}}
                                second={{name: 'gd', unit: '户', label: '隔断商铺', placeholder: '请输入隔断商铺数'}}
                                three={{name: 'qt', unit: '', label: '其它', placeholder: '请输入其他类型的报装说明'}}
                            />
                        )
                    }
                    {
                        getFieldDecorator('noBulid', {
                            validateFirst: true,
                            initialValue: constuctQkVO && constuctQkVO.noBulid?constuctQkVO.noBulid:{},
                            rules: []
                        })(
                            <BuildItem
                                title="非住宅建筑"
                                first={{name: 'jzmj', unit: '㎡', label: '建筑面积', placeholder: '请输入建筑面积'}}
                                second={{name: 'gd', unit: '户', label: '隔断商铺', placeholder: '请输入隔断商铺数'}}
                                three={{name: 'qt', unit: '', label: '其它', placeholder: '请输入其他类型的报装说明'}}
                            />
                        )
                    }
                    {
                        getFieldDecorator('otherBuild', {
                            validateFirst: true,
                            initialValue: constuctQkVO && constuctQkVO.other?constuctQkVO.other:{},
                            rules: []
                        })(
                            <BuildItem
                                title="其它"
                                type="other"
                                first={{name: 'jzmj', unit: '㎡', label: '建筑面积', placeholder: '请输入建筑面积'}}
                                three={{name: 'qt', unit: '', label: '其它', placeholder: '请输入其他类型的报装说明'}}
                            />
                        )
                    }
                    {
                        getFieldDecorator('projectType',{
                            validateFirst: true,
                            initialValue: projectType,
                            rules:[
                                {required:true, message:'请选择工程类别'}
                            ]
                        })(
                            <CheckboxItem data={filterConfig(configData,'工程类别')} required><Text style={textFontSize()}>工程类别</Text></CheckboxItem>
                        )
                    } 
                    <Item arrow="empty" style={textFontSize()}><Text style={textFontSize()}>现场总体说明:</Text></Item>
                    {
                        getFieldDecorator('saveBindWorkFlow',{
                            validateFirst: true,
                            initialValue: '',
                            rules:[
                                // {required:true, message:'请输入现场总体说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入现场总体说明" style={textFontSize()} rows={3} count={300} />
                        )
                    }
                    <Item arrow="empty" style={textFontSize()}><Text style={textFontSize()}>备注:</Text></Item>
                    {
                        getFieldDecorator('transRemark',{
                            validateFirst: true,
                            initialValue: '',
                            rules:[
                                // {required:true, message:'请输入备注'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入备注" style={textFontSize()} rows={3} count={300} />
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
                        {/* <Text style={styles.buttonText} onPress={this.stop}>重新填写</Text> */}
                        <Text style={styles.buttonText} onPress={this.complete}>提交审核</Text>
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
    const {siteSurvey, configParams, installInfo, index} = state;
    return {siteSurvey, configParams, installInfo, index}
}
export default connect(mapStateToProps)(IndexForm);