/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {scaleSize} from '../utils/ScreenUtil';
import {Picker, List, InputItem} from '@ant-design/react-native';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TouchableOpacity,TextInput } from 'react-native';
import { showFormError, filterConfig, textFontSize } from "../utils/index";


class CusInputItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:""
        }
    }
    onChange = (value) => {
        const {onChange} = this.props;
        this.setState({value: value});
        onChange && onChange(value);
    };
   
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
      
            this.setState({ value: value });
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentDidMount(){
        const {value} = this.props;
        if(value){
            // const item = this.getItem(value);
             this.setState({ value: value });
        }
    }
    render(){
        const {children, extra,require,onChangeName,placeholderTextColor,placeholder,labelNumber,type,readOnly} = this.props;
        const { value } = this.state;
        const CustomChildren = props => (
              <View
                style={{
   
                //  paddingTop:10,
                //  paddingBottom:10,
                //   paddingLeft: 15,
                //   paddingRight: 15,
                  flexDirection: 'row',
                //   justifyContent:'space-between',
                //   alignItems: 'center',
                //   borderBottomColor:'#ddd',
                //   borderBottomWidth:1,
                //   alignItems:'center',
                }}
              >
              {require && <Text style={{color:'#ff5151'}}>*</Text>}
              <Text style={[{ color:'#333' },textFontSize()]}>{children}</Text>
                
                {/* <TextInput placeholder="请输入" maxLength={20} onChange={this.onChange}  style={styles.input} placeholderTextColor="#999" value={props.value}/> */}
        
              </View>
          );
        let extraTxt = extra || "";
        let _placeholderTextColor = placeholderTextColor || "#999";
        let _placeholder = placeholder || "请输入";
        let _labelNumber = labelNumber || 5;
        let _type = type || 'text';
        let _readOnly = readOnly || false;
        //arrow="horizontal"
        return(
            <InputItem style={textFontSize()} value={value} readOnly={_readOnly} type={_type} extra={extraTxt} labelNumber={_labelNumber} placeholderTextColor={_placeholderTextColor} placeholder={_placeholder} onChange={this.onChange}>
                <CustomChildren></CustomChildren>
            </InputItem>
        )
    }
}
// InputItem.propTypes = {
//     value: PropTypes.any,
//     onChange: PropTypes.func,
//    // data: PropTypes.array
// };
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        
    },
    title: {
        fontSize: scaleSize(26),
        color: '#333'
    },
    subTitle: {
      //  fontSize: scaleSize(26),
        color: '#999'
    },
    lookYt: {
      //  fontSize: scaleSize(28),
        color: '#46d0ec'
    },
    buttonContainer: {
        flexDirection: 'row',
        fontSize: scaleSize(26),
        paddingRight:20,
        color:'#999',
       // padding: scaleSize(5),

    },
    input:{
        //borderColor: "#DEDEDE",
       
       marginHorizontal: scaleSize(0),
       // fontSize: scaleSize(30),
    color: '#999',
       textAlignVertical: "top",
        marginTop: scaleSize(0),
        paddingHorizontal: scaleSize(0),
        paddingBottom: scaleSize(0),
        paddingTop:scaleSize(0),
        height: scaleSize(50),
        lineHeight: scaleSize(50)
    }
});
export default CusInputItem;
