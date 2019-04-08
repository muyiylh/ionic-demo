import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Left } from 'native-base';

class List extends Component {
    constructor(props) {
        super(props);
    }
    pageJump = () => {
        this.props.navigation.navigate(this.props.path || "home")
    }
    render() {

        return (
            <TouchableNativeFeedback style={{ flex: 1 }} onPress={this.pageJump}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.list}>
                    <View style={styles.imglist}>
                    {this.props.img && <Image style={{width:26,height:26}} resizeMode="contain" source={this.props.img}/>}
                        
                     
                        <Text style={{ fontSize: 18,textAlign:'left',color:'#333',marginLeft:10 }}>{this.props.title}</Text>
                    </View>
                    <Image style={{width:20,height:20}} resizeMode="contain" source={require("../../images/return_3.png")}/>
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
        padding: 15,
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginBottom: 1,
        borderBottomWidth:1,
        borderColor:"#ddd",
        textAlign:"left",
    },
    imglist:{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
    }
});