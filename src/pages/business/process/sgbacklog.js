/**
 * 说明：施工手续待办
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ScrollView} from 'react-native';
import {WhiteSpace,List,InputItem, TextareaItem,DatePicker, Toast} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import SelectItem from '../../../component/select-item';
import moment from 'moment';

import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';
import { showFormError ,SystemInfo} from "../../../utils/index";



const Item = List.Item;




class Index extends React.Component{
 
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
            record:{},
            startTime:new Date(),
            endTime:new Date(),
            deptName:"",
            name:""
        }
    }
    componentDidMount(){
        
        this.props.navigation.setParams({
            navigatePress:this.submit
        })
        const {state:{params:{title}}} = this.props.navigation;
        const {dispatch} = this.props;
        const {state:{params}} = this.props.navigation;
        const user = SystemInfo.getUser();
        const userInfo = typeof user == 'string' ? JSON.parse(user):user; 
        this.setState({deptName:userInfo.deptName,name:userInfo.id})
       dispatch({type:'process/findWaitDealByTaskName',payload:{id:title}});
       dispatch({type:'process/queryUserByPage',payload:{deptId :userInfo.deptId,pageNum:1,pageSize:10000000}});
    }

    submit =()=>{
        const {form,dispatch} = this.props;
        const {state:{params:{title}}} = this.props.navigation;
        const {record} = this.state;
        const user = SystemInfo.getUser();
        const userInfo = typeof user == 'string' ? JSON.parse(user):user;  
        const {process:{userList}} = this.props;

        form.validateFields((error, values) => {
    
            if(record.key !=undefined){
                Toast.fail("请选择报装项目");
                return;
            }
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            if( moment(values.startTime,"YYYY-MM-DD").valueOf() > (moment(values.endTime,"YYYY-MM-DD")).valueOf() ){
                Toast.fail("开始时间要小于或者等于结束时间");
                return;
            }
            var agent = userList.find(item=>item.value == values.agentId);
            values.installId  = record.installId ;
            values.waitId = record.id;
            values.deptId = userInfo.deptId;
            values.id = userInfo.id;
            values.name = userInfo.name;
            values.agentName = agent.label;
            values.installNo = record.installNo;
            values.startTime = moment(values.startTime).format("YYYY-MM-DD");
            values.endTime = moment(values.endTime).format("YYYY-MM-DD");

        
            dispatch({
                type: `process/procedureAgentApply`,
                payload:values
            })
        })
    }
   


    onChangeBz=(value)=>{
        const {process:{bzOriginalList}} = this.props;
        const obj = bzOriginalList && bzOriginalList.find(item => item.id == value);
        if(obj){
            this.setState({record:obj});
        }
    }
    onChangeStartTime =(date)=>{
      this.setState({startTime:date})
    }
    onChangeEndTime =(date)=>{
        this.setState({endTime:date})
      }

    onChangeAddr=(value)=>{
        if(value){
            this.setState({address:value.address});
        }
        
    }
    onChangeAgentName =(value,label)=>{
    }
    render(){
        const {state:{params:{title}}} = this.props.navigation;
        const {form,process:{bzSelectList,userList}} = this.props;

        const {record,deptName,name,startTime,endTime} = this.state;
        const {getFieldDecorator} = form;
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
           <List>
                      {
                        getFieldDecorator('needReport',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择结果上报'}
                            ]
                        })(
                            <SelectItem data={bzSelectList} labelNumber="5" onChange={this.onChangeBz} placeholderTextColor="#999" >报装项目:</SelectItem>
                        )
                    }
                     </List>
            <Text style={styles.title}>报装系统基本信息</Text>
            <List >
                <Item>
                <Text style={styles.label}>{`项目名称:${record.projectName!=undefined ?record.projectName:'' }`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`单位名称:${record.unitName!=undefined ?record.unitName:""}`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`用水地址:${record.waterAddress!=undefined?record.waterAddress:"" }`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`经办人:${record.managerName!=undefined?record.managerName:"" }`}</Text>
                </Item>
                <Item>
                <Text style={styles.label}>{`联系方式:${record.managerContact!=undefined ?record.managerContact:""}`}</Text>
                </Item> 
               
               
            </List>
            <List>
            <Text style={styles.title}>手续代办申请信息</Text>
            {
                        getFieldDecorator('procedureAgentName',{
                            validateFirst: true,
                            initialValue:deptName,
                            rules:[
                                {required:true, message:'请输入手续名称'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={{fontSize:scaleSize(text_font_size)}} placeholderTextColor="#999" placeholder="请输入">
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>手续名称:</Text>
                            </View>
                            </InputItem>
                        )
                    }
            </List>
            <List>
            {
                            getFieldDecorator('startTime',{
                                validateFirst: true,
                                initialValue:startTime,
                                rules:[
                                    {required:true, message:'请选择预计开始'}
                                ]
                            })(
                                <DatePicker
                                style={{fontSize:scaleSize(text_font_size)}}
                                  // value={this.state.value}
                                  minDate={new Date()}
                                  mode="date"
                                  onChange={this.onChangeStartTime}
                                  format="YYYY-MM-DD"
                                >
                                  <Item arrow="horizontal"><Text style={styles.label}><Text style={styles.require}>*</Text>预计开始:</Text></Item>
                                </DatePicker>
                            )
                        }
            </List>
            <List>
            {
                            getFieldDecorator('endTime',{
                                validateFirst: true,
                                initialValue:endTime,
                                rules:[
                                    {required:true, message:'请选择预计结束'}
                                ]
                            })(
                                <DatePicker
                                style={{fontSize:scaleSize(text_font_size)}}
                                  // value={this.state.value}
                                  minDate={new Date()}
                                  mode="date"
                                  onChange={this.onChangeEndTime}
                                  format="YYYY-MM-DD"
                                >
                                  <Item arrow="horizontal"><Text style={styles.label}><Text style={styles.require}>*</Text>预计结束:</Text></Item>
                                </DatePicker>
                            )
                        }
            </List>
            <List>
            {
                        getFieldDecorator('agentId',{
                            validateFirst: true,
                            initialValue:name,
                            rules:[
                                {required:true, message:'请输入办理人员'}
                            ]
                        })(
                              <SelectItem require={true} data={userList} labelNumber="5" onChange={this.onChangeAgentName} placeholderTextColor="#999" ><Text style={styles.label}>办理人员:</Text></SelectItem>
                        )
                    }
            </List>
            <List>
            {
                        getFieldDecorator('contact',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入联系方式'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={{fontSize:scaleSize(text_font_size)}} placeholderTextColor="#999" placeholder="请输入">
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>联系方式:</Text>
                            </View>
                            </InputItem>
                        )
                    }
            </List>
        
            <List style={styles.wrap}>
                      <List.Item>
                          <Text style={styles.label}><Text style={styles.require}>*</Text>手续待办说明: </Text></List.Item>
                      {
                        getFieldDecorator('procedureAgentDesc',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入手续待办说明'}
                            ]
                        })(
                            <TextareaItem labelNumber="6"  placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入手续待办说明" count={150} ></TextareaItem>
                        )
                    }
                  </List>
          
                
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
    },
    require:{
        color:"#ff5151"
    }
    
});

function mapStateToProps(state) {
    const {process,amap,index} = state;
    return {process,amap,index}
}
const FormPatrol = createForm()(Index);

export default connect(mapStateToProps)(FormPatrol);
