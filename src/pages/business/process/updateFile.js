/**
 * 说明：文件修改文件
 * 创建人：ylh
 * 创建时间：2019/4/17
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,TouchableHighlight,ScrollView} from 'react-native';
import {ListView, Icon,Button,WhiteSpace,List,InputItem, TextareaItem,DatePicker, Toast} from '@ant-design/react-native';
import {scaleSize} from "../../../utils/ScreenUtil";
import SelectItem from '../../../component/select-item';
import AddrItem from '../../../component/addr-item';
import moment from 'moment';

import {AMAP_POI_LOCATION_REQ} from "../../../constants/ActionTypes";

import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';
import { showFormError } from "../../../utils/index";


const Item = List.Item;



class updateFile extends React.Component{
 
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
        }
    }
    componentDidMount(){
        
        this.props.navigation.setParams({
            navigatePress:this.submit
        })
        const {state:{params:{title}}} = this.props.navigation;
        const {dispatch} = this.props;
        const {state:{params}} = this.props.navigation;
     
       dispatch({type:'process/findWaitDealByTaskName',payload:{id:title}});
    }

    submit =()=>{
        const {form,dispatch} = this.props;
        const {state:{params:{title}}} = this.props.navigation;
        const {record} = this.state;
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
            values.applyDate = moment(values.applyDate).format("YYYY-MM-DD");
         
            dispatch({
                type: `process/startFile`,
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
      //  console.log("date:",date);
      this.setState({date})
    }
     //点击地图
     onMapClick = (param) => {
        const {dispatch} = this.props;
        dispatch({type: `amap/${AMAP_POI_LOCATION_REQ}`,param})
    };
    render(){
        const {state:{params:{title}}} = this.props.navigation;
        const {form,process:{bzSelectList}} = this.props;
        const {amap:{pois, loading}} = this.props;
        const {record} = this.state;
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
            <Text style={styles.title}>设计文档修改信息</Text>
            {
                        getFieldDecorator('projectName',{
                            validateFirst: true,
                            initialValue:record.projectName !=undefined ? record.projectName:"",
                            rules:[
                                {required:true, message:'请输入项目名称'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={{fontSize:scaleSize(text_font_size)}} placeholderTextColor="#999" placeholder="请输入">
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>项目名称:</Text>
                            </View>
                            </InputItem>
                        )
                    }
            </List>
            <List>
            {
                        getFieldDecorator('constructionAddress',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择施工地址'}
                            ]
                        })(
                            <AddrItem 
                            extra='地图选择'
                            pois={pois}
                            center={{latitude: 30.67,longitude: 104.07}}
                            onMapClick={this.onMapClick}
                            loading={loading}
                            required>
                            施工地址:
                            </AddrItem>
                        )
                    }
            </List>
            <List>
            {
                        getFieldDecorator('applyUser',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入申请人'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={{fontSize:scaleSize(text_font_size)}} placeholderTextColor="#999" placeholder="请输入">
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>申请人:</Text>
                            </View>
                            </InputItem>
                        )
                    }
            </List>
            <List>
            {
                            getFieldDecorator('applyDate',{
                                validateFirst: true,
                                initialValue:this.state.date,
                                rules:[
                                    {required:true, message:'请在选择申请日期'}
                                ]
                            })(
                                <DatePicker
                                style={{fontSize:scaleSize(text_font_size)}}
                                  // value={this.state.value}
                                  minDate={new Date()}
                                  mode="date"
                                  onChange={this.onChangeDate}
                                  format="YYYY-MM-DD"
                                >
                                  <Item arrow="horizontal"><Text style={styles.label}><Text style={styles.require}>*</Text>申请时间:</Text></Item>
                                </DatePicker>
                            )
                        }
            </List>
            <List>
                      {
                        getFieldDecorator('influenceBudget',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择是否会影响预算'}
                            ]
                        })(
                            <SelectItem data={[{value:1,label:"会影响预算"},{value:0,label:"不会影响预算"}]} labelNumber="5"  placeholderTextColor="#999" ><Text style={styles.label}><Text style={styles.require}>*</Text>影响预算:</Text></SelectItem>
                        )
                    }
                     </List>
            <List style={styles.wrap}>
                      <List.Item>
                          <Text style={styles.label}><Text style={styles.require}>*</Text>原因说明: </Text></List.Item>
                      {
                        getFieldDecorator('description',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入原因说明'}
                            ]
                        })(
                            <TextareaItem labelNumber="6"  placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入原因说明" count={150} ></TextareaItem>
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
const FormPatrol = createForm()(updateFile);

export default connect(mapStateToProps)(FormPatrol);
