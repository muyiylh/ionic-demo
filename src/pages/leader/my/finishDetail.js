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



class FinishDetail extends React.Component{
 
   
    constructor(props) {
        super(props)
        this.state={
            type:-1,//是否上报
        }
    }
    componentDidMount(){
        
     

    }


    render(){
     //   const {form,business:{conList,deptTree,userList}} = this.props;
        const {state:{params:{record}}} = this.props.navigation;
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
          <WhiteSpace />
            <Text style={styles.title}>{record.formFlagDesc}</Text>
            <List >
                 <Item>
                <Text style={styles.label}>{`报装号:${record.installNo}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`流程名称:${record.processName}`}</Text>
                </Item>
                
                <Item>
                <Text style={styles.label}>{`流程名称:${record.processName}`}</Text>
                </Item>
             
            </List>
         
        
               <WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace />
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
        marginHorizontal:6,
        fontSize:scaleSize(text_font_size)
    },
  
    title:{
        backgroundColor:"#EBEEF5",
        color:"#999",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        fontSize:scaleSize(text_font_size)
    },
    label:{
        fontSize:scaleSize(text_font_size),
        color:"#333"
    }
    
});

export default FinishDetail;
