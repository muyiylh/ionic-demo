/**
 * 说明：
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ScrollView} from 'react-native';
import {ListView, Icon,Button,WhiteSpace,List,InputItem, TextareaItem,DatePicker} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import SelectItem from '../../../component/select-item';
import SelectTree from '../../../component/select-tree';
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {queryPlanDetail} from '../../../services/BusinessService';
import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';

const Item = List.Item;
const reportTypes=[{label:'需要上报',value:1},{label:'不需要上报',value:0}];



class Result extends React.Component{
 
    static navigationOptions = ({ navigation }) => {
    
        return {
             //右边的按钮
             headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(30)}}>保存</Text>
                </TouchableHighlight>
            ),
        };
        
    }
    constructor(props) {
        super(props)
        this.state={
            type:-1,//是否上报
        }
    }
    componentDidMount(){
        
        this.props.navigation.setParams({
            navigatePress:this.submit
        })
        const {dispatch} = this.props;
        const {state:{params}} = this.props.navigation;
     
        dispatch({type:'business/queryResult',params:{planId:params.planId}});
        dispatch({type:'business/getDeptForTree'});

    }
    componentWillReceiveProps(nextProps){
        if(this.props.navigation.state.params != nextProps.navigation.state.params &&  nextProps.navigation.state.params.checkInfo){
            const {dispatch} = this.props;
            const {id} =  nextProps.navigation.state.params.checkInfo;
         
            dispatch({type:"business/queryUserByPage",params:{deptId:id,pageNum:1,pageSize:1000}});
        }
    }
    submit =()=>{
        const {form,dispatch} = this.props;
        const {state:{params}} = this.props.navigation;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            values.planId = params.planId;
         
            dispatch({
                type: `business/saveReport`,
                params:values
            })
        })
    }
   
    onPress = (item) => {
       // NavigationUtil.navigate("MyConsultDetail",{consult: item})
    };

    onChangeReport=(value)=>{
      //  console.log("value",value)
        this.setState({type:value});
    }
    render(){
       
        const {form,business:{conList,deptTree,userList}} = this.props;
        const {state:{params}} = this.props.navigation;
        const {getFieldDecorator} = form;
        const returnParam = {url:'busPatrolPlanResult',payload:{planId:params.planId}};
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>水表巡检总体结果</Text>
            <List >
                <Item>
                <Text style={styles.label}>{`开始巡检时间:${conList.startDate?moment(conList.startDate).format('YYYY-MM-DD HH:mm:ss'):""}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`结束巡检时间:${conList.lastDate?moment(conList.lastDate).format('YYYY-MM-DD HH:mm:ss'):""}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`巡检周期用时:${conList.spendTime}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`巡检周期用时:${conList.spendTime}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`巡检总数:${conList.total}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`正常:${conList.qualified}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`正常率:${conList.total}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`异常:${conList.unqualified}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`异常率:${conList.unqualified}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`未巡检:${conList.notResult}`}</Text>
                </Item>
               
            </List>
         
            <Text style={styles.title}>水表巡检总体结论</Text>
            <List style={styles.wrap}>
                      <List.Item>
                          <Text style={styles.label}>总体结论: </Text></List.Item>
                      {
                        getFieldDecorator('explain',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入结论'}
                            ]
                        })(
                            <TextareaItem labelNumber="6"  placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入结论" count={150} ></TextareaItem>
                        )
                    }
                  </List>
                  <List>
                      {
                        getFieldDecorator('needReport',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择结果上报'}
                            ]
                        })(
                            <SelectItem data={reportTypes} labelNumber="5" onChange={this.onChangeReport} placeholderTextColor="#999" >结果上报:</SelectItem>
                        )
                    }
                     </List>
                     {this.state.type==1 && <View>
                     <List>
                     {
                        getFieldDecorator('depart',{
                            validateFirst: true,
                            initialValue:params.checkInfo && params.checkInfo.id ? params.checkInfo.id:"",
                            rules:[
                                {required:true, message:'请选择上报部门'}
                            ]
                        })(
                             <SelectTree data={deptTree} extra={params.checkInfo&&params.checkInfo.name?params.checkInfo.name:"请选择"} returnData={returnParam} title="上报部门" labelNumber="5" >上报部门:</SelectTree>
                        )
                    }
                    </List>
                    <List>
                     {
                        getFieldDecorator('reportTo',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请接收人员'}
                            ]
                        })(
                            <SelectItem data={userList} labelNumber="5" placeholderTextColor="#999" placeholder="请输入">接收人员:</SelectItem>
                        )
                    }
               </List>
               </View>}
               <WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    wrap:{
        //backgroundColor:"#EBEEF5"
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize:scaleSize(text_font_size)
    },
  
    title:{
        backgroundColor:"#EBEEF5",
        color:"#999",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        fontSize:scaleSize(text_font_size)
    },
    label:{
        fontSize:scaleSize(text_font_size),
        color:"#333"
    }
    
});

function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormPatrol = createForm()(Result);

export default connect(mapStateToProps)(FormPatrol);
