import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, FlatList, TouchableOpacity, Image } from 'react-native';
import {createForm} from 'rc-form';
import moment from "moment";
import { connect } from '../../../utils/dva';
import {List, InputItem, Tabs, WingBlank} from '@ant-design/react-native';
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import { textFontSize } from '../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/*
智能检索结果
梁丽
2019/04/09
*/
const tabs = [
    { title: '历史咨询' },
    { title: '历史报装' },
    { title: '资信度' },
    { title: '投诉/服务' },
]
class Search extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '智能检索结果'),
            
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 1,
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({search: this.search});
        const info = navigation.state.params.info;
        console.log("info---------",info);
        const params = {
            name: info,
        }
        dispatch({
            type: `baozhuang/intelligentRetrieval`,
            params,
        })
    }
    _renderItem= (data,index)=> {//自定义的渲染组件
        const { isChecked, key } = this.state;
        let item = data.item;
        return (
        <View style={[styles.list ]}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{this.toDetails(item)}}>
                <View >
                    {index === 0?
                    <Text style={styles.project}>{item.userName}</Text>:
                    index === 1?
                    <Text style={styles.project}>{item.projectName}</Text>:
                    <Text style={styles.project}>{moment(item.reportTime).format("YYYY-MM-DD")}</Text>
                    }
                </View>
                <View style={styles.info}>
                    <View>
                        {index === 0?
                        <View><Text style={[textFontSize(),styles.texts]}>咨询问题:{item.problemDescription}</Text>
                        <Text style={[textFontSize(),styles.texts]}>回复内容：{item.replyContent}</Text></View>:
                        index === 1?
                        <View><Text style={[textFontSize(),styles.texts]}>经办人:{item.managerName}</Text>
                        <Text style={[textFontSize(),styles.texts]}>经办人电话:{item.managerContact}</Text></View>:
                        
                        <View><Text style={[textFontSize(),styles.texts]}>资信度等级:{item.levelDesc}</Text>
                        <Text style={[textFontSize(),styles.texts]}>内容描述:{item.proDesc}</Text></View>
                        }
                    </View>
                    {/* <View style={styles.btns}>
                        <Image style={{width:20,height:20}} resizeMode="contain" source={require("../../../images/return_3.png")}/>
                    </View> */}
                </View>
            </TouchableOpacity>
      
        </View>)
    
    };
    changeTabs =(data,index) => {
        console.log("tabs--------",data,index);
        this.setState({activeTab: index})
    }
    renderText = (text) => {
        return(
            <View style={styles.noData}>
                <Text>{text}</Text>
            </View>
        )
    }
    render() {
    	
        const { activeTab } = this.state;
        const { ZNData } = this.props.baozhuang;
        return (
	            <View style={styles.projectPage}>
	                <Tabs tabs={tabs} onChange={this.changeTabs} page={activeTab}>
						<View style={styles.view}>
                            {ZNData.consultation && ZNData.consultation.length >0?
                            <FlatList
                                style={{ backgroundColor: '#EBEEF5'}}
                                data={ZNData.consultation?ZNData.consultation:[]}
                                renderItem={(data) => this._renderItem(data,0)}
                            />:this.renderText('未检测到该用户存在历史咨询')}
						</View>
						<View style={styles.view}>
                            {ZNData.installReportRecord && ZNData.installReportRecord.length>0?
                            <FlatList
                                style={{ backgroundColor: '#EBEEF5'}}
                                data={ZNData.installReportRecord?ZNData.installReportRecord:[]}
                                renderItem={(data) => this._renderItem(data,1)}
                            />:this.renderText('未检测到该用户存在历史报装')}
						</View>
						<View style={styles.view}>
                        {ZNData.creditReview && ZNData.creditReview.length>0?
                            <FlatList
                                style={{ backgroundColor: '#EBEEF5'}}
                                data={ZNData.creditReview?ZNData.creditReview:[]}
                                renderItem={(data) => this._renderItem(data,2)}
                            />:this.renderText('未检测到该用户存在资信度')}
						</View>
						<View style={styles.view}>
                        {ZNData.complainService && ZNData.complainService.length>0?
                            <FlatList
                                style={{ backgroundColor: '#EBEEF5'}}
                                data={ZNData.complainService?ZNData.complainService:[]}
                                renderItem={(data) => this._renderItem(data,3)}
                            />:this.renderText('未检测到该用户存在投诉/服务')}
						</View>
			        </Tabs>
		        </View>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        flex: 1,
        color: '#333',
    },
    view: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   height: 150,
      backgroundColor: '#fff',
    },
    list:{
        marginTop:10,
   
        backgroundColor: '#fff',
        paddingLeft:10
    },
    info:{
        flex:1,
        justifyContent:"space-between",
        flexDirection:"row",
        paddingBottom:10
    },

    project:{
        fontSize: scaleSize(32),
        color:"#000033",
        borderBottomWidth:1,
        borderColor:'#dddddd',
        paddingTop:10,
        paddingBottom:10,
       
    },
    btns:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        fontSize:scaleSize(32),
        alignItems:'center'
    },
    texts:{
        color: '#999'
    },
    noData: {
        // flex: 1,
        padding: 20,
        justifyContent:"center",
        flexDirection:"row",
        alignItems:'center',
        backgroundColor: '#EBEEF5'
    }
});

function mapStateToProps(state) {
    const {baozhuang, configParams, index} = state;
    return {baozhuang, configParams, index}
}
export default connect(mapStateToProps)(Search);