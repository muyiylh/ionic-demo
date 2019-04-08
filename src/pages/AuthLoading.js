/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/21
 */
import React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
import {LOGIN_RESP, WEB_SOCKET_CONNECT} from '../constants/ActionTypes';

import loginBg from '../assets/image/BG_2x.png';
import BaseComponent from "../utils/BaseComponent";
import {SystemInfo} from "../utils/index";
class AuthLoading extends BaseComponent {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const {navigation:{navigate}, dispatch} = this.props;
        if(userToken && user){
            try{
                const userInfo = JSON.parse(user);
                await dispatch({type: `index/${WEB_SOCKET_CONNECT}`, user:userInfo});
                this.context.setContext({user:userInfo, token: userToken});
                navigate('InitLoading');
            }catch (e){
                this.context.setContext({token:null, user: null});
                navigate('Auth')
            }
        }else{
            this.context.setContext({token:null, user: null});
            navigate('Auth')
        }
    };
    render() {
        return (
            <ImageBackground source={loginBg} style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#07a189'
    }
});
function mapStateToProps(state) {
    const {index} = state;
    return {
        index
    }
}
export default connect(mapStateToProps)(AuthLoading);