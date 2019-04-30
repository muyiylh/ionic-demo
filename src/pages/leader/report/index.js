import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../../component/module/list';

import {WhiteSpace} from '@ant-design/react-native';
import StaticIcon from '../../../images/leader/01.png';
import NormalIcon from '../../../images/leader/02.png';
import ExceptionIcon from '../../../images/leader/03.png';
import OverIcon from '../../../images/leader/04.png';
import ConsultIcon from '../../../images/leader/05.png';
import CompeteIcon from '../../../images/leader/06.png';
import SupIcon from '../../../images/leader/07.png';
import CustormIcon from '../../../images/leader/08.png';
import CapacityIcon from '../../../images/leader/09.png';

const instructions = Platform.select({
    ios: '苹果手机才会显示我',
    android:
        '安卓手机才会显示我',
});
export default class report extends Component {

    render() {
        return (
            <ScrollView style={styles.projectPage}>
      
            <List title="总体报表统计"  img={StaticIcon}></List>
            <List title="正常报装统计"  img={NormalIcon}></List>
            <List title="异常报装统计"  img={ExceptionIcon}></List>
            <List title="超周期报装统计"  img={OverIcon}></List>
            <List title="咨询统计"  img={ConsultIcon}></List>
            <List title="资信度统计"  img={CompeteIcon}></List>
            <List title="督办统计"  img={SupIcon}></List>
            <List title="自定义统计"  img={CustormIcon}></List>
            <List title="智能分析"  img={CapacityIcon}></List>
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});