/**
 * 说明：
 * 创建人：梁丽
 * 创建时间：2019/04/23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {scaleSize} from '../utils/ScreenUtil';
import {Picker, List, InputItem} from '@ant-design/react-native';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TouchableOpacity,TextInput } from 'react-native';
import { showFormError, filterConfig, textFontSize } from "../utils/index";
const Item = List.Item;


class CusListItem extends React.Component{
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
        const {children, extra, multipleLine, align, arrow} = this.props;
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
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={[{ color:'#333' },textFontSize()]}>{children}</Text>
                </View>
                {multipleLine?
                <Text style={{ color: '#999', textAlign: 'right', marginRight: 8 , maxWidth: 200}}>
                  {extraTxt}
                </Text>
                :
                <View><Text style={{ color: '#999',marginRight: 8 ,maxWidth: 200}}>
                    {extraTxt}
                </Text></View>
                }
        
              </View>
          );
        let extraTxt = extra || "";
        let alignType = align || 'top';
        let _arrow = arrow || 'empty';
        // let _multipleLine = multipleLine || false,
        // console.log('list-----item--extra--',extraTxt);
        return(
            <Item style={textFontSize()} arrow={_arrow} multipleLine={multipleLine} wrap={multipleLine} align={alignType}>
                <CustomChildren></CustomChildren>
            </Item>
            // <InputItem style={textFontSize()} value={value} readOnly={_readOnly} type={_type} extra={extraTxt} labelNumber={_labelNumber} placeholderTextColor={_placeholderTextColor} placeholder={_placeholder} onChange={this.onChange}>
            //     <CustomChildren></CustomChildren>
            // </InputItem>
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
export default CusListItem;
