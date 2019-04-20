/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import {ListView, Icon} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {queryExaminePlan} from '../../../services/BusinessService';


class PlansList extends React.Component{

    onFetch =  async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            let pageLimit = 10;
            const {status, data, message} = await queryExaminePlan({pageNum:page,pageSize:pageLimit});
         
            if(status == 0){
                startFetch(data.data, pageLimit);
            }else{
                startFetch([],pageLimit);
            }
        } catch (err) {
            abortFetch();
        }
    };
    onPress = (item) => {
        NavigationUtil.navigate("busPatrolPlanList",{id: item.planId})
    };
    renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.consultItem} onPress={()=>this.onPress(item)}>
              
                    <View>
                        <Text style={styles.title}>{item.planName}</Text>
                        <View style={{flexDirection:"row",justifyContent:'space-around',flex:1}}>
                            <Text style={styles.info}>创建人: {item.createName}&nbsp;&nbsp;</Text>
                            <Text style={styles.info}>创建时间: {moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
                        </View>
                    </View>
                    <Image style={{width:16,height:16}} resizeMode="contain" source={require("../../../images/return_3.png")}/>
            </TouchableOpacity>
        );
    };

    render(){
        return (
            <View style={styles.wrap}>
                <ListView
              
              onFetch={this.onFetch}
              keyExtractor={(item, index) =>index
              }
              renderItem={this.renderItem}
              numColumns={1}
          />
            </View>
         
        )
    }
}
const styles = StyleSheet.create({
    wrap:{
        //backgroundColor:"#EBEEF5"
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
        fontSize:scaleSize(30),
        paddingBottom:6,
       
        
    },
    info:{
        fontSize:scaleSize(30),
    },
   
    
});
export default PlansList;