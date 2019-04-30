import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text,View,AsyncStorage,ImageBackground,Image } from 'react-native';
import { WhiteSpace, WingBlank } from '@ant-design/react-native';


import {SystemInfo} from "../../../utils/index";
import NavigationUtil from "../../../utils/NavigationUtil";
import {deviceHeight,deviceWidth, scaleSize} from "../../../utils/ScreenUtil";
import BgImag from '../../../images/BG.png';
import Avatar from '../../../images/Headportrait.png';
import List from './../../../component/module/list';
import Button from './../../../component/button';//
import PersonalIcon from '../../../images/personal1.png';
import FinishIcon from '../../../images/personal2.png';
import NoticeIcon from '../../../images/news.png';
import{text_font_size} from '../../../utils/theme';
import ModifyIcon from '../../../images/personal4.png';
class My extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
       
    }
    logout =()=>{
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('role');
        SystemInfo.removeItem('token');
        SystemInfo.removeItem('user');
        SystemInfo.removeItem('role');
        NavigationUtil.navigate("AuthLoading");
    }
    render() {
        let user = SystemInfo.getUser();
        if(typeof user =='string'){
            user = JSON.parse(user);
        }

        return (
            <ScrollView style={styles.myPage}>

            <ImageBackground source={BgImag} style={styles.container}> 
                <View>
                <Image style={styles.logo} source={Avatar}/>
                </View>
                <View style={styles.osName}><Text style={styles.osNameTxt}>欢迎您({user.name})</Text></View>
             
            </ImageBackground>
            <WhiteSpace />
        
                    <List title="个人信息查看" path="myLeaderInfo" img={PersonalIcon}></List>
                    <List title="我的已办事项" path="myLeaderFinish" img={FinishIcon}></List>
                    <List title="我的通知消息" path="myLeaderNotice" img={NoticeIcon}></List>
                    <List title="个人密码修改" path="myLeaderUpdatePwd" img={ModifyIcon}></List>
         
                <WhiteSpace />
                <Button  onPress={this.logout} title="退出系统" bgc="#ffffff" color="#ff5151"></Button>
                <WhiteSpace />
            </ScrollView>
        );
    }
}

export default (My);
const styles = StyleSheet.create({
    myPage: {
        backgroundColor: '#EBEEF5',
        marginBottom:10
    },
    container:{
        height:160,
        alignItems:'center',
        justifyContent:'center',
    
    },
    logo:{
        height:80,

    },
    osName:{
        paddingTop:20,
        paddingBottom:6,
    },
    osNameTxt:{
        fontSize:scaleSize(text_font_size),
        color:'#fff'
    },
    wrap:{
        marginTop:10,
        marginBottom:10,
        
    },
    btn:{
        backgroundColor:'#ffffff',
        color:'#ff5151',
        fontSize:scaleSize(text_font_size)
    }
});