import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button ,FlatList, RefreshControl,
    ActivityIndicator,Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Tabs, WingBlank, Modal } from '@ant-design/react-native'
import CheckBox from 'react-native-check-box';
import { connect } from '../../../utils/dva';
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import { text_font_size } from '../../../utils/theme';
import {showFormError, filterConfig, textFontSize} from "../../../utils/index";
import moment from "moment";
/**
 * 待办
 * 2019/04/18
 * 梁丽
 */
const tabs =[
    {title: '户表(0)'},
    {title: '户表(非0)'},
    {title: '非户表'},
    {title: '监控表'},
]
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const installInfo = navigation.getParam("installInfo");
        return {
            title: navigation.getParam('otherParam', '水表接收'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={installInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>基础信息</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,//初始化的状态，此时加载状态为不加载
            key: 0,//当前tab页
            selected: [],
            isChecked: {},
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({installInfo: this.installInfo});
        this.onRefreshing();
    }
    //基础信息
    installInfo = () => {
        const { navigate } = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        navigate('InstallInfo',{info:info});
    }
    //刷新整个页面
    onRefreshing = () => {
        const { dispatch } = this.props;
        this.setState({selected: [], isChecked: {}});
        dispatch({
            type: `configParams/queryConfigParams`,
        }).then(()=>{
            const { configParams:{ data: configData } } = this.props;
            this.getList(true,1);
            this.getList(true,2);
            this.getList(true,3);
            this.getList(true,4);
        })
    }
    getList = (refreshing,index) => {//是否是下拉刷新，
        const { dispatch, navigation, configParams:{ data } } = this.props;
        const configData = filterConfig(data,'水表性质');
        const info = navigation.state.params.info;
        const params = {
            param: {
                installId: info.installId,
                multiStatus: [1,2,3],
                waitId: info.id,
            },
            index,
            refreshing,
        }
        if(index == 1){
            params.param.zeroInitReading = true;
            params.param.meterCategory = configData[0].value;
        }else if(index == 2){
            params.param.zeroInitReading = false;
            params.param.meterCategory = configData[0].value;
        }else if(index == 3){
            params.param.meterCategory = configData[1].value;
        }else if(index == 4){
            params.param.meterCategory = configData[2].value;
        }
        dispatch({
            type: `waterMeterReceive/list`,
            params,
        }).then(()=>{
            if(refreshing){
                this.setState({
                    isLoading: false,//把加载状态设置为不加载（即加载结束）
                });
            }
        })
    }
    loadData=(refreshing,index)=>{//根据传入数据判断是上拉还是下拉
        if (refreshing) {//下拉
            this.setState({
                isLoading: true//设置state为正在加载
            },()=>{
                this.getList(refreshing,index);
            });
        }else{//上拉
            this.getList(refreshing,index);
        }
    };
    //点击每一项去不同的业务
    toDetails =(data) => {
        let _that = this;
        const { navigate } = this.props.navigation;
        navigate('WaterMeterDetail',{
            refreshData: function () {
            _that.onRefreshing();//A页面的刷新方法
            },
            info: data,
        });
    }
    _renderItem= (data)=> {//自定义的渲染组件
        const { isChecked, key } = this.state;
        let item = data.item;
        let index = data.index;
        return (
        <View style={[styles.list,isChecked[item.id] && {borderColor: '#40b6ce',borderWidth:2} ]}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{this.selectCheckBox(item,index)}}>
                <View >
                    <Text style={styles.project}>{item.meterTypeName}</Text>
                    <CheckBox
                        style={styles.checkBox}
                        onClick={()=>{this.selectCheckBox(item,index);}}
                        isChecked={isChecked[item.id]}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={()=>{this.toDetails(item)}}>
                <View style={styles.info}>
                    <View>
                        <Text style={styles.texts}>水表口径:{item.meterCaliberName}</Text>
                        <Text style={styles.texts}>安装地址;{item.installAddress}</Text>
                    </View>
                    <View style={styles.btns}>
                        {/* <Text style={styles.fs}>处理</Text> */}
                        <Image style={{width:20,height:20}} resizeMode="contain" source={require("../../../images/return_3.png")}/>
                    </View>
                </View>
            </TouchableOpacity>
      
        </View>)
    
    };
    //复选框勾选
    selectCheckBox = (data,index) => {
        console.log("check-box--data-index",data,index);
        const { isChecked, selected, key } = this.state;
        const { waterMeterReceive: { HBdataZero, HBdataNoZero, FHBdata, JKBdata} } = this.props;
        let _isChecked = JSON.parse(JSON.stringify(isChecked));
        let _selected = [];
        if(_isChecked[data.id]){//已被选中
            _isChecked[data.id] = false;
        }else{//
            _isChecked[data.id] = true;
        }
        let DATA = HBdataZero.data.concat(HBdataNoZero.data,FHBdata.data,JKBdata.data);
        DATA.map((item,itemIndex)=>{
            if(_isChecked[item.id]){
                _selected.push(item);
            }
        });
        
        console.log("selected------",_selected,_isChecked)
        this.setState({selected: _selected, isChecked: _isChecked});
    }
    //批量接收
    receive = () => {
        const { dispatch,} = this.props;
        const { selected } = this.state;
        var arr = [];
        selected.map(function(item){
            arr.push(item.id);
        })
        const params = {
            ids:arr.join(","),
        }
        dispatch({
            type: `waterMeterReceive/handOver`,
            params,
        }).then(()=>{
            this.setState({selected:[],isChecked:{}});
            this.onRefreshing();
        })
        
    }

    //接收完成确认
    finish = () => {
        Modal.alert('完成接收', '完成后，系统将不在提供该业务环节的操作,本报装项目将进入竣工归档环节,是否确定完成了本业务环节的所有操作？', [
            {
              text: '取消',
              onPress: () => console.log('cancel'),
            //   style: 'cancel',
            },
            { text: '确认', onPress: () => this.finishOk() },
        ]);
        
    }
    //确认接收
    finishOk = () => {
        const { dispatch, navigation } = this.props;
        const info = navigation.state.params.info;
        const params = {
            id: info.installId,
            waitId: info.id,
        }
        dispatch({
            type:'waterMeterReceive/deal',
            params,
        })
    }
    //切换Tabs
    changeTabs = (data,key) => {
        console.log("changeTabs------",data,key);
        this.setState({key});
    }

    render() {
        const { HBdataZero, HBdataNoZero, FHBdata, JKBdata, loading } = this.props.waterMeterReceive;
        const { isLoading } = this.state;
        return (
            <View style={styles.projectPage}>
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={styles.buttonText} onPress={this.receive}>批量接收</Text>
                        <Text style={styles.buttonText} onPress={this.finish}>接收完成</Text>
                    </WingBlank>
                </View>
                <Tabs tabs={tabs} onChange={this.changeTabs}>
                    <View style={styles.style}>
                        <FlatList
                            //1:数据的获取和渲染
                            style={{ backgroundColor: '#EBEEF5'}}
                            data={HBdataZero.data}
                            renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                            refreshing={this.state.isLoading}//判断是否正在刷新
                            // refreshing={loading}//判断是否正在刷新
                            onRefresh={() => {                  //触动刷新的方法
                                this.loadData(true,1)//加载数据(带参数)
                            }}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                                this.loadData(false,1)//加载数据（不带参数）
                            }}
                        />
                    </View>
                    <View style={styles.style}>
                        <FlatList
                            style={{ backgroundColor: '#EBEEF5'}}
                            //1:数据的获取和渲染
                            data={HBdataNoZero.data}
                            renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                            refreshing={this.state.isLoading}//判断是否正在刷新
                            // refreshing={loading}//判断是否正在刷新
                            onRefresh={() => {                  //触动刷新的方法
                                this.loadData(true,2)//加载数据(带参数)
                            }}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                                this.loadData(false,2)//加载数据（不带参数）
                            }}
                        />
                    </View>
                    <View style={styles.style}>
                        <FlatList
                            //1:数据的获取和渲染
                            style={{ backgroundColor: '#EBEEF5'}}
                            data={FHBdata.data}
                            renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                            refreshing={this.state.isLoading}//判断是否正在刷新
                            // refreshing={loading}//判断是否正在刷新
                            onRefresh={() => {                  //触动刷新的方法
                                this.loadData(true,3)//加载数据(带参数)
                            }}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                                this.loadData(false,3)//加载数据（不带参数）
                            }}
                        />
                    </View>
                    <View style={styles.style}>
                        <FlatList
                            //1:数据的获取和渲染
                            style={{ backgroundColor: '#EBEEF5'}}
                            data={JKBdata.data}
                            renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                            refreshing={this.state.isLoading}//判断是否正在刷新
                            // refreshing={loading}//判断是否正在刷新
                            onRefresh={() => {                  //触动刷新的方法
                                this.loadData(true,4)//加载数据(带参数)
                            }}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                                this.loadData(false,4)//加载数据（不带参数）
                            }}
                        />
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
    },
    style: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // height: 150,
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
        fontSize: scaleSize(34),
        color:"#000033",
        borderBottomWidth:1,
        borderColor:'#dddddd',
        paddingTop:10,
        paddingBottom:10,
       
    },
    checkBox: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 30,
    },
    texts:{
        fontSize:scaleSize(text_font_size),
        color:"#999999",
      

    },
    container: {
        flex: 1,
    },
    btns:{
        paddingRight: 10,
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        fontSize:scaleSize(34),
        alignItems:'center'
    },
    fs:{
        fontSize:scaleSize(28),
        color:"#45cbe6"
    },
   
    indicatorContainer: {
        alignItems: 'center',
        backgroundColor: '#EBEEF5',
    },
    buttonText: {
        backgroundColor: '#ecf8fa',
        color: '#40b6ce',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
        color: '#40b6ce',
    },

});
function mapStateToProps(state) {
    const {waterMeterReceive, configParams, index} = state;
    return {waterMeterReceive, configParams, index}
}
export default connect(mapStateToProps)(Index);
