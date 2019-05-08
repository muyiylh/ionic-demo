import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../../component/module/list';

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


         
{/*       
            <List title="客户暂停报装" path="" ></List>
            <List title="客户撤销报装" path="" ></List>
            <List title="现场测压申请" path="" ></List>
            <List title="管道复核申请" path=""></List>
            <List title="报装异常申请" path="" ></List>

            <List title="施工手续代办" path="" ></List>
            <List title="工程验收流程" path="" ></List>
            <List title="在选会签流程" path="" ></List>
            <List title="多部门联合踏勘流程" path=""></List>
            <List title="设计文件修改流程" path="" ></List>
            <List title="工程整改流程" path="" ></List> */}
          
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});