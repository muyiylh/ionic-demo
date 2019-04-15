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
    NativeAppEventEmitter,
    Alert,
    AsyncStorage,
} from 'react-native';
import {connect} from '../utils/dva';
import {SET_GETUI_INFO, SET_CURRENT_POSITION, COMMON_QUERY_CONFIG_PARAM_REQ} from '../constants/ActionTypes';
import Getui from 'react-native-getui';
import loginBg from '../images/BG_2x.png';
import NotifService from "../utils/NotifService";
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";
class InitLoading extends React.Component {
    constructor(props) {
        super(props);
        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }
    /**
     * 更新个推信息
     */
    updateGeTuiInfo = async () => {
        const {navigation:{navigate}, dispatch, index} = this.props;
        const p1 = new Promise((resolve, reject)=>{
            Getui.clientId((param) => {
                resolve(param);
            });
        });
        const p2 = new Promise((resolve, reject)=>{
            Getui.version((param) => {
                resolve(param);
            });
        });
        const p3 = new Promise((resolve, reject)=>{
            Getui.status((param) => {
                resolve(param);
            });
        });
        const getuiInfo = await Promise.all([p1, p2, p3]).then((result) => {
            return {clientId: result[0], version: result[1], status: result[2]};
        }).catch((error) => {
            console.log(error)
        });
        const location = await new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition(location=>{
                resolve({latitude: location.coords.latitude, longitude: location.coords.longitude})
            }, error=>{
                resolve({latitude: 0, longitude: 0})
                // reject(error);
            },{
                timeout: 200000,
                maximumAge: 200000,
            });
        });

        await dispatch({type: `index/${SET_GETUI_INFO}`, getuiInfo});
        await dispatch({type: `index/${SET_CURRENT_POSITION}`, location});
       // await dispatch({type: `index/${COMMON_QUERY_CONFIG_PARAM_REQ}`});
       // navigate({routeName: 'App'});
       const user = await AsyncStorage.getItem('user');

        const userInfo = JSON.parse(user);
    console.log("userInfo:",userInfo);
    //(0:领导角色,1:业务角色)
       if(userInfo && userInfo.type== 1){//业务
        NavigationUtil.navigate('App', {});
       }else{//领导
        NavigationUtil.navigate('Appleader', {});
       }
      
    };
    /**
     * 个推事件监听
     */
    receiveRemoteNotificationSub = NativeAppEventEmitter.addListener('receiveRemoteNotification',
        (notification) => {
            //消息类型分为 cmd 和 payload 透传消息，具体的消息体格式会有差异
            switch (notification.type) {
                case "cid":
                    console.log('初始化获取到cid',notification);
                    break;
                case "cmd":
                    Alert.alert('cmd 消息通知',JSON.stringify(notification));
                    break;
                case "payload":
                    Alert.alert('payload 消息通知',JSON.stringify(notification));
                    break;
                //新增回调通知到达，点击回调
                case 'notificationArrived':
                    Alert.alert('notificationArrived 通知到达',JSON.stringify(notification));
                    break;
                case 'notificationClicked':
                    Alert.alert('notificationArrived 通知点击',JSON.stringify(notification));
                    break;
                default:
            }
        }
    );
    onRegister = (token) => {

    };
    onNotif = (notif) => {

    };
    componentDidMount(){
        this.updateGeTuiInfo();
    }
    // Render any loading content that you like here
    render() {
        return (
            <ImageBackground source={loginBg} style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </ImageBackground>
        );
    }
    componentWillUnmount() {
        this.receiveRemoteNotificationSub.remove()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }
});
function mapStateToProps(state) {
    const {index} = state;
    return {
        index
    }
}
export default connect(mapStateToProps)(InitLoading);