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

export default class Process extends Component {

    render() {
        return (
            <ScrollView style={styles.projectPage}>

            
            <List title="缴纳工程款-报装" path="" ></List>
            <List title="缴纳工程款-接水" path="" ></List>
            <List title="工程施工-报装" path="" ></List>
            <List title="工程施工-接水" path=""></List>
            <List title="预算编制-报装" path="" ></List>

            <List title="预算编制-接水" path="" ></List>
            <List title="工程设计-报装" path="" ></List>
            <List title="工程设计-接水" path="" ></List>
            <List title="签订供用水合同-报装" path=""></List>
            <List title="签订供用水合同-接水" path="" ></List>
            <List title="施工合同签订-报装" path="" ></List>
            <List title="施工合同签订-接水" path="" ></List>
            <List title="现场踏勘" path="" ></List>
            <List title="水表接收-报装" path="" ></List>
            <List title="通水-报装" path="" ></List>
            <List title="通水-接水" path="" ></List>
         
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