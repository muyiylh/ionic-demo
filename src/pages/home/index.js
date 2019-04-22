import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button,Image,Dimensions } from 'react-native';
 import { MapView } from 'react-native-amap3d'
 import { connect } from '../../utils/dva';
 import moment from 'moment';
 import {deviceHeight, scaleSize} from '../../utils/ScreenUtil';
import{text_font_size} from '../../utils/theme';

class Home extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const {dispatch} = this.props;
       
        // dispatch({type:'home/queryList'});
    }
    clickMarker =(value)=>{
        console.log("onpreesss",value);
    }
    render() {
        const {list}   = this.props.home;
       
        return (
            <ScrollView style={styles.pageStyle}>
            <Text>22222331113311</Text>
            <MapView
                style={{height:deviceHeight}}
                coordinate={{
                    latitude: 30.67,
                    longitude: 104.07,
                }}
              
                >
                  {list && list.map((item,index)=>{
                  
                    let latitude = item.waterLati ? parseFloat(item.waterLati):null;
                    let longitude = item.waterLong ? parseFloat(item.waterLong):null;
                    if(latitude!=null && longitude !=null){
                        return <MapView.Marker
                                    key={index}
                                    onPress={()=>this.clickMarker(item)}
                                        coordinate={{
                                            latitude: latitude,
                                            longitude: longitude,
                                        }}
                                >
                                <View style={[styles.infowindow,{paddingTop:10}]}>
                                    <Text style={styles.title}>项目名称: {item.projectName}</Text>
                                    <View>
                                        <Text style={[styles.textstyle,{paddingTop:10}]}>开始时间：{moment(item.recivedTime).format("YYYY/MM/DD")}</Text>
                                        <Text style={styles.textstyle}>经办人：{item.managerName}</Text>
                                        <Text style={styles.textstyle}>联系方式：{item.managerContact}</Text>
                                    </View>
                                    
                                </View>
                                </MapView.Marker>
                    }
                
                })}
</MapView>

              
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    const {home} = state;
    return {home}
}
export default connect(mapStateToProps)(Home);
const styles = StyleSheet.create({
    pageStyle: {
        backgroundColor: '#EBEEF5',
      
    },
    list:{
        marginBottom:10,
        backgroundColor: '#fff',
        paddingLeft:10
    },
    info:{
        flex:1,
        justifyContent:"space-between",
        flexDirection:"row",
        paddingBottom:10
    },

    project:{
        fontSize:20,
        color:"#000033",
        borderBottomWidth:1,
        borderColor:'#dddddd',
        paddingTop:10,
        paddingBottom:10,
       
    },
    texts:{
        fontSize:18,
        color:"#999999",
    },
    infowindow:{
        backgroundColor:"#ffffff",
        paddingTop:20,
        paddingBottom:20,
        fontSize:scaleSize(text_font_size)
    },
    title:{
        fontSize:scaleSize(text_font_size),
        borderBottomWidth:1,
        borderColor:'#dddddd',
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
       
    },
    textstyle:{
        fontSize:scaleSize(text_font_size),
        paddingLeft:20,
        paddingRight:20,
    }
    
});