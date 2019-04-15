import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../component/module/list';
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
            {/* <List title="施工进场拍照确认" path="alert" img={photoIcon}></List> */}
            {/* <List title="施工日志填写" path="animatedIndex" img={logIcon}></List> */}
            {/* <List title="水表信息录入" path="appState" img={waterIcon}></List> */}
            <List title="总体验验收结论填写" path="asyncStorage" img={waterIcon}></List>
            {/* <List title="整改信息填写" path="backHandler" img={waterIcon}></List> */}
            <List title="资料/文件补录" path="cameraRoll" img={additionalIcon}></List>
            <List title="检查清单办理" path="clipboard" img={checkIcon}></List>
            <List title="客户关系管理" path="cropImage" img={waterIcon}></List>
            <List title="发起报表流程" path="keyboard" img={checkIcon}></List>
            <List title="水表巡查记录" path="layoutAnimation" img={searchIcon}></List>
            {/* <List title="唤起其他APP/其他APP唤起我的链接" path="linking"></List>
            <List title="获取设备的联网状态" path="netInfo"></List>
            <List title="多点触摸操作事件" path="panResponder"></List>
            <List title="Android访问获取操作权限" path="permissionsAndroid"></List>
            <List title="获取屏幕像素密度/单位换算" path="pixelRatio"></List>
            <List title="分享" path="share"></List>
            <List title="设备震动" path="vibration"></List> */}
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});