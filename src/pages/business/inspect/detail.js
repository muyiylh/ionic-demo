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


const Item = List.Item;
const reportTypes=[{label:'需要上报',value:1},{label:'不需要上报',value:0}];



class Detail extends React.Component{
 
    static navigationOptions = ({ navigation }) => {
    
        return {
            title:"项目详细信息",
           
        };
        
    }
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
        console.log("componentDidMount params:,",params)
        dispatch({type:'business/getFormDataByInstallNo',params:{id:params.id}});
       // dispatch({type:'business/getDeptForTree'});

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
                {`报装号: ${APPLAY.installNo}`}
                </Item>
                <Item>
                {`单位/用户名称: ${APPLAY.unitName}`}
                </Item>
                <Item>
                {`单位/用户地址: ${APPLAY.unitAddress}`}
                </Item>
                <Item>
                {`用水地址: ${APPLAY.waterAddress}`}
                </Item>
                <Item>
                {`负责人姓名: ${APPLAY.principalName}`}
                </Item>
                <Item>
                {`负责人手机号码: ${APPLAY.principalContact}`}
                </Item>
                <Item>
                {`经办人姓名: ${APPLAY.managerName}`}
                </Item>
                <Item>
                {`经办人手机号码: ${APPLAY.managerContact}`}
                </Item>
                <Item>
                {`项目名称: ${APPLAY.projectName}`}
                </Item>
                <Item>
                {`是否通知经办人: ${APPLAY.isNotify == '1' ? '受理完成立即通知' : '暂不通知'}`}
                </Item>
                <Item>
                {`通知方式: ${APPLAY.notifyTypeName}`}
                </Item>
                <Item>
                {`工程类别: ${APPLAY.projectTypeName}`}
                </Item>
                <Item>
                {`设计单位: ${APPLAY.designUnitName}`}
                </Item>

                <Item>
                {`营销单位: ${APPLAY.marketingUnitName}`}
                </Item>
                <Item style={styles.info}>
              
                    建筑情况:
               
                <Text style={styles.info}>多层住宅（居民户数:{APPconstuctQkVO.multi && APPconstuctQkVO.multi.jm? APPconstuctQkVO.multi.jm:""}户，隔断商铺：{APPconstuctQkVO.multi ? APPconstuctQkVO.multi.gd:""}户，其它：{APPconstuctQkVO.multi ? APPconstuctQkVO.multi.qt:""||'无'}）</Text>
                <Text style={styles.info}>高层住宅（居民户数:{APPconstuctQkVO.high && APPconstuctQkVO.high.jm}户，隔断商铺：{APPconstuctQkVO.high && APPconstuctQkVO.high.gd}户，其它：{APPconstuctQkVO.high && APPconstuctQkVO.high.qt||'无'}）</Text>
                <Text style={styles.info}>非住宅建筑（建筑面积：{APPconstuctQkVO.noBulid && APPconstuctQkVO.noBulid.jzmj}m²，隔断商铺：{APPconstuctQkVO.noBulid && APPconstuctQkVO.noBulid.gd}户，其它：{APPconstuctQkVO.noBulid && APPconstuctQkVO.noBulid.qt||'无'}）</Text>
                <Text style={styles.info}>其它（建筑面积：{APPconstuctQkVO.other && APPconstuctQkVO.other.jzmj}m²，其它：{APPconstuctQkVO.other && APPconstuctQkVO.other.qt||'无'}）</Text>
                </Item>
                <Item>
                {`约定踏勘日期:${APPLAY.agreedTime? moment(APPLAY.agreedTime).format('YYYY-MM-DD'):""}`}
                </Item>
                <Item>
                {`已上传附件:查看`}
                </Item>
                <Item>
                {`受理说明描述:${APPLAY.acceptRemarks}`}
                </Item>
              
            </List>
            <Text style={styles.title}>{EXPLORE.formNameDesc}</Text>
            <List >
                <Item>
                {`约定时间:${EXPLORE.agreedTime ? moment(EXPLORE.agreedTime ).format("YYYY-MM-DD"):""}`}
                </Item>
                <Item>
                {`实际踏勘日期:${EXPLORE.actualTime ? moment(EXPLORE.actualTime).format("YYYY-MM-DD"):""}`}
                </Item>
                <Item>
                {`日期修改证明:32323`}
                </Item>
                <Item>
                {`用户沟通情况:${EXPLORE.communicationRemark}`}
                </Item>
                <Item>
                {`流转方式:${EXPLORE.processClassify!== ''?(EXPLORE.processClassify=='A'? '接水' : '报装') : '接水 + 报装' }`}
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
                {`转出备注信息:${EXPLORE.transRemark}`}
                </Item>
                <Item>
                {`踏勘现场文件:`}
                </Item>
               
            </List>
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
        fontSize:scaleSize(28)
    },
    info:{
        fontSize:scaleSize(28),
        color:'#333' 
    }
    
});

function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormPatrol = createForm()(Detail);

export default connect(mapStateToProps)(FormPatrol);
