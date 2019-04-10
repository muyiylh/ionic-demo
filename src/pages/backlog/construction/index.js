import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
/*
签订施工合同
梁丽
2019/04/10
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '签订施工合同'),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
                
        }
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