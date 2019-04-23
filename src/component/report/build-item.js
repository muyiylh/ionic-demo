/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/2/28
 */
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {List, InputItem} from '@ant-design/react-native';
import BaseComponent from "../../utils/BaseComponent";
import { textFontSize } from "../../utils/index";

class BuildItem extends BaseComponent{
    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.string,
        first: PropTypes.object,
        second: PropTypes.object,
        three: PropTypes.object,
        value: PropTypes.any,
        onChange: PropTypes.func
    };
    static defaultProps = {
        first: {name: 'gd', unit:'户'},
        second: {name: 'jm', unit:'户'},
        three: {name: 'qt', unit:'户'},
    };
    constructor(props){
        super(props);
        this.state = {
            buildInfo: {}
        }
    }
    juminHu = (val) => {
        const {buildInfo} = this.state;
        const {onChange, first} = this.props;
        buildInfo[first.name] = val;
        this.setState({buildInfo});
        onChange && onChange(buildInfo);
    };
    geduanHu = (val) => {
        const {buildInfo} = this.state;
        const {onChange, second} = this.props;
        buildInfo[second.name] = val;
        this.setState({buildInfo});
        onChange && onChange(buildInfo);
    };
    other = (val) => {
        const {buildInfo} = this.state;
        const {onChange, three} = this.props;
        buildInfo[three.name] = val;
        this.setState({buildInfo});
        onChange && onChange(buildInfo);
    };
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const {value, first, second, three} = nextProps;
            if(value)
                this.setState({ buildInfo: value });
            else{
                const buildInfo = {};
                buildInfo[first.name] = '';
                buildInfo[second.name] = '';
                buildInfo[three.name] = '';
                this.setState({ buildInfo });
            }
            // this.setState({ buildInfo });
        }
    }
    componentDidMount(){
        const {value, first, second, three} = this.props;
        if(value){
            this.setState({ buildInfo: value });
        }else{
            const buildInfo = {};
            buildInfo[first.name] = '';
            buildInfo[second.name] = '';
            buildInfo[three.name] = '';
            this.setState({ buildInfo });
        }
    }
    renderHeader = () => {
        const {title} = this.props;
        return(
            <View style={styles.header}><Text>{title}</Text></View>
        )
    };
    render(){
        const {type, first, second, three} = this.props;
        const {buildInfo} = this.state;
        return(
            <List renderHeader={this.renderHeader}>
                <InputItem
                    type='number'
                    placeholder={first.placeholder}
                    extra={first.unit}
                    value={buildInfo[first.name]}
                    onChange={this.juminHu}
                ><Text style={textFontSize()}>{first.label}</Text>
                </InputItem>
                {
                    type !== 'other' &&
                    <InputItem
                        type='number'
                        placeholder={second.placeholder}
                        extra={second.unit}
                        value={buildInfo[second.name]}
                        onChange={this.geduanHu}
                    ><Text style={textFontSize()}>{second.label}</Text></InputItem>
                }
                <InputItem
                    placeholder={three.placeholder}
                    extra={three.unit}
                    value={buildInfo[three.name]}
                    onChange={this.other}>
                    <Text style={textFontSize()}>{three.label}</Text></InputItem>
            </List>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 20
    }
});
export default BuildItem;
