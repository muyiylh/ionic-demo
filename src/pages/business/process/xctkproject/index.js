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
                <List title="多部门联合踏勘" path="" ></List>
                <List title="管道测压" path="" ></List>
                <List title="管道复合" path="" ></List>
                <List title="异常处理" path="" ></List>
                <List title="客户主动暂停" path="" ></List>
                <List title="客户撤销报装" path="" ></List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});