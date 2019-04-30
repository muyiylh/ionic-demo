/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ScrollView} from 'react-native';
import {ListView, Icon,Button,WhiteSpace,List,InputItem, TextareaItem,DatePicker} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";

import moment from 'moment';

import {text_font_size} from '../../../utils/theme';


const Item = List.Item;
const reportTypes=[{label:'需要上报',value:1},{label:'不需要上报',value:0}];



class NoticeDetail extends React.Component{
 
   
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
            <Text style={styles.title}>{record.headline}</Text>
            <List >
                <Item>
                <Text style={styles.label}>{`发送人:${record.senderName?record.senderName:""}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`发送时间:${record.createAt?moment(record.createAt).format('YYYY-MM-DD HH:mm:ss'):""}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`发送内容:${record.content?record.content:""}`}</Text>
                </Item>
                {/* <Item>
                <Text style={styles.label}>{`结束巡检时间:${conList.lastDate?moment(conList.lastDate).format('YYYY-MM-DD HH:mm:ss'):""}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`巡检周期用时:${conList.spendTime}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`巡检周期用时:${conList.spendTime}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`巡检总数:${conList.total}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`正常:${conList.qualified}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`正常率:${conList.total}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`异常:${conList.unqualified}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`异常率:${conList.unqualified}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`未巡检:${conList.notResult}`}</Text>
                </Item> */}
               
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

export default NoticeDetail;
