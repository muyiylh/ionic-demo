/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {scaleSize} from '../utils/ScreenUtil';
import {text_font_size} from '../utils/theme';
import {Picker, List} from '@ant-design/react-native';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TouchableOpacity } from 'react-native';
class SelectItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onChange = (value) => {
        const item = this.getItem(value);
        const {onChange} = this.props;
        if(item){
            this.setState({selected: item});
            onChange && onChange(item.value);
        }
    };
    getItem = (value) => {
        const {data} = this.props;
        const values = data.filter(item=>{
            return item.value == value;
        });
        if(values.length > 0){
            return values[0];
        }
        return null;
    };
    onFormat = (labels) => {
        return labels.join(',')
    };
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            const item = this.getItem(value);
            this.setState({ selected: item });
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentDidMount(){
        const {value} = this.props;
        if(value){
            const item = this.getItem(value);
            this.setState({ selected: item });
        }
    }
    render(){
        const {children, data, extra, disabled, require} = this.props;
        let extraTxt = extra || "请选择";
        let _disabled = disabled || false; 
        let val = [];
        const {selected} = this.state;
        if(selected){
            extraTxt = selected.label;
            val.push(selected.value);
        }
        const CustomChildren = props => (
            <TouchableOpacity onPress={props.onPress}>
              <View
                style={{
                 // height: 40,
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
              <Text style={{ flex: 1,color:'#333',fontSize:scaleSize(text_font_size) }}>{children}</Text>
              </View>
              {extraTxt == '请选择' ? <Text style={{fontSize:scaleSize(text_font_size), textAlign: 'right', color: '#999', marginRight: 15 }}>
                  {extraTxt}
                </Text>:<Text style={{ fontSize:scaleSize(text_font_size),textAlign: 'right', color: '#333', marginRight: 15 }}>
                  {extraTxt}
                </Text>}
                
              </View>
            </TouchableOpacity>
          );
        //arrow="horizontal"
        return(
            <Picker data={data} indicatorStyle={{fontSize:scaleSize(text_font_size)}} itemStyle={{fontSize:scaleSize(text_font_size),paddingTop:6,paddingBottom:6}} extra={extraTxt} style={{fontSize:scaleSize(28)}} value={val} onOk={this.onChange} cols={1} format={this.onFormat} disabled={_disabled}>
                <CustomChildren require={require}></CustomChildren>
                {/* <List.Item arrow="horizontal">{children}</List.Item> */}
            </Picker>
        )
    }
}
SelectItem.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    data: PropTypes.array
};
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
});
export default SelectItem;
