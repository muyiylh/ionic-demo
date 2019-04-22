

// /**

import React from 'react';
import PropTypes from 'prop-types';
import dva from './utils/dva';
import Router from './router';
import RouterLeader from './router/leader';
import Index from './models/Index';
import Salary from './models/Salary';
import FormData from './models/FormData';
import PipeLineLeaderCheck from './models/PipeLineLeaderCheck';
import Home from './models/ScreeHome';
import Backlog from './models/Backlog';
import Advisory from './models/Advisory';
import Baozhuang from './models/Baozhuang';
import ConfigParams from './models/ConfigParams';
import MyInfo from './models/MyInfo';
import Business from './models/Business';
import AMap from './models/AMap';
import InstallInfo from './models/InstallInfo';
import SiteSurvey from './models/SiteSurvey';
import Budgeting from './models/Budgeting';
import Construction from './models/Construction';
import ChargeView from './models/ChargeView';
import ConstructionManage from './models/ConstructionManage';
import ConnectWater from './models/ConnectWater';
import WaterMeterReceive from './models/WaterMeterReceive';
import CompletionArchiving from './models/CompletionArchiving';
import {View} from 'react-native'

import Login from './models/Login';


import {SystemInfo} from "./utils/index";

const app = dva({
    models: [Index,  Login,Salary, FormData, PipeLineLeaderCheck, Home, Backlog, Advisory,
        MyInfo,Baozhuang,ConfigParams,Business, AMap, InstallInfo, SiteSurvey, Budgeting,
        Construction,ChargeView,ConstructionManage,ConnectWater,WaterMeterReceive,CompletionArchiving,
    ],

    onError(e) {
        console.log('onError', e);
    },
});
 
class AppContext extends React.Component{
    static childContextTypes = {
        token: PropTypes.string,
        role: PropTypes.number,
        user: PropTypes.any,
        setContext: PropTypes.func,
    };
    constructor(prop){
        super(prop);
        this.state = {token: null, user: null,role:null}
    }
    async componentDidMount() {
        // await Font.loadAsync(
        //   'antoutline',
        //   // eslint-disable-next-line
        //   require('@ant-design/icons-react-native/fonts/antoutline.ttf')
        // );
    
        // await Expo.Font.loadAsync(
        //   'antfill',
        //   // eslint-disable-next-line
        //   require('@ant-design/icons-react-native/fonts/antfill.ttf')
        // );
        // eslint-disable-next-line
      
      }
    getChildContext(){
        return {
            token: this.state.token,
            user: this.state.user,
            role:this.state.role,
            setContext: this.setContext.bind(this),
        }
    }
    setContext = (param)=>{
        this.setState(param);
    };
    render(){
  
        // let user = this.state.user;
        // console.log("this.state user:",user);
        // if(!user){
        //     user ={};
        // }
        // user.role = 1;
        // let content =  <SystemInfo/>;
        // if(user.role == 1){
        //     content =  <View><SystemInfo/><Router /></View>;
        // }else{
        //     content =  <View><SystemInfo/><RouterLeader /></View>;
        // }
        return this.props.children;
    }
}
// const user = SystemInfo.getUser();
// console.log("SystemInfo1212:",user)
const App = app.start(
    <AppContext>
       <SystemInfo/>
        <Router />
    </AppContext>
);

export default App;


