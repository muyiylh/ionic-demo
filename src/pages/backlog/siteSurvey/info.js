import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import ImageView from '../../../component/image-view'
import { connect } from '../../../utils/dva';
import { fileText, textFontSize } from '../../../utils/index';
import BuildItem from '../../../component/report/build-item';
import CusListItem from "../../../component/list-item";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 报装信息
 * 2019/04/26
 * 梁丽
 */
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '基础信息')
        };
    };
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        const params = {
            installNo: info.installNo,
        }
        dispatch({
            type: `installInfo/getInstallInfoByInstallNo`,
            params,
        })

    }
    onRef = (ref) => {
        this.child = ref
    }
    render() {
        const { data } = this.props.installInfo;
        const fileList = data.fileList?fileText(data.fileList):'';
        const multi = data.constuctQkVO && data.constuctQkVO.multi?data.constuctQkVO.multi:{};
        const high = data.constuctQkVO && data.constuctQkVO.high?data.constuctQkVO.high:{};
        const noBulid = data.constuctQkVO && data.constuctQkVO.noBulid?data.constuctQkVO.noBulid:{};
        const other = data.constuctQkVO && data.constuctQkVO.other?data.constuctQkVO.other:{};
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <CusListItem extra={data.unitName}>单位名称:</CusListItem>
                    <CusListItem extra={data.unitAddress}>单位地址:</CusListItem>
                    <CusListItem extra={data.waterAddress}>用水地址:</CusListItem>
                    <CusListItem extra={data.principalName}>负责人:</CusListItem>
                    <CusListItem extra={data.principalContact}>负责人电话:</CusListItem>
                    <CusListItem extra={data.managerName}>经办人:</CusListItem>
                    <CusListItem extra={data.managerContact}>经办人电话:</CusListItem>
                    <CusListItem extra={data.email}>邮箱地址:</CusListItem>
                    <CusListItem extra={data.projectName}>项目名称:</CusListItem>
                    <CusListItem extra={data.itemTypeName}>项目类型:</CusListItem>
                </List>
                <View>
                    <Text style={styles.listTitle}>建筑情况</Text>
                </View>
                <List renderHeader="多层住宅">
                    <CusListItem extra={multi && multi.jm?multi.jm+"户":''}>居民户数:</CusListItem>
                    <CusListItem extra={multi && multi.gd?multi.gd+"户":''}>隔断商铺:</CusListItem>
                    <CusListItem extra={multi && multi.gd?multi.qt:''}>其它:</CusListItem>
                </List>
                <List renderHeader="高层住宅">
                    <CusListItem extra={high && high.jm?high.jm+"户":''}>居民户数:</CusListItem>
                    <CusListItem extra={high && high.gd?high.gd+"户":''}>隔断商铺:</CusListItem>
                    <CusListItem extra={high && high.qt?high.qt+"户":''}>其它:</CusListItem>
                </List>
                <List renderHeader="非住宅建筑">
                    <CusListItem extra={noBulid && noBulid.jzmj?noBulid.jzmj+"㎡":''}>建筑面积:</CusListItem>
                    <CusListItem extra={noBulid && noBulid.gd?noBulid.gd+"户":''}>隔断商铺:</CusListItem>
                    <CusListItem extra={noBulid && noBulid.qt?noBulid.qt:''}>其它:</CusListItem>
                </List>
                <List renderHeader="其他">
                    <CusListItem extra={other && other.jzmj?other.jzmj+"㎡":''}>建筑面积:</CusListItem>
                    <CusListItem extra={other && other.qt?other.qt:''}>其它:</CusListItem>
                </List>
                <List>
                    <CusListItem extra={data.projectTypeName}>工程类别:</CusListItem>
                    <CusListItem extra={fileList}>提供文件:</CusListItem>
                </List>
            </ScrollView>
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
    height: {
        height: 80
    }
});
function mapStateToProps(state) {
    const {installInfo, index} = state;
    return {installInfo, index}
}
export default connect(mapStateToProps)(Info);