/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {scaleSize} from '../utils/ScreenUtil';
import {Picker, List} from '@ant-design/react-native';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TouchableOpacity,TextInput } from 'react-native';


class InputItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:""
        }
    }
    onChange = ({ nativeEvent: { eventCount, target, text} }) => {
        console.log("text:",text);
        // const item = this.getItem(value);
          const {onChange} = this.props;
        if(text){
           this.setState({value: text});
           onChange && onChange(text);
       }
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
        console.log("value:",value);
        if(value){
            // const item = this.getItem(value);
             this.setState({ value: value });
        }
    }
    render(){
        const CustomChildren = props => (
            <View >
              <View
                style={{
   
                 paddingTop:10,
                 paddingBottom:10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: 'row',
                  justifyContent:'space-between',
                  alignItems: 'center',
                  borderBottomColor:'#ddd',
                  borderBottomWidth:1,
                  alignItems:'center',
                }}
              >
              <View style={{flex:1,flexDirection:'row'}}>
              {props.require && <Text style={{color:'#ff5151'}}>*</Text>}
              <Text style={{ flex: 1,color:'#333',fontSize:scaleSize(30) }}>{props.children}</Text>
              </View>
                
                <TextInput placeholder="请输入" maxLength={20} onChange={this.onChange}  style={styles.input} placeholderTextColor="#999" value={props.value}/>
        
              </View>
            </View>
          );
        const {children, extra,require,onChangeName} = this.props;
        console.log("this.props;",this.props);
        let extraTxt = extra || "请选择";
        let val = [];
        const {selected} = this.state;
        if(selected){
            extraTxt = selected.label;
            val.push(selected.value);
        }
        //arrow="horizontal"
        return(
            // <Picker data={data} indicatorStyle={{fontSize:scaleSize(30)}} itemStyle={{fontSize:scaleSize(30)}} extra={extraTxt} style={{fontSize:scaleSize(28)}} value={val} onOk={this.onChange} cols={1} format={this.onFormat}>
                <View><CustomChildren  onChange={this.onChange} require={require}>{children}</CustomChildren></View>
            // </Picker>
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
export default InputItem;
