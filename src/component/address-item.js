/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {List} from '@ant-design/react-native';
import PropTypes from 'prop-types';
import NavigationUtil from '../utils/NavigationUtil';

class AddressItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: {}
        }
    }
    onPress = () => {
        NavigationUtil.navigate("MapAddr",{callback: this._SelectAddrCallback})
    };
    _SelectAddrCallback = (address) => {
        let location = address.location.split(',');
        const addr = {
            longitude: parseFloat(location[0]),
            latitude: parseFloat(location[1]),
            address: address.address
        };
        this.setState({address: addr});
        this.props.onChange(addr);
    };
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ address: value });
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    render(){
        const {children, extra, ...other} = this.props;
        const {address} = this.state;
        let addrTxt = extra;
        if(address && address.address){
            addrTxt = address.address;
        }
        return(
            <List.Item
                extra={addrTxt}
                arrow="horizontal"
                onPress={this.onPress}
                {...other}
            >
                {children}
            </List.Item>
        )
    }
}
AddressItem.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};
const styles = StyleSheet.create({

});
export default AddressItem;