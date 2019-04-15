import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button,Image,Dimensions } from 'react-native';
 import { MapView,Marker } from 'react-native-amap3d'
 import { connect } from '../../utils/dva';
 import {deviceHeight} from '../../utils/ScreenUtil';

class Home extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const {dispatch} = this.props;
       
        dispatch({type:'home/queryList'});
    }
    render() {
        const {list}   = this.props.home;
        console.warn("render list",list);
        return (
            <ScrollView style={styles.pageStyle}>
            <Text>222</Text>
            <MapView
                style={{height:deviceHeight}}
                coordinate={{
                    latitude: 30.67,
                    longitude: 104.07,
                }}
              
                >
                  {list && list.map(item=>{

                    return <Marker
                    active
                        title='这是一个标注点'
                        color='red'
                        description='Hello world!'
                    coordinate={{
                        latitude: item.waterLati,
                        longitude: item.waterLong,
                      }}
                    ></Marker>
                })}
</MapView>
                {/* <Image style={styles.imgStyle} resizeMode="contain" source={require("../../images/123.jpg")}/> */}
               
                {/* <View style={styles.list}>
                    <View >
                        <Text style={styles.project}>武侯区</Text>
                    </View>
                    <View style={{paddingTop:10,paddingBottom:10}}>
                        <Text style={styles.texts}>用水地址</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.texts}>经办人：1222</Text>
                        <Text style={styles.texts}>联系方式：122223233333</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <View >
                        <Text style={styles.project}>武侯区</Text>
                    </View>
                    <View style={{paddingTop:10,paddingBottom:10}}>
                        <Text style={styles.texts}>用水地址</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.texts}>经办人：1222</Text>
                        <Text style={styles.texts}>联系方式：122223233333</Text>
                    </View>
                </View> */}
              
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
    imgStyle: {
        // 设置背景颜色
        flex:1,
        alignItems:"flex-start",
        // 设置宽度
        width:Dimensions.get('window').width,
        // 设置高度
        height:450,
        // 设置图片填充模式
        resizeMode:'cover'
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
      

    }
});