import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text,View,AsyncStorage,ImageBackground,Image } from 'react-native';
import { WhiteSpace, WingBlank } from '@ant-design/react-native';

import { connect } from 'react-redux';
import {SystemInfo} from "../../utils/index";
import NavigationUtil from "../../utils/NavigationUtil";
import {deviceHeight,deviceWidth, scaleSize} from "../../utils/ScreenUtil";
import BgImag from '../../images/BG.png';
import Avatar from '../../images/Headportrait.png';
import List from './../../component/module/list';
import Button from './../../component/button';//
import PersonalIcon from '../../images/personal1.png';
import FinishIcon from '../../images/personal2.png';
import NoticeIcon from '../../images/news.png';
import ModifyIcon from '../../images/personal4.png';
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
        console.log("my user:",user);
        return (
            <ScrollView style={styles.myPage}>

            <ImageBackground source={BgImag} style={styles.container}> 
                <Image style={styles.logo} source={Avatar}/>

                <View style={styles.osName}><Text style={styles.osNameTxt}>欢迎您({user.name})</Text></View>
             
            </ImageBackground>
            <WhiteSpace />
        
                    <List title="个人信息查看" path="myInfo" img={PersonalIcon}></List>
                    <List title="我的已办事项" path="myFinish" img={FinishIcon}></List>
                    <List title="我的通知消息" path="myNotice" img={NoticeIcon}></List>
                    <List title="个人密码修改" path="myUpdatePwd" img={ModifyIcon}></List>
         
                <WhiteSpace />
                <Button  onPress={this.logout} title="退出系统" bgc="#ffffff" color="#ff5151"></Button>
                
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
        height:240,
        alignItems:'center',
        justifyContent:'center',
    
    },
    logo:{
        
    },
    osName:{
        paddingTop:20,
        paddingBottom:6,
    },
    osNameTxt:{
        fontSize:scaleSize(30),
        color:'#fff'
    },
    wrap:{
        marginTop:10,
        marginBottom:10,
        
    },
    btn:{
        backgroundColor:'#ffffff',
        color:'#ff5151',
        fontSize:scaleSize(30)
    }
});