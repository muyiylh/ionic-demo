/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/16
 */
import React from 'react';
import {View, TextInput, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

class ValidInput extends React.Component{
    constructor(props){
        super(props);
    }
    onValidPress = () => {
        const {onGetValid} = this.props;
        onGetValid && onGetValid();
    };
    render(){
        const {icon, label, value, onChange, loading, time} = this.props;
        return (
            <View style={styles.iconInput}>
                <Image source={icon} style={styles.icon} resizeMode='contain'/>
                <Text style={styles.label}>{label}:</Text>
                <TextInput style={styles.input} value={value} onChangeText={onChange} maxLength={6}/>
                <TouchableOpacity style={styles.validBtn} onPress={this.onValidPress}>
                    <Text style={loading ? styles.disableTxt : styles.validBtnTxt}>
                        {loading ? time : '获取验证码'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
ValidInput.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onGetValid: PropTypes.func,
    loading: PropTypes.boolean,
    time: PropTypes.number
};
const styles = StyleSheet.create({
    iconInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 22,
        marginBottom: 15
    },
    icon:{
        width: 20,
        height: 20
    },
    label:{
        fontSize: 18,
        color: '#fff',
        marginLeft: 5,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        padding: 0,
        color: '#fff'
    },
    validBtn:{
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    validBtnTxt: {
        color: '#fff',
        fontSize: 16,
    },
    disableTxt: {
        color: '#ddd',
        fontSize: 16,
    }
});

export default ValidInput;