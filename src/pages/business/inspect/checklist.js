/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight} from 'react-native';
import {ListView, Icon} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {findCheckListDetails} from '../../../services/BusinessService';



class PlansList extends React.Component{
    static navigationOptions = ({ navigation }) => {

        return {
            title: "检查清单",
            headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(28)}}>检查结论</Text>
                </TouchableHighlight>
            ),
        };
    }
    constructor(props){
        super(props);
        this.state={
            fileList:[]
        }
    }
    componentDidMount(){

        this.props.navigation.setParams({
            navigatePress:this.link
        })
    
    }
    link =()=>{
        //busInspectResult
        const {state:{params:{id}}} = this.props.navigation;
        NavigationUtil.navigate("busInspectResult",{id: id});
    }
    onFetch =  async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            let pageLimit = 10;
            const {state:{params:{id}}} = this.props.navigation;
            const {status, data, message} = await findCheckListDetails({id:id,pageNum:page,pageSize:pageLimit});
            console.log("data:",data);
            
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
    onDetail=(item)=>{
        NavigationUtil.navigate("busInspectDetail",{id: item.installNo});
    }
    onInputResult=(item)=>{//busInspectInput
        const {state:{params:{id}}} = this.props.navigation;
        console.log("item:",item);
        console.log("checklist plans id:",id);
        NavigationUtil.navigate("busInspectInput",{installNo: item.installNo,id:item.id,planId:id})
    }
    renderItem = (item) => {
        return (
            <View style={styles.consultItem} >
              
                    <View>
                        <Text style={styles.info}>报装号: {item.installNo}</Text>
                        <Text style={styles.info}>单位名称: {item.unitName}</Text>
                        <Text style={styles.info}>用水地址: {item.waterAddress}</Text>
                     
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.info}>经办人: {item.managerName}&nbsp;&nbsp;</Text>
                            <Text style={styles.info}>联系方式: {item.managerContact}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.info}>当前环节: {item.taskName}&nbsp;&nbsp;</Text>
                            <Text style={styles.info}>负责人: {item.excutorName}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.info}>检查状态: {item.status}&nbsp;&nbsp;</Text>
                            <Text style={styles.info}>检查结果: {item.result}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',paddingTop:10,paddingBottom:10}}>
                            <Text style={styles.btn} onPress={()=>{this.onDetail(item)}}>查看报装详情</Text>
                            <Text style={styles.btn}  onPress={()=>{this.onInputResult(item)}}>录入检查结果</Text>
                        </View>
                    </View>
            </View>
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
        fontSize:scaleSize(28),
        color:'#333',
    },
    btn:{
        borderStyle:"solid",

        padding:4,
        paddingLeft:10,
        paddingRight:10,
        marginRight:10,
        borderRadius:5,
        fontSize:scaleSize(26),
        backgroundColor:'#45CBE6',
        color:'#fff'
    }
    
});
export default PlansList;