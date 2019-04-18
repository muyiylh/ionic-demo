import React, { Component } from 'react';
import { Easing, Animated,Image } from 'react-native';
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
import Navigator from './navigator';
import NavigatorLeader from './navigatorLeader';
import InitLoading from '../pages/InitLoading';
import AuthLoading from '../pages/AuthLoading';
import Login from '../pages/login';

//business文件下的
import Salary from '../pages/business/salary/index';
//backlog文件下
import Advisory from '../pages/backlog/advisory/index';
import BaoZhuang from '../pages/backlog/baozhuang/index';
import Search from '../pages/backlog/baozhuang/search';
import SiteSurvey from '../pages/backlog/siteSurvey/index';
import EngineerDesign from '../pages/backlog/engineerDesign/index';
import Info from '../pages/backlog/engineerDesign/info';
import Add_table from '../pages/backlog/engineerDesign/add_table';
import Add_manage from '../pages/backlog/engineerDesign/add_manage';
import SceneInfo from '../pages/backlog/siteSurvey/info';
import Budgeting from '../pages/backlog/budgeting/index';
import DesignInfo from '../pages/backlog/budgeting/designInfo';
import Construction from '../pages/backlog/construction/index';
import ChargeView from '../pages/backlog/chargeView/index';
import ConstructionManage from '../pages/backlog/constructionManage/index';
import ProcessInfo from '../pages/backlog/constructionManage/info';
import AddMeter from '../pages/backlog/constructionManage/add';
import Completion from '../pages/backlog/completionArchiving/index';
import ConnectedWater from '../pages/backlog/connectedWater/index';


import myInfo from '../pages/my/info';
import myUpdatePwd from '../pages/my/password';
import myNotice from '../pages/my/notice';
import myFinish from '../pages/my/finish';
//业务
import busTranxList from '../pages/business/track/list';
import busPlanList from '../pages/business/track/planList';
import busInputPlan from '../pages/business/track/input';
import busTrackView from '../pages/business/track/trackView';//客户跟踪记录清单
import busPatrolPlan from '../pages/business/patrol/plans';//水表巡查计划
import busPatrolPlanList from '../pages/business/patrol/list';//水表巡查计划列表
import busPatrolPlanResult from '../pages/business/patrol/result';//水表巡查计划列表
import busInspectPlan from '../pages/business/inspect/plans';//检查计划
import busInspectCheck from '../pages/business/inspect/checklist';//检查清单
import busInspectDetail from '../pages/business/inspect/detail';//报装详情
import comTree from '../component/tree';//树节点选择
//leader--approval下
import DepartmentCredit from '../pages/leader/approval/creditCheck/departmentCheck';
import LeaderCheckPipeLine from '../pages/leader/approval/pipeLineReview/leaderCheck';
import BuildCheckPipeLine from '../pages/leader/approval/pipeLineReview/buildCheck';

const AuthStack = createSwitchNavigator({
    Login: {screen: Login},
});



