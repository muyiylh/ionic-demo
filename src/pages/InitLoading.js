/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/21
 */
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    Platform,
    NativeAppEventEmitter,
    Alert,
    AsyncStorage,
} from 'react-native';


import {connect} from '../utils/dva';
// import {SET_GETUI_INFO, SET_CURRENT_POSITION, COMMON_QUERY_CONFIG_PARAM_REQ} from '../constants/ActionTypes';
// import Getui from 'react-native-getui';
import loginBg from '../images/login_bg.png';
// import NotifService from "../utils/NotifService";
 import NavigationUtil from '../utils/NavigationUtil';

import JPushModule from 'jpush-react-native';
import {SystemInfo} from "../utils/index";

const receiveCustomMsgEvent = 'receivePushMsg';
const receiveNotificationEvent = 'receiveNotification';
const openNotificationEvent = 'openNotification';
const getRegistrationIdEvent = 'getRegistrationId';
class InitLoading extends React.Component {
    constructor(props){

        super(props);
        this.state={
          appkey : "",
          imei : "",
          package : "",
          deviceId : "",
          version : "",
          extras:{},
        }
      }
      componentDidMount() {
          const user = SystemInfo.getUser();
          const userInfo = typeof user == 'string' ? JSON.parse(user):user;
   
        if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.setAlias(userInfo.name,map => {
                if (map.errorCode === 0) {
                  console.log('set alias succeed')
                } else {
                  console.log('set alias failed, errorCode: ' + map.errorCode)
                }
            })
            JPushModule.getInfo(map => {
             
                this.setState({
                    appkey : map.myAppKey,
                    imei : map.myImei,
                    package : map.myPackageName,
                    deviceId : map.myDeviceId,
                    version : map.myVersion
                })
            })
            //v1.6.6 版本以后，增加了 notifyJSDidLoad 方法，在监听所有相关事件之前要调用此方法，否则不会收到点击通知事件。（only android）
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        }else if(Platform.OS === 'ios'){
            JPushModule.setupPush()
        }
        //接收自定义消息监听
        JPushModule.addReceiveCustomMsgListener(map => {
            this.setState({
                pushMsg: map.message,
                extras:map.extras
            })
            // console.log("addReceiveCustomMsgListener map:",map);
            // console.log('custorm  extras: ' + map.extras)
        })
        //接收通知监听
        JPushModule.addReceiveNotificationListener((map) => {
            // console.log("2alertContent: " + map.alertContent);
            //  console.log("2extras: " + map.extras);
        })
    
        //在用户点击通知后，将会触发此事件
        JPushModule.addReceiveOpenNotificationListener((map) => {
            // console.log("Opening notification!");
            // console.log("map.extra: " , map.extras);
            // console.log("map: " , map);
            
            this.jumpSecondActivity(JSON.parse(map.extras),userInfo);
        })
        //获取注册id监听
        JPushModule.addGetRegistrationIdListener(registrationId =>{
            //console.log('Device register succeed, registrationId ' + registrationId)
        })
      

    //(0:领导角色,1:业务角色)
        if(userInfo && userInfo.type== 1){//业务
         NavigationUtil.navigate('App', {});
        }else{//领导
        NavigationUtil.navigate('LeaderApp', {});
       }
        // var notification = {
        //   buildId: 1,
        //   id: 5,
        //   title: 'jpush',
        //   content: 'This is a test!!!!',
        //   extra: {
        //     key1: 'value1',
        //     key2: 'value2'
        //   },
        //   fireTime: 2000
        // }
        // JPushModule.sendLocalNotification(notification)
    
    };
    jumpSecondActivity = (type,userInfo) =>{
        switch(type.jumpTag){
            case 1:
            NavigationUtil.navigate('busTranxList', {});//客户跟踪计划
            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
            case 6:
            NavigationUtil.navigate('busPatrolPlan', {});//水表巡查计划
            break;
            case 5:
            NavigationUtil.navigate('busInspectPlan', {});//检查计划
            break;
            case 1000:
            if(userInfo && userInfo.type== 1){
                NavigationUtil.navigate('backlog', {});//我的待办
            }
            //else if(userInfo && userInfo.type== 0){
                //NavigationUtil.navigate('myFinish', {});//我的待办
           // }
           
            break;
            
          
        }
    }
    
    
    //移除监听
    componentWillUnmount () {
        JPushModule.removeReceiveCustomMsgListener(receiveCustomMsgEvent)
        JPushModule.removeReceiveNotificationListener(receiveNotificationEvent)
        JPushModule.removeReceiveOpenNotificationListener(openNotificationEvent)
        JPushModule.removeGetRegistrationIdListener(getRegistrationIdEvent)
        console.log('Will clear all notifications')
        JPushModule.clearAllNotifications()
    }
    render() {
        return (
            <ImageBackground source={loginBg} style={styles.container}>
                <ActivityIndicator size="large" />
            </ImageBackground>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }
});
// function mapStateToProps(state) {
//     const {index} = state;
//     return {
//         index
//     }
// }connect(mapStateToProps)
export default (InitLoading);