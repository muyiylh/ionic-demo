/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight} from 'react-native';
import {ListView, Icon} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {getPlan} from '../../../services/BusinessService';
import { connect } from '../../../utils/dva';
import {createForm} from 'rc-form';
import ImageView from '../../../component/image-view';
import {text_font_size} from '../../../utils/theme';
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
            fileList:[]
        }
    }
    componentDidMount(){

        this.props.navigation.setParams({
            navigatePress:this.link
        })
    
    }
    link =() =>{
        const {state:{params:{id}}} = this.props.navigation;
        NavigationUtil.navigate("busPatrolPlanResult",{planId: id})
    }
    onFetch =  async (
        page = 1,
        startFetch,
        abortFetch
    ) => {
        try {
            let pageLimit = 10;
            const {state:{params:{id}}} = this.props.navigation;
            const {status, data, message} = await getPlan({planId:id,pageNum:page,pageSize:pageLimit});

            if(status == 0){
                startFetch(data.data, pageLimit);
            }else{
                startFetch([],pageLimit);
            }
        } catch (err) {
            abortFetch();
        }
    };
    onPress = (item) => {
        NavigationUtil.navigate("busPlanList",{id: item.planId})
    };
    //
  
    onRef = (ref) => {
        this.child = ref
    }
    onChangeStatus =(item,result)=>{
        const {state:{params:{id}}} = this.props.navigation;
        const {dispatch} = this.props;
        const params = {planId:id,constructId:item.constructId,result:result};
        dispatch({type:'business/qualified',params:params}).then(()=>{
            this.onFetch();
        });

    }
    open = (data) => {
        this.setState({fileList:data.fileList},()=>{
            this.child.open();
        })
    }
    renderItem = (item) => {
        return (
            <View style={styles.consultItem}>

                    <View>
                        <Text style={styles.title}>所属项目: {item.projectName}</Text>
                        <Text style={styles.title}>水表类型: {item.meterTypeName}</Text>
                        <Text style={styles.title}>水表类别: {item.meterCategoryName}</Text>
                        <Text style={styles.title}>初始读数: {item.initialReading}</Text>
                        <Text style={styles.title}>安装地址: {item.installAddress}</Text>
                        <Text style={styles.title}>水表口径: {item.meterCaliberName}</Text>
                        <Text style={styles.title}>条码号: {item.barCode}</Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                                <Text style={styles.title} >读数照片: </Text>
                                <Text style={[styles.title,{color:"#45CBE6"}]} onPress={()=>this.open(item)}>查看 </Text>
                        </View>
                        
                        <Text style={styles.title}>用水地址: {item.waterAddress}</Text>

                        {item.result== null && <View style={{flex:1,flexDirection:'row'}}>
                            <Text style={styles.btn} onPress={()=>{this.onChangeStatus(item,0)}}>正常</Text>
                            <Text style={styles.btn}  onPress={()=>{this.onChangeStatus(item,1)}}>异常</Text>
                        </View>}
                        {item.result==0 &&  <Text style={styles.title}>巡检结果: 正常(已巡检)</Text>}
                        {item.result==1 &&  <Text style={styles.title}>巡检结果: 异常(已巡检)</Text>}
                       
                       
                    </View>
                   
            </View>
        );
    };

    render(){
        return (
            <View style={styles.wrap}>

                <ListView
              
              onFetch={this.onFetch}
              keyExtractor={(item, index) =>index
              }
              renderItem={this.renderItem}
              numColumns={1}
          />
           <ImageView onRef={this.onRef} images={this.state.fileList}></ImageView>
            </View>
         
        )
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