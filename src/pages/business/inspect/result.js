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
            title:"检查结论",
           
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
  
        dispatch({type:'business/getCheckListResult',params:{id:params.id}});
       // dispatch({type:'business/getDeptForTree'});

    }

   

    render(){
       
        const {form,business:{checkResult}} = this.props;
       
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
           
            <List >
                <Item>
                {`开始日期: ${checkResult.startTime ? moment(checkResult.startTime).format("YYYY-MM-DD"):""}`}
                </Item>
                <Item>
                {`结束日期: ${checkResult.endTime ? moment(checkResult.endTime).format("YYYY-MM-DD"):""}`}
                </Item>
                <Item>
                {`检查总数: ${checkResult.totalNum}`}
                </Item>
                <Item>
                {`合格总数: ${checkResult.qualifyNum}`}
                </Item>
                <Item>
                {`合格率: ${checkResult.passRate * 100 + '%'}`}
                </Item>
                <Item>
                {`不合格总数: ${checkResult.notQualifyNum}`}
                </Item>
                <Item>
                {`不合格率: ${checkResult.notPassRate}`}
                </Item>
                <Item>
                {`检查人: ${checkResult.checkPersons}`}
                </Item>
                <Item>
                {`检查方式: ${checkResult.checkType}`}
                </Item>
                <Item>
                {`总体结果: ${checkResult.checkResult}`}
                </Item>
                <Item>
                {`受理说明: ${checkResult.checkDesc}`}
                </Item>
                <Item>
                {`描述: ${checkResult.unitAddress}`}
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
