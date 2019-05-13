import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import List from './../../../component/module/list';

import {WhiteSpace} from '@ant-design/react-native';


//工程施工
const sgList  = [
    {name:"施工手续待办",path:"busSGBacklog"},
    {name:"设计文件修改",path:"busUpdataFile"},
//    {name:"验收整改",path:""},
    {name:"客户暂停报装",path:"busPause"},
    {name:"客户撤销报装",path:"busRevocation"},
    {name:"异常处置",path:"busException"}
];

//工程设计
const sjList  = [
  //  {name:"设计文件确认",path:""},
    {name:"客户撤销申请",path:"busRevocation"},
    {name:"客户暂停报装",path:"busPause"},
    {name:"异常处置",path:"busException"}
];
//合同
const htList  = [
    {name:"在线会签",path:"busCountersign"},
    {name:"异常处理",path:"busException"}
];
//费用明细
const payList  = [
    {name:"客户撤销报装",path:"busRevocation"},
    {name:"异常处理",path:""}
];
//现场踏勘
const tkList  = [
    {name:"多部门联合踏勘",path:"buslhTaKan"},
    {name:"管道测压",path:"busManometry"},
    {name:"管道复核",path:"busRecombinat"},
    {name:"异常处理",path:"busException"},
   // {name:"客户主动暂停",path:""},
    {name:"客户撤销报装",path:"busRevocation"},
];
//预算编制
const bzList  = [
    {name:"客户暂停报装",path:"busPause"},
    {name:"客户撤销报装",path:"busRevocation"},
    {name:"异常处理",path:"busException"}

];
export default class Process extends Component {
    static navigationOptions = ({ navigation }) => {
        const {state:{params:{title}}} = navigation;
        return {
            title: title
        };
    };
    state={
        list:[]
    }
    componentDidMount(){
        const {state:{params:{title}}} = this.props.navigation;
        console.log("title1:",title);
        this.props.navigation.setParams({title: title});
        let list = [];
        switch (title){
            case "工程施工-报装":
            case "工程施工-接水":
                list =sgList;
                break;
            case "工程设计-报装":
            case "工程设计-接水":
                list =sjList;
                break;
            case "签订供用水合同-报装":
            case "签订供用水合同-接水":
            case "签订供用水合同-报装":
            case "签订供用水合同-接水":
                list =htList;
                break;
            case "缴纳工程款-报装":
            case "缴纳工程款-接水":
                list =payList;
                break;
            case "现场踏勘":
                list =tkList;
                break;
            case "预算编制-报装":
            case "预算编制-接水":
                list =bzList;
                break;
        }
        console.log("list:",list);
        this.setState({list});
    }
    render() {
        const {state:{params:{title}}} = this.props.navigation;
        const {list} = this.state;
        return (
            <ScrollView style={styles.projectPage}>
            {list && list.map(item=>{
                return  <List title={item.name} path={item.path} params={title}></List>
            })}
          <WhiteSpace /><WhiteSpace />
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    businessPage: {
        backgroundColor: '#EBEEF5',
    },
});