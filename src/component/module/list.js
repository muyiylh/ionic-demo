import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { scaleSize } from '../../utils/ScreenUtil';

import{text_font_size} from '../../utils/theme';
class List extends Component {
    constructor(props) {
        super(props);
    }
    pageJump = () => {
        if(this.props.path &&  this.props.path !=""){
            if(this.props.params){
                this.props.navigation.navigate(this.props.path,{title:this.props.params})
            }else{
                this.props.navigation.navigate(this.props.path)
            }
            
        }
        
    }
    render() {

        return (
            <TouchableNativeFeedback style={{ flex: 1 }} onPress={this.pageJump}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.list}>
                    <View style={styles.imglist}>
                    {this.props.img && <Image style={{width:scaleSize(50),height:scaleSize(50)}} resizeMode="contain" source={this.props.img}/>}
                        <Text style={{ fontSize: scaleSize(text_font_size),textAlign:'left',color:'#333',marginLeft:10 }}>{this.props.title}</Text>
                    </View>
                    <Image style={{width:scaleSize(30),height:scaleSize(30)}} resizeMode="contain" source={require("../../images/return_3.png")}/>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
export default withNavigation(List);
const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:10,
        paddingBottom:10,
        flexDirection: "row",
        backgroundColor: "#FFF",
      //  marginBottom: 1,
        borderBottomWidth:1,
        borderColor:"#ddd",
        textAlign:"left",
        alignItems:"center",
    },
    imglist:{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
    }
});