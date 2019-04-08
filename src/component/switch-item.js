/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Switch} from '@ant-design/react-native';
import PropTypes from 'prop-types';

class SwitchItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: false
        }
    }
    onSwitchChange = (value) => {
        this.setState({checked: value,});
        console.log(value)
        this.props.onChange(value);
    };
    render(){
        const {children, ...other} = this.props;
        return(
            <List.Item
                extra={
                    <Switch
                        checked={this.state.checked}
                        onChange={this.onSwitchChange}
                    />
                }
                {...other}
            >
                {children}
            </List.Item>
        )
    }
}
SwitchItem.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
};
const styles = StyleSheet.create({

});
export default SwitchItem;