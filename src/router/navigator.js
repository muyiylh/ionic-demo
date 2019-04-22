import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator, TabBarBottom } from "react-navigation";
//主导航页面
import Home from './../pages/home/index';
import Backlog from './../pages/backlog/index';
import Business from './../pages/business/index';//业务
import My from './../pages/my/index';
//主导航设置
export default createBottomTabNavigator(
    {
        home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
               // title:'首页',
               // headerTitle: '首页',
                //底部导航的文本
                tabBarLabel: `首页`,
                //底部导航的图标
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/shouye.png');
                    if (focused) {
                        imageIcon = require('./../images/shouye_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
                title: `122s Profil`,
  
                
            }),
        },
        backlog: {
            screen: Backlog,
            navigationOptions: () => ({
                title:'待办',
                tabBarLabel: `待办`,
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/daiban.png');
                    if (focused) {
                        imageIcon = require('./../images/daiban_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
            }),
        },
        business: {
            screen: Business,
            navigationOptions: () => ({
                title:`业务`,
                tabBarLabel: `业务`,
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/yewu.png');
                    if (focused) {
                        imageIcon = require('./../images/yewu_1.png');
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
                    var imageIcon = require('./../images/wode.png');
                    if (focused) {
                        imageIcon = require('./../images/wode_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
            }),
        },
    },
    {
        //首次加载时显示的页面
        initialRouteName: "home",
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
        width: 19, height: 19
    }
});