import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Left } from 'native-base';
import {createForm} from 'rc-form';
import { scaleSize } from '../../utils/ScreenUtil';
import Popup from '../../component/common/Popup';
import { WhiteSpace, Modal,Button,InputItem,List, Toast} from '@ant-design/react-native';
import{text_font_size} from '../../utils/theme';
class ListInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            value:"",
       
        }
    }

    press = () => {
       
        const {onPress,extra} = this.props;
        onPress && onPress(extra);
  
    }
    onClose =()=>{
        this.setState({visible:false})
    }
    renderContent =()=>{
        //type :phone : 手机 ，pwd：密码  email：邮箱  name：用户名
        const {type,value} = this.props;
    }
    onOk =()=>{
   
  
        
    }
 
    onChange =(value)=>{
        this.setState({value:value});
    }
    render() {
        const {children,extra,arrow,type} = this.props;
    
        return (
            <View><TouchableNativeFeedback style={{ flex: 1 }} onPress={this.press}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.list}>
                    <View style={styles.textlist}>
                        <Text style={{ fontSize: scaleSize(text_font_size),textAlign:'left',color:'#333',marginLeft:10 }}>{children}: </Text>
                        
                     
                        <Text style={{ fontSize: scaleSize(text_font_size),textAlign:'left',color:'#666666',marginLeft:10 }}>{extra}&nbsp;&nbsp;</Text>
                    </View>
                    {arrow =='horizontal' && <Image style={{width:scaleSize(30),height:scaleSize(30)}}  resizeMode="contain" source={require("../../images/return_3.png")}/>} 
                </View>
            </TouchableNativeFeedback>
          
           
           </View>
        );
    }
}
export default (ListInfo);
const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        alignItems:"center",
        textAlignVertical:'center',
        textAlign:'center',
        paddingTop:10,
        paddingBottom:10,
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginBottom: 1,
        borderBottomWidth:1,
        borderColor:"#ddd",
        textAlign:"left",
    },
    textlist:{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
    }
});