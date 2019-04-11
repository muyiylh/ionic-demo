import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator, TabBarBottom } from "react-navigation";
//主导航页面
import Cockpit from './../pages/leader/cockpit';//管理驾驶舱
import Approval from './../pages/leader/approval';//审批
import Report from './../pages/leader/report';//报表
import My from './../pages/leader/my';//我的
//主导航设置
export default createBottomTabNavigator(
    {
        cockpit: {
            screen: Cockpit,
            navigationOptions: ({navigation}) => ({
       
                //底部导航的文本
                tabBarLabel: `驾驶舱`,
                //底部导航的图标
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/leader/jsc_1.png');
                    if (focused) {
                        imageIcon = require('./../images/leader/jsc_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
                title: `122s Profil`,
  
                
            }),
        },
        report: {
            screen: Report,
            navigationOptions: () => ({
      
                tabBarLabel: `报表`,
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/leader/bb.png');
                    if (focused) {
                        imageIcon = require('./../images/leader/bb_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
            }),
        },
        approval: {
            screen: Approval,
            navigationOptions: () => ({
                tabBarLabel: `审批`,
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/leader/sp.png');
                    if (focused) {
                        imageIcon = require('./../images/leader/sp_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
            }),
        },
        my: {
            screen: My,
            navigationOptions: () => ({
                title:`我的`,
                tabBarLabel: `我的`,
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/leader/wd.png');
                    if (focused) {
                        imageIcon = require('./../images/leader/wd_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
            }),
        },
    },
    {
        //首次加载时显示的页面
        initialRouteName: "cockpit",
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            //当前选中的tab的文本颜色和图标颜色
            activeTintColor: '#000',
            //当前选中tab的背景颜色
            activeBackgroundColor: "#f5f5f5",
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#666',
            //当前未选中tab的背景颜色
            // inactiveBackgroundColor: "#fff",
            //是否显示tab的文字
            showLabel: true,
            // 是否显示tab的图标
            showIcon: true,
            //tab bar的样式
            style: {},
            //tab的样式对象。
            tabStyle: {
                // backgroundColor: '#000',
                // borderTopColor: '#ccc',
            }
        },
 

        //是否在切换tab页时使用动画
        animationEnabled: true,
        //是否允许滑动切换tab页
        swipeEnabled: true,
        //是否懒加载
        lazy: true,
    }
)
  
  
const styles = StyleSheet.create({
    tabIcon: {
        width: 22, height: 23
    }
});