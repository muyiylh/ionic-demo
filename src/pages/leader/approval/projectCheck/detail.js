import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll, AsyncStorage } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace, Toast} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
import moment from "moment";
import Info from './info';
import SelectItem from '../../../../component/select-item';
import ImageView from '../../../../component/image-view';
import { Table, Row, Rows } from 'react-native-table-component';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError, filterConfig, getConfigName } from '../../../../utils/index';
import CusListItem from "../../../../component/list-item";
import CusInputItem from "../../../../component/input-item";
import FileItem from "../../../../component/file-item";
import {text_font_size} from '../../../../utils/theme';
const Item = List.Item;
const Brief = Item.Brief;
const screenHeight = Dimensions.get("window").height;
/**
 * 详细信息
 * 梁丽
 * 2019-04-29
 */

const resultList = [
    {label: "不予验收", value: 1},
    {label: "准予验收", value: 0},
]
const resultList2 = [
    {label: "验收合格", value: 0},
    {label: "验收不合格(需整改)", value: 1},
]
const list = [
    { title: '表节点验收'},
    { title: '井室构筑物'},
    { title: '安装工程'},
    { title: '管道试压'},
    { title: '冲洗消毒'},
]
class Detail extends Component {
    static navigationOptions = ({ navigation }) => {
        const index = navigation.state.params.index; 
        const info = navigation.state.params.info;
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', list[index-1].title),
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
        super(props)
        this.state = {
            widthArr: [80,80,80,80,80,80,80,80],//table的宽度
            widthArr2: [60,60,80,60,80,80,80],//table的宽度
            widthArr3: [60,60,80,80,80,80,80,80,80],//table的宽度
            widthArr4: [60,60,100,160,160,60],//table的宽度
            images: [],
            checkResult: 0,//审核-----验收意见----默认准予验收
            checkResult2: 0,//现场验收-----验收意见----验收合格
            userInfo: {},//用户信息
        }
    }
    componentDidMount() {
        const { navigation, dispatch } = this.props;
        navigation.setParams({submit: this.submit});
        const info = navigation.state.params.info;
        const index = navigation.state.params.index;
        this.getUserInfo();
        const { tabsData: data, } = this.props.projectCheck;
        const chectResultDTO = data?data[index].chectResultDTO:{};
        this.setState({checkResult:chectResultDTO.checkResult,checkResult2:chectResultDTO.checkResult});
        const _params = {
            installId: info.installId,
            waitId: info.id,
            pageNum: 1,
            pageSize: 1000,
            status: 0,
        }
        if(index == 1){
            dispatch({
                type: `projectCheck/listMeterDetail`,
                params: _params,
            })
        }
        
    }
    //获得用户信息
    getUserInfo = async() => {
        const { dispatch } = this.props;
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        this.setState({userInfo: _user});
    }
    //提交信息
    submit = () => {
        const { form, navigation, dispatch} = this.props;
        const { navigate } = this.props.navigation;
        const info = navigation.state.params.info;
        const index = navigation.state.params.index;
        const { tabsData: data } = this.props.projectCheck;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                switch(info.nodeFlag){
                    case 'GWXSSH'://审核
                        const params = {
                            conditionMap: {
                                gwdwCheckStatus: values.checkResult == 0?'true':'false',
                            },
                            chectResultDTO: {
                                checkResult: values.checkResult,
                                appointUser: values.appointUser,
                                checkDept: values.checkDept,
                                checkRemark: values.checkRemark,
                                checkClassify: index,
                            },
                            definedId: info.definedId,
                            installId: info.installId,
                            installNo: info.installNo,
                            waitId: info.id,
                        }
                        dispatch({
                            type: `projectCheck/dealConstructProcess`,
                            params
                        }).then(()=>{
                            if(values.checkResult == 0){//当前审核准予验收
                                let check = [];
                                for(let key in data){
                                    if(data[key].chectResultDTO.appointUser){
                                        check.push(true);
                                    }
                                }
                                if(check.length == 4){//不包含当前审核节点，判断为4
                                    //跳转到审批并刷新
                                    navigate("approval");
                                    dispatch({
                                        type: 'approval/subProcessDeal',
                                        params: {refreshing: true},
                                    })
                                }else{
                                    //跳转到上一页面
                                    this.props.navigation.state.params.onGoBack();
                                    this.props.navigation.goBack();
                                }
                            }else{
                                //跳转到审批并刷新
                                navigate("approval");
                                dispatch({
                                    type: 'approval/subProcessDeal',
                                    params: {refreshing: true},
                                })
                            }
                        })
                        break;
                    case 'XCYS'://现场验收
                        let result = data[index].chectResultDTO;
                        const _params = {
                            ...result,
                            ...values,
                            definedId: info.definedId,
                            installId: info.installId,
                            installNo: info.installNo,
                            waitId: info.id,
                        }
                        console.log("_params---------",_params);
                        dispatch({
                            type: `projectCheck/saveCheckResult`,
                            params: _params,
                        }).then(()=>{
                            this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack();
                        })
                        break;
                }
                
            }
        })
    }
    //改变验收单位
    changeDept = (value) => {
        const { dispatch, configParams:{ data: configData }, } = this.props;
        const params = {
            id: getConfigName(configData,value),
        }
        dispatch({
            type: `projectCheck/queryDeptUserByDeptName`,
            params,
        })
    }
    onRef = (ref) => {
        this.child = ref
    }
    //showPicture,点击行读数照片展示
    showPicture = (data, index) => {
        const { meter } = this.props.projectCheck;
        const { dispatch } = this.props; 
        const idx = index - 1;
        console.log("meter-------index-----",meter,index)
        if(meter.meterDetail.data[idx].initialReadingImgUrl){
            const params = {
                id: meter.meterDetail.data[idx].id,
            }
            dispatch({
                type: 'projectCheck/getImgs',
                params,
            }).then(()=>{
                const { imgs } = this.props.projectCheck;
                this.setState({images: imgs});
                console.log("child-------",this.child)
                this.child.open();
            })
        }
    }
    //验收结果改变
    changeResult = (value) => {
        this.setState({checkResult:value});
    }
    //验收结果改变
    changeResult2 = (value) => {
        this.setState({checkResult2:value});
    }

    render() {
        const { tabsData: data, meter, bjdMeterList, gdVoList, fmVoList, xhsVoList, pqfVoList, clkVoList, userList } = this.props.projectCheck;
        const index = this.props.navigation.state.params.index;
        let text =  meter && meter.statistics && meter.statistics.map((item)=>{
            return <Text>{item.caliberName}:{item.count}支</Text>
        })
        // let text =  meter && meter.statistics && meter.statistics.map((item)=>{
        //     return <Text>{item.caliberName}:{item.count}支</Text>
        // })
        const { widthArr, widthArr2, widthArr3, widthArr4, checkResult, checkResult2, userInfo } = this.state;
        const { configParams:{ data: configData } } = this.props;
        const { getFieldDecorator } = this.props.form; 
        const info = this.props.navigation.state.params.info;
        const chectResultDTO = data?data[index].chectResultDTO:{};
        return (
            <ScrollView>
                {/* 管网验收审核 */}
                { info.nodeFlag == "GWXSSH" && <List>
                    {                           
                        getFieldDecorator('checkResult',{
                            validateFirst: true,
                            initialValue: checkResult,
                            rules:[
                                {required:true, message:'请选择验收意见'}
                            ]
                        })(
                            <SelectItem data={resultList} require="true" onChange={this.changeResult}>验收意见:</SelectItem>
                        )
                    }
                    {   checkResult == 0 &&                      
                        getFieldDecorator('checkDept',{
                            validateFirst: true,
                            initialValue: chectResultDTO.checkDept,
                            rules:[
                                {required:true, message:'请选择验收单位'}
                            ]
                        })(
                            <SelectItem data={filterConfig(configData,'管网分公司')} require="true" onChange={this.changeDept}>验收单位:</SelectItem>
                        )
                    }
                    {   checkResult == 0 &&                          
                        getFieldDecorator('appointUser',{
                            validateFirst: true,
                            initialValue: chectResultDTO.appointUser,
                            rules:[
                                {required:true, message:'请选择人员指派'}
                            ]
                        })(
                            <SelectItem data={userList} require="true">人员指派:</SelectItem>
                        )
                    }
                    { checkResult == 1?<View>
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>意见说明:</Text></Item>
                        {
                            getFieldDecorator('checkRemark',{
                                validateFirst: true,
                                initialValue: chectResultDTO.checkRemark,
                                rules:[
                                    {required:true, message:'请输入意见说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入意见说明" rows={3} count={300} style={textFontSize()}/>
                            )
                        }</View>:null
                    }
                    
                </List>}
                {/* 现场验收 */}
                { info.nodeFlag == "XCYS" && <List>
                    {  index == 5 &&                         
                        getFieldDecorator('specimenCode',{
                            validateFirst: true,
                            initialValue: chectResultDTO.specimenCode,
                            rules:[
                                {required:true, message:'请输入样品编号'}
                            ]
                        })(
                            <CusInputItem require="true">样品编号:</CusInputItem>
                        )
                    }
                    {  index == 5 &&  
                        getFieldDecorator('samplingTime',{
                            validateFirst: true,
                            initialValue: chectResultDTO.specimenCode?new Date(chectResultDTO.specimenCode):new Date(),
                            rules:[
                                {required:true, message:'请选择采样时间'}
                            ]
                        })(
                            <DatePicker
                                mode="date"
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChange}
                                format="YYYY-MM-DD"
                                style={textFontSize()}
                                >
                                <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>采样时间:</Text></Item>
                            </DatePicker>
                        )
                    }
                    {   index == 5 &&                          
                        getFieldDecorator('chlorine',{
                            validateFirst: true,
                            initialValue: chectResultDTO.chlorine,
                            rules:[
                                {required:true, message:'请输入余氯'}
                            ]
                        })(
                            <CusInputItem require="true">余氯:</CusInputItem>
                        )
                    }
                    {   index == 5 &&                       
                        getFieldDecorator('turbidity',{
                            validateFirst: true,
                            initialValue: chectResultDTO.turbidity,
                            rules:[
                                {required:true, message:'请输入浑浊度'}
                            ]
                        })(
                            <CusInputItem require="true">浑浊度:</CusInputItem>
                        )
                    }
                    {    index == 5 &&                         
                        getFieldDecorator('bacteriaSum',{
                            validateFirst: true,
                            initialValue: chectResultDTO.bacteriaSum,
                            rules:[
                                {required:true, message:'请输入细菌总数'}
                            ]
                        })(
                            <CusInputItem require="true">细菌总数:</CusInputItem>
                        )
                    }
                    {   index == 5 &&  
                        getFieldDecorator('files',{
                            validateFirst: true,
                            initialValue: chectResultDTO.files,
                            rules:[
                                // {required:true, message:'请输入上传文件'}
                            ]
                        })(
                            <FileItem title="文件上传"/>
                        )
                    }
                    {                           
                        getFieldDecorator('formBy',{
                            validateFirst: true,
                            initialValue: chectResultDTO.formBy?chectResultDTO.formBy:userInfo.realName,
                            rules:[
                                {required:true, message:'请输入验收人'}
                            ]
                        })(
                            <CusInputItem require="true">验收人:</CusInputItem>
                        )
                    }
                    {  
                        getFieldDecorator('checkDate',{
                            validateFirst: true,
                            initialValue: chectResultDTO.checkDate?new Date(chectResultDTO.checkDate):new Date(),
                            rules:[
                                {required:true, message:'请选择验收日期'}
                            ]
                        })(
                            <DatePicker
                                mode="date"
                                minDate={new Date(2015, 7, 6)}
                                maxDate={new Date(2026, 11, 3)}
                                onChange={this.onChange}
                                format="YYYY-MM-DD"
                                style={textFontSize()}
                                >
                                <Item arrow="horizontal" extra="请选择" style={textFontSize()}><Text style={textFontSize()}><Text style={styles.require}>*</Text>验收日期:</Text></Item>
                            </DatePicker>
                        )
                    }
                    {                           
                        getFieldDecorator('checkDept',{
                            validateFirst: true,
                            initialValue: chectResultDTO.formBy?chectResultDTO.checkDept:userInfo.deptName,
                            rules:[
                                {required:true, message:'请输入验收单位'}
                            ]
                        })(
                            <CusInputItem require="true">验收单位:</CusInputItem>
                        )
                    }
                    {                        
                        getFieldDecorator('checkResult',{
                            validateFirst: true,
                            initialValue: checkResult2,
                            rules:[
                                {required:true, message:'请选择验收结果'}
                            ]
                        })(
                            <SelectItem data={resultList2} require="true" onChange={this.changeResult2}>验收结果:</SelectItem>
                        )
                    }
                    {                           
                        getFieldDecorator('checkRemark',{
                            validateFirst: true,
                            initialValue: chectResultDTO.checkRemark,
                            rules:[
                                {required:true, message:'请输入验收说明'}
                            ]
                        })(
                            <CusInputItem require="true">验收说明:</CusInputItem>
                        )
                    }
                    { checkResult2 == 1?<View>
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>整改要求:</Text></Item>
                        {
                            getFieldDecorator('reformRequire',{
                                validateFirst: true,
                                initialValue: chectResultDTO.reformRequire,
                                rules:[
                                    {required:true, message:'请输入整改要求'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入整改要求" rows={3} count={300} style={textFontSize()}/>
                            )
                        }</View>:null
                    }
                    
                </List>}
                {index == 1 && data && data[1] &&
                    <List renderHeader="表节点验收">
                        <CusListItem extra={data[1].applyNo}>申请编号:</CusListItem>
                        <CusListItem extra={data[1].constructUnit}>施工单位:</CusListItem>
                        <CusListItem extra={data[1].constructManager}>施工负责人:</CusListItem>
                        <CusListItem extra={data[1].projectName}>工程名称:</CusListItem>
                        <CusListItem extra={data[1].projectAddress}>工程地址:</CusListItem>
                        <CusListItem extra={data[1].checkRemark}>验收申请说明:</CusListItem>
                        <CusListItem extra={text}>已安装水表清单:</CusListItem>
                        {/* {meter.table && meter.table.length>1 && <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            {
                                meter.table.map((rowData, index) => (
                                    <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={widthArr}
                                    style={[styles.row]}
                                    textStyle={styles.text}
                                    onPress={()=>{this.showPicture(rowData, index)}}
                                    />
                                ))
                            }
                            </Table>
                        </ScrollView>} */}
                        {bjdMeterList && bjdMeterList.length>1 && <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            {
                                bjdMeterList.map((rowData, index) => (
                                    <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={widthArr}
                                    style={[styles.row]}
                                    textStyle={styles.text}
                                    onPress={()=>{this.showPicture(rowData, index)}}
                                    />
                                ))
                            }
                            </Table>
                        </ScrollView>}
                    </List>
                }
                {index == 2 && data && data[2] &&
                    <List renderHeader="井室构筑物">
                        <CusListItem extra={data[2].projectNo}>申请编号:</CusListItem>
                        <CusListItem extra={data[2].applyDate?moment(data[2].applyDate).format("YYYY-MM-DD"):''}>申请日期:</CusListItem>
                        <CusListItem extra={data[2].projectName}>工程名称:</CusListItem>
                        <CusListItem extra={data[2].constructUnit}>施工单位:</CusListItem>
                        <CusListItem extra={data[2].constructWorker}>施工人员:</CusListItem>
                        <CusListItem extra={data[2].projectAddress}>工程地址:</CusListItem>
                        <CusListItem extra={data[2].startDate}>开工日期:</CusListItem>
                        <CusListItem extra={data[2].pileNo}>位置(桩号):</CusListItem>
                        <CusListItem extra={data[2].position}>地理位置:</CusListItem>
                        <CusListItem extra={data[2].pictureNo}>采用的标准图号:</CusListItem>
                        {
                            data[2].gjwList && data[2].gjwList.length>0 && data[2].gjwList.map((item)=>{
                                return(
                                    <View>
                                        <CusListItem extra={item.gjwName}>构筑物名称:</CusListItem>
                                        <CusListItem extra={item.count}>构筑物数量:</CusListItem>

                                    </View>
                                )
                            })
                        }
                        <CusListItem extra={data[2].djytz}>地基原土质:</CusListItem>
                        {/* <CusListItem extra={data[2].number}>地基换土质:</CusListItem> */}
                        <CusListItem extra={data[2].djhtz}>地基换土质:</CusListItem>
                        <CusListItem extra={data[2].jingGaiType}>井座盖材质:</CusListItem>
                        <CusListItem extra={data[2].zhiDunSize}>支墩尺寸:</CusListItem>
                        <CusListItem extra={data[2].tongjingSize}>砼井圈或盖板型号及尺寸:</CusListItem>
                        <CusListItem extra={data[2].jskSize}>集水坑尺寸(mm):</CusListItem>
                        <CusListItem extra={data[2].material}>材质:</CusListItem>
                        <CusListItem extra={data[2].zhiDunMaterial}>支墩材料:</CusListItem>
                        <Item>砌体</Item>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.jingKong:''}>尺寸-净空(mm):</CusListItem>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.waiBi:''}>尺寸-外壁(mm):</CusListItem>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.chiCunHigh:''}>尺寸-高度(mm):</CusListItem>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.material:''}>材料:</CusListItem>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.moMian:''}>抹面:</CusListItem>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.paTi:''}>爬梯:</CusListItem>
                        <CusListItem extra={data[2].qitiVo?data[2].qitiVo.gaoChen:''}>高程(H):</CusListItem>
                    </List>
                }
                { index == 3 && data && data[3] &&
                    <List renderHeader="安装工程">
                            <CusListItem extra={data[3].projectNo}>申请编号:</CusListItem>
                            <CusListItem extra={data[3].applyDate?moment(data[3].applyDate).format("YYYY_MM_DD"):''}>申请日期:</CusListItem>
                            <CusListItem extra={data[3].projectName}>工程名称:</CusListItem>
                            <CusListItem extra={data[3].constructUnit}>施工单位:</CusListItem>
                            <CusListItem extra={data[3].constructWorke}>施工人员:</CusListItem>
                            <CusListItem extra={data[3].projectAddress}>工程地址:</CusListItem>
                            <CusListItem extra={data[3].startDate}>开工日期:</CusListItem>
                            { gdVoList.length>1?<View>
                            <Item style={textFontSize()}>管道情况</Item>
                            <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                {
                                    gdVoList && gdVoList.map((rowData, index) => (
                                        <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr2}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table></ScrollView></View>:null}
                            { fmVoList.length>1?<View>
                            <Item style={textFontSize()}>阀门情况</Item>
                            <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                {
                                    fmVoList && fmVoList.map((rowData, index) => (
                                        <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr3}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table></ScrollView></View>:null}
                            { xhsVoList.length>1?<View>
                            <Item style={textFontSize()}>消火栓情况</Item>
                            <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                {
                                    xhsVoList && xhsVoList.map((rowData, index) => (
                                        <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr3}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table></ScrollView></View>:null}
                            { pqfVoList.length>1?<View>
                            <Item style={textFontSize()}>排气阀情况</Item>
                            <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                {
                                    pqfVoList && pqfVoList.map((rowData, index) => (
                                        <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr3}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table></ScrollView></View>:null}
                            { clkVoList.length>1?<View>
                            <Item style={textFontSize()}>测流孔情况</Item>
                            <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                {
                                    clkVoList && clkVoList.map((rowData, index) => (
                                        <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr4}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table></ScrollView></View>:null}
                    </List>
                }
                {index == 4 && data && data[4] &&
                    <List renderHeader="管道试压">
                        <CusListItem extra={data[4].projectNo}>项目编号:</CusListItem>
                        <CusListItem extra={data[4].applyDate?moment(data[4].applyDate).format("YYYY-MM-DD"):''}>申请日期:</CusListItem>
                        <CusListItem extra={data[4].projectName}>工程名称:</CusListItem>
                        <CusListItem extra={data[4].constructUnit}>施工单位:</CusListItem>
                        <CusListItem extra={data[4].constructWorker}>施工人员:</CusListItem>
                        <CusListItem extra={data[4].projectAddress}>工程地址:</CusListItem>
                        <CusListItem extra={data[4].startDate}>开工日期:</CusListItem>
                        <CusListItem extra={data[4].pictureNo}>工程性质:</CusListItem>
                        <Item style={textFontSize()}>给水管道</Item>
                        {
                            data[4].gdInfoVo && data[4].gdInfoVo.length>0 && data[4].gdInfoVo.map((item)=>{
                                return(
                                    <View>
                                        <CusListItem extra={getConfigName(configData,item.caliber)}>给水管道管径:</CusListItem>
                                        <CusListItem extra={item.material}>给水管道管材:</CusListItem>
                                        <CusListItem extra={item.length}>给水管道长度:</CusListItem>

                                    </View>
                                )
                            })
                        }
                    </List>
                }
                <Info navigation={this.props.navigation}/>
                <ImageView onRef={this.onRef} images={this.state.images}></ImageView>
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
    list: {
        borderBottomWidth: 2,
        borderBottomColor: '#dede34',
    },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1',fontSize: text_font_size},
    text: {
        margin: 10,
        textAlign: 'center'
    },
    container: {flex: 1, padding: 10, backgroundColor: '#fff'},
    require:{
        color:"#ff5151"
    }
});

const  DetailForm = createForm()(Detail);
function mapStateToProps(state) {
    const {formdata, projectCheck, configParams, approval, index} = state;
    return {formdata, projectCheck, configParams, approval, index}
}
export default connect(mapStateToProps)(DetailForm);