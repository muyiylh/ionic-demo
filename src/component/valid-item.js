/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/25
 */
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {scaleSize} from "../utils/ScreenUtil";
import {InputItem} from '@ant-design/react-native';

class ValidItem extends React.Component{
    static propTypes = {
        placeholder: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        onValidPress: PropTypes.func
    };
    constructor(props){
        super(props);
    }

    onValidPress = () => {
        const {onValidPress} = this.props;
        onValidPress && onValidPress();
    };
    render(){
        const {children, loading, time, ...other} = this.props;
        return(
            <InputItem {...other} extra={
                <TouchableOpacity
                    style={styles.validBtn}
                    onPress={()=>this.onValidPress()}
                    disabled={loading}
                >
                    <Text style={loading ? styles.disableTxt : styles.validBtnTxt}>
                        {loading ? time : '获取验证码'}
                    </Text>
                </TouchableOpacity>
            }>{children}</InputItem>

        )
    }
}
const styles = StyleSheet.create({
    validBtn: {
        width: scaleSize(200),
        justifyContent:'center',
        alignItems:'center',
    },
    validBtnTxt: {
        color: '#46d0ec'
    },
    disableTxt: {
        color: '#ddd'
    }
});
export default ValidItem;
