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
import accountIcon from '../../assets/image/ZH_2x.png';
import passwordIcon from '../../assets/image/MM_2x.png';
import phoneIcon from '../../assets/image/SJ_2x.png';
import validIcon from '../../assets/image/YZM_2x.png';
import ValidInput from "./ValidInput";
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
    onGetValid = () => {

        const {form, onGetValid} = this.props;
        const {validateFields, getFieldsError} = form;
        validateFields(['phone'], (error, values) => {
            if (error) {
                showFormError(getFieldsError());
                return;
            }
            this.setState({loading: true});
            const i = setInterval(() => {
                let {time} = this.state;
                if (time > 1) {
                    this.setState({time: --time});
                } else {
                    clearInterval(i);
                    this.setState({time: 90, loading: false});
                }

            }, 1000);
            onGetValid && onGetValid(values.phone)
        })
    };
    toggleLoginType = (loginType) => {
        this.setState({loginType})
    };

    render() {
        const {loginType, loading, time} = this.state;
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <View style={styles.login}>
                {
                    getFieldDecorator('phone', {
                        validateFirst: true,
                        rules: [
                            {required: true, message: '请输入手机号码'},
                            {
                                pattern: /^1[34578]\d{9}$/,
                                message: '手机号码不正确',
                                transform(value) {
                                    return value ? value.replace(/\s*/g, "") : value;
                                }
                            }
                        ]
                    })(
                        <IconInput icon={phoneIcon} label="手机号码"/>
                    )
                }
                {
                    getFieldDecorator('validateCode', {
                        validateFirst: true,
                        rules: [
                            {required: true, message: '请输入验证码'}
                        ]
                    })(
                        <ValidInput
                            icon={validIcon}
                            label="验证码"
                            onGetValid={this.onGetValid}
                            loading={loading}
                            time={time}
                        />
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
        height: scaleSize(103),
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
        fontSize: 18
    }
});
LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onGetValid: PropTypes.func,
};

export default createForm()(LoginForm);