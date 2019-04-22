/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import {ListView, Icon,WhiteSpace} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {queryTraceRecord} from '../../../services/BusinessService';
import {text_font_size} from '../../../utils/theme';



class TrackList extends React.Component{
  
    constructor(props){
        super(props);
        this.state={
            len:0
        }
    }
    onFetch =  async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            const {state:{params:{record}}} = this.props.navigation;
            let pageLimit = 10;
            const {status, data, message} = await queryTraceRecord({planId:record.planId,recordId:record.recordId,pageNum:page,pageSize:pageLimit});
            
            if(status == 0){
                let len = data.data.length;
                this.setState({len});
                startFetch(data.data, pageLimit);
            }else{
                startFetch([],pageLimit);
            }
        } catch (err) {
            abortFetch();
        }
    };
    onPress = (item) => {
        NavigationUtil.navigate("busPlanList",{id: item.planId})
    };
    renderItem = (item) => {
        const {state:{params:{record}}} = this.props.navigation;

        return (
            <TouchableOpacity style={styles.consultItem}>
              
                    <View>
                        <Text style={styles.info}>沟通日期: {moment(item.traceAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
                        <Text style={styles.info}>沟通人员: {item.traceBy}</Text>
                        <Text style={styles.info}>客户姓名: {item.clientName}</Text>
                        <Text style={styles.info}>沟通方式: {item.communicationMode}</Text>
                        <Text style={styles.info}>沟通内容: {item.communicationContent}</Text>
                      
                    </View>
                   
            </TouchableOpacity>
        );
    };

    render(){
        const {state:{params:{record}}} = this.props.navigation;
     
        return (
            <View style={styles.wrap}>
            <Text style={styles.title}>{record.unitName}-跟踪记录({this.state.len})</Text>
                <ListView
              
              onFetch={this.onFetch}
              keyExtractor={(item, index) =>index
              }
              renderItem={this.renderItem}
              numColumns={1}
          />
          <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            </View>
         
        )
    }
}
const styles = StyleSheet.create({
    wrap:{
        backgroundColor:"#EBEEF5"
    },
    consultItem: {
        borderBottomColor: '#ddd',
        backgroundColor:'#fff',
        borderBottomWidth: 1,
        padding: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        color:'#333',
        fontSize:scaleSize(text_font_size),
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
       
        
    },
    info:{
        fontSize:scaleSize(text_font_size),
        paddingTop:3,
        paddingBottom:3,
        color:'#333',
    
    },
   
    
});
export default TrackList;