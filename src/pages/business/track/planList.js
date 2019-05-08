/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import {ListView, Icon,Button,WhiteSpace} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {queryPlanDetail} from '../../../services/BusinessService';
import {text_font_size} from '../../../utils/theme';



class PlanList extends React.Component{

    constructor(props) {
        super(props)
        this.state={
            files:[],
        }
    }
    componentDidMount(){
    
    }
    onFetch =  async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            const {state:{params:{id}}} = this.props.navigation;
            let pageLimit = 10;
            const {status, data, message} = await queryPlanDetail({planId:id,pageNum:page,pageSize:pageLimit});
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
        const {state:{params:{id}}} = this.props.navigation;
        NavigationUtil.navigate("busInputPlan",{consult: {...item,planId:id}});
    };
    viewDetail = item =>{
        const {state:{params:{id}}} = this.props.navigation;
        NavigationUtil.navigate("busTrackView",{record: {...item,planId:id}});
    }
    renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.consultItem}>
              
                    <View>
                        <Text style={styles.title}>{item.unitName}</Text>
                        <View >
                            <Text style={styles.info}>单位地址: {item.unitAddress}</Text>
                            <Text style={styles.info}>客户类型: {item.type}</Text>
                            <Text style={styles.info}>经办人: {item.principalName}&nbsp;&nbsp;电话: {item.principalContact}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.btn}  onPress={()=>this.onPress(item)}>录入</Text>
                   
                        <Text style={styles.btn}  onPress={()=>this.viewDetail(item)}>查看</Text>
                    </View>

                    {/* <Image style={{width:16,height:16}} resizeMode="contain" source={require("../../../images/return_3.png")}/> */}
            </TouchableOpacity>
        );
    };

    render(){
        const {state:{params:{id}}} = this.props.navigation;
      
        return (
            <View style={styles.wrap}>
                <ListView
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) =>index}
                    renderItem={this.renderItem}
                    numColumns={1} />
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
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
        // flexDirection:'row',
        // justifyContent:'space-between',
       // alignItems:'center'
    },
    title:{
        color:'#333',
        fontSize:scaleSize(text_font_size),
        paddingBottom:6,
    },
    info:{
        fontSize:scaleSize(text_font_size),
        paddingTop:3,
        paddingBottom:3,
    },
    btn:{
        borderStyle:"solid",
        
        padding:4,
        paddingLeft:10,
        paddingRight:10,
     
        borderRadius:5,
        fontSize:scaleSize(text_font_size),
        backgroundColor:'#45CBE6',
        color:'#fff'
    }
    
});
export default PlanList;