//页面路由
const routerStack = createStackNavigator({
    

    navigator: {
        screen: Navigator,
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
          //  headerTitle: `${navigation.state.params}'s Profile'`,
         //   title: '', // 这里不给值
          //  header: null, // 不显示导航栏
            title: headerTitle,
       //  headerTitle: `${navigation.state.params}'s Profile'`,
            gesturesEnabled: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#45CBE6',
            },
        }}
    },
    navigatorleader: {
        screen: NavigatorLeader,
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
          //  headerTitle: `${navigation.state.params}'s Profile'`,
         //   title: '', // 这里不给值
          //  header: null, // 不显示导航栏
            title: headerTitle,
       //  headerTitle: `${navigation.state.params}'s Profile'`,
            gesturesEnabled: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#45CBE6',
            },
        }}
    },
  
    // 待办----咨询
    advisory: {
        screen: Advisory,
    },
    // 待办----报装受理
    baozhuang: {
        screen: BaoZhuang,
    },
    // 待办----报装受理----智能检索结果
    searchResult: {
        screen: Search,
    },
    //待办----工程设计----基础信息
    infoResult: {
        screen: Info,
    },
    //待办----工程设计----添加水表
    add_tableResult: {
        screen: Add_table,
    },
    //待办----工程设计----添加管道
    add_manageResult: {
        screen: Add_manage,
    },
    //待办----现场踏勘----基础信息
    sceneInfoResult: {
        screen: SceneInfo,
    },
    // 待办---现场踏勘
    siteSurvey: {
        screen: SiteSurvey,
    },
    // 待办---工程设计
    engineerDesign: {
        screen: EngineerDesign,
    },
    // 待办---工程设计
    designInfo: {
        screen: DesignInfo,
    },
    // 待办---预算编制
    budgeting: {
        screen: Budgeting,
    },
    // 待办---施工合同签订
    construction: {
        screen: Construction,
    },
    // 待办---缴纳工程款
    chargeView: {
        screen: ChargeView,
    },
    // 待办---工程施工
    constructionManage: {
        screen: ConstructionManage,
    },
    // 待办---工程施工---施工整体进度总览
    processInfo: {
        screen: ProcessInfo,
    },
    // 待办---工程施工---添加水表
    addMeter: {
        screen: AddMeter,
    },
    // 待办---竣工归档
    completion: {
        screen: Completion,
    },
    //我的 -- 个人信息查看
    myInfo:{
        screen:myInfo
    },
    myUpdatePwd:{
        screen:myUpdatePwd
    },

    myNotice:{
        screen:myNotice
    },
    myFinish:{
        screen:myFinish
    },
      //business文件下的
    //新增新增薪信度
    newsalary: {
        screen: Salary,
    },
    busTranxList:{
        screen:busTranxList
    },
    busPlanList:{
        screen:busPlanList
    },
    busInputPlan:{
        screen:busInputPlan
    }
    ,
    busTrackView:{
        screen:busTrackView
    },
    busPatrolPlan:{
        screen:busPatrolPlan
    }
    ,
    busPatrolPlanList:{
        screen:busPatrolPlanList,
      
    },
    busPatrolPlanResult:{
        screen:busPatrolPlanResult,
        title:"水表巡检总体结论录入"
    },
    busInspectPlan:{
        screen:busInspectPlan,
        title:"检查计划"
    },
    busInspectCheck:{
        screen:busInspectCheck
    },
    busInspectDetail:{
        screen:busInspectDetail
    },
    comTree:{
        screen:comTree
    },

    // 待办---通水管理
    connectedWater: {
        screen: ConnectedWater,
    },

  
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
                headerBackImage: <Image style={{width:22,height:20}} resizeMode="contain" source={require("./../images/Return01.png")}/>,
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#45CBE6',
                },
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
            screen: NavigatorLeader,
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
              //  headerTitle: `${navigation.state.params}'s Profile'`,
             //   title: '', // 这里不给值
              //  header: null, // 不显示导航栏
                title: headerTitle,
           //  headerTitle: `${navigation.state.params}'s Profile'`,
                gesturesEnabled: false,
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#45CBE6',
                },
            }}
        },
    //审批
    //一类资信度审核
    // 部门领导审核
    department_credit: {
        screen: DepartmentCredit,
    },
    //管道复核
    //领导审核
    leaderCheck_pipeLine: {
        screen: LeaderCheckPipeLine,
    },
    //建设指挥部审核
    buildCheck_pipeLine: {
        screen: BuildCheckPipeLine,
    },

     
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
                    headerBackImage: <Image style={{width:22,height:20}} resizeMode="contain" source={require("./../images/Return01.png")}/>,
                    headerTintColor: '#fff',
                    headerStyle: {
                      backgroundColor: '#45CBE6',
                    },
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
    const AppNavigator = createAppContainer(createSwitchNavigator(
        {
           InitLoading,
           AuthLoading,
            Auth: AuthStack,
            App:routerStack,
            Appleader:leaderRouterStack,
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

    const AppNavigatorLeader = createAppContainer(createSwitchNavigator(
        {
           InitLoading,
           AuthLoading,
            Auth: AuthStack,
            Appleader:leaderRouterStack,
    
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
    const unIncludeRouteLeader = ['Login','Auth', 'InitLoading', 'AuthLoading'];
    const defaultGetStateForActionLeader = AppNavigatorLeader.router.getStateForAction;
    
    AppNavigatorLeader.router.getStateForAction = (action, state) => {
        const {routeName, params} = action;
 
        if(action.type === NavigationActions.NAVIGATE && unIncludeRouteLeader.indexOf(routeName) === -1){
            const token = SystemInfo.getToken();
            const user = SystemInfo.getUser();
  
            if(token && user){
                return defaultGetStateForActionLeader(action, state);
             
            }
            const routes = [
                ...state.routes,
                {key: 'AuthLoading', routeName: 'AuthLoading', params}
            ];
   
            return {...state, routes, index: routes.length-1}
        }
        return defaultGetStateForActionLeader(action, state);
    };
//export default routerStack;

class Router extends BaseComponent {
    constructor(props){
        super(props);
    }
    render() {

        return(
            <Provider theme={theme}>
                <StatusBar barStyle="default" hidden={true} backgroundColor="#3c3f41"/>
               <AppNavigator ref={navigatorRef => {
                    NavigationUtil.setTopLevelNavigator(navigatorRef);
                }}/>
            </Provider>
        )

    }
}
export default Router;