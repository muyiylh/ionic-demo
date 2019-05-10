import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../../../component/module/list';

import {WhiteSpace} from '@ant-design/react-native';
// import AddIcon from '../../images/1.png';
// import photoIcon from '../../images/2.png';
// import logIcon from '../../images/3.png';
// import waterIcon from '../../images/4.png';
// import additionalIcon from '../../images/7.png';
// import checkIcon from '../../images/10.png';
// import searchIcon from '../../images/11.png';

export default class Index extends Component {

    render() {
        return (
            <ScrollView style={styles.projectPage}>
                <List title="设计文件确认" path="" ></List>
                <List title="客户撤销申请" path="" ></List>
                <List title="客户暂停报装" path="" ></List>
                <List title="异常处置" path="" ></List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});