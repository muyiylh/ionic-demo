/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Picker, List} from '@ant-design/react-native';
import {scaleSize} from '../utils/ScreenUtil';
import NavigationUtil from '../utils/NavigationUtil';
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
    onPress =()=>{
        const {data,title,returnData} = this.props;
        NavigationUtil.navigate("comTree",{data: data,title:title,returnData:returnData})
    }
    onChange = (value) => {
        const item = this.getItem(value);
        const {onChange} = this.props;
        if(item){
            this.setState({selected: item});
            onChange && onChange(item.value);
        }
    };
    render(){
        const {children, data, extra} = this.props;
        let extraTxt = extra || "请选择";
        let val = [];
        const {selected} = this.state;
        if(selected){
            extraTxt = selected.label;
            val.push(selected.value);
        }
        return(
            <TouchableOpacity style={styles.container} onPress={()=>this.onPress()}>
                <View style={styles.header}>
                    <Text style={styles.title}>{children}</Text>
                </View>
              
                    <Text style={styles.buttonContainer}>{extraTxt}</Text>
                    {/* <Image style={{width:19,height:19}} resizeMode="contain" source={require("../images/return_3.png")}/> */}
                
        </TouchableOpacity>
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
