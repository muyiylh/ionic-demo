/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ScrollView} from 'react-native';
import {ListView, Icon,Button,WhiteSpace,List,InputItem, TextareaItem,DatePicker} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import SelectItem from '../../../component/select-item';
import SelectTree from '../../../component/select-tree';
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {queryPlanDetail} from '../../../services/BusinessService';
import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';

const Item = List.Item;
const reportTypes=[{label:'需要上报',value:1},{label:'不需要上报',value:0}];



class Detail extends React.Component{

    constructor(props) {
        super(props)
        this.state={
            type:-1,//是否上报
        }
    }
    componentDidMount(){
        
        this.props.navigation.setParams({
            navigatePress:this.submit
        })
        const {dispatch} = this.props;
        const {state:{params}} = this.props.navigation;

        dispatch({type:'business/getFormDataByInstallNo',params:{id:params.id}});

    }

   

    render(){
       
        const {form,business:{record}} = this.props;
        const {state:{params}} = this.props.navigation;
        console.log("record:",record);
        let APPLAY = record[0]?record[0].APPLAY:{};
        let APPconstuctQkVO = APPLAY.constuctQkVO ? APPLAY.constuctQkVO :"";
        let EXPLORE = record[1]?record[1].EXPLORE:{};
        let EXPLOREconstuctQkVO = EXPLORE.constuctQkVO ? EXPLORE.constuctQkVO :"";
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{APPLAY.formNameDesc}</Text>
            <List >
                <Item>
                    <Text style={styles.label}>{`报装号: ${APPLAY.installNo?APPLAY.installNo:""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}> {`单位/用户名称: ${APPLAY.unitName?APPLAY.unitName:""}`}</Text>
               
                </Item>
                <Item>
                <Text style={styles.label}> {`单位/用户地址: ${APPLAY.unitAddress?APPLAY.unitAddress:""}`}</Text>
               
                </Item>
                <Item>
                <Text style={styles.label}>{`用水地址: ${APPLAY.waterAddress?APPLAY.waterAddress:""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`负责人姓名: ${APPLAY.principalName?APPLAY.principalName:""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`负责人手机号码: ${APPLAY.principalContact?APPLAY.principalContact:""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`经办人姓名: ${APPLAY.managerName?APPLAY.managerName:""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}> {`经办人手机号码: ${APPLAY.managerContact?APPLAY.managerContact:""}`}</Text>
               
                </Item>
                <Item>
                <Text style={styles.label}>{`项目名称: ${APPLAY.projectName?APPLAY.projectName:""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`是否通知经办人: ${APPLAY.isNotify == '1' ? '受理完成立即通知' : '暂不通知'}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`通知方式: ${APPLAY.notifyTypeName}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`工程类别: ${APPLAY.projectTypeName}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`设计单位: ${APPLAY.designUnitName}`}</Text>
                
                </Item>

                <Item>
                <Text style={styles.label}>{`营销单位: ${APPLAY.marketingUnitName}`}</Text>
                
                </Item>
                <Item style={styles.info}>
                <Text style={styles.label}>建筑情况:</Text>
                    
               
                <Text style={styles.info}>多层住宅（居民户数:{APPconstuctQkVO.multi && APPconstuctQkVO.multi.jm? APPconstuctQkVO.multi.jm:""}户，隔断商铺：{APPconstuctQkVO.multi ? APPconstuctQkVO.multi.gd:""}户，其它：{APPconstuctQkVO.multi ? APPconstuctQkVO.multi.qt:""||'无'}）</Text>
                <Text style={styles.info}>高层住宅（居民户数:{APPconstuctQkVO.high && APPconstuctQkVO.high.jm}户，隔断商铺：{APPconstuctQkVO.high && APPconstuctQkVO.high.gd}户，其它：{APPconstuctQkVO.high && APPconstuctQkVO.high.qt||'无'}）</Text>
                <Text style={styles.info}>非住宅建筑（建筑面积：{APPconstuctQkVO.noBulid && APPconstuctQkVO.noBulid.jzmj}m²，隔断商铺：{APPconstuctQkVO.noBulid && APPconstuctQkVO.noBulid.gd}户，其它：{APPconstuctQkVO.noBulid && APPconstuctQkVO.noBulid.qt||'无'}）</Text>
                <Text style={styles.info}>其它（建筑面积：{APPconstuctQkVO.other && APPconstuctQkVO.other.jzmj}m²，其它：{APPconstuctQkVO.other && APPconstuctQkVO.other.qt||'无'}）</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`约定踏勘日期:${APPLAY.agreedTime? moment(APPLAY.agreedTime).format('YYYY-MM-DD'):""}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`已上传附件:查看`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`受理说明描述:${APPLAY.acceptRemarks}`}</Text>
                
                </Item>
              
            </List>
            <Text style={styles.title}>{EXPLORE.formNameDesc}</Text>
            <List >
                <Item>
                <Text style={styles.label}>{`约定时间:${EXPLORE.agreedTime ? moment(EXPLORE.agreedTime ).format("YYYY-MM-DD"):""}`}</Text>
                </Item>
                <Item>
                    <Text style={styles.label}>{`实际踏勘日期:${EXPLORE.actualTime ? moment(EXPLORE.actualTime).format("YYYY-MM-DD"):""}`}</Text>
                </Item>
                <Item>
                    <Text style={styles.label}>{`日期修改证明:32323`}</Text>
                </Item>
                <Item>
                    <Text style={styles.label}>{`用户沟通情况:${EXPLORE.communicationRemark}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`流转方式:${EXPLORE.processClassify!== ''?(EXPLORE.processClassify=='A'? '接水' : '报装') : '接水 + 报装'}`}</Text>
                </Item>
                <Item>
                <Text style={styles.info}>
                    建筑情况:
                </Text>
                <Text style={styles.info}>多层住宅（居民户数:{EXPLOREconstuctQkVO.multi  ? EXPLOREconstuctQkVO.multi.jm:""}户，隔断商铺：{EXPLOREconstuctQkVO.multi ? EXPLOREconstuctQkVO.multi.gd:""}户，其它：{EXPLOREconstuctQkVO.multi && EXPLOREconstuctQkVO.multi.qt ? EXPLOREconstuctQkVO.multi.qt:""||'无'}）</Text>
                <Text style={styles.info}>高层住宅（居民户数:{EXPLOREconstuctQkVO.high?EXPLOREconstuctQkVO.high.jm:""}户，隔断商铺：{EXPLOREconstuctQkVO.high ? EXPLOREconstuctQkVO.high.gd:""}户，其它：{EXPLOREconstuctQkVO.high ? EXPLOREconstuctQkVO.high.qt:""||'无'}）</Text>
                <Text style={styles.info}>非住宅建筑（建筑面积：{EXPLOREconstuctQkVO.noBulid ? EXPLOREconstuctQkVO.noBulid.jzmj:""}m²，隔断商铺：{EXPLOREconstuctQkVO.noBulid ? EXPLOREconstuctQkVO.noBulid.gd:""}户，其它：{EXPLOREconstuctQkVO.noBulid ? EXPLOREconstuctQkVO.noBulid.qt:""||'无'}）</Text>
                <Text style={styles.info}>其它（建筑面积：{EXPLOREconstuctQkVO.other ? EXPLOREconstuctQkVO.other.jzmj:""}m²，其它：{EXPLOREconstuctQkVO.other ? EXPLOREconstuctQkVO.other.qt:""||'无'}）</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`转出备注信息:${EXPLORE.transRemark}`}</Text>
                
                </Item>
                <Item>
                <Text style={styles.label}>{`踏勘现场文件:`}</Text>
                
                </Item>
               
            </List>
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    wrap:{
        //backgroundColor:"#EBEEF5"
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6
    },
    title:{
        backgroundColor:"#EBEEF5",
        color:"#999",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        fontSize:scaleSize(text_font_size)
    },
    info:{
        fontSize:scaleSize(text_font_size),
        color:'#333' 
    },
    label:{
        fontSize:scaleSize(text_font_size),
        color:'#333' 
    }
    
});

function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormPatrol = createForm()(Detail);

export default connect(mapStateToProps)(FormPatrol);
