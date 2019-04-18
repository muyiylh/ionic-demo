import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 设计文件信息
 * 梁丽
 * 2019-04-17
 */

class DesignInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        const params = {
            id: info.id,
        }
        dispatch({
            type: `formData/getFormData`,
            params
        })
    }

    render() {
        const { formData: { data }, info } = this.props;
        let _data = JSON.parse(JSON.stringify(data));
        console.log("data-----info---",_data, info);
        const flag = info.nodeFlag == 'DDMBMLDSH' || info.nodeFlag == 'SJDWMLDSH';
        return (
            <View style={styles.projectPage}>
                {_data.FQXGSQ && flag?<View>
                    <View>
                        <Text style={styles.listTitle}>文件修改信息</Text>
                    </View>
                    <List>
                        <Item extra={_data.FQXGSQ.projectName} arrow="empty">
                            项目名称:
                        </Item>
                        <Item extra={_data.FQXGSQ.constructionAddress} arrow="empty">
                            施工地址:
                        </Item>
                        <Item extra={_data.FQXGSQ.reportUnit} arrow="empty">
                            申请人:
                        </Item>
                        <Item extra={_data.FQXGSQ.applyDate} arrow="empty">
                            申请日期:
                        </Item>
                        <Item extra={_data.FQXGSQ.influenceBudget == 1?"会":"不会"} arrow="empty">
                            影响预算:
                        </Item>
                        <Item extra={_data.FQXGSQ.description} arrow="empty">
                            修改说明:
                        </Item>
                    </List>
                </View>:null}
                {_data.DDMBMLDSH && _data.DDMBMLDSH.length>0 && flag?
                <View>
                    <View>
                        <Text style={styles.listTitle}>部门领导审核信息</Text>
                    </View>
                    {_data.DDMBMLDSH.map((item)=>{
                        return(
                            <List>
                                <Item extra={item.reviewResult} arrow="empty">
                                    审核意见:
                                </Item>
                                <Item extra={item.reviewResultDesc} arrow="empty">
                                    审核说明:
                                </Item>
                            </List>
                        )
                    })}
                </View>:null}
                {_data.SJDWMLDSH && _data.SJDWMLDSH.length>0 && flag?
                <View>
                    <View>
                        <Text style={styles.listTitle}>设计部门领导审核信息</Text>
                    </View>
                    {_data.SJDWMLDSH.map((item)=>{
                        return(
                            <List>
                                <Item extra={item.reviewResult} arrow="empty">
                                    审核意见:
                                </Item>
                                <Item extra={item.reviewResultDesc} arrow="empty">
                                    审核说明:
                                </Item>
                            </List>
                        )
                    })}
                </View>:null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    listTitle: {
        padding: 10,
    },
    list: {
        borderBottomWidth: 2,
        borderBottomColor: '#dede34',
    },
});
// export default CreditInfo;
function mapStateToProps(state) {
    const {formData, index} = state;
    return {formData, index}
}
export default connect(mapStateToProps)(DesignInfo);