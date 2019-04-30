/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import JPushModule from 'jpush-react-native';
import {Toast, Portal,List} from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/pages/login/index';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const receiveCustomMsgEvent = 'receivePushMsg';
const receiveNotificationEvent = 'receiveNotification';
const openNotificationEvent = 'openNotification';
const getRegistrationIdEvent = 'getRegistrationId';
export default class App extends Component<Props> {
  constructor(props){

    super(props);
    this.state={
      appkey : "",
      imei : "",
      package : "",
      deviceId : "",
      version : ""
    }
  }
  componentDidMount() {
    setTimeout(()=>{SplashScreen.hide()}, 3000, );
   //    Toast.fail("rwrr232323");
   // alert("test")
    if (Platform.OS === 'android') {
        JPushModule.initPush()
       
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
            pushMsg: map.message
        })
        console.log('extras: ' + map.extras)
    })
    //接收通知监听
    JPushModule.addReceiveNotificationListener((map) => {
        console.log("alertContent: " + map.alertContent);
        console.log("extras: " + map.extras);
    })

    //在用户点击通知后，将会触发此事件
    JPushModule.addReceiveOpenNotificationListener((map) => {
        console.log("Opening notification!");
        console.log("map.extra: " + map.key);
        console.log("map: " + map);
        this.jumpSecondActivity()
    })
    //获取注册id监听
    JPushModule.addGetRegistrationIdListener(registrationId =>{
        console.log('Device register succeed, registrationId ' + registrationId)
    })

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
      <View>
          <List.Item extra="箭头向右" arrow="horizontal" onPress={() => {}}>
            标题文字ewewewe
          </List.Item>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        
      
      {/* <Login /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
