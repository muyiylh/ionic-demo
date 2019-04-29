import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
import moment from "moment";
import ImageView from '../../../../component/image-view';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize } from '../../../../utils/index';
import CusListItem from "../../../../component/list-item";
const Item = List.Item;
const Brief = Item.Brief;
const screenHeight = Dimensions.get("window").height;
/**
 * 资信度信息
 * 梁丽
 * 2019-04-13
 */
const DATA = {
    name: "YYYY",
    files: [
        {fileName: "文件1",filePath: "jpg/1904/13/884232220573831168.jpg"},
    ],
}
const IMAGES = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
  },
];

class CreditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: DATA,
            images: IMAGES,
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
    onRef = (ref) => {
        this.child = ref
    }
    //查看图片
    open = () => {
        this.child.open()
    }
    render() {
        const { images } = this.state;
        const { formData: { data }, type } = this.props;
        let _data = JSON.parse(JSON.stringify(data));
        _data.SBZXDWT = data.SBZXDWT1 || data.SBZXDWT2;
        const files = _data.SBZXDWT && _data.SBZXDWT.files?fileText(_data.SBZXDWT.files):'';
        const userFiles = _data.FQZXDCZ && _data.FQZXDCZ.userFiles?fileText(_data.FQZXDCZ.userFiles):'';
        const proFiles = _data.FQZXDCZ && _data.FQZXDCZ.proFiles?fileText(_data.FQZXDCZ.proFiles):'';
        // console.log("data--------",_data);
        return (
            <View>
                {_data.SBZXDWT && <View>
                    <View>
                        <Text style={styles.listTitle}>资信度信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={_data.SBZXDWT.clientName}>客户名称:</CusListItem>
                        <CusListItem extra={_data.SBZXDWT.levelClass==0?'一类资信度':'二类资信度'}>资信度等级:</CusListItem>
                        <CusListItem extra={_data.SBZXDWT.reportUnit}>上报单位:</CusListItem>
                        <CusListItem extra={_data.SBZXDWT.reportUserName}>上报人员:</CusListItem>
                        <CusListItem extra={moment(_data.SBZXDWT.reportTime).format("YYYY-MM-DD HH:mm:ss")}>上报时间:</CusListItem>
                        <CusListItem extra={_data.SBZXDWT.proDesc}>问题描述:</CusListItem>
                        <CusListItem extra={_data.SBZXDWT.levelDesc}>等级设定说明:</CusListItem>
                        <CusListItem extra={ files }>附件内容:</CusListItem>
                    </List>
                </View>}
                { type=='handel' && _data.FQZXDCZ && <View>
                    <View>
                        <Text style={styles.listTitle}>资信度处置信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={moment(_data.FQZXDCZ.agHandleTime).format("YYYY-MM-DD")}>约定处置日期:</CusListItem>
                        <CusListItem extra={_data.FQZXDCZ.handleProDesc}>沟通情况说明:</CusListItem>
                        <CusListItem extra={_data.FQZXDCZ.handleStatus==0?'用户同意及时处理':_data.FQZXDCZ.handleStatus==1?'用户书面承诺处理(承诺书)':'未达成一致'}>沟通结果:</CusListItem>
                        <CusListItem extra={_data.FQZXDCZ.remark}>备注说明:</CusListItem>
                        <CusListItem extra={ userFiles }>用户提供文件:</CusListItem>
                        <CusListItem extra={ proFiles }>沟通过程资料:</CusListItem>
                    </List>
                </View>}
                {type=='check' && _data.BMLDSH && _data.BMLDSH.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>部门领导审核信息</Text>
                    </View>
                    {_data.BMLDSH.map((item)=>{
                        return(
                            <List>
                                <CusListItem extra={item.reviewResult==0?'同意':'不同意'}>审核意见:</CusListItem>
                                <CusListItem extra={item.reviewResultDesc}>审核说明:</CusListItem>
                            </List>
                        )
                    })}
                </View>:null}
                {type=='check' && _data.BMSJLDSH1 && _data.BMSJLDSH1.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>部门上级领导审核信息</Text>
                    </View>
                    {
                        _data.BMSJLDSH1.map((item)=>{
                            return(
                                <List style={styles.list}>
                                    <CusListItem extra={item.reviewResult==0?'同意':'不同意'}>审核意见:</CusListItem>
                                    <CusListItem extra={item.reviewResultDesc}>审核说明:</CusListItem>
                                </List>
                            )
                        })
                    }
                </View>:null}
                {type=='check' && _data.FGFZSH1 && _data.FGFZSH1.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>分管副总审核信息</Text>
                    </View>
                    {_data.FGFZSH1.map((item)=>{
                        return(
                            <List>
                                <CusListItem extra={item.reviewResult==0?'同意':'不同意'}>审核意见:</CusListItem>
                                <CusListItem extra={item.reviewResultDesc}>审核说明:</CusListItem>
                            </List>
                        )
                    })}
                    
                </View>:null}
                {type=='check' && _data.ZJLSH1 && _data.ZJLSH1.length>0?
                <View>
                    <View>
                        <Text style={styles.listTitle}>总经理审核信息</Text>
                    </View>
                    {_data.ZJLSH1.map(()=>{
                        return(
                            <List>
                                <CusListItem extra={item.reviewResult==0?'同意':'不同意'}>审核意见:</CusListItem>
                                <CusListItem extra={item.reviewResultDesc}>审核说明:</CusListItem>
                            </List>
                        )
                        })}
                </View>:null}
                {type=='handel' && _data.BMLDSH &&
                <View>
                    <View>
                        <Text style={styles.listTitle}>部门领导审核信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={_data.BMLDSH.reviewResult==0?'同意':'不同意'}>审核意见:</CusListItem>
                        <CusListItem extra={_data.BMLDSH.handleWay=='continue'?'继续报装':'暂停报装'}>审核意见:</CusListItem>
                        <CusListItem extra={_data.BMLDSH.reviewResultDesc}>审核说明:</CusListItem>
                    </List>
                        
                </View>}
                {type=='handel' && _data.FGFZSH &&
                <View>
                    <View>
                        <Text style={styles.listTitle}>分管副总审核信息</Text>
                    </View>
                    <List>
                        <CusListItem extra={_data.FGFZSH.reviewResult==0?'同意':'不同意'}>审核意见:</CusListItem>
                        <CusListItem extra={_data.FGFZSH.reviewResultDesc}>审核说明:</CusListItem>
                    </List>
                        
                </View>}
                <ImageView onRef={this.onRef} images={images}></ImageView>
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
export default connect(mapStateToProps)(CreditInfo);