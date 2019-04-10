import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button ,FlatList, RefreshControl,
    ActivityIndicator,Image, TouchableOpacity} from 'react-native';

import List from './../../component/module/list';


const DATA = [{project:"咨询回复",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'ZXHF'},

{project:"报装受理",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'BZSL'},
{project:"现场踏勘",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'XCTK'},
{project:"工程设计",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'GCSJ'},
{project:"预算编制",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'YSBZ'},
{project:"施工合同签订",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'SGHTQD'},
{project:"缴纳工程款",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'JNGCK'},
{project:"工程施工",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'GCSG'},
{project:"通水",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'TS'},
{project:"水表接收",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'SBJS'},
{project:"竣工归档",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'JGGD'},
];
export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,//初始化的状态，此时加载状态为不加载
            dataArray: DATA//初始数据
        }
    }
    loadData=(refreshing)=>{//根据传入数据判断是上拉还是下拉
        if (refreshing) {
            this.setState({
                isLoading: true//设置state为正在加载
            });
        }
        setTimeout(() => {
            let dataArray = [];
            if (refreshing) { //如果是下拉，把城市名反转
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {    //如果上拉，添加数据
                dataArray = this.state.dataArray.concat("我是底部新加的");
            }

            this.setState({
                dataArray: dataArray,//把数据重置为最新
                isLoading: false,//把加载状态设置为不加载（即加载结束）
            })
        }, 2000);
    };
    //点击每一项去不同的业务
    toDetails =(data) => {
        const { navigate } = this.props.navigation;
        switch(data.nodeFlag){
            case 'ZXHF'://咨询回复
                // navigate('advisory', { user: 'Lucy' })
                navigate('advisory');break;
            case 'BZSL'://报装受理
                navigate('baozhuang');break;
            case 'XCTK'://现场踏勘
                navigate('siteSurvey');break;
            case 'GCSJ'://工程设计
                navigate('engineerDesign');break;
            case 'YSBZ'://预算编制
                navigate('budgeting');break;
            case 'SGHTQD'://施工合同签订
                navigate('construction');break;
            case 'JNGCK'://缴纳工程款
                navigate('chargeView');break;
        }
    }
    _renderItem= (data)=> {//自定义的渲染组件
   //console.log("data:",data);
   var item = data.item;
        return <TouchableOpacity activeOpacity={1} onPress={()=>{this.toDetails(item)}}><View style={styles.list}>
        <View >
            <Text style={styles.project}>{item.project}</Text>
        </View>
      
            <View style={styles.info}>
                <View>
                    <Text style={styles.texts}>咨询时间：{item.time}</Text>
                    <Text style={styles.texts}>咨询人：{item.user}</Text>
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
        return (
            <View style={styles.projectPage}>
            <FlatList
                style={{ backgroundColor: '#EBEEF5'}}
                //1:数据的获取和渲染
                data={this.state.dataArray}
                renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                // refreshing={this.state.isLoading}
                // onRefresh={() => {
                //     this.loadData();
                // }}
                //2:自定义的下拉刷新
                refreshControl={        //为控制listView下拉刷新的属性  用于自定义下拉图标设置
                    <RefreshControl         //这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。
                        title={'Loading'}
                        colors={['red']}//android的刷新图标颜色
                        tintColor={'orange'}//ios的刷新图标颜色
                        titleColor={'red'}//标题的颜色
                        refreshing={this.state.isLoading}//判断是否正在刷新
                        // onRefresh={() => {                  //触动刷新的方法
                        //     this.loadData(true)//加载数据(带参数)
                        // }}
                    />
                }

                //3:自定义的上拉加载数据
               // ListFooterComponent={() => this.genIndicator()}//上拉加载更多的时候调用自定义的加载图标，一般为一个loading的圆圈（ActivityIndicator）
                // onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                //     this.loadData()//加载数据（不带参数）
                // }}
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
        fontSize:20,
        color:"#000033",
        borderBottomWidth:1,
        borderColor:'#dddddd',
        paddingTop:10,
        paddingBottom:10,
       
    },
    texts:{
        fontSize:18,
        color:"#999999",
      

    },
    container: {
        flex: 1,
    },
    btns:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        fontSize:24,
        alignItems:'center'
    },
    fs:{
        fontSize:18,
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