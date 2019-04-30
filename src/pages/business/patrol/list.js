/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ActivityIndicator,FlatList} from 'react-native';
import {ListView, Icon} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {getPlan} from '../../../services/BusinessService';
import { connect } from '../../../utils/dva';
import {createForm} from 'rc-form';
import ImageView from '../../../component/image-view';
import {text_font_size} from '../../../utils/theme';

let pageNo = 1;//当前第几页
let totalPage=5;//总的页数
let pageSize=10;//item的个数
var itemNo=0;
class PatrolList extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
     
            headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(30)}}>结论</Text>
                </TouchableHighlight>
            ),
        };
    }
    constructor(props){
        super(props);
        this.state={
            fileList:[],
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//下拉控制

        }
    }
    componentDidMount(){

        this.props.navigation.setParams({
            navigatePress:this.link
        })
        this.fetchData(pageNo);
    }
    fetchData(pageNo) {
        console.log("pageNo:",pageNo);
        const {dispatch} = this.props;
        var self = this;
        const {state:{params:{id}}} = this.props.navigation;
        dispatch({type:"business/getPlan",params:{planId:id,pageNum:pageNo,pageSize:pageSize}}).then(()=>{
            let data = self.props.business.planList;
            console.log("data:",data);
            let totalPage = data.total;
                    let dataBlob = [];
                    let i = itemNo;
    
                    data.data.map(function (item) {
                        dataBlob.push({
                            key: i,
                            value: item,
                        })
                        i++;
                    });
                    itemNo = i;
                    console.log("itemNo:"+itemNo);
                    let foot = 0;
                    if(pageNo>=totalPage){
                        foot = 1;//listView底部显示没有更多数据了
                    }
            this.setState({
                isLoading: false,
                showFoot:foot,
                dataArray:dataBlob,
                isRefreshing:false,
            })
        });
        // //这个是js的访问网络的方法
        // fetch(REQUEST_URL+pageNo)
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         let data = responseData.items;
        //         let dataBlob = [];
        //         let i = itemNo;

        //         data.map(function (item) {
        //             dataBlob.push({
        //                 key: i,
        //                 value: item,
        //             })
        //             i++;
        //         });
        //         itemNo = i;
        //         console.log("itemNo:"+itemNo);
        //         let foot = 0;
        //         if(pageNo>=totalPage){
        //             foot = 1;//listView底部显示没有更多数据了
        //         }

        //         this.setState({
        //             //复制数据源
        //             dataArray:this.state.dataArray.concat(dataBlob),
        //             isLoading: false,
        //             showFoot:foot,
        //             isRefreshing:false,
        //         });
        //         data = null;
        //         dataBlob = null;
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             error: true,
        //             errorInfo: error
        //         })
        //     })
        //     .done();
    }

 //加载等待页
 renderLoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                color='red'
                size="large"
            />
        </View>
    );
}

//加载失败view
renderErrorView() {
    return (
        <View style={styles.container}>
            <Text>
                Fail
            </Text>
        </View>
    );
}
onChangeStatus =(item,result)=>{
    const {state:{params:{id}}} = this.props.navigation;
    const {dispatch} = this.props;
    const params = {planId:id,constructId:item.constructId,result:result};
    dispatch({type:'business/qualified',params:params}).then(()=>{
        const {dataArray} =this.state
     //   console.log("dataArray:",dataArray);
        dataArray.map(d =>{
            if(d.value.id == item.id){
                d.value.result=result;
            }

        })
       this.setState({dataArray,dataArray})
        //this.onFetch();
    });

}
//返回itemView
_renderItemView({item}) {
  const self = this;
    return (
        <View style={styles.consultItem}>

        <View>
            <Text style={styles.title}>所属项目: {item.value.projectName}</Text>
            <Text style={styles.title}>水表类型: {item.value.meterTypeName}</Text>
            <Text style={styles.title}>水表类别: {item.value.meterCategoryName}</Text>
            <Text style={styles.title}>初始读数: {item.value.initialReading}</Text>
            <Text style={styles.title}>安装地址: {item.value.installAddress}</Text>
            <Text style={styles.title}>水表口径: {item.value.meterCaliberName}</Text>
            <Text style={styles.title}>条码号: {item.value.barCode}</Text>
            <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={styles.title} >读数照片: </Text>
                    <Text style={[styles.title,{color:"#45CBE6"}]} onPress={()=>this.open(item.value)}>查看 </Text>
            </View>
            
            <Text style={styles.title}>用水地址: {item.value.waterAddress}</Text>

            {item.value.result== null && <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.btn} onPress={()=>{this.onChangeStatus(item.value,0)}}>正常</Text>
                <Text style={styles.btn}  onPress={()=>{this.onChangeStatus(item.value,1)}}>异常</Text>
            </View>}
            {item.value.result==0 &&  <Text style={styles.title}>巡检结果: 正常(已巡检)</Text>}
            {item.value.result==1 &&  <Text style={styles.title}>巡检结果: 异常(已巡检)</Text>}
           
           
        </View>
       
</View>
    );
}

renderData() {

    return (

        <FlatList
            data={this.state.dataArray}
            renderItem={this._renderItemView.bind(this)}
            ListFooterComponent={this._renderFooter.bind(this)}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={1}
            ItemSeparatorComponent={this._separator}
        />

    );
}

render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
        return this.renderLoadingView();
    } else if (this.state.error) {
        //请求失败view
        return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
}
_separator(){
    return <View style={{height:1,backgroundColor:'#999999'}}/>;
}
_renderFooter(){
    if (this.state.showFoot === 1) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:scaleSize(text_font_size),marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    } else if(this.state.showFoot === 2) {
        return (
            <View style={styles.footer}>
                <ActivityIndicator />
                <Text>正在加载更多数据...</Text>
            </View>
        );
    } else if(this.state.showFoot === 0){
        return (
            <View style={styles.footer}>
                <Text></Text>
            </View>
        );
    }
}

_onEndReached(){
    //如果是正在加载中或没有更多数据了，则返回
    if(this.state.showFoot != 0 ){
        return ;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if((pageNo!=1) && (pageNo>=totalPage)){
        return;
    } else {
        pageNo++;
    }
    //底部显示正在加载更多数据
    this.setState({showFoot:2});
    //获取数据
    this.fetchData( pageNo );
}


}
const styles = StyleSheet.create({
    wrap:{
        //backgroundColor:"#EBEEF5"
    },
    consultItem: {
        borderBottomColor: '#ddd',
        backgroundColor:'#fff',
        borderBottomWidth: 1,
        padding: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        color:'#333',
        fontSize:scaleSize(text_font_size),
        paddingBottom:6,
       
        
    },
    info:{
        fontSize:scaleSize(text_font_size),
       // color:'#333',
        paddingTop:3,
        paddingBottom:3
    },
    btn:{
        borderStyle:"solid",

        padding:4,
        paddingLeft:10,
        paddingRight:10,
        marginRight:10,
        borderRadius:5,
        fontSize:scaleSize(text_font_size),
        backgroundColor:'#45CBE6',
        color:'#fff'
    }
    
});


function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormPatro = createForm()(PatrolList);

export default connect(mapStateToProps)(FormPatro);