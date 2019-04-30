/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/3/7
 */
import React,{Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native'
import {Tag, List} from '@ant-design/react-native';
import PropTypes from 'prop-types';
import { textFontSize } from '../utils/index';

class CheckboxItem extends React.Component {
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            const selected = value ? value.split(',') : [];
            this.setState({selected});
      
        }
    }

    onChange = (item) => {
        const {selected} = this.state;
        let isHas = false, idx = 0;
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] == item.value) {
                isHas = true;
                idx = i;
            }
        }
        if (!isHas && item.selected) {
            selected.push(item.value);
        }
        if (isHas && !item.selected) {
            selected.splice(idx, 1);
        }
        this.setState({selected});
        const {onChange} = this.props;
        onChange && onChange(selected.join(','))
    
    };
    isExist = (value) => {
        const {selected} = this.state;
        return selected.indexOf(value.toString()) > -1;
    };

    render() {
        const {data, children, required} = this.props;
   
        return (
            <Fragment>
                <List.Item style={[styles.item,textFontSize()]}>
                    <View style={{flex:1,flexDirection:'row'}}>{required?<Text style={styles.require}>*</Text>:null}{children}</View>
                </List.Item>
                <View style={styles.checkboxItems}>
                    {
                        Array.isArray(data) && data.map((item) => {
                            return <Tag style={styles.tag} onChange={(selected) => {
                                this.onChange({...item, selected})
                            }} selected={this.isExist(item.value)} key={item.value}>{item.label}</Tag>;
                        })
                    }
                </View>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        borderBottomWidth: 0,
        borderColor: '#fff',
    },
    checkboxItems: {
        padding: 10,
        flexWrap:'wrap',
        flexDirection:'row'
    },
    tag: {
        marginLeft: 10,
        marginBottom: 10,
    },
    require: {
        color:"#ff5151",
    }
});
export default CheckboxItem;
