import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button ,FlatList, RefreshControl,
    ActivityIndicator,Image, TouchableOpacity} from 'react-native';
const DATA = [
    {project:"一类资信度领导审核",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'YLZXDLDSH',id: '15679'},
    {project:"管道复核领导人审核",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'GDFHLDSC', id: '13305'},
    {project:"管道复核建设指挥部审核",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'ZSZHB', id: "13305"},
    {project:"设计文件确认",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'DDCBMLDSH', id: "17847"},
    {project:"设计文件修改领导审核",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'DDMBMLDSH', id: "17850"},
    {project:"设计文件修改设计部门领导审核",time:"2019-01-10 12:39:23",user:"12233",nodeFlag:'SJDWMLDSH', id: "17850"},
];
/*
审批
梁丽
2019-04-13
 */
class Index extends Component {
    static navigationOptions = {
    };
    constructor(props) {
        super(props);
        this.state = {
            dataArray: DATA//初始数据
        }
    }
    //点击每一项去不同的业务
    toDetails =(data) => {
        const { navigate } = this.props.navigation;
        switch(data.nodeFlag){
            case 'YLZXDLDSH'://一类资信度领导审核
                navigate('department_credit',{info:data});break;
            case 'GDFHLDSC'://管道复核领导审核
                navigate('leaderCheck_pipeLine',{info:data});break;
            case 'ZSZHB'://管道复核建设指挥部审核
                navigate('buildCheck_pipeLine',{info:data});break;
            case 'DDCBMLDSH'://设计文件确认---领导审核
                navigate('DesignFileCheck',{info:data});break;
            case 'DDMBMLDSH'://设计文件修改---领导审核
                navigate('DesignFileCheck',{info:data});break;
            case 'SJDWMLDSH'://设计文件修改---设计部门审核
                navigate('DesignFileCheck',{info:data});break;
            case 'JNGCK'://缴纳工程款
                navigate('chargeView');break;
            case 'GCSG'://施工管理
                navigate('constructionManage');break;
            case 'JGGD'://竣工归档
                navigate('completion');break;
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
                         <Text style={styles.texts}>发起人{item.user}</Text>
                         <Text style={styles.texts}>发起时间{item.time}</Text>
                     </View>
                     <View style={styles.btns}>
                         <Text style={styles.fs}>去审核</Text>
                         <Image style={{width:20,height:20}} resizeMode="contain" source={require("../../../images/return_3.png")}/>
                    </View>
                </View>
           
        </View></TouchableOpacity>
    };
    render() {
        return (
            <View style={styles.projectPage}>
                <FlatList
                style={{ backgroundColor: '#EBEEF5'}}
                data={this.state.dataArray}
                renderItem={(data) => this._renderItem(data)}
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
});

export default Index;