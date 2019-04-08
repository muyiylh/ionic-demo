/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/16
 */
import React from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';

class IconInput extends React.Component{
    render(){
        const {icon, label, value, onChange} = this.props;
        return (
            <View style={styles.iconInput}>
                <Image source={icon} style={styles.icon} resizeMode='contain'/>
                <Text style={styles.label}>{label}:</Text>
                <TextInput style={styles.input} maxLength={11} value={value} onChangeText={onChange}/>
            </View>
        )
    }
}
IconInput.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
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
    }
});

export default IconInput;