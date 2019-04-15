import React,{Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { scaleSize } from '../utils/ScreenUtil';

export default class Button extends Component {
    //构造
    constructor(props) {
      super(props);
      //初始状态
      this.state = {
          disabled: false
      };
}
    onPress = () => {
        const {onPress} = this.props;
        onPress();
    };

     enable = () => {
        this.setState({
            disabled: false
        })
    };
     disable = () => {
        this.setState({
            disabled: true
        })
    };
    render() {
        //解构
        const {title,bgc,color} = this.props;
        return (
                  <TouchableOpacity
                      disabled={this.state.disabled}//禁用按钮
                      style={[styles.button,{backgroundColor: bgc,color:color},this.state.disabled && styles.disabled]}
                      onPress={this.onPress}
                  >
                    <Text style={[styles.buttonText,{color:color}]}>{title}</Text>
                  </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    button: {
       // height:40,
       paddingTop:10,
       paddingBottom:10,
        // width:120,
        // borderRadius:20,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',

        fontSize:scaleSize(30),
    },
    disabled: {
        backgroundColor: 'gray'
    }
});