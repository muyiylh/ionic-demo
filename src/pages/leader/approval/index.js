import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button ,FlatList, RefreshControl,
    ActivityIndicator,Image, TouchableOpacity} from 'react-native';
import { connect } from '../../../utils/dva';
import moment from "moment";
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';

/**
* 审批
* 梁丽
* 2019-04-13
 */
class Index extends Component {
    static navigationOptions = {
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false//
        }
    }
    componentDidMount() {
        this.getList(true);
    }
    getList = (refreshing) => {//是否是下拉刷新，
        const { dispatch } = this.props;
        dispatch({
            type: `approval/subProcessDeal`,
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
            const { approval: { data} } = this.props;
            if(data.page.total > data.page.pageNum * data.page.pageSize){//表示还有数据需要加载
                this.getList(refreshing);
            }
        }
    };
    //点击每一项去不同的业务
    toDetails =(data) => {
        const { navigate } = this.props.navigation;
        switch(data.nodeFlag){
            case 'BMLDSH1'://一类资信度--领导审核
                navigate('department_credit',{info:data});break;
            case 'BMLDSH2'://二类资信度---领导审核
                navigate('department_credit',{info:data});break;
            case 'BMSJLDSH1'://一类---部门上级领导审核
                navigate('department_credit',{info:data});break;
            case 'FGFZSH1'://一类---分管副总审核
                navigate('department_credit',{info:data});break;
            case 'ZJLSH1'://一类---总经理审核
                navigate('department_credit',{info:data});break;
            case 'BMLDSH'://资信度处置---部门领导审核
                navigate('department_credit',{info:data});break;
            case 'FGFZSH'://资信度处置---分管副总审核
                navigate('department_credit',{info:data});break;
            case 'ZJLSH'://资信度处置---总经理审核
                navigate('department_credit',{info:data});break;
            case 'GDFHLDSH'://管道复核领导审核
                navigate('leaderCheck_pipeLine',{info:data});break;
            case 'GDFHJSZHBSH'://管道复核建设指挥部审核
                navigate('buildCheck_pipeLine',{info:data});break;
            case 'CYLDSH'://测压申请--领导审核
                navigate('PressureTestCheck',{info:data});break;
            case 'DDCBMLDSH'://设计文件确认---领导审核
                navigate('DesignFileCheck',{info:data});break;
            case 'DDMBMLDSH'://设计文件修改---领导审核
                navigate('DesignFileCheck',{info:data});break;
            case 'SJDWLDSH'://设计文件修改---设计部门审核
                navigate('DesignFileCheck',{info:data});break;
            case 'SXDBLDSH'://手续代办--领导审核
                navigate('ProcedureWaitCheck',{info:data});break;
            case 'FZRSH'://客户撤销--负责人审核
                navigate('RevokeCheck',{info: data});break;
            case 'BMLDRSH'://客户暂停---领导审核
                navigate('PauseCheck',{info: data});break;
            case 'BMSH'://异常处置----部门领导审核
                navigate('ExceptionLeaderCheck',{info:data});break;
            case 'CZBMSH'://异常处置----处置部门领导审核
                navigate('ExceptionLeaderCheck',{info:data});break;
            case 'GWXSSH'://工程验收---管网单位审核
                navigate('ProjectCheck',{info:data});break;
            case 'JOIN_BMLDSH'://在线会签-----第二步领导审核
                navigate('CountersignCheck',{info:data});break;
            case 'JOIN__CHILD_BMJBRSH'://在线会签-----部门经办人审核
                navigate('CountersignCheck',{info:data});break;
            case 'JOIN__CHILD_BMLDSH'://在线会签-----部门领导人审核
                navigate('CountersignCheck',{info:data});break;
            case 'JOIN_ZHBMYJSH'://在线会签-----综合部门意见并审核
                navigate('CountersignCheck',{info:data});break;
            case 'JOIN_GLBMSH'://在线会签-----管理部门审核
                navigate('CountersignCheck',{info:data});break;
        }
    }
    _renderItem= (data)=> {//自定义的渲染组件
        //console.log("data:",data);
        var item = data.item;
             return <TouchableOpacity activeOpacity={1} onPress={()=>{this.toDetails(item)}}><View style={styles.list}>
             <View >
                 <Text style={styles.project}>{item.taskName}</Text>
             </View>
           
                 <View style={styles.info}>
                     <View>
                         <Text style={styles.texts}>发起人:{item.createName}</Text>
                         <Text style={styles.texts}>发起时间:{moment(item.beginTime).format("YYYY-MM-DD HH:mm:ss")}</Text>
                     </View>
                     <View style={styles.btns}>
                         {/* <Text style={styles.fs}>去审核</Text> */}
                         <Image style={{width:20,height:20}} resizeMode="contain" source={require("../../../images/return_3.png")}/>
                    </View>
                </View>
           
        </View></TouchableOpacity>
    };
    render() {
        const { approval : { data } } = this.props;
        return (
            <View style={styles.projectPage}>
                <FlatList
                style={{ backgroundColor: '#EBEEF5'}}
                data={data.data}
                renderItem={(data) => this._renderItem(data)}
                refreshing={this.state.isLoading}//判断是否正在刷新
                onRefresh={() => {                  //触动刷新的方法
                    this.loadData(true)//加载数据(带参数)
                }}
                onEndReachedThreshold={0.1}
                onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                    this.loadData(false)//加载数据（不带参数）
                }}

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
});

function mapStateToProps(state) {
    const {approval, index} = state;
    return {approval, index}
}
export default connect(mapStateToProps)(Index);