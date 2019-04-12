

// /**

import React from 'react';
import PropTypes from 'prop-types';
import dva from './utils/dva';
import Router from './router';
import RouterLeader from './router/leader';
import Index from './models/Index';
import Salary from './models/Salary';
import {View} from 'react-native'

import Login from './models/Login';


import {SystemInfo} from "./utils/index";

const app = dva({
    models: [Index,  Login,Salary],
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


