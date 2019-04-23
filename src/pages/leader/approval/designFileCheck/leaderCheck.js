import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../../component/select-item';
import DesignInfo from './info';
import { connect } from '../../../../utils/dva';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 设计文件-确认部门领导人审核，修改领导审核，修改设计部门领导审核
 * 梁丽
 * 2019-04-17
 */
const resultList = [
    {label: "同意", value: 0},
    {label: "不同意", value: 1},
]
class LeaderCheck extends Component {
    static navigationOptions = ({ navigation }) => {
        const submit = navigation.getParam("submit");
        const info = navigation.state.params.info;
        let title = '';
        if(info.nodeFlag == 'DDCBMLDSH'){//确认领导审核
            title = '设计文件确认审核';
        }else{
            title = '设计文件修改领导审核'
        }
        return {
            title: navigation.getParam('otherParam', title),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={submit}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({submit: this.submit})
    }
    //提交信息
    submit = () => {
        const { form, dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        form.validateFields((error, values) => {
            console.warn('submit', error, values)
            if (error) {
                // showFormError(form.getFieldsError());
                alert(error);
                return;
            }else{
                const params = {
                    ...values,
                    installId: info.installId,
                    waitId: info.id,
                }
                switch (info.nodeFlag) {
                    case 'DDCBMLDSH':
                        
                        break;
                
                    default:
                        break;
                }
                // dispatch({
                //     type: `pipeLineLeaderCheck/pipelineReviewLeaderReview`,
                //     params
                // })
            }
        })
    }
    
    render() {
        const data = {
            name: '12',
        }
        const { getFieldDecorator } = this.props.form;
        const info = this.props.navigation.state.params.info;
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <DesignInfo info={info} navigation={this.props.navigation}></DesignInfo>
                    <View>
                        <Text style={styles.listTitle}>审核信息</Text>
                    </View>
                    <List>
                        {
                            getFieldDecorator('channerAuditCheck',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请选择审核结果'}
                                ]
                            })(
                                <SelectItem data={resultList}>审核结果:</SelectItem>
                            )
                        }
                        <Item arrow="empty">受理描述说明:</Item>
                        {
                            getFieldDecorator('reviewDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入受理描述说明'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入受理描述说明" rows={3} count={300} />
                            )
                        }
                        
                    </List>
                    
                {/* </Provider> */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    listTitle: {
        padding: 10,
    },
});

function mapStateToProps(state) {
    const {pipeLineLeaderCheck, index} = state;
    return {pipeLineLeaderCheck, index}
}
const LeaderCheckForm = createForm()(LeaderCheck);
export default connect(mapStateToProps)(LeaderCheckForm);
// export default createForm()(BuildCheck);