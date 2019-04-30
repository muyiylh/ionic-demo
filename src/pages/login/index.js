/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/20
 */
import React from 'react';
import {StyleSheet, Image, ImageBackground, View, Text, StatusBar} from 'react-native';
import { connect } from '../../utils/dva';
import LoginForm from '../../component/login/LoginForm';
import loginBg from '../../images/login_bg.png';
import logoImg from '../../images/LOGO.png';
import footImg from '../../images/GSMC.png';
import {deviceWidth, scaleSize} from '../../utils/ScreenUtil';


class Login extends React.Component{
    static navigationOptions = {
        headerMode: 'none'
    };
    onLogin = (loginUser) => {
  
        const { dispatch } = this.props;
        dispatch({
            type: `login/login`,
            loginUser
        })

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
