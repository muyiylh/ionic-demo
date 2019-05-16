import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../../component/module/list';
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import {text_font_size} from '../../../utils/theme';
import {WhiteSpace} from '@ant-design/react-native';


export default class Process extends Component {

    render() {
        return (
            <ScrollView style={styles.projectPage}>
            <Text style={styles.title}>选择报装流程</Text>
            <List title="缴纳工程款-报装" params="缴纳工程款-报装"  path="busSubProcess" ></List>
            <List title="缴纳工程款-接水" params="缴纳工程款-接水" path="busSubProcess" ></List>
            <List title="工程施工-报装" params="工程施工-报装" path="busSubProcess" ></List>
            <List title="工程施工-接水" params="工程施工-接水" path="busSubProcess"></List>
            <List title="预算编制-报装" params="预算编制-报装" path="busSubProcess" ></List>
            <List title="预算编制-接水" params="预算编制-接水" path="busSubProcess" ></List>
            <List title="工程设计-报装" params="工程设计-报装" path="busSubProcess" ></List>
            <List title="工程设计-接水" params="工程设计-接水" path="busSubProcess" ></List>
            <List title="签订供用水合同-报装" params="签订供用水合同-报装" path="busSubProcess"></List>
            <List title="签订供用水合同-接水" params="签订供用水合同-接水" path="busSubProcess" ></List>
            <List title="施工合同签订-报装" params="施工合同签订-报装" path="busSubProcess" ></List>
            <List title="施工合同签订-接水" params="施工合同签订-接水" path="busSubProcess" ></List>
            <List title="现场踏勘" params="现场踏勘" path="busSubProcess" ></List>
            {/* <List title="水表接收-报装" params="水表接收-报装" path="" ></List>
            <List title="通水-报装" params="通水-报装" path="" ></List>
            <List title="通水-接水" params="通水-接水" path="" ></List> */}
         

          <WhiteSpace /><WhiteSpace />
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
    title:{
        backgroundColor:"#EBEEF5",
        color:"#999",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        fontSize:scaleSize(text_font_size)
    },
});