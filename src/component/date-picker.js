/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/22
 */
import React from 'react';
import PropTypes from 'prop-types';
import {scaleSize} from '../utils/ScreenUtil';
import {DatePicker} from '@ant-design/react-native';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TouchableOpacity,TextInput } from 'react-native';
import { textFontSize } from '../utils/index';


class CusDatePicker extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            value: new Date(),
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
        const {children, extra,require,disabled, format} = this.props;
        const { value } = this.state;
        let _format = format || 'YYYY-MM-DD';
        let _disabled = disabled || false;
        let _extra = extra || '请选择';

        let val = value;
        const CustomChildren = props => (
            <TouchableOpacity onPress={props.onPress}>
                <View
                    style={{
                        paddingTop:12,
                        paddingBottom:12,
                        marginLeft: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor:'#ddd',
                        borderBottomWidth:1,
                        alignItems:'center',
                }}
              >
                    <View style={{flex:1,flexDirection:'row'}}>
                        {require && <Text style={{color:'#ff5151'}}>*</Text>}
                        <Text style={[textFontSize(),{flex: 1}]}>{children}</Text>
                    </View>  
                        {_extra == '请选择' ? <Text style={{ textAlign: 'right', color: '#999', marginRight: 15 }}>
                            {_extra}
                            </Text>:<Text style={{ textAlign: 'right', color: '#333', marginRight: 15 }}>
                            {_extra}
                        </Text>}    
                </View>
              </TouchableOpacity>
          );
        
        return(
            <DatePicker
                value={val}
                disabled={_disabled}
                mode="date"
                minDate={new Date(2015, 7, 6)}
                maxDate={new Date(2026, 11, 3)}
                onOk={this.onChange}
                format={_format}
                // extra={_extra}
                >
                <CustomChildren></CustomChildren>
            </DatePicker>
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
export default CusDatePicker;
