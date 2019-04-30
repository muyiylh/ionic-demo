import React, { Component } from 'react';
import { Easing, Animated,Image, View } from 'react-native';
import theme from '../utils/theme';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    NavigationActions
} from "react-navigation";
import {Provider} from '@ant-design/react-native'
import {StatusBar, AsyncStorage} from 'react-native'
import { scaleSize } from '../utils/ScreenUtil';
import BaseComponent from '../utils/BaseComponent';
import NavigationUtil from '../utils/NavigationUtil';
import {SystemInfo} from "../utils/index";
//底部导航配置
import busNav from './navigator';
 import busRouter from './pagerouter';
import InitLoading from '../pages/InitLoading';
import AuthLoading from '../pages/AuthLoading';
import Login from '../pages/login';



const AuthStack = createSwitchNavigator({
    Login: {screen: Login},
});



//页面路由
const routerStack = createStackNavigator({
    navigator: {
        screen: busNav.busNavigator,
        navigationOptions:({ navigation }) =>{
           const { routeName } = navigation.state.routes[navigation.state.index];
            // You can do whatever you like here to pick the title based on the route name
            let headerTitle = "";
            if (routeName == "home") {
                headerTitle = "首页"
            } else if (routeName == "backlog") {
                headerTitle = "待办"
            } else if (routeName == "business") {
                headerTitle = "业务"
            } else if (routeName == "my") {
                headerTitle = "我的"
            }
           return {
            title: headerTitle,
            gesturesEnabled: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#45CBE6',//
              height:48,//
            },
             headerTitleStyle:{
                fontSize:scaleSize(32),
            }
        }}
    },
    ...busRouter.businessRouter
}, {
        //默认第一次显示首页
        initialRouteName: 'navigator',//
        // 定义渲染和过渡的样式
        mode: 'modal',
        // 指定标头的呈现方式
        headerMode: "screen",
        //显示返回图标后的文字
        headerBackTitleVisible: false,
        cardOverlayEnabled: true,
        //标题居中
        headerLayoutPreset: "center",
       
        //设置默认数据
        defaultNavigationOptions: ({ navigation }) => {
            return {
                // 设置头部返回图片
                headerBackImage: <View style={{width: 40}}><Image style={{width:14,height:14}} resizeMode="contain" source={require("./../images/Return01.png")}/></View>,
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#45CBE6',//
                    height:48,//
                  //  paddingTop:20,
                   // paddingBottom:20,
                },
                headerTitleStyle:{
                      fontSize:scaleSize(32),
                    }
            }
        },
        //页面跳转动画
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps;
                const {index} = scene;
                const Width = layout.initWidth;
                //沿X轴平移
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [Width, 0, -(Width - 10)],
                });
                //透明度
                const opacity = position.interpolate({
                    inputRange: [index - 1, index],
                    outputRange: [0,  1],
                });
                return {opacity, transform: [{translateX}]};
            }
        }),
        //页面跳转之前
        onTransitionStart: () => {
            // console.log("页面跳转之前");
        },
        //页面跳转之后
        onTransitionEnd: () => {
            // console.log("页面跳转之后");
        },
    });
    const leaderRouterStack = createStackNavigator({
        navigator: {
            screen: busNav.leaderNavigation,
            navigationOptions:({ navigation }) =>{
           
               const { routeName } = navigation.state.routes[navigation.state.index];
      
                // You can do whatever you like here to pick the title based on the route name
                let headerTitle = "";
                if (routeName == "cockpit") {
                    headerTitle = "驾驶舱"
                } else if (routeName == "report") {
                    headerTitle = "报表"
                } else if (routeName == "approval") {
                    headerTitle = "审批"
                } else if (routeName == "leadermy") {
                    headerTitle = "我的"
                }
    
               return {
              //  headerTitle: `${navigation.state.params}'s Profile'`,
             //   title: '', // 这里不给值
              //  header: null, // 不显示导航栏
                title: headerTitle,
           //  headerTitle: `${navigation.state.params}'s Profile'`,
                gesturesEnabled: false,
                headerTintColor: '#fff',
               headerStyle: {
                backgroundColor: '#45CBE6',//
                height:48,//
                //paddingTop:20,
               // paddingBottom:20,
            },
            headerTitleStyle:{
                  fontSize:scaleSize(32),
                }
            }}
        },
        ...busRouter.leaderRouter
    }, {
            //默认第一次显示首页
            initialRouteName: 'navigator',//
            // 定义渲染和过渡的样式
            mode: 'modal',
            // 指定标头的呈现方式
            headerMode: "screen",
            //显示返回图标后的文字
            headerBackTitleVisible: false,
            cardOverlayEnabled: true,
            //标题居中
            headerLayoutPreset: "center",
            headerTintColor: '#fff',
            //设置默认数据
            defaultNavigationOptions: ({ navigation }) => {
                return {
                    // 设置头部返回图片
                    headerBackImage: <View style={{width: 40}}><Image style={{width:18,height:18}} resizeMode="contain" source={require("./../images/Return01.png")}/></View>,
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#45CBE6',//
                        height:48,//
                       // paddingTop:20,
                       // paddingBottom:20,
                    },
                    headerTitleStyle:{
                          fontSize:scaleSize(32),
                        }
                }
            },
            //页面跳转动画
            transitionConfig: () => ({
                transitionSpec: {
                    duration: 300,
                    easing: Easing.out(Easing.poly(4)),
                    timing: Animated.timing,
                },
                screenInterpolator: sceneProps => {
                    const {layout, position, scene} = sceneProps;
                    const {index} = scene;
                    const Width = layout.initWidth;
                    //沿X轴平移
                    const translateX = position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [Width, 0, -(Width - 10)],
                    });
                    //透明度
                    const opacity = position.interpolate({
                        inputRange: [index - 1, index],
                        outputRange: [0,  1],
                    });
                    return {opacity, transform: [{translateX}]};
                }
            }),
        });
    const AppNavigator = createAppContainer(createSwitchNavigator(
        {
           InitLoading:InitLoading,
           AuthLoading:AuthLoading,
            Auth: AuthStack,
            App:routerStack,
            LeaderApp:leaderRouterStack,
          
        },
        {
            initialRouteName: 'AuthLoading',
            defaultNavigationOptions: {
                gesturesEnabled: true,
                headerStyle: {
                    // elevation: 0,
                    height: scaleSize(98),
                },
                headerTitleStyle: {
                    fontSize: scaleSize(36),
                },
    
            },
        },
    ));
    const unIncludeRoute = ['Login','Auth', 'InitLoading', 'AuthLoading'];
    const defaultGetStateForAction = AppNavigator.router.getStateForAction;
    
    AppNavigator.router.getStateForAction = (action, state) => {
        const {routeName, params} = action;

        if(action.type === NavigationActions.NAVIGATE && unIncludeRoute.indexOf(routeName) === -1){
            const token = SystemInfo.getToken();
            const user = SystemInfo.getUser();
     
            if(token && user){
                return defaultGetStateForAction(action, state);
           
            }
            const routes = [
                ...state.routes,
                {key: 'AuthLoading', routeName: 'AuthLoading', params}
            ];
        
            return {...state, routes, index: routes.length-1}
        }
        return defaultGetStateForAction(action, state);
    };


class Router extends BaseComponent {
    constructor(props){
        super(props);
    }
    render() {
//theme={theme}
        return(
            <Provider theme={theme}>
                <StatusBar barStyle="default" backgroundColor="#45CBE6"/>
               <AppNavigator ref={navigatorRef => {
                    NavigationUtil.setTopLevelNavigator(navigatorRef);
                }}/>
            </Provider>
        )

    }
}
export default Router;