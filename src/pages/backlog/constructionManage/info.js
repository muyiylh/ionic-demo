import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
/*
工程施工
梁丽
2019/04/11
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
    	const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '施工整体进度总览'),
        }
    };
    constructor(props) {
        super(props)
        this.state = {
               data:{name:"XXXX"} 
        }
    }
   
    render() {
       const { data } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>水表信息</Text>
                </View>
                <List>
                    <Item extra={data.name+"支"} arrow="empty">
                    水表安装总数:
                    </Item>
                    <Item extra={data.name+"支"} arrow="empty">
                    已安装总数:
                    </Item>
                    <Item extra={data.name+"支"} arrow="empty">
                    剩余待安装总数:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    水表安装总进度:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    施工周期:
                    </Item>
                </List>
                <View>
                    <Text style={styles.listTitle}>管道信息</Text>
                </View>
                <List>
                    <Item extra={data.name+"米"} arrow="empty">
                    管道铺设总长度:
                    </Item>
                    <Item extra={data.name+"米"} arrow="empty">
                    已铺设长度:
                    </Item>
                    <Item extra={data.name+"米"} arrow="empty">
                    剩余待铺设长度:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    管道铺设总进度:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    总体进度:
                    </Item>
                </List>
                <View>
                    <Text style={styles.listTitle}>开挖土方量信息</Text>
                </View>
                <List>
                    <Item extra={data.name+"立方米"} arrow="empty">
                    开挖土方量总数:
                    </Item>
                    <Item extra={data.name+"立方米"} arrow="empty">
                    已完成总数:
                    </Item>
                    <Item extra={data.name+"立方米"} arrow="empty">
                    剩余待完成总数:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    土方完成总进度:
                    </Item>
                </List>
                <View>
                    <Text style={styles.listTitle}>回填土方量信息</Text>
                </View>
                <List>
                    <Item extra={data.name+"立方米"} arrow="empty">
                    回填土方量总数:
                    </Item>
                    <Item extra={data.name+"立方米"} arrow="empty">
                    已完成总数:
                    </Item>
                    <Item extra={data.name+"立方米"} arrow="empty">
                    剩余待完成总数:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    土方完成总进度:
                    </Item>
                </List>
                <View>
                    <Text style={styles.listTitle}>井室建筑信息</Text>
                </View>
                <List>
                    <Item extra={data.name+"座"} arrow="empty">
                    井室建筑总数:
                    </Item>
                    <Item extra={data.name+"座"} arrow="empty">
                    已完成总数:
                    </Item>
                    <Item extra={data.name+"座"} arrow="empty">
                    剩余待完成总数:
                    </Item>
                    <Item extra={data.name} arrow="empty">
                    井室完成总进度:
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
    }
});
export default createForm()(Index);