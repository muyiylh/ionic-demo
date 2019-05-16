import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, Toast, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import {showFormError, filterConfig, textFontSize} from "../../../utils/index";
import { connect } from '../../../utils/dva';
import SelectItem from '../../../component/select-item';
import { Table, Row, Rows } from 'react-native-table-component';
import CusInputItems from '../../../component/input-item';
import CusDatePicker from "../../../component/date-picker";

const Item = List.Item;
const Brief = Item.Brief;
/*
工程施工----保存施工日志
梁丽
2019/04/19
*/
const waterHead =  ['水表类型', '水表口径', '水表类别','用水性质','条码号', '初始读数', '安装地址','用水地址'];

class Log extends Component {
    constructor(props) {
        super(props)
        this.state = {
            combiConduitList: [{}],//管道铺设
            widthArr: [100,100,100,100,100,90,100,100],//head宽度
        }
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type: `configParams/queryConfigParams`,
        })
    }
    //保存
    save = () => {
        const { navigation, form, dispatch, constructionManage: { waterListObjArr, data } } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                //判断水表数量
                if(waterListObjArr.length > data.progress.unfinishedMeterCount){
                    Toast.fail("水表超过剩余安装总数,请重新填写");
                    return;
                }else{
                    let combiConduitList = []
                    values.caliber.map((item,index)=>{
                        combiConduitList.push({caliber: item,length: values.length[index]});
                    })
                    const params = {
                        ...values,
                        waterCounts: waterListObjArr.length,
                        waitId: info.id,
                        installId: info.installId,
                        detailList: waterListObjArr,
                        combiConduitList: combiConduitList,
                        constructId: data.constructId,
                        intoDate: data.intoDate,
                        installNo: info.installNo,
                        definedId: info.definedId,
                    }
                    delete params.caliber;
                    delete params.length;
                    dispatch({
                        type: `constructionManage/save`,
                        params,
                    }).then(() => {
                        this.props.getDetail();
                        form.resetFields();
                        dispatch({
                            type: 'constructionManage/setData',
                            data:{waterList:[],waterListObjArr:[]},
                        })
                    }) 
                };
                
            }
        })
    }
    //管道一行
    addPipe  = () => {
        const { combiConduitList } = this.state;
        let list = JSON.parse(JSON.stringify(combiConduitList));
        list.push({});
        this.setState({combiConduitList: list});
    }
    //添加水表
    addMeter = () => {
        const { navigate } = this.props.navigation;
        navigate('addMeter');
    }
    //验证
    //开挖土方量
    earthFinishedCheck = (value,callback) => {
        const { constructionManage: { data }, form } = this.props;
        if(value > data.progress.unfinishedEarthFinished){
            callback("已超过剩余开挖土方量总数,请重新填写")
        }else{
            callback();
        };
    }
    //回填土方量
    backfillEarthCountsCheck = (value,callback) => {
        const { constructionManage: { data }, form } = this.props;
        if(value > data.progress.unfinishedBackfillEarthCounts){
            callback("已超过回填土方量总数,请重新填写")
        }else{
            callback();
        };
    }
    //管道铺设长度
    lengthCheck = (callback) => {
        const { constructionManage: { data }, form } = this.props;
        const length = form.getFieldValue("length");
        let sumLength = 0;
        Array.isArray(length) && length.map((item,index)=>{
            sumLength += Number(item);
        })
        if(sumLength > data.progress.unfinishedLenth){
            callback("已超过管道铺设总长度,请重新填")
        }else{
            callback();
        };
    }
    //井室构筑物
    wellCheck = (value,callback) => {
        const { constructionManage: { data }, form } = this.props;
        if(value > data.progress.unfinishedWellCount){
            callback("已超过井室建筑总数总数,请重新填写")
        }else{
            callback();
        };
    }
    //验证填入是否符合
    validator = (rule,value,callback,type) => {
        const { constructionManage: { data }, form } = this.props;
        switch(type){
            case 'earthFinished'://开挖土方量
                this.earthFinishedCheck(value,callback);
                break;
            case 'backfillEarthCounts'://回填土方量
                this.backfillEarthCountsCheck(value,callback);
                break;
            case 'length'://管道铺设长度
                this.lengthCheck(callback);
                break;
            case 'well'://井室构筑物
                this.wellCheck(value,callback)
                break;
            default: callback();
        }
    }
   
    render() {
        const { combiConduitList, widthArr } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { constructionManage: { waterList }, configParams:{ data: configData } } = this.props;
        let _waterList = JSON.parse(JSON.stringify(waterList));
        _waterList.unshift(waterHead);
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <List renderHeader="施工日志填写"> 
                        {
                            getFieldDecorator('constructDate',{
                                validateFirst: true,
                                initialValue: new Date(),
                                rules:[
                                    // {required:true, message:'请选择提出时间'}
                                ]
                            })(
                                <DatePicker
                                    mode="date"
                                    minDate={new Date()}
                                    // maxDate={new Date(2026, 11, 3)}
                                    onChange={this.onChange}
                                    format="YYYY-MM-DD"
                                    style={textFontSize()}
                                    >
                                    <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>施工日期:</Text></Item>
                                </DatePicker>
                                // <CusDatePicker require="true">施工日期:</CusDatePicker>
                            )
                        }
                        {
                            getFieldDecorator('earthFinished',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入开挖土方量'}
                                    {
                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'earthFinished'),
                                    },
                                ]
                            })(
                                <CusInputItems extra="元立方米(m³)" labelNumber={6}>开挖土方量: </CusInputItems>
                            )
                        }
                        {
                            getFieldDecorator('backfillEarthCounts',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入回填土方量'}
                                    {
                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'backfillEarthCounts'),
                                    },
                                ]
                            })(
                                <CusInputItems extra="元立方米(m³)" labelNumber={6}>回填土方量: </CusInputItems>
                            )
                        }
                        <View>
                            <Text style={styles.listTitle}>管道铺设</Text>
                        </View>
                        {combiConduitList.map((item, index)=>{
                            return(
                                <View style={styles.caliberBlock}>
                                    <List>
                                        {
                                            getFieldDecorator(`caliber[${index}]`,{
                                                validateFirst: true,
                                                rules:[
                                                    // {required:true, message:'请选择口径'}
                                                ]
                                            })(
                                                <SelectItem data={filterConfig(configData,"管道口径")}>口径:</SelectItem>
                                            )
                                        }
                                        {
                                            getFieldDecorator(`length[${index}]`,{
                                                validateFirst: true,
                                                rules:[
                                                    // {required:true, message:'请输入长度'}
                                                    {
                                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'length'),
                                                    },
                                                ]
                                            })(
                                                <CusInputItems extra="米">长度: </CusInputItems>
                                            )
                                        }
                                        {combiConduitList.length-1 == index?<View style={{backgroundColor: '#fff',padding: 10}}>
                                            <WingBlank
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                                >
                                                <Text style={styles.buttonText} onPress={this.addPipe}>增加一项</Text>
                                                </WingBlank>
                                        </View>:<Text></Text>}
                                    </List>
                                </View>
                            )
                        })}
                        {
                            getFieldDecorator('meterWell',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入表井(表池)'}
                                    {
                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'well'),
                                    },
                                ]
                            })(
                                <CusInputItems labelNumber={6} extra="座">表井(表池): </CusInputItems>
                            )
                        }
                        {
                            getFieldDecorator('lockGateWell',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入闸门井'}
                                    {
                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'well'),
                                    },
                                ]
                            })(
                                <CusInputItems extra="座">闸门井: </CusInputItems>
                            )
                        }
                        {
                            getFieldDecorator('brakeValveWell',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入闸阀井'}
                                    {
                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'well'),
                                    },
                                ]
                            })(
                                <CusInputItems extra="座">闸阀井: </CusInputItems>
                            )
                        }
                        {
                            getFieldDecorator('fireFightingWell',{
                                validateFirst: true,
                                rules:[
                                    // {required:true, message:'请输入消防井'}
                                    {
                                        validator: (rule,value,callback)=>this.validator(rule,value,callback,'well'),
                                    },
                                ]
                            })(
                                <CusInputItems extra="座">消防井: </CusInputItems>
                            )
                        }
                        <View style={{backgroundColor: '#fff',padding: 10}}>
                            <WingBlank
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                >
                                <Text style={styles.buttonText} onPress={this.addMeter}>添加水表</Text>
                                </WingBlank>
                        </View>
                        {
                            waterList && waterList.length>0?<View style={styles.container}>
                            <Text style={styles.listTitle}>水表信息</Text>
                            <ScrollView horizontal={true}>
                                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                    {
                                        _waterList && _waterList.map((rowData, index) => (
                                            <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthArr}
                                            style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                            textStyle={styles.text}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                            </View>:<Text></Text>
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
                        <Text style={styles.buttonText} onPress={this.save}>保存施工日志</Text>
                        </WingBlank>
                </View>
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
    caliberBlock: {
        paddingBottom: 10,
        backgroundColor: '#EBEEF5',
    },
    buttonText: {
        backgroundColor: '#ecf8fa',
        color: '#40b6ce',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#40b6ce',
    },
    head: {
        height: 40,
    },
    text: { textAlign: 'center', fontWeight: '100' },
    require: {
        color:"#ff5151",
    }
});
const LogForm = createForm()(Log);
function mapStateToProps(state) {
    const {constructionManage, configParams, index} = state;
    return {constructionManage, configParams, index}
}
export default connect(mapStateToProps)(LogForm);