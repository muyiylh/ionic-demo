import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { scaleSize } from '../../utils/ScreenUtil';

class Mine extends Component {
    static navigationOptions = {
    };

    render() {
        return (
            <View style={styles.wrapper}>
                <Text>我的</Text>
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

export default Mine;