import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
// import { connect } from 'react-redux';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 资信度信息
 * 梁丽
 * 2019-04-13
 */
const DATA = {
    name: "YYYY",
}
class PipeLineInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: DATA,
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
        // const { data } = this.state;
        const { formData: { data } } = this.props;
        console.log("data-------",data);
        return (
            <View>
                {data.GDFHSQ && <View>
                    <View>
                        <Text style={styles.listTitle}>管道复核信息</Text>
                    </View>
                    <List>
                        <Item extra={data.GDFHSQ.applyName} arrow="empty">
                            申请人:
                        </Item>
                        <Item extra={data.GDFHSQ.applyTime} arrow="empty">
                            申请日期:
                        </Item>
                        <Item extra={data.GDFHSQ.projectName} arrow="empty">
                            项目名称:
                        </Item>
                        <Item extra={data.GDFHSQ.reviewAddress} arrow="empty">
                            复核地址:
                        </Item>
                        <Item extra={data.GDFHSQ.applyDesc} arrow="empty">
                            申请说明:
                        </Item>
                    </List>
                </View>}
                {data.GDFHLDSH && <View>
                    <View>
                        <Text style={styles.listTitle}>管道审核信息</Text>
                    </View>
                    <List>
                        <Item extra={data.GDFHLDSH.channerAuditCheck} arrow="empty">
                            审核结果:
                        </Item>
                        <Item extra={data.GDFHLDSH.channelExist} arrow="empty">
                            管道情况:
                        </Item>
                        <Item extra={data.GDFHLDSH.reviewDesc} arrow="empty">
                            审核说明:
                        </Item>
                    </List>
                </View>}
                {data.GDFHAKFHJJGC && <View>
                    <View>
                        <Text style={styles.listTitle}>管道复核结果</Text>
                    </View>
                    <List>
                        <Item extra={data.GDFHAKFHJJGC.auditResult} arrow="empty">
                            复核结果:
                        </Item>
                        <Item extra={data.GDFHAKFHJJGC.reviewPersionName} arrow="empty">
                            复核人:
                        </Item>
                        <Item extra={data.GDFHAKFHJJGC.reviewTime.reviewTime} arrow="empty">
                            复核时间:
                        </Item>
                        <Item extra={data.GDFHAKFHJJGC.reviewDesc} arrow="empty">
                            复核说明:
                        </Item>
                    </List>
                </View>}
                
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
});
function mapStateToProps(state) {
    const {formData, index} = state;
    return {formData, index}
}
export default connect(mapStateToProps)(PipeLineInfo);