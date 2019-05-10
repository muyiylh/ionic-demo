/**
 * 说明：施工手续待办-异常处理流程
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ScrollView} from 'react-native';
import {WhiteSpace,List,InputItem, TextareaItem,DatePicker, Toast} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import SelectItem from '../../../component/select-item';
import SelectTree from '../../../component/select-tree';
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
            date:new Date(),
        
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
        const userInfo = SystemInfo.getUser();
        this.setState({deptName:userInfo.deptName,name:userInfo.id})
       dispatch({type:'process/findWaitDealByTaskName',payload:{id:title}});
       dispatch({type:'business/getDeptForTree'});
    }

    submit =()=>{
        const {form,dispatch} = this.props;
        const {state:{params}} = this.props.navigation;
        const {record} = this.state;
        const userInfo = SystemInfo.getUser();   
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
      
           
            values.installId  = record.installId ;
            values.waitId = record.id;
            if(params.checkInfo){
                values.applyDept =  params.checkInfo.name; 
                values.applyDeptId = params.checkInfo.id;
            }else{
                values.applyDept =  userInfo.deptName; 
                values.applyDeptId = userInfo.deptId;
            }
         
            values.installNo = record.installNo;
            values.applyDate  = moment(values.applyDate).format("YYYY-MM-DD");
   
            dispatch({
                type: `process/ReportPauseStart`,
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

    onChangeDate =(date)=>{

        this.setState({date:date})
      }

    onChangeAgentName =(value,label)=>{
        // console.log("value",value);
        // console.log("label:",label);
    }
    render(){
        const {state:{params}} = this.props.navigation;
        const {form,process:{bzSelectList,userList},business:{deptTree}} = this.props;
        const returnParam = {url:'busSGException',payload:{title:params.title}};
        const {record,deptName,date} = this.state;
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
            <Text style={styles.title}>报装异常申请信息</Text>
            {
                        getFieldDecorator('applyDept',{
                            validateFirst: true,
                            initialValue:deptName,
                            rules:[
                                {required:true, message:'请选择业务部门'}
                            ]
                        })(
                            <SelectTree required data={deptTree} extra={params.checkInfo&&params.checkInfo.name?params.checkInfo.name:deptName} returnData={returnParam} title="整改部门" labelNumber="5" >
                            上报部门:
                          </SelectTree>
                        )
                    }
            </List>
      
            <List>
            {
                            getFieldDecorator('applyDate',{
                                validateFirst: true,
                                initialValue:date,
                                rules:[
                                    {required:true, message:'申请日期'}
                                ]
                            })(
                                <DatePicker
                                style={{fontSize:scaleSize(text_font_size)}}
                                  // value={this.state.value}
                                  mode="date"
                                  onChange={this.onChangeDate}
                                  format="YYYY-MM-DD"
                                >
                                  <Item arrow="horizontal"><Text style={styles.label}><Text style={styles.require}>*</Text>申请日期:</Text></Item>
                                </DatePicker>
                            )
                        }
            </List>
        
          
        
            <List style={styles.wrap}>
                      <List.Item>
                          <Text style={styles.label}><Text style={styles.require}>*</Text>异常说明: </Text></List.Item>
                      {
                        getFieldDecorator('reason',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入异常说明'}
                            ]
                        })(
                            <TextareaItem labelNumber="6"  placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入异常说明" count={150} ></TextareaItem>
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
    const {process,business} = state;
    return {process,business}
}
const FormPatrol = createForm()(Index);

export default connect(mapStateToProps)(FormPatrol);
