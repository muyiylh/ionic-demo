import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import ImageView from '../../../component/image-view'
import { connect } from '../../../utils/dva';
import { fileText } from '../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '基础信息')
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            images: [],//文件数组
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
        }).then(()=>{
            const { data } = this.props.installInfo;
            let images = [];
            data.fileList instanceof Array && data.fileList.map((item)=>{
                images.push({"url": item.filePath});
            })
            this.setState({images});
        })

    }
    onRef = (ref) => {
        this.child = ref
    }
    //查看图片
    open = () => {
        this.child.open()
    }
    render() {
        const { data } = this.props.installInfo;
        const { images } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                <List>
                    <Item extra={data.unitName} arrow="empty">
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
                    </Item>
                </List>
                <View>
                    <Text style={styles.listTitle}>建筑情况</Text>
                </View>
                <List renderHeader="多层住宅">
                    <Item extra={data.constuctQkVO?data.constuctQkVO.multi.jm:''} arrow="empty">
                    居民户数:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.multi.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.multi.qt:''} arrow="empty">
                    其它:
                    </Item>
                </List>
                <List renderHeader="高层住宅">
                    <Item extra={data.constuctQkVO?data.constuctQkVO.high.jm:''} arrow="empty">
                    居民户数:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.high.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.high.qt:''} arrow="empty">
                    其它:
                    </Item>
                </List>
                <List renderHeader="非住宅建筑">
                    <Item extra={data.constuctQkVO?data.constuctQkVO.noBulid.jzmj:''} arrow="empty">
                    建筑面积:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.noBulid.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.noBulid.qt:''} arrow="empty">
                    其它:
                    </Item>
                </List>
                <List renderHeader="其他">
                    <Item extra={data.constuctQkVO?data.constuctQkVO.other.jzmj:''} arrow="empty">
                    建筑面积:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.other.gd:''} arrow="empty">
                    隔断商铺:
                    </Item>
                    <Item extra={data.constuctQkVO?data.constuctQkVO.other.qt:''} arrow="empty">
                    其它:
                    </Item>
                </List>
                <List>
                    <Item extra={data.projectTypeName} arrow="empty">
                    工程类别:
                    </Item>
                    <Item extra={data.fileList?fileText(data.fileList):''} arrow="empty">
                    提供文件:
                    </Item>
                </List>
                <ImageView onRef={this.onRef} images={images}></ImageView>
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