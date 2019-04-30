import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight, Modal, Dimensions, ActivityIndicator, CameraRoll } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace, Toast} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
import moment from "moment";
import ImageView from '../../../../component/image-view';
import { Table, Row, Rows } from 'react-native-table-component';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize } from '../../../../utils/index';
import CusListItem from "../../../../component/list-item";
const Item = List.Item;
const Brief = Item.Brief;
const screenHeight = Dimensions.get("window").height;
/**
 * 详细信息
 * 梁丽
 * 2019-04-29
 */

const head1 = ["水表类型","水表口径","水表类别","用水性质","初始读数","安装地址","用水地址","水表状态"];
const head2 = ["管径","管材","安装长度","桩号","接口形式","外观检查","接头质量"];
const head3 = ["型号","数量","公称直径(mm)","生产厂家","总公司检验号","外观检查","外防腐","出厂日期","备注"];
const head4 = ["型号","数量","公称直径(mm)","三通法兰距管顶高度(mm)","开孔与井孔中心距离(mm)","备注"];
class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            widthArr: [80,80,80,80,80,80,80,80],//table的宽度
            images: [],
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        
    }
    onRef = (ref) => {
        this.child = ref
    }
    //showPicture
    showPicture = (data, index) => {
        const { meter } = this.props.projectCheck;
        if(meter.meterDetail.data[index].initialReadingImgUrl){
            let arr = [];
            arr.push({
                filePath: meter.meterDetail.data[index].initialReadingImgUrl,
            }) 
            this.setState({images: arr});
            this.child.open();
        }else{
            Toast.info("没有读数照片");
        }
    }

    render() {
        const { tabsdata: data, meter } = this.props.projectCheck;
        const { index } = this.props;
        let text =  meter.statistics.map((item)=>{
            return <Text>{item.caliberName}:{item.count}支</Text>
        })
        const { widthArr } = this.state;
        const table1 = meter.table.unshift(head1);
        return (
            <View>
                {index == 1 &&
                    <List renderHeader="表节点验收">
                        <CusListItem extra={data[1].applyNo}>申请编号:</CusListItem>
                        <CusListItem extra={data[1].constructUnit}>施工单位:</CusListItem>
                        <CusListItem extra={data[1].constructManager}>施工负责人:</CusListItem>
                        <CusListItem extra={data[1].projectName}>工程名称:</CusListItem>
                        <CusListItem extra={data[1].projectAddress}>工程地址:</CusListItem>
                        <CusListItem extra={data[1].checkRemark}>验收申请说明:</CusListItem>
                        <CusListItem extra={text}>已安装水表清单:</CusListItem>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            {
                                meter.table && meter.table.length>0 && table1.map((rowData, index) => (
                                    <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={widthArr}
                                    style={[styles.row]}
                                    textStyle={styles.text}
                                    onPress={()=>{this.showPicture(rowData, index)}}
                                    />
                                ))
                            }
                        </Table>
                    </List>
                }
                {index == 2 &&
                    <List renderHeader="井室构筑物">
                        <CusListItem extra={data[2].applyNo}>申请编号:</CusListItem>
                        <CusListItem extra={data[2].applyDate}>申请日期:</CusListItem>
                        <CusListItem extra={data[2].projectName}>工程名称:</CusListItem>
                        <CusListItem extra={data[2].constructUnit}>施工单位:</CusListItem>
                        <CusListItem extra={data[2].constructWorker}>施工人员:</CusListItem>
                        <CusListItem extra={data[2].projectAddress}>工程地址:</CusListItem>
                        <CusListItem extra={data[2].startDate}>开工日期:</CusListItem>
                        <CusListItem extra={data[2].pileNo}>位置(桩号):</CusListItem>
                        <CusListItem extra={data[2].position}>地理位置:</CusListItem>
                        <CusListItem extra={data[2].pictureNo}>采用的标准图号:</CusListItem>
                        {
                            data[2].gjwList && data[2].gjwList.length>0 && data[2].gjwList.map((item)=>{
                                return(
                                    <View>
                                        <CusListItem extra={item.gjwName}>构筑物名称:</CusListItem>
                                        <CusListItem extra={item.count}>构筑物数量:</CusListItem>

                                    </View>
                                )
                            })
                        }
                        <CusListItem extra={data[2].djytz}>地基原土质:</CusListItem>
                        <CusListItem extra={data[2].number}>地基换土质:</CusListItem>
                        <CusListItem extra={data[2].djhtz}>地基换土质:</CusListItem>
                        <CusListItem extra={data[2].jingGaiType}>井座盖材质:</CusListItem>
                        <CusListItem extra={data[2].zhiDunSize}>支墩尺寸:</CusListItem>
                        <CusListItem extra={data[2].tongjingSize}>砼井圈或盖板型号及尺寸:</CusListItem>
                        <CusListItem extra={data[2].jskSize}>集水坑尺寸(mm):</CusListItem>
                        <CusListItem extra={data[2].material}>材质:</CusListItem>
                        <CusListItem extra={data[2].zhiDunMaterial}>支墩材料:</CusListItem>
                        <Item>砌体</Item>
                        <CusListItem extra={data[2].qitiVo.jingKong}>尺寸-净空(mm):</CusListItem>
                        <CusListItem extra={data[2].qitiVo.waiBi}>尺寸-外壁(mm):</CusListItem>
                        <CusListItem extra={data[2].qitiVo.chiCunHigh}>尺寸-高度(mm):</CusListItem>
                        <CusListItem extra={data[2].qitiVo.material}>材料:</CusListItem>
                        <CusListItem extra={data[2].qitiVo.moMian}>抹面:</CusListItem>
                        <CusListItem extra={data[2].qitiVo.paTi}>爬梯:</CusListItem>
                        <CusListItem extra={data[2].qitiVo.gaoChen}>高程(H):</CusListItem>
                    </List>
                }
                { index == 3 &&
                    <List renderHeader="安装工程">
                            <CusListItem extra={data[3].applyNo}>申请编号:</CusListItem>
                            <CusListItem extra={data[3].applyDate}>申请日期:</CusListItem>
                            <CusListItem extra={data[3].projectName}>工程名称:</CusListItem>
                            <CusListItem extra={data[3].constructUnit}>施工单位:</CusListItem>
                            <CusListItem extra={data[3].constructWorke}>施工人员:</CusListItem>
                            <CusListItem extra={data[3].projectAddress}>工程地址:</CusListItem>
                            <CusListItem extra={data[3].startDate}>开工日期:</CusListItem>
                            { gdVoList.length>0?<View>
                            <Item>管道情况</Item>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                {
                                    gdVoList && gdVoList.map((rowData, index) => (
                                        <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr2}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table></View>:null}
                    </List>
                }
                <ImageView onRef={this.onRef} images={this.state.images}></ImageView>
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
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1'},
    text: {
        margin: 10,
        textAlign: 'center'
    },
});
// export default CreditInfo;
function mapStateToProps(state) {
    const {formdata, projectCheck, index} = state;
    return {formdata, projectCheck, index}
}
export default connect(mapStateToProps)(Info);