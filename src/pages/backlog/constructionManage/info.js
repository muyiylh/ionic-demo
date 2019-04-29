import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import BuildItem from '../../../component/report/build-item';
import CusListItem from '../../../component/list-item';
const Item = List.Item;
const Brief = Item.Brief;
/*
工程施工----施工进度信息
梁丽
2019/04/11
*/
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
    	const info = navigation.getParam("info");
        return {
            title: navigation.getParam('otherParam', '施工整体进度总览'),
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
   
    render() {
       const data = this.props.navigation.state.params.info;
       if(data && !data.progress){
            data.progress = {};
       }
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <CusListItem extra={data.progress.constructionPeriod}>施工周期:</CusListItem>
                    <CusListItem extra={data.progress.totalProgress?data.progress.totalProgress * 100 + '%' : '0%'}>总体进度:</CusListItem>

                </List>
                <View>
                    <Text style={styles.listTitle}>水表信息</Text>
                </View>
                <List>
                    <CusListItem extra={data.progress.totalMeterCount+"支"}>水表安装总数:</CusListItem>
                    <CusListItem extra={data.progress.finishedMeterCount+"支"}>已安装总数:</CusListItem>
                    <CusListItem extra={data.progress.unfinishedMeterCount+"支"}>剩余待安装总数:</CusListItem>
                    <CusListItem extra={data.progress.meterProgress?data.progress.meterProgress * 100 + '%' : '0%'}>水表安装总进度:</CusListItem>
                    {/* <Item extra={data.progress.totalMeterCount+"支"} arrow="empty">
                    水表安装总数:
                    </Item>
                    <Item extra={data.progress.finishedMeterCount+"支"} arrow="empty">
                    已安装总数:
                    </Item>
                    <Item extra={data.progress.unfinishedMeterCount+"支"} arrow="empty">
                    剩余待安装总数:
                    </Item>
                    <Item extra={data.progress.meterProgress?data.progress.meterProgress * 100 + '%' : '0%'} arrow="empty">
                    水表安装总进度:
                    </Item>
                    <Item extra={data.progress.constructionPeriod} arrow="empty">
                    施工周期:
                    </Item> */}
                </List>
                <View>
                    <Text style={styles.listTitle}>管道信息</Text>
                </View>
                <List>
                    <CusListItem extra={data.progress.totalLenth+"米"}>管道铺设总长度:</CusListItem>
                    <CusListItem extra={data.progress.unfinishedLenth+"米"}>已铺设长度:</CusListItem>
                    <CusListItem extra={data.progress.unfinishedMeterCount+"米"}>剩余待铺设长度:</CusListItem>
                    <CusListItem extra={data.progress.lenthProgress?data.progress.lenthProgress * 100 + '%' : '0%'}>管道铺设总进度:</CusListItem>
                    {/* <Item extra={data.progress.totalLenth+"米"} arrow="empty">
                    管道铺设总长度:
                    </Item>
                    <Item extra={data.progress.finishedLenth+"米"} arrow="empty">
                    已铺设长度:
                    </Item>
                    <Item extra={data.progress.unfinishedLenth+"米"} arrow="empty">
                    剩余待铺设长度:
                    </Item>
                    <Item extra={data.progress.lenthProgress?data.progress.lenthProgress * 100 + '%' : '0%'} arrow="empty">
                    管道铺设总进度:
                    </Item>
                    <Item extra={data.progress.totalProgress?data.progress.totalProgress * 100 + '%' : '0%'} arrow="empty">
                    总体进度:
                    </Item> */}
                </List>
                <View>
                    <Text style={styles.listTitle}>开挖土方量信息</Text>
                </View>
                <List>
                    <CusListItem extra={data.progress.totalEarthFinished+"立方米"}>开挖土方量总数:</CusListItem>
                    <CusListItem extra={data.progress.finishedEarthFinished+"立方米"}>已完成总数:</CusListItem>
                    <CusListItem extra={data.progress.unfinishedEarthFinished+"立方米"}>剩余待完成总数:</CusListItem>
                    <CusListItem extra={data.progress.earthFinishedProgress?data.progress.earthFinishedProgress * 100 + '%' : '0%'}>土方完成总进度:</CusListItem>
                    {/* <Item extra={data.progress.totalEarthFinished+"立方米"} arrow="empty">
                    开挖土方量总数:
                    </Item>
                    <Item extra={data.progress.finishedEarthFinished+"立方米"} arrow="empty">
                    已完成总数:
                    </Item>
                    <Item extra={data.progress.unfinishedEarthFinished+"立方米"} arrow="empty">
                    剩余待完成总数:
                    </Item>
                    <Item extra={data.progress.earthFinishedProgress?data.progress.earthFinishedProgress * 100 + '%' : '0%'} arrow="empty">
                    土方完成总进度:
                    </Item> */}
                </List>
                <View>
                    <Text style={styles.listTitle}>回填土方量信息</Text>
                </View>
                <List>
                    <CusListItem extra={data.progress.totalBackfillEarthCounts+"立方米"}>回填土方量总数:</CusListItem>
                    <CusListItem extra={data.progress.finishedBackfillEarthCounts+"立方米"}>已完成总数:</CusListItem>
                    <CusListItem extra={data.progress.unfinishedBackfillEarthCounts+"立方米"}>剩余待完成总数:</CusListItem>
                    <CusListItem extra={data.progress.backfillEarthCountsProgress?data.progress.backfillEarthCountsProgress * 100 + '%' : '0%'}>土方完成总进度:</CusListItem>
                    {/* <Item extra={data.progress.totalBackfillEarthCounts+"立方米"} arrow="empty">
                    回填土方量总数:
                    </Item>
                    <Item extra={data.progress.finishedBackfillEarthCounts+"立方米"} arrow="empty">
                    已完成总数:
                    </Item>
                    <Item extra={data.progress.unfinishedBackfillEarthCounts+"立方米"} arrow="empty">
                    剩余待完成总数:
                    </Item>
                    <Item extra={data.progress.backfillEarthCountsProgress?data.progress.backfillEarthCountsProgress * 100 + '%' : '0%'} arrow="empty">
                    土方完成总进度:
                    </Item> */}
                </List>
                <View>
                    <Text style={styles.listTitle}>井室建筑信息</Text>
                </View>
                <List>
                    <CusListItem extra={data.progress.totalWellCount+"座"}>井室建筑总数:</CusListItem>
                    <CusListItem extra={data.progress.finishedWellCount+"座"}>已完成总数:</CusListItem>
                    <CusListItem extra={data.progress.unfinishedWellCount+"座"}>剩余待完成总数:</CusListItem>
                    <CusListItem extra={data.progress.wellProgress? data.progress.wellProgress * 100 + '%' : '0%'}>井室完成总进度:</CusListItem>
                    {/* <Item extra={data.progress.totalWellCount+"座"} arrow="empty">
                    井室建筑总数:
                    </Item>
                    <Item extra={data.progress.finishedWellCount+"座"} arrow="empty">
                    已完成总数:
                    </Item>
                    <Item extra={data.progress.unfinishedWellCount+"座"} arrow="empty">
                    剩余待完成总数:
                    </Item>
                    <Item extra={data.progress.wellProgress? data.progress.wellProgress * 100 + '%' : '0%'} arrow="empty">
                    井室完成总进度:
                    </Item> */}
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
export default createForm()(Info);