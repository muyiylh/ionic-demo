import React, { Component } from 'react';
import { Easing, Animated,Image } from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
//底部导航配置
import Navigator from './navigator';
//页面
//home文件下的
// 原生组件
// import ActivityIndicator from '../pages/home/nativity/ActivityIndicator';
// import Button from '../pages/home/nativity/Button';
// import FlatList from '../pages/home/nativity/FlatList';
// import Form from '../pages/home/nativity/Form';
// import ImagePage from '../pages/home/nativity/Image';
// import Modal from '../pages/home/nativity/Modal';
// import Picker from '../pages/home/nativity/Picker';
// import RefreshControl from '../pages/home/nativity/RefreshControl';
// import SafeAreaView from '../pages/home/nativity/SafeAreaView';
// import Shadow from '../pages/home/nativity/Shadow';
// import TextInput from '../pages/home/nativity/TextInput';
// import WebView from '../pages/home/nativity/WebView';
//第三方组件
// import DatePicker from '../pages/home/Datepicker';
// import ImagePicker from '../pages/home/ImagePicker';
// import Swiper from '../pages/home/Swiper';
//自定义组件
// import AddressSelect from '../pages/home/AddressSelect';
// import Popup from '../pages/home/Popup';
// import Toast from '../pages/home/Toast';
// import Loading from '../pages/home/Loading';
// API
// import AccessibilityInfo from '../pages/project/AccessibilityInfo';
// import Alert from '../pages/project/Alert';
// import AnimatedIndex from '../pages/project/Animated/index';
// import Animated1 from '../pages/project/Animated/Animated1';
// import Animated2 from '../pages/project/Animated/Animated2';
// import Animated3 from '../pages/project/Animated/Animated3';
// import Animated4 from '../pages/project/Animated/Animated4';
// import Animated5 from '../pages/project/Animated/Animated5';
// import Animated6 from '../pages/project/Animated/Animated6';
// import AppState from '../pages/project/AppState';
// import AsyncStorage from '../pages/project/AsyncStorage';
// import BackHandler from '../pages/project/BackHandler';
// import CameraRoll from '../pages/project/CameraRoll';
// import Clipboard from '../pages/project/Clipboard';
// import CropImage from '../pages/project/CropImage';
// import Keyboard from '../pages/project/Keyboard';
// import LayoutAnimation from '../pages/project/LayoutAnimation';
// import Linking from '../pages/project/Linking';
// import NetInfo from '../pages/project/NetInfo';
// import PanResponder from '../pages/project/PanResponder';
// import PermissionsAndroid from '../pages/project/PermissionsAndroid';
// import PixelRatio from '../pages/project/PixelRatio';
// import Share from '../pages/project/Share';
// import Vibration from '../pages/project/Vibration';
//business文件下的
import Salary from '../pages/business/salary/index';
import Advisory from '../pages/backlog/advisory/index';
import BaoZhuang from '../pages/backlog/baozhuang/index';
import Search from '../pages/backlog/baozhuang/search.js';

// import Login from '../pages/login/index';
// const AuthStack = createSwitchNavigator({
//     Login: {screen: Login},
// });
//页面路由
const routerStack = createStackNavigator({
    

    navigator: {
        screen: Navigator,
        //不显示头部
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
    //business文件下的
    //新增新增薪信度
    newsalary: {
        screen: Salary,
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
    // button: {
    //     screen: Button,
    // },
    // flatList: {
    //     screen: FlatList,
    // },
    // form: {
    //     screen: Form,
    // },
    // imagePage: {
    //     screen: ImagePage,
    // },
    // modal: {
    //     screen: Modal,
    // },
    // picker: {
    //     screen: Picker,
    // },
    // refreshControl: {
    //     screen: RefreshControl,
    // },
    // safeAreaView: {
    //     screen: SafeAreaView,
    // },
    // shadow: {
    //     screen: Shadow,
    // },
    // textInput: {
    //     screen: TextInput,
    // },
    // webView: {
    //     screen: WebView,
    // },
    //第三方组件
    // datePicker: {
    //     screen: DatePicker,
    // },
    // imagePicker: {
    //     screen: ImagePicker,
    // },
    // swiper: {
    //     screen: Swiper,
    // },
    //自定义组件
    // addressSelect: {
    //     screen: AddressSelect,
    // },
    // popup: {
    //     screen: Popup,
    // },
    // toast: {
    //     screen: Toast,
    // },
    // loading: {
    //     screen: Loading,
    // },
    // API
    // accessibilityInfo: {
    //     screen: AccessibilityInfo,
    // },
    // alert: {
    //     screen: Alert,
    // },
    // animatedIndex: {
    //     screen: AnimatedIndex,
    // },
    // animated1: {
    //     screen: Animated1,
    // },
    // animated2: {
    //     screen: Animated2,
    // },
    // animated3: {
    //     screen: Animated3,
    // },
    // animated4: {
    //     screen: Animated4,
    // },
    // animated5: {
    //     screen: Animated5,
    // },
    // animated6: {
    //     screen: Animated6,
    // },
    // appState: {
    //     screen: AppState,
    // },
    // asyncStorage: {
    //     screen: AsyncStorage,
    // },
    // backHandler: {
    //     screen: BackHandler,
    // },
    // cameraRoll: {
    //     screen: CameraRoll,
    // },
    // clipboard: {
    //     screen: Clipboard,
    // },
    // cropImage: {
    //     screen: CropImage,
    // },
    // keyboard: {
    //     screen: Keyboard,
    // },
    // layoutAnimation: {
    //     screen: LayoutAnimation,
    // },
    // linking: {
    //     screen: Linking,
    // },
    // netInfo: {
    //     screen: NetInfo,
    // },
    // panResponder: {
    //     screen: PanResponder,
    // },
    // permissionsAndroid: {
    //     screen: PermissionsAndroid,
    // },
    // pixelRatio: {
    //     screen: PixelRatio,
    // },
    // share: {
    //     screen: Share,
    // },
    // vibration: {
    //     screen: Vibration,
    // },

    // childPage: {
    //     screen: childPage, 
    // },
}, {
        //默认第一次显示首页
        initialRouteName: 'navigator',
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
    // const AppNavigator = createAppContainer(createSwitchNavigator(
    //     {
    //         // InitLoading,
    //         // AuthLoading,
    //         Auth: AuthStack,
    //         App: AppStack
    //     },
    //     {
    //         initialRouteName: 'Auth',
    //         defaultNavigationOptions: {
    //             gesturesEnabled: true,
    //             headerStyle: {
    //                 // elevation: 0,
    //                 height: scaleSize(98),
    //             },
    //             headerTitleStyle: {
    //                 fontSize: scaleSize(36),
    //             },
    
    //         },
    //     },
    // ));
    // const unIncludeRoute = ['Login', 'Auth', 'InitLoading', 'AuthLoading'];
    // const defaultGetStateForAction = AppNavigator.router.getStateForAction;
    
export default routerStack;
//export default AppNavigator;