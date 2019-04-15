/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';
import {List, Switch,InputItem} from '@ant-design/react-native';
import {scaleSize} from '../utils/ScreenUtil';
import PropTypes from 'prop-types';

class InputItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }
    onChange = (value) => {
        this.setState({checked: value,});
        //console.log(value)
        this.props.onChange(value);
    };
    render(){
        const {children, ...other} = this.props;
        return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>*</Text>
                <Text style={styles.subTitle}>{children}: </Text>
            </View>
            <TextInput placeholder="请输入" placeholderTextColor="#999" />
        </View>
        )
    }
}
InputItems.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
};
const styles = StyleSheet.create({
    container: {
      //  padding: scaleSize(10),
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        borderBottomWidth:1,
        borderColor:"#ddd",
      
    },
    header: {
        flexDirection: 'row',
        flex:1,
        justifyContent:"flex-start",
        //lineHeight:100,
       // paddingTop:10,
     
    },
    title: {
       // fontSize: scaleSize(30),
        color: '#ff5151'
    },
    subTitle: {
       // fontSize: scaleSize(26),
        color: '#333'
    },

    buttonContainer: {
       // padding: scaleSize(10)
    },
});
export default InputItems;