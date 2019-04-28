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
        console.log("info---------",info)
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
        console.log("filelist-------",fileList)
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <CusListItem extra={data.unitName}>单位名称:</CusListItem>
                    <CusListItem extra={data.unitAddress}>单位地址:</CusListItem>
                    <CusListItem extra={data.waterAddress}>用水地址:</CusListItem>
                    {/* <Item extra={data.unitAddress} arrow="empty" style={textFontSize()}>
                        <Text style={textFontSize()}>单位地址:</Text>
                    </Item>
                    <Item extra={data.waterAddress} arrow="empty" style={textFontSize()}>
                    <Text style={textFontSize()}>用水地址:</Text>
                    </Item> */}
                    <CusListItem extra={data.principalName}>负责人:</CusListItem>
                    <CusListItem extra={data.principalContact}>负责人电话:</CusListItem>
                    <CusListItem extra={data.managerName}>经办人:</CusListItem>
                    <CusListItem extra={data.managerContact}>经办人电话:</CusListItem>
                    <CusListItem extra={data.email}>邮箱地址:</CusListItem>
                    <CusListItem extra={data.projectName}>项目名称:</CusListItem>
                    <CusListItem extra={data.itemTypeName}>项目类型:</CusListItem>
                    {/* <Item extra={data.unitName} arrow="empty">
                        单位名称:
                    </Item>
                    <Item extra={data.unitAddress} arrow="empty">
                        单位地址:
                    </Item>
                    <Item extra={data.waterAddress} arrow="empty">
                        用水地址:
                    </Item>
                    <Item extra={data.principalName} arrow="empty">
                        负责人:
                    </Item>
                    <Item extra={data.principalContact} arrow="empty">
                        负责人电话:
                    </Item>
                    <Item extra={data.managerName} arrow="empty">
                        经办人:
                    </Item>
                    <Item extra={data.managerContact} arrow="empty">
                        经办人电话:
                    </Item>
                    <Item extra={data.email} arrow="empty">
                        邮箱地址:
                    </Item>
                    <Item extra={data.projectName} arrow="empty">
                        项目名称:
                    </Item>
                    <Item extra={data.itemTypeName} arrow="empty">
                        项目类型:
                    </Item> */}
                </List>
                <View>
                    <Text style={styles.listTitle}>建筑情况</Text>
                </View>
                <List renderHeader="多层住宅">
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.multi?data.constuctQkVO.multi.jm:''}>居民户数:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.multi?data.constuctQkVO.multi.gd:''}>隔断商铺:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.multi?data.constuctQkVO.multi.qt:''}>其它:</CusListItem>
                    {/* <Item extra={data.constuctQkVO?data.constuctQkVO.multi.jm:''} arrow="empty">
                    居民户数:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.multi.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.multi.qt:''} arrow="empty">
                    其它:
                    </Item> */}
                </List>
                <List renderHeader="高层住宅">
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.high?data.constuctQkVO.high.jm:''}>居民户数:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.high?data.constuctQkVO.high.gd:''}>隔断商铺:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.high?data.constuctQkVO.high.qt:''}>其它:</CusListItem>
                    {/* <Item extra={data.constuctQkVO?data.constuctQkVO.high.jm:''} arrow="empty">
                    居民户数:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.high.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.high.qt:''} arrow="empty">
                    其它:
                    </Item> */}
                </List>
                <List renderHeader="非住宅建筑">
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.noBulid?data.constuctQkVO.noBulid.jzmj:''}>建筑面积:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.noBulid?data.constuctQkVO.noBulid.gd:''}>隔断商铺:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.noBulid?data.constuctQkVO.noBulid.qt:''}>其它:</CusListItem>
                    {/* <Item extra={data.constuctQkVO?data.constuctQkVO.noBulid.jzmj:''} arrow="empty">
                    建筑面积:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.noBulid.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.noBulid.qt:''} arrow="empty">
                    其它:
                    </Item> */}
                </List>
                <List renderHeader="其他">
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.other?data.constuctQkVO.other.jzmj:''}>建筑面积:</CusListItem>
                    <CusListItem extra={data.constuctQkVO && data.constuctQkVO.other?data.constuctQkVO.other.qt:''}>其它:</CusListItem>
                    {/* <Item extra={data.constuctQkVO?data.constuctQkVO.other.jzmj:''} arrow="empty">
                    建筑面积:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.other.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.other.qt:''} arrow="empty">
                    其它:
                    </Item> */}
                </List>
                <List>
                    <CusListItem extra={data.projectTypeName}>工程类别:</CusListItem>
                    <CusListItem extra={fileList}>提供文件:</CusListItem>
                    {/* <Item extra={data.projectTypeName} arrow="empty">
                    工程类别:
                    </Item>
                    <Item extra={data.fileList?fileText(data.fileList):''} arrow="empty" wrap multipleLine>
                    提供文件:
                    </Item> */}
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