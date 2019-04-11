import React, { Component } from 'react';
import { Text, View, Image, StyleSheet,AsyncStorage,Button } from 'react-native';

import { scaleSize } from '../../../utils/ScreenUtil';
import {SystemInfo} from "../../../utils/index";
import NavigationUtil from "../../../utils/NavigationUtil";
class Index extends Component {
    static navigationOptions = {
    };
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
            <View style={styles.wrapper}>
                <Text>管理驾驶舱</Text>
                <Button title="退出" onPress={this.logout}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Index;