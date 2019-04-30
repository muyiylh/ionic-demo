import React, { Component } from 'react';
import { Text, View, Image, StyleSheet,ScrollView } from 'react-native';

import { scaleSize,deviceHeight,deviceWidth } from '../../../utils/ScreenUtil';
import Swiper from 'react-native-swiper';
import BarChartScreen from '../../../component/chart/BarChartScreen';
import { WhiteSpace } from '@ant-design/react-native';
class Index extends Component {
    static navigationOptions = {
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View >
                    <View style={styles.box}>
                        <View style={styles.wrapBox}>
                        
                                <Text style={styles.wrapBoxTitle}>2018新增报装数</Text>
                                <Text style={styles.wrapBoxNum}>23444</Text>
                                <View>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>同比2017年增长：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.22%</Text>
                                    </View>
                                   
                                </View>
                           
                        </View>
                        <View style={styles.wrapBox}>
                        <Text style={styles.wrapBoxTitle}>2018水表安装总数</Text>
                                <Text style={styles.wrapBoxNum}>23444</Text>
                                <View>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>同比2017年增长：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.22%</Text>
                                    </View>
                                   
                                </View>
                               
                        </View>
                    </View>
                    <View style={styles.box}>
                            <View style={styles.wrapBox}>
                                
                                <Text style={styles.wrapBoxTitle}>2018进行报装数</Text>
                                <Text style={styles.wrapBoxNum}>23444</Text>
                                <View>
                                    <View  style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>新增报装完成率：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.32%</Text>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>整体报装完成率：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.22%</Text>
                                    </View>
                                </View>
                        </View>
                        <View style={styles.wrapBox}>
                                <Text style={styles.wrapBoxTitle}>2018正常报装数</Text>
                                <Text style={styles.wrapBoxNum}>23444</Text>
                                <View>
                                    <View  style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>正常报装完成率：</Text>
                                        <Text style={styles.wrapBoxFoot}>34</Text>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>同比2017年增长：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.22%</Text>
                                    </View>
                                </View>
                        </View>
                    </View>
                    <View style={styles.box}>
                    <View style={styles.wrapBox}>
                                
                                <Text style={styles.wrapBoxTitle}>2018超周期报装数</Text>
                                <Text style={styles.wrapBoxNum}>23444</Text>
                                <View>
                                    <View  style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>超周期报装完成率：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.32%</Text>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>同比2017年增长：</Text>
                                        <Text style={styles.wrapBoxFoot}>34.22%</Text>
                                    </View>
                                </View>
                        </View>
                        <View style={styles.wrapBox}>
                        <Text style={styles.wrapBoxTitle}>2018完成报装数</Text>
                                <Text style={styles.wrapBoxNum}>23444</Text>
                                <View>
                                    <View  style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>当年完成报装数：</Text>
                                        <Text style={styles.wrapBoxFoot}>34</Text>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={styles.wrapBoxFoot}>往年完成报装数：</Text>
                                        <Text style={styles.wrapBoxFoot}>3422</Text>
                                    </View>
                                </View>
                        </View>
                    </View>
                </View>
                <View style={styles.charts}>
                <Swiper style={styles.wrapper} showsButtons={false} height={600}>
                        <View>
                            <View style={styles.chartTitle}>
                                <Text style={styles.chartText}>新增报装增长分布:</Text>
                                <Text style={styles.chartUnit}>单位:数量</Text>
                            </View>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <View>
                             <BarChartScreen /> 
                            </View>
                        </View>
                        
                
                </Swiper>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EBEEF5',
       // padding:5,
    },
    icon: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
    box:{
        flex:1,
       // justifyContent:"space-between",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        
        
    },
    wrapBox:{
        width:'47%',
        backgroundColor:'#fff',
        margin:5,

        paddingTop:10,
        paddingBottom:10,
        justifyContent:'center',
        alignItems:'center',

       
    },
    wrapBoxTitle:{
        color:'#666',fontSize:scaleSize(30),
    },
    wrapBoxNum:{
        color:'#45cbe6',fontSize:scaleSize(34),
        paddingTop:5,
        paddingBottom:5
    }
    ,
    wrapBoxFoot:{
        color:'#999',fontSize:scaleSize(26),
    }
    ,
    wrapper:{
       
    },
    charts:{
        height:600,
        backgroundColor:'#fff',
        margin:10,
    }
    ,
    chartTitle:{
        justifyContent:'space-between',flexDirection:'row',
        padding:10,
       
    
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderColor:"#ddd",
    },
    chartText:{
        color:'#666',
        fontSize:scaleSize(28),
    },
    chartUnit:{
        color:'#999',
        fontSize:scaleSize(28),
    }
    // wrapper: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
});

export default Index;