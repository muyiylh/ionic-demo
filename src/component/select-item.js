/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/1/23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Picker, List} from '@ant-design/react-native';

class SelectItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onChange = (value) => {
        const item = this.getItem(value);
        const {onChange} = this.props;
        if(item){
            this.setState({selected: item});
            onChange && onChange(item.value);
        }
    };
    getItem = (value) => {
        const {data} = this.props;
        const values = data.filter(item=>{
            return item.value == value;
        });
        if(values.length > 0){
            return values[0];
        }
        return null;
    };
    onFormat = (labels) => {
        return labels.join(',')
    };
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            const item = this.getItem(value);
            this.setState({ selected: item });
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentDidMount(){
        const {value} = this.props;
        if(value){
            const item = this.getItem(value);
            this.setState({ selected: item });
        }
    }
    render(){
        const {children, data, extra, disabled} = this.props;
        let extraTxt = extra || "请选择";
        let _disabled = disabled || false; 
        let val = [];
        const {selected} = this.state;
        if(selected){
            extraTxt = selected.label;
            val.push(selected.value);
        }
        return(
            <Picker data={data} extra={extraTxt} value={val} onOk={this.onChange} cols={1} format={this.onFormat} disabled={_disabled}>
                <List.Item arrow="horizontal">{children}</List.Item>
            </Picker>
        )
    }
}
SelectItem.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    data: PropTypes.array
};
export default SelectItem;
