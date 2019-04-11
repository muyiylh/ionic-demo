import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {SystemInfo} from "../../utils/index";
import NavigationUtil from "../../utils/NavigationUtil";
class My extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
       
    }
    logout =()=>{
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('role');
        SystemInfo.removeItem('token');
        SystemInfo.removeItem('user');
        SystemInfo.removeItem('role');
        NavigationUtil.navigate("AuthLoading");
    }
    render() {
        return (
            <ScrollView style={styles.myPage}>
                <Text style={{fontSize:40}}>全局状态管理方法</Text>
                <Text>token:</Text>
                <Button title="修改token" ></Button>
                <Text>更多数据:</Text>
                <Button title="修改更多" ></Button>
                <Text>更多数据:</Text>
                <Button title="退出" onPress={this.logout}></Button>
            </ScrollView>
        );
    }
}
let USER_INFO_TODO = {
    type: "USER_INFO_TODO",
    data: {
        token: ""
    }
};
let OTHER_TODO = {
    type: "OTHER_TODO",
    data: ""
};
//获取redux里面的数据
// let mapStateToProps = function (state) {
//     return {
//         userInfo: state.userInfo,
//         other: state.other,
//     }
// }
// //给对应的数据赋值
// let mapDispatchToProps = function (dispatch) {
//     return {
//         setUserInfo: () => {
//             USER_INFO_TODO.data.token = "123";
//             return dispatch(USER_INFO_TODO)
//         },
//         setOther: () => {
//             OTHER_TODO.data = "456";
//             return dispatch(OTHER_TODO)
//         }
//     }
// }
//redux和页面关联
export default (My);
const styles = StyleSheet.create({
    myPage: {
        backgroundColor: '#f5f5f5',
    },
});