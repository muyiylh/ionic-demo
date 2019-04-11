import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;




class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '基础信息')
        };
    };
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const data = {
            name: "YYYY",
            unit: "YYYY",
            water: "YYYY",
            peopleA: "XXX",
            peopleATel: "000-0000-0000",
            peopleB: "XXX",
            peopleBTel: "000-0000-0000",
            email: "aaa@ss.com.cn",
            naemProject: "aaa",
            projectType: "sss",
            buildingCondition: "多层住宅（居民户数:户，隔断商铺：户，其它：无）\n高层住宅（居民户数:户，隔断商铺：户，其它：无）\n非住宅建筑（建筑面积：m²，隔断商铺：户，其它：无）\n其它（建筑面积：m²，其它：无）",
            type: "aaa"
        }
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <Item extra={data.name} arrow="empty">
                        单位名称:
                    </Item>
                    <Item extra={data.unit} arrow="empty">
                        单位地址:
                    </Item>
                    <Item extra={data.water} arrow="empty">
                        用水地址:
                    </Item>
                    <Item extra={data.peopleA} arrow="empty">
                        负责人:
                    </Item>
                    <Item extra={data.peopleATel} arrow="empty">
                        负责人电话:
                    </Item>
                    <Item extra={data.peopleB} arrow="empty">
                        经办人:
                    </Item>
                    <Item extra={data.peopleBTel} arrow="empty">
                        经办人电话:
                    </Item>
                    <Item extra={data.email} arrow="empty">
                        邮箱地址:
                    </Item>
                    <Item extra={data.naemProject} arrow="empty">
                        项目名称:
                    </Item>
                    <Item extra={data.projectType} arrow="empty">
                        项目类型:
                    </Item>
                    <Item extra="" arrow="empty">
                         咨询内容:
                         <Text style={styles.height}>{data.buildingCondition}</Text>
                    </Item>
                    <Item extra={data.type} arrow="empty">
                        工程类别:
                    </Item>
                </List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    listTitle: {
        padding: 10,
    },
    height: {
        height: 80
    }
});
export default Info;