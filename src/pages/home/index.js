import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button,Image,Dimensions } from 'react-native';
// import { MapView } from 'react-native-amap3d'

class Home extends Component {

    constructor(props) {
        super(props);
    }
    render() {
   
        return (
            <ScrollView style={styles.pageStyle}>
            
            {/* <MapView
                coordinate={{
                    latitude: 39.91095,
                    longitude: 116.37296,
                }}
                /> */}
                <Image style={styles.imgStyle} resizeMode="contain" source={require("../../images/123.jpg")}/>
               
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
                </View>
                {/* <List title="日期/时间选择器" path="datePicker"></List>
                <List title="上传图片/拍照/图片剪切" path="imagePicker"></List>
      
                <List title="轮播图" path="swiper"></List>
                <Text style={{ fontSize: 30 }}>自定义组件/方法</Text>
                <List title="提示" path="toast"></List>
                <List title="请求加载" path="loading"></List>
                <List title="弹窗" path="popup"></List>
                <List title="地址选择器" path="addressSelect"></List>
                <Text style={{ fontSize: 30 }}>原生组件</Text>
                <List title="加载动画" path="activityIndicator"></List>
                <List title="按钮事件" path="button"></List>
                <List title="阴影样式属性（IOS）" path="shadow"></List>
                <List title="高性能列表组件" path="flatList"></List>
                <List title="图片/背景图片显示" path="imagePage"></List>
                <List title="输入框" path="textInput"></List>
                <List title="全屏蒙层" path="modal"></List>
                <List title="picker弹窗" path="picker"></List>
                <List title="下拉刷新（官方版）" path="refreshControl"></List>
                <List title="表单" path="form"></List>
                <List title="web View" path="webView"></List> */}
            </ScrollView>
        );
    }
}
export default Home;
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