import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text,View,AsyncStorage,ImageBackground,Image,TouchableHighlight ,TextInput} from 'react-native';
import { WhiteSpace, WingBlank ,Modal, Toast} from '@ant-design/react-native';

import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux';
import {SystemInfo} from "../../utils/index";
import NavigationUtil from "../../utils/NavigationUtil";
import {deviceHeight,deviceWidth, scaleSize} from "../../utils/ScreenUtil";
import BgImag from '../../images/BG.png';
import Avatar from '../../images/Headportrait.png';
import List from './../../component/module/list';
import Button from './../../component/button';
import { connect } from '../../utils/dva';
import { tsTypeLiteral } from '@babel/types';
// import {showFormError} from "../../../utils/index";
const Item = List.Item;
class Finish extends Component {
    
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.state.params?navigation.state.params.title:null,
    //         //右边的按钮
           
    //     };
    // };
    constructor(props) {
       // console.warn("props:",props);
        super(props)
        this.state={
         
        }
    }
    componentDidMount() {
        const {dispatch} = this.props;
        const self = this;
    
 
        // dispatch({type:'my/queryUserByToken'}).then(()=>{
        //     const {userInfo} = self.props.my;
           
        //     self.setState({phone:userInfo.phone,listPhone:userInfo.phone,email:userInfo.email,listEmail:userInfo.email,listUsername:userInfo.realName,username:userInfo.realName})
        // })
    }
    submit =()=>{
        const {my:{userInfo},dispatch} = this.props;
        const {listPhone,listEmail,listUsername} = this.state;
        var param = {id:userInfo.id,phone:listPhone,email:listEmail,realName:listUsername};
       // dispatch({type:'my/updateUserInfo',params:param});
    }
    onPressModal =(value)=>{
        
    }

    render() {

        const {userInfo} = this.props.my;
       console.log("userInfo:",userInfo);
        return (
            <ScrollView style={styles.myPage}>
               
                
                <List title="你有一条任务处理" path="myInfo" ></List>
            
                <List title="你有一条任务处理" path="myInfo" ></List>
                <List title="你有一条任务处理" path="myInfo" ></List>
              
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    const {my} = state;
    return {my}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        dispatch: dispatch
    })
}
export default connect(mapStateToProps)(Finish);
const styles = StyleSheet.create({
    myPage: {
        backgroundColor: '#EBEEF5',
        marginBottom:10
    },

});