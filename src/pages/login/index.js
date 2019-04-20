/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/20
 */
import React from 'react';
import {StyleSheet, Image, ImageBackground, View, Text, StatusBar} from 'react-native';
import { connect } from '../../utils/dva';
import LoginForm from '../../component/login/LoginForm';
import { LOGIN_REQ } from '../../constants/ActionTypes';
import loginBg from '../../images/BG_2x.png';
import logoImg from '../../images/LOGO_2x.png';
import footImg from '../../images/GSMC_2x.png';
import {deviceWidth, scaleSize} from '../../utils/ScreenUtil';
import {getPhoneValid} from "../../services/CommonService";

class Login extends React.Component{
    static navigationOptions = {
        headerMode: 'none'
    };
    onLogin = (loginUser) => {
  
        const { dispatch } = this.props;
        /**
         * 在组件中dispatch action
         * 一定要写namespace
         * /system/0/common/loginApp
         */
        dispatch({
            type: `login/${LOGIN_REQ}`,
            loginUser
        })

    };
    onGetValid = (phone)=>{
 
        getPhoneValid(phone)
    };
    render(){

        return(
            <ImageBackground source={loginBg} style={styles.container}>
                <Image style={styles.logo} source={logoImg}/>
                <View style={styles.osName}><Text style={styles.osNameTxt}></Text></View>
                <LoginForm onLogin={this.onLogin} style={styles.loginForm} onGetValid={this.onGetValid}/>
                <Image source={footImg} style={styles.footer} resizeMode='contain'/>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    logo: {
        width: scaleSize(250),
        height: scaleSize(250),
        marginTop: scaleSize(120)
    },
    osName: {
    },
    osNameTxt: {
        fontSize: scaleSize(28),
        color: '#fff'
    },
    loginForm: {
        width: '100%'
    },
    footer: {
        height: scaleSize(36),
        position:'absolute',
        bottom: 15
    }
});
function mapStateToProps(state) {
    const {login, index} = state;
    return {login, index}
}
//
export default connect(mapStateToProps)(Login);
