import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';



const Item = List.Item;
const Brief = Item.Brief;
/*
现场踏勘
梁丽
2019/04/10
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const sceneInfo = navigation.getParam("sceneInfo");
        return {
            title: navigation.getParam('otherParam', '现场踏勘'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={sceneInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>基础信息</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
                
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({sceneInfo: this.sceneInfo});
    }
    //基础信息
    sceneInfo = () => {
        const { navigate } = this.props.navigation;
        navigate('sceneInfoResult');
    }
   
    render() {
       
        return (
            <ScrollView style={styles.projectPage}>
                
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
});
export default createForm()(Index);