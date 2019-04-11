/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/24
 */
import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scaleSize} from "../utils/ScreenUtil";
import PropTypes from 'prop-types';

class FloatButton extends React.Component{
    render(){
        const {onPress} = this.props;
        return(
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image source={require('../images/zx_2x.png')} style={styles.image}/>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: scaleSize(60),
        right: scaleSize(20)
    },
    image: {
        width: scaleSize(138),
        height: scaleSize(138)
    }
});
FloatButton.propTypes = {
    onPress: PropTypes.func
};
export default FloatButton;
