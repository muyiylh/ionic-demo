import React, { Component } from 'react';
import { Text, View, Image, StyleSheet,ScrollView,findNodeHandle,UIManager } from 'react-native';

import { scaleSize,deviceHeight,deviceWidth } from '../../../utils/ScreenUtil';
import Swiper from 'react-native-swiper';
import BarChartScreen from '../../../component/chart/BarChartScreen';
import GroupBarChartScreen from '../../../component/chart/GroupBarChartScreen';
import PieChartScreen from '../../../component/chart/PieChartScreen';
import HorizontalBarChartScreen from '../../../component/chart/HorizontalBarChartScreen'
import { WhiteSpace } from '@ant-design/react-native';

const chartHeight = deviceHeight-deviceHeight/1.53;
class Index extends Component {
    static navigationOptions = {
    };
    componentDidMount(){
 
    }


    render() {
   
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapText}>
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
                <Swiper style={styles.wrapper} showsPagination={false} showsButtons={false} style={{height:chartHeight}}>
                        <View>
                            <View style={styles.chartTitle}>
                                <Text style={styles.chartText}>新增报装增长分布:</Text>
                                <Text style={styles.chartUnit}>单位:数量</Text>
                            </View>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <View>
                             <BarChartScreen height={chartHeight}/> 
                            </View>
                        </View>
                        <View>
                            <View style={styles.chartTitle}>
                                <Text style={styles.chartText}>报装完成周期数:</Text>
                                <Text style={styles.chartUnit}>单位:数量</Text>
                            </View>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <View>
                             <GroupBarChartScreen height={chartHeight}/> 
                            </View>
                        </View>
                        <View>
                            <View style={styles.chartTitle}>
                                <Text style={styles.chartText}>报装占比:</Text>
                                <Text style={styles.chartUnit}>单位:%</Text>
                            </View>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <View>
                             <PieChartScreen height={chartHeight}/> 
                            </View>
                        </View>
                        <View>
                            <View style={styles.chartTitle}>
                                <Text style={styles.chartText}>水管安装:</Text>
                                <Text style={styles.chartUnit}>单位:数量</Text>
                            </View>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <View>
                             <HorizontalBarChartScreen height={chartHeight}/> 
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
        flexDirection:'column',
    
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
    wrapText:{
        flexGrow:2,
    },
    wrapper:{
        flexGrow:1,
    },
    charts:{
        //height:600,
        backgroundColor:'#fff',
        margin:10,
        flexGrow:1,
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