import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView,TouchableOpacity } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError, filterConfig, getConfigName } from '../../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 工程验收----管网验收审核
 * 梁丽
 * 2019-04-29
 */

const list = [
    { title: '表节点验收'},
    { title: '井室构筑物'},
    { title: '安装工程'},
    { title: '管道试压'},
    { title: '冲洗消毒'},
]
class Check extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.state.params.info;
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', info.taskName),
            // //右边的按钮
            // headerRight: (
            //     <TouchableHighlight
            //         onPress={submit}
            //         style={{ marginRight: 10 }}
            //     >
            //         <Text style={textFontSize('#fff')}>提交</Text>
            //     </TouchableHighlight>
            // ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        // const {navigation, dispatch} = this.props;
        // navigation.setParams({submit: this.submit});
        // const info = navigation.state.params.info;
        // dispatch({
        //     type: `configParams/queryConfigParams`,
        // }).then(()=>{
        //     const params = {
        //         installNo: info.installNo,
        //         waitId: info.id,
        //     }
        //     dispatch({
        //         type: `projectCheck/getCheck`,
        //         params,
        //     })
        // })
        // const _params = {
        //     installId: info.installId,
        //     waitId: info.id,
        //     pageNum: 1,
        //     pageSize: 1000,
        //     status: 0,
        // }
        // dispatch({
        //     type: `projectCheck/listMeterDetail`,
        //     params: _params,
        // })
    }
    
    //查看详细信息
    viewDetail = (index) => {
        const { navigate } = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        navigate("ProjectCheckDetail",{index,info,});
    }
    
    
    render() {
        
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {
                            list.map((item,index)=>{
                                return(
                                    <Item onPress={()=>{this.viewDetail(index+1)}} arrow="horizontal" ><Text style={textFontSize()}>{item.title}</Text></Item>
                                )
                            })
                        }
                    </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    require:{
        color:"#ff5151"
    }
});

const  CheckForm = createForm()(Check);
function mapStateToProps(state) {
    const {projectCheck, formData, configParams, index} = state;
    return {projectCheck, formData, configParams, index}
}
export default connect(mapStateToProps)(CheckForm);