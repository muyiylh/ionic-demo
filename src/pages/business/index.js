import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../component/module/list';

import {WhiteSpace} from '@ant-design/react-native';
import AddIcon from '../../images/1.png';
import photoIcon from '../../images/2.png';
import logIcon from '../../images/3.png';
import waterIcon from '../../images/4.png';
import additionalIcon from '../../images/7.png';
import checkIcon from '../../images/10.png';
import searchIcon from '../../images/11.png';
const instructions = Platform.select({
    ios: '苹果手机才会显示我',
    android:
        '安卓手机才会显示我',
});
export default class Business extends Component {

    render() {
        return (
            <ScrollView style={styles.projectPage}>
      
            <List title="新增薪信度" path="newsalary" img={AddIcon}></List>
            <List title="客户跟踪计划" path="busTranxList" img={searchIcon}></List>
            <List title="发起报装流程" path="keyboard" img={checkIcon}></List>
            <List title="水表巡检计划" path="busPatrolPlan" img={waterIcon}></List>
            <List title="检查计划" path="busInspectPlan" img={additionalIcon}></List>
          
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});