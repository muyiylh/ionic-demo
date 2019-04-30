import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator, TabBarBottom } from "react-navigation";
//主导航页面
import Home from './../pages/home/index';
import Backlog from './../pages/backlog/index';
import Business from './../pages/business/index';//业务
import My from './../pages/my/index';


import Cockpit from './../pages/leader/cockpit';//管理驾驶舱
import Approval from './../pages/leader/approval';//审批
import Report from './../pages/leader/report';//报表
import LeaderMy from './../pages/leader/my';//我的


/**
 * Tab点击跳转调用的公共方法
 */
const route = (navigation) => {
    if (!navigation.isFocused()) {
        // 路由方法, 动态跳转到对应界面
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
};

//主导航设置
const businessNavigator = createBottomTabNavigator(
    {
        home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
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
                tabBarOnPress: () => { // 使用tabBarOnPress点击事件
                    route(navigation)
                }
            }),
        },
        backlog: {
            screen: Backlog,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: `待办`,
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/daiban.png');
                    if (focused) {
                        imageIcon = require('./../images/daiban_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
                tabBarOnPress: () => { // 使用tabBarOnPress点击事件
                    route(navigation)
                }
            }),
        },
        business: {
            screen: Business,
            navigationOptions: () => ({
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
);

const leaderNavigation = createBottomTabNavigator(
    {
        cockpit: {
            screen: Cockpit,
            navigationOptions: ({navigation}) => ({
       
                //底部导航的文本
                tabBarLabel: `驾驶舱`,
                //底部导航的图标
                tabBarIcon: ({ focused }) => {
                    var imageIcon = require('./../images/leader/jsc.png');
                    if (focused) {
                        imageIcon = require('./../images/leader/jsc_1.png');
                    }
                    return <Image style={styles.tabIcon} source={imageIcon} />
                },
           
  
                
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
        leadermy: {
            screen: LeaderMy,
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
);
const styles = StyleSheet.create({
    tabIcon: {
        width: 24, height: 24
    }
});

const params = {busNavigator:businessNavigator,leaderNavigation:leaderNavigation};
export default params;