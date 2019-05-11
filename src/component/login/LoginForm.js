/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/12/20
 */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {createForm} from 'rc-form';
import {deviceWidth, scaleSize} from '../../utils/ScreenUtil';
import IconInput from "./IconInput";

import accIcon from '../../images/login_acc.png';
import pwdIcon from '../../images/login_pwd.png';

import {hasErrors, showFormError} from '../../utils'


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            time: 90,
            loginType: 1     //用户登陆方式；0表示账号密码登陆，1表示手机验证码登陆
        }
    }

    submit = () => {
        const {form, onLogin} = this.props;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            onLogin(values);
        })
    };

    toggleLoginType = (loginType) => {
        this.setState({loginType})
    };

    render() {

        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <View style={styles.login}>
                {
                    getFieldDecorator('userName', {
                        validateFirst: true,
                        initialValue:"wl007",
                        rules: [
                            {required: true, message: '请输入账号'},
                    
                        ]
                    })(
                        <IconInput icon={accIcon} label="账号"/>
                    )
                }
                {
                    getFieldDecorator('password', {
                        validateFirst: true,
                        initialValue:"wl111111",
                        rules: [
                            {required: true, message: '请输入密码'}
                        ]
                    })(
                        <IconInput icon={pwdIcon} type='pwd' label="密码"/>
                  
                    )
                }
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.submit}
                >
                    <Text style={styles.submitBtnText}>登录</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        height: scaleSize(90),
        borderRadius: scaleSize(103) / 2,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        height: scaleSize(103),
        fontSize: scaleSize(16),
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
    },
    login: {
        width: deviceWidth,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        borderRadius: 10,
    },
    loginTypeToggle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
        paddingRight: 15
    },
    loginTypeBtn: {},
    submitBtn: {
        backgroundColor: "rgba(255,255,255,.2)",
        borderRadius: 22,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: scaleSize(30)
    }
});
LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onGetValid: PropTypes.func,
};

export default createForm()(LoginForm);