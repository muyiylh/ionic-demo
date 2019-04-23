import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button ,FlatList, RefreshControl,
    ActivityIndicator,Image, TouchableOpacity} from 'react-native';
import { connect } from '../../utils/dva';
import moment from "moment";
import {deviceWidth, scaleSize} from '../../utils/ScreenUtil';
import List from './../../component/module/list';
/**
 * 待办
 * 2019/04/18
 * 梁丽
 */
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,//初始化的状态，此时加载状态为不加载
            // dataArray: DATA//初始数据
        }
    }
    componentDidMount() {
        // const info = this.props.navigation.state.params.info;
        const { data } = this.props.backlog;
        this.getList(true);
    }
    getList = (refreshing) => {//是否是下拉刷新，
        const { dispatch } = this.props;
        const { data } = this.props.backlog;
        dispatch({
            type: `backlog/nomalDeal`,
            params: {refreshing}
        }).then(()=>{
            if(refreshing){
                this.setState({
                    isLoading: false,//把加载状态设置为不加载（即加载结束）
                });
            }
        })
    }
    loadData=(refreshing)=>{//根据传入数据判断是上拉还是下拉
        if (refreshing) {//下拉
            this.setState({
                isLoading: true//设置state为正在加载
            },()=>{
                this.getList(refreshing);
            });
        }else{//上拉
            this.getList(refreshing);
        }
    };
    //点击每一项去不同的业务
    toDetails =(data) => {
        const { navigate } = this.props.navigation;
        switch(data.nodeFlag){
            case 'ZXHF'://咨询回复
                // navigate('advisory', { user: 'Lucy' })
                navigate('advisory',{info:data});break;
            case 'BZSL'://报装受理
                navigate('baozhuang',{info:data});break;
            case 'EXPLORE'://现场踏勘
                navigate('siteSurvey',{info:data});break;
            case 'GCSJ'://工程设计
                navigate('engineerDesign',{info:data});break;
            case 'BUDGETJS'://预算编制
                navigate('budgeting',{info:data});break;
            case 'SGHTQDJS'://施工合同签订
                navigate('construction',{info:data});break;
            case 'JNGCKJS'://缴纳工程款
                navigate('chargeView',{info:data});break;
            case 'GCSGJS'://施工管理
                navigate('constructionManage',{info:data});break;
            case 'TSJS'://通水
                navigate('connectedWater',{info:data});break;
            case 'SBJSJS'://水表接收
                navigate('WaterMeterReceive',{info:data});break;
            case 'JGGDJS'://竣工归档
                navigate('completion',{info:data});break;
            case 'BUDGETBZ'://预算编制
                navigate('budgeting',{info:data});break;
            case 'SGHTQDJBZ'://施工合同签订
                navigate('construction',{info:data});break;
            case 'JNGCKBZ'://缴纳工程款
                navigate('chargeView',{info:data});break;
            case 'GCSGBZ'://施工管理
                navigate('constructionManage',{info:data});break;
            case 'TSBZ'://通水
                navigate('connectedWater',{info:data});break;
            case 'SBJSBZ'://水表接收
                navigate('WaterMeterReceive',{info:data});break;
            case 'JGGDBZ'://竣工归档
                navigate('completion',{info:data});break;
        }
    }
    _renderItem= (data)=> {//自定义的渲染组件
   var item = data.item;
        return <TouchableOpacity activeOpacity={1} onPress={()=>{this.toDetails(item)}}><View style={styles.list}>
        <View >
            {item.nodeFlag == "ZXHF" || item.nodeFlag == "BZSL"?<Text style={styles.project}>{item.taskName}</Text>
            :<Text style={styles.project}>{item.taskName}-{item.installNo}</Text>}
        </View>
      
            <View style={styles.info}>
                <View>
                    {item.nodeFlag == "ZXHF" || item.nodeFlag == "BZSL"?null:<Text style={styles.texts}>项目名称:{item.projectName}</Text>}
                    <Text style={styles.texts}>{item.nameDesc}:{item.name}</Text>
                    <Text style={styles.texts}>{item.timeDesc}:{moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</Text>
                </View>
                <View style={styles.btns}>
                    <Text style={styles.fs}>处理</Text>
                    <Image style={{width:20,height:20}} resizeMode="contain" source={require("../../images/return_3.png")}/>
                </View>
            </View>
      
    </View></TouchableOpacity>
    };
    genIndicator= ()=>{ //底部加载(一个圆圈)
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                color={'red'}
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>
    };

    render() {
        const { data, loading } = this.props.backlog;
        const { isLoading } = this.state;
        // console.log("isLoading---------",isLoading);
        return (
            <View style={styles.projectPage}>
            <FlatList
                style={{ backgroundColor: '#EBEEF5'}}
                //1:数据的获取和渲染
                data={data.data}
                renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                // refreshing={this.state.isLoading}
                // onRefresh={() => {
                //     this.loadData();
                // }}
                //2:自定义的下拉刷新
                // refreshControl={        //为控制listView下拉刷新的属性  用于自定义下拉图标设置
                //     <RefreshControl         //这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。
                //         title={'Loading'}
                //         colors={['red']}//android的刷新图标颜色
                //         tintColor={'orange'}//ios的刷新图标颜色
                //         titleColor={'red'}//标题的颜色
                //         refreshing={this.state.isLoading}//判断是否正在刷新
                //         // refreshing={loading}//判断是否正在刷新
                //         onRefresh={() => {                  //触动刷新的方法
                //             this.loadData(true)//加载数据(带参数)
                //         }}
                //     />
                // }
                refreshing={this.state.isLoading}//判断是否正在刷新
                // refreshing={loading}//判断是否正在刷新
                onRefresh={() => {                  //触动刷新的方法
                    this.loadData(true)//加载数据(带参数)
                }}
                onEndReachedThreshold={0.1}
                onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                    this.loadData()//加载数据（不带参数）
                }}

                //3:自定义的上拉加载数据
            //    ListFooterComponent={() => this.genIndicator()}//上拉加载更多的时候调用自定义的加载图标，一般为一个loading的圆圈（ActivityIndicator）
            //     onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
            //         this.loadData()//加载数据（不带参数）
            //     }}
            />
        </View>

        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
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
    texts:{
        fontSize:scaleSize(30),
        color:"#999999",
      

    },
    container: {
        flex: 1,
    },
    btns:{
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
    // indicator: {
    //     color: 'red',
    //     margin: 10
    // }

});
function mapStateToProps(state) {
    const {backlog, index} = state;
    return {backlog, index}
}
export default connect(mapStateToProps)(Project);
