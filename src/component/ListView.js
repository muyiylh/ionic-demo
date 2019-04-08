/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import {FlatList, View, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

class ListView extends React.Component{
    render(){
        const {data, keyExtractor, renderItem, loading, ...other} = this.props;
        if(loading){
            return(<View style={styles.wrapper}><ActivityIndicator size="large" color="#0000ff"/></View>)
        }
        return(
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                {...other}
            />
        )
    }
}
ListView.propTypes = {
    data: PropTypes.array,
    keyExtractor: PropTypes.func,
    renderItem: PropTypes.any,
    loading: PropTypes.bool
};
ListView.defaultProps = {
    loading: false,
    data: []
};
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});
export default ListView
