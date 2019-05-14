import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import { showFormError, filterConfig, textFontSize } from "../../../utils/index";
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
import AddrItem from '../../../component/addr-item';
import BuildItem from '../../../component/report/build-item';
import CheckboxItem from '../../../component/checkbox-item';
import {REPORT_APPLY_REQ, AMAP_POI_LOCATION_REQ} from "../../../constants/ActionTypes";
import CusInputItem from "../../../component/input-item";
const Item = List.Item;
const Brief = Item.Brief;
/*
报装受理
梁丽
2019/04/09
*/
const reportTypeList = [
    {label:"个人报装",value: 0},
    {label:"单位报装",value: 1},
]
//是否通知经办人
const notifyList = [
    {label:"受理完成立即通知",value: 1},
    {label:"暂不通知",value: 0},
]
//通知方式
const notifyTypeList = [
    {label:"邮件",value: 0},
    {label:"APP通知",value: 1},
    {label:"短信",value: 2},
]
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const search = navigation.getParam("search");
        return {
            title: navigation.getParam('otherParam', '报装受理'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={search}
                    style={{ marginRight: 10 }}
                >
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>智能检索</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            itemType: '',
            def: {//默认项
                isNotify: 1,
                notifyType: "0,1",
            },
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({search: this.search});
        const info = navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `baozhuang/getInstallInfoById`,
            params,
        })
        dispatch({
            type: `configParams/queryConfigParams`,
            
        })
    }
    //检索
    search = () => {
        const { form } = this.props;
        const { navigate } = this.props.navigation;
        navigate('searchResult',{info: form.getFieldValue('unitName')});
    }
    //生成报装号
    generatorInstallNo = () => {
        const {form, dispatch} = this.props;
        // form.setFieldsValue({installNo: '1233333'});
        dispatch({
            type: `baozhuang/createInstallNo`,
            
        })
    }
    //改变
    onChange = (value) => {
      this.setState({itemType: value });
    }
    //暂不受理
    stop = () => {
        const {navigation, dispatch, form, baozhuang:{ installNo }} = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    installNo: installNo,
                    id: info.id,
                }
                params.attachmentUrl = JSON.stringify(values.files);
                dispatch({
                    type: `baozhuang/timeOutAccept`,
                    params,
                })
            }
        })
    }
    //完成受理
    complete = () => {
        const {navigation, dispatch, form, baozhuang:{ installNo }} = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    installNo: installNo,
                    id: info.id,
                }
                params.attachmentUrl = JSON.stringify(values.files);
                dispatch({
                    type: `baozhuang/offLineApply`,
                    params,
                })
            }
        })
    }
    
    //点击地图
    onMapClick = (param) => {
        const {dispatch} = this.props;

        dispatch({type: `amap/${AMAP_POI_LOCATION_REQ}`,param})
    };
    render() {
        
        const {form, baozhuang:{ data, installNo }, configParams:{ data: configData }} = this.props;
        // const {amap:{pois, loading}, index: {location}} = this.props;
        const {amap:{pois, loading} } = this.props;
        const location = {latitude: 30.67,longitude: 104.07};
        const {getFieldDecorator, getFieldProps} = form;
        const { def } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <List renderHeader="报装信息">
                    {  
                        getFieldDecorator('reportType',{
                            validateFirst: true,
                            initialValue:data.reportType,
                            rules:[
                                {required:true, message:'请在选择报装方式'}
                            ]
                        })(
                            <SelectItem data={reportTypeList} labelNumber={9} require="true">报装方式:</SelectItem>
                        )
                    }
                    {data.reportType == 0?
                        getFieldDecorator('personal',{
                            validateFirst: true,
                            initialValue:data.societyCode,
                            rules:[
                                {required:true, message:'请输入身份证号码'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">身份证号码:</CusInputItem>
                        )
                    :
                        getFieldDecorator('societyCode',{
                            validateFirst: true,
                            initialValue:data.societyCode,
                            rules:[
                                {required:true, message:'请输入统一社会信用代码'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">统一社会信用代码:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('unitName',{
                            validateFirst: true,
                            initialValue:data.unitName,
                            rules:[
                                {required:true, message:'请输入单位名称'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">单位名称:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('unitAddress',{
                            validateFirst: true,
                            initialValue:data.unitAddress,
                            rules:[
                                {required:true, message:'请选择单位地址'}
                            ]
                        })(
                            <AddrItem
                                extra='地图选择'
                                pois={pois}
                                center={location}
                                onMapClick={this.onMapClick}
                                loading={loading}
                                required
                            >单位地址:</AddrItem>
                        )
                    }
                    {
                        getFieldDecorator('waterAddress',{
                            validateFirst: true,
                            initialValue:data.waterAddress,
                            rules:[
                                {required:true, message:'请选择用水地址'}
                            ]
                        })(
                            <AddrItem
                                extra='地图选择'
                                pois={pois}
                                center={location}
                                onMapClick={this.onMapClick}
                                loading={loading}
                                required
                            >用水地址:</AddrItem>
                        )
                    }
                    {
                        getFieldDecorator('principalName',{
                            validateFirst: true,
                            initialValue:data.principalName,
                            rules:[
                                // {required:true, message:'请输入负责人'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>负责人:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('principalContact',{
                            validateFirst: true,
                            initialValue:data.principalContact,
                            rules:[
                                // {required:true, message:'请输入负责人电话'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>负责人电话:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('managerName',{
                            validateFirst: true,
                            initialValue:data.managerName,
                            rules:[
                                {required:true, message:'请输入经办人'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">经办人:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('managerContact',{
                            validateFirst: true,
                            initialValue:data.managerContact,
                            rules:[
                                {required:true, message:'请输入经办人电话'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">经办人电话:</CusInputItem>
                        )
                    }
                </List>
                <List style={styles.content} renderHeader="受理信息录入">
                    {  
                        getFieldDecorator('installNo',{
                            validateFirst: true,
                            initialValue: installNo,
                            rules:[
                                {required:true, message:'请生成报装号'}
                            ]
                        })(
                        <CusInputItem readOnly labelNumber={9} require="true" placeholder="请生成">报装号:</CusInputItem>
                        )
                    }
                    <Text onPress={this.generatorInstallNo} style={styles.button}>
                        生成
                    </Text>
                    {  
                        getFieldDecorator('projectName',{
                            validateFirst: true,
                            initialValue:data.projectName,
                            rules:[
                                {required:true, message:'请在输入项目名称'}
                            ]
                        })(
                        <CusInputItem labelNumber={9} require="true">项目名称:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('itemType',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在选择项目类别'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'项目类别')} labelNumber={9} require="true">项目类别:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('companyType',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在选择企业类别'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'企业类别')} labelNumber={9} require="true">企业类别:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('marketingUnit',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在选择营销单位'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'营销单位')} labelNumber={9} require="true">营销单位:</SelectItem>

                        ) 
                    }
                    {
                        getFieldDecorator('designUnit',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在选择设计单位'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'设计单位')} labelNumber={9} require="true">设计单位:</SelectItem>

                        )
                    }
                    {
                        getFieldDecorator('email',{
                            validateFirst: true,
                            initialValue:data.email,
                            rules:[
                                {required:true, message:'请输入邮箱'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} require="true">邮箱:</CusInputItem>
                        )
                    } 
                    {
                        getFieldDecorator('isNotify',{
                            validateFirst: true,
                            initialValue: def.isNotify,
                            rules:[
                                {required:true, message:'请在选择是否通知经办人'}
                            ]
                        })(
                            <SelectItem data={notifyList} labelNumber={9} require="true">是否通知经办人:</SelectItem>

                        )
                    }
                    {
                        getFieldDecorator('notifyType',{
                            validateFirst: true,
                            initialValue: def.notifyType,
                            rules:[
                                {required:true, message:'请选择通知方式'}
                            ]
                        })(
                            <CheckboxItem data={notifyTypeList} required><Text style={textFontSize()}>通知方式</Text></CheckboxItem>
                        )
                    }
                    {
                        getFieldDecorator('projectType',{
                            validateFirst: true,
                            initialValue: data.projectType,
                            rules:[
                                {required:true, message:'请选择工程类别'}
                            ]
                        })(
                            <CheckboxItem data={filterConfig(configData,'工程类别')} required><Text style={textFontSize()}>工程类别</Text></CheckboxItem>
                        )
                    }
                    <List renderHeader="建筑情况">
                    {
                        getFieldDecorator('multi', {
                            validateFirst: true,
                            initialValue: data.constuctQkVO && data.constuctQkVO.multi?data.constuctQkVO.multi:{},
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
                            initialValue: data.constuctQkVO && data.constuctQkVO.high?data.constuctQkVO.high:{},
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
                            initialValue: data.constuctQkVO && data.constuctQkVO.noBulid?data.constuctQkVO.noBulid:{},
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
                            initialValue: data.constuctQkVO && data.constuctQkVO.other?data.constuctQkVO.other:{},
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
                    </List>
                    {   
                        getFieldDecorator('files',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请上传上传附件'}
                            ]
                        })(
                            <FileItem title="上传附件"/>
                        )
                    }
                    {
                        getFieldDecorator('agreedTime',{
                            validateFirst: true,
                            initialValue: new Date(),
                            rules:[
                                {required:true, message:'请在选择预约踏勘日期'}
                            ]
                        })(
                            <DatePicker
                                // value={this.state.value}
                                mode="date"
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChangeDate}
                                format="YYYY-MM-DD"
                            >
                                <Item arrow="horizontal"><Text style={textFontSize()}><Text style={styles.require}>*</Text>预约踏勘:</Text></Item>
                            </DatePicker>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>受理说明:</Text></Item>
                    {
                        getFieldDecorator('acceptRemarks',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入受理说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入受理说明" rows={3} count={300} style={textFontSize()}/>
                            
                        )
                    }
                    
                </List>
                <WhiteSpace size="lg" />
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={styles.buttonText} onPress={this.stop}>暂不受理</Text>
                        <Text style={styles.buttonText} onPress={this.complete}>完成受理</Text>
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
    button: {
        backgroundColor: '#ecf8fa',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        color: '#40b6ce',
        width: 70,
        position: 'absolute',
        top: 10,
        right: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    input: {
        textAlign: 'right'
    },
    require:{
        color:"#ff5151"
    },
    multilineInput:{
        paddingLeft: 10,
    }
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {baozhuang, configParams, amap, index} = state;
    return {baozhuang, configParams, amap, index}
}
export default connect(mapStateToProps)(IndexForm);