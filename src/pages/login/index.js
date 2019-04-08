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
import loginBg from '../../assets/image/BG_2x.png';
import logoImg from '../../assets/image/LOGO_2x.png';
import footImg from '../../assets/image/GSMC_2x.png';
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
            type: `login/loginAppByPhone`,
            loginUser
        })

    };
    onGetValid = (phone)=>{
        getPhoneValid(phone)
    };
    render(){
        console.log(this.props.index)
        return(
            <ImageBackground source={loginBg} style={styles.container}>
                <Image style={styles.logo} source={logoImg}/>
                <View style={styles.osName}><Text style={styles.osNameTxt}>在线报装系统</Text></View>
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
        width: 150,
        height: 150,
        marginTop: 120
    },
    osName: {
    },
    osNameTxt: {
        fontSize: 28,
        color: '#fff'
    },
    loginForm: {
        width: '100%'
    },
    footer: {
        height: 28,
        position:'absolute',
        bottom: 15
    }
});
function mapStateToProps(state) {
    const {login, index} = state;
    return {login, index}
}
export default connect(mapStateToProps)(Login);
