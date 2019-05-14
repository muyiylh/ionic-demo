import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import { showFormError, filterConfig, textFontSize } from "../../../utils/index";
import SelectItem from '../../../component/select-item';
import BuildItem from '../../../component/report/build-item';
import AddrItem from '../../../component/addr-item';
import FileItem from "../../../component/file-item";
import {REPORT_APPLY_REQ, AMAP_POI_LOCATION_REQ} from "../../../constants/ActionTypes";
import CusInputItem from "../../../component/input-item";
const Item = List.Item;
const Brief = Item.Brief;
/*
上门报装
梁丽
2019/05/13
*/
const reportTypeList = [
    {label:"个人报装",value: 0},
    {label:"单位报装",value: 1},
]
class SMBZ extends Component {
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
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>提交</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            reportType: 0,//报装方式，默认个人报装
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit});
        dispatch({
            type: `configParams/queryConfigParams`,
        })
    }
    //检索
    submit = () => {
        const {navigation, dispatch, form } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    record: {...values},
                    id: info.id,
                }
                dispatch({
                    type: `baozhuang/doorInstallRecord`,
                    params,
                })
            }
        })
    }
    //改变
    onChangeType = (value) => {
      this.setState({reportType: value });
    }

    //点击地图
    onMapClick = (param) => {
        const {dispatch} = this.props;

        dispatch({type: `amap/${AMAP_POI_LOCATION_REQ}`,param})
    };
    render() {
        const {form, baozhuang:{ data }, configParams:{ data: configData }} = this.props;
        const { amap:{pois, loading} } = this.props;
        const location = {latitude: 30.67,longitude: 104.07};
        const info = this.props.navigation.state.params.info;
        const { reportType } = this.state;
        const {getFieldDecorator, getFieldProps} = form;
        // debugger;
        return (
            <ScrollView style={styles.projectPage}>
                { info.definedId == "KFFWB" && <List>
                    {  
                        getFieldDecorator('reportType',{
                            validateFirst: true,
                            initialValue: reportType,
                            // initialValue:data.reportType,
                            rules:[
                                // {required:true, message:'请在选择报装方式'}
                            ]
                        })(
                            <SelectItem data={reportTypeList} labelNumber={9} onChange={this.onChangeType}>报装方式:</SelectItem>
                        )
                    }
                    {   reportType == 0?
                        getFieldDecorator('personal',{
                            validateFirst: true,
                            // initialValue:data.societyCode,
                            rules:[
                                // {required:true, message:'请输入身份证号码'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>身份证号码:</CusInputItem>
                        )
                    :
                        getFieldDecorator('societyCode',{
                            validateFirst: true,
                            // initialValue:data.societyCode,
                            rules:[
                                // {required:true, message:'请输入统一社会信用代码'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>统一社会信用代码:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('unitName',{
                            validateFirst: true,
                            // initialValue:data.unitName,
                            rules:[
                                // {required:true, message:'请输入单位名称'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>单位名称:</CusInputItem>
                        )
                    }
                    {  
                        getFieldDecorator('projectName',{
                            validateFirst: true,
                            // initialValue:data.projectName,
                            rules:[
                                // {required:true, message:'请在输入项目名称'}
                            ]
                        })(
                        <CusInputItem labelNumber={9}>项目名称:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('unitAddress',{
                            validateFirst: true,
                            // initialValue:data.unitAddress,
                            rules:[
                                // {required:true, message:'请选择单位地址'}
                            ]
                        })(
                            <AddrItem
                                extra='地图选择'
                                pois={pois}
                                center={location}
                                onMapClick={this.onMapClick}
                                loading={loading}
                            >单位地址:</AddrItem>
                        )
                    }
                    {
                        getFieldDecorator('waterAddress',{
                            validateFirst: true,
                            // initialValue:data.waterAddress,
                            rules:[
                                // {required:true, message:'请选择用水地址'}
                            ]
                        })(
                            <AddrItem
                                extra='地图选择'
                                pois={pois}
                                center={location}
                                onMapClick={this.onMapClick}
                                loading={loading}
                            >用水地址:</AddrItem>
                        )
                    }
                    {
                        getFieldDecorator('itemType',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请在选择项目类别'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'项目类别')} labelNumber={9}>项目类别:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('companyType',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请在选择企业类别'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'企业类别')} labelNumber={9}>企业类别:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('principalName',{
                            validateFirst: true,
                            // initialValue:data.principalName,
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
                            // initialValue:data.principalContact,
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
                            // initialValue:data.managerName,
                            rules:[
                                // {required:true, message:'请输入经办人'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>经办人:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('managerContact',{
                            validateFirst: true,
                            // initialValue:data.managerContact,
                            rules:[
                                // {required:true, message:'请输入经办人电话'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} >经办人电话:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('email',{
                            validateFirst: true,
                            // initialValue:data.email,
                            rules:[
                                // {required:true, message:'请输入邮箱'}
                            ]
                        })(
                            <CusInputItem labelNumber={9} >邮箱:</CusInputItem>
                        )
                    }
                    {/* {
                        getFieldDecorator('marketingUnit',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请在选择营销单位'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'营销单位')} labelNumber={9}>营销单位:</SelectItem>

                        ) 
                    }
                    {
                        getFieldDecorator('designUnit',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请在选择设计单位'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'设计单位')} labelNumber={9}>设计单位:</SelectItem>

                        )
                    } */}
                    {
                        getFieldDecorator('agreedTime',{
                            validateFirst: true,
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
                                <Item arrow="horizontal"><Text style={textFontSize()}>预约踏勘:</Text></Item>
                            </DatePicker>
                        )
                    }
                    <Item arrow="empty"><Text style={textFontSize()}>受理说明:</Text></Item>
                    {
                        getFieldDecorator('acceptRemarks',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入受理说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入受理说明" rows={3} count={300} style={textFontSize()}/>
                            
                        )
                    }
                    {
                        getFieldDecorator('KFFWBFiles',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请上传计价清单'}
                            ]
                        })(
                            <FileItem title="资料上传"/>
                        )
                    }
                    {
                        getFieldDecorator('deptOpinion',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入部门意见'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>部门意见:</CusInputItem>
                        )
                    }
                </List>}
                { (info.definedId == "GWDW" || info.definedId == "AK" ) &&  <List renderHeader="建筑情况">
                    {
                        getFieldDecorator('multi', {
                            validateFirst: true,
                            // initialValue: constuctQkVO && constuctQkVO.multi?constuctQkVO.multi:{},
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
                            // initialValue: constuctQkVO && constuctQkVO.high?constuctQkVO.high:{},
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
                            // initialValue: constuctQkVO && constuctQkVO.noBulid?constuctQkVO.noBulid:{},
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
                            // initialValue: constuctQkVO && constuctQkVO.other?constuctQkVO.other:{},
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
                    <Item arrow="empty" style={textFontSize()}><Text style={textFontSize()}>接水情况说明:</Text></Item>
                    {
                        getFieldDecorator('waterConditionDesc',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入接水情况说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入接水情况说明" style={textFontSize()} rows={3} count={300} />
                        )
                    }
                    <Item arrow="empty" style={textFontSize()}><Text style={textFontSize()}>现场总体说明:</Text></Item>
                    {
                        getFieldDecorator('saveBindWorkFlow',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入现场总体说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请输入现场总体说明" style={textFontSize()} rows={3} count={300} />
                        )
                    }
                    {
                        getFieldDecorator('pressureResult',{
                            validateFirst: true,
                            // initialValue: data.pressureResult,
                            rules:[
                                // {required:true, message:'请输入测压结果'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>测压结果:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('GWDWFiles',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请上传计价清单'}
                            ]
                        })(
                            <FileItem title="现场图片"/>
                        )
                    }
                    {
                        getFieldDecorator('deptOpinion',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入部门意见'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>部门意见:</CusInputItem>
                        )
                    }
                </List>}
                { info.definedId == "YXDW" && <List>
                    {  
                        getFieldDecorator('waterNature',{
                            validateFirst: true,
                            // initialValue:data.waterNature,
                            rules:[
                                // {required:true, message:'请在选择用水性质'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'用水性质')} labelNumber={9}>用水性质:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('waterMeterNumber',{
                            validateFirst: true,
                            // initialValue: data.waterMeterNumber,
                            rules:[
                                // {required:true, message:'请输入各类型水表数量预估'}
                            ]
                        })(
                            <CusInputItem labelNumber={10}>各类型水表数量预估:</CusInputItem>
                        )
                    }
                    {
                        getFieldDecorator('YXDWFiles',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请上传计价清单'}
                            ]
                        })(
                            <FileItem title="现场图片"/>
                        )
                    }
                    {
                        getFieldDecorator('deptOpinion',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入部门意见'}
                            ]
                        })(
                            <CusInputItem labelNumber={9}>部门意见:</CusInputItem>
                        )
                    }
                </List>}
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
    }
});
const SMBZForm = createForm()(SMBZ);
function mapStateToProps(state) {
    const {baozhuang, configParams, amap, index} = state;
    return {baozhuang, configParams, amap, index}
}
export default connect(mapStateToProps)(SMBZForm);