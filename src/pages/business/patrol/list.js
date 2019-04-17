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
import {getPlan} from '../../../services/BusinessService';
import { connect } from '../../../utils/dva';
import {createForm} from 'rc-form';


class PatrolList extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: "水表巡查计划列表",
            headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(28)}}>结论</Text>
                </TouchableHighlight>
            ),
        };
    }
    componentDidMount(){

        this.props.navigation.setParams({
            navigatePress:this.link
        })
    
    }
    link =() =>{

    }
    onFetch =  async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            let pageLimit = 10;
            const {state:{params:{id}}} = this.props.navigation;
            const {status, data, message} = await getPlan({planId:id,pageNum:page,pageSize:pageLimit});
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
        NavigationUtil.navigate("busPlanList",{id: item.planId})
    };
    renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.consultItem}>

                    <View>
                        <Text style={styles.title}>所属项目: {item.projectName}</Text>
                        <Text style={styles.title}>水表类型: {item.meterTypeName}</Text>
                        <Text style={styles.title}>水表类别: {item.meterCategoryName}</Text>
                        <Text style={styles.title}>初始读数: {item.initialReading}</Text>
                        <Text style={styles.title}>安装地址: {item.installAddress}</Text>
                        <Text style={styles.title}>水表口径: {item.meterCaliberName}</Text>
                        <Text style={styles.title}>条码号: {item.barCode}</Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                                <Text style={styles.title}>读数照片: </Text>
                                <Text style={[styles.title,{color:"#45CBE6"}]}>查看 </Text>
                        </View>
                        
                        <Text style={styles.title}>用水地址: {item.waterAddress}</Text>

                        {item.result== null && <View style={{flex:1,flexDirection:'row'}}>
                            <Text style={styles.btn}>正常</Text>
                            <Text style={styles.btn}>异常</Text>
                        </View>}
                        {item.result==0 &&  <Text style={styles.title}>巡检结果: 正常(已巡检)</Text>}
                        {item.result==1 &&  <Text style={styles.title}>巡检结果: 异常(已巡检)</Text>}
                       
                       
                    </View>
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
        fontSize:scaleSize(26),
        paddingBottom:6,
       
        
    },
    info:{
        fontSize:scaleSize(24),
    },
    btn:{
        borderStyle:"solid",

        padding:4,
        paddingLeft:10,
        paddingRight:10,
  
        borderRadius:5,
        fontSize:scaleSize(26),
        backgroundColor:'#45CBE6',
        color:'#fff'
    }
    
});


function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormPatro = createForm()(PatrolList);

export default connect(mapStateToProps)(FormPatro);