import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
import { showFormError, filterConfig, getConfigName}  from '../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/*
添加水表
梁丽
2019/04/11
*/
class AddMeter extends Component {
    static navigationOptions = ({ navigation }) => {
    	const save = navigation.getParam("save");
        return {
            title: navigation.getParam('otherParam', '添加水表'),
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
        this.state = {
            // typeName:'',
            meterList: [],
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({save: this.save})
    }
    //保存
    save = () => {
        const { navigate } = this.props.navigation;
        const { form, dispatch, configParams: { data } } = this.props;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const { constructionManage :{ waterList, waterListObjArr } } = this.props;
                let arr = [];
                let objArr = [];
                const n = Number(values.count);
                for(let i = 0;i<n;i++){
                    let pArr = [];
                    values.picture && values.picture[i] && values.picture[i].map((item)=>{
                        pArr.push(item.filePath);
                    });
                    let a = [];
                    let aObj = {
                        meterType: values.meterType,
                        meterCaliber: values.meterCaliber,
                        meterCategory: values.meterCategory,
                        // caliberName: values.caliberName,
                        // natureName: values.natureName,
                        waterNature: values.waterNature[i],
                        barCode: values.barCode[i],
                        initialReading: values.initialReading[i],
                        installAddress: values.installAddress[i],
                        waterAddress: values.waterAddress[i],
                        initialReadingImgUrl: pArr.join(","),
                    };
                    objArr.push(aObj);
                    a.push(getConfigName(data,values.meterType));
                    a.push(getConfigName(data,values.meterCaliber));
                    a.push(getConfigName(data,values.meterCategory));
                    a.push(getConfigName(data,values.waterNature[i]));
                    a.push(values.barCode[i]);
                    a.push(values.initialReading[i]);
                    a.push(values.installAddress[i]);
                    a.push(values.waterAddress[i]);
                    arr.push(a);
                }
                console.log("data------",waterList.concat(arr),waterListObjArr.concat(objArr));
                dispatch({
                    type: 'constructionManage/setData',
                    data: { waterList: waterList.concat(arr), waterListObjArr: waterListObjArr.concat(objArr)},
                });
                navigate("constructionManage");
            }
        })
    }
    //改变支数
    changeCount = (value) => {
        let list = [];
        let v = Number(value);
        for(let i =0 ;i<v;i++){
            list.push({});
        }
        console.warn(typeof(value), value,list);
        this.setState({meterList: list});
    }
    changeType = (value) => {
        console.log("change--type--", value);
        this.setState({typeName: value});
    }
   
    render() {
        const { meterList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { configParams:{ data: configData } } = this.props;
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <List> 
                        {
                            getFieldDecorator('meterType',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表类型'}
                                ]
                            })(
                                <SelectItem data={filterConfig(configData,"水表类型")} onChange={this.changeType}>水表类型:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('meterCaliber',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表口径'}
                                ]
                            })(
                                <SelectItem data={filterConfig(configData,"水表口径")}>水表口径:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('meterCategory',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择水表类别'}
                                ]
                            })(
                                <SelectItem data={filterConfig(configData,"水表性质")}>水表类别:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('count',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入水表总支数'}
                                ]
                            })(
                                <InputItem extra="支" placeholder="请输入水表总支数" type="number" labelNumber={6} onChange={this.changeCount}>水表总支数:</InputItem>
                            )
                        }
                    </List>
                    <View>
                        {meterList.map((item,index)=>{
                            return (<View>
                                <Text style={styles.listTitle}>水表{index+1}</Text>
                                <List>
                                    {
                                        getFieldDecorator(`waterNature[${index}]`,{
                                            validateFirst: true,
                                            // initialValue: typeName,
                                            rules:[
                                                {required:true, message:'请选择水表类型'}
                                            ]
                                        })(
                                            <SelectItem data={filterConfig(configData,"用水性质")}>用水性质:</SelectItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`barCode[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入条码号" labelNumber={4}>条码号:</InputItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`initialReading[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入初始读数" labelNumber={5}>初始读数:</InputItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`picture[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请上传初始读数照片'}
                                            ]
                                        })(
                                            <FileItem title="初始读数照片"/>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`installAddress[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入安装地址" labelNumber={5}>安装地址:</InputItem>
                                        )
                                    }
                                    {
                                        getFieldDecorator(`waterAddress[${index}]`,{
                                            validateFirst: true,
                                            rules:[
                                                // {required:true, message:'请输入'}
                                            ]
                                        })(
                                            <InputItem placeholder="请输入用水地址" labelNumber={5}>用水地址:</InputItem>
                                        )
                                    }
                                </List>
                            </View>)
                        })}
                    </View>
                {/* </Provider> */}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    listTitle: {
        padding: 10,
    },
});
const AddMeterForm = createForm()(AddMeter);
function mapStateToProps(state) {
    const {constructionManage, configParams, index} = state;
    return {constructionManage, configParams, index}
}
export default connect(mapStateToProps)(AddMeterForm);