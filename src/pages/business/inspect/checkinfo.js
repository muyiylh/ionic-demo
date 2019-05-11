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

import ImageItem from '../../../component/image-item';
import SelectTree from '../../../component/select-tree';
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';

import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';


const Item = List.Item;



const conclusion =[{label:'检查合格',value:"0"},{label:'检查不合格',value:"1"}];
const checkComTypes =[{label:'完成',value:"0"},{label:'未完成',value:"1"}];
class InputPlan extends React.Component{
 
    static navigationOptions = ({ navigation }) => {
        return {
             //右边的按钮
             headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(text_font_size)}}>保存</Text>
                </TouchableHighlight>
            ),
        };
        
    }
    constructor(props) {
        super(props)
        this.state={
            date : new Date(),
            result:"",//检查结论 0 :检查合格 1:检查不合格
            fileList:[],//上传文件
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({
            navigatePress:this.submit
        })
        const {dispatch} = this.props;
        dispatch({type:'business/getDeptForTree'});
    }
    submit =()=>{
        const {form,dispatch} = this.props;
        const {fileList,result} = this.props;
        const {state:{params}} = this.props.navigation;
        
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            if(result == 1){
                if(!params.checkInfo || !params.checkInfo.id){
                    showFormError("请选择整改部门");
                    return;
                }
            }
          
            values.checkListDetailsId  = params.id;
            values.fileId  = fileList;
            values.reviewTime  = moment(values.reviewTime).format("YYYY-MM-DD");
           values.planId = params.planId;
            dispatch({
                type: `business/createReviewRecord`,
                params:values
            })
        })
    }
   
    onPress = (item) => {
       // NavigationUtil.navigate("MyConsultDetail",{consult: item})
    };
    onChangeDate= value =>{
      
        this.setState({date:value});
    }
    changeImage =(images)=>{
        this.setState({fileList:images});
    }
    onChangeCon = (value)=>{
    
        this.setState({result:value});
    }
    render(){
        const {state:{params}} = this.props.navigation;
        const {form,business:{deptTree}} = this.props;
        const {getFieldDecorator} = form;
       // const deptTree = []; NavigationUtil.navigate("busInspectInput",{id: item.installNo})
        const returnParam = {url:'busInspectInput',payload:{id:params.installNo}};
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
       
       <WhiteSpace />
            <List style={styles.wrap}>
                    {
                        getFieldDecorator('reviewName',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入检查人'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={{fontSize:scaleSize(text_font_size)}} placeholderTextColor="#999" placeholder="请输入">
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>检查人:</Text>
                            </View>
                            </InputItem>
                        )
                    }
                    {
                        getFieldDecorator('reviewTime',{
                            validateFirst: true,
                            initialValue:this.state.date,
                            rules:[
                                {required:true, message:'请选择检查日期日期'}
                            ]
                        })(
                            <DatePicker
                            mode="date"
                            onChange={this.onChangeDate}
                            format="YYYY-MM-DD"
                          >
                            <List.Item arrow="horizontal">
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>检查日期:</Text>
                            </View>
                            </List.Item>
                          </DatePicker>
                        )
                    }
                   
                  
                      <List.Item>

                      <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>检查内容: </Text>
                            </View>
                      </List.Item>
                      {
                        getFieldDecorator('reviewContent',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入检查内容'}
                            ]
                        })(
                            <TextareaItem labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入检查内容" count={150} ></TextareaItem>

                        )
                    }
                      <List.Item>
                      <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>现场情况:</Text>
                            </View>
                      </List.Item>
                      {
                        getFieldDecorator('liveSituation',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入现场情况'}
                            ]
                        })(
                            <TextareaItem labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要沟通的内容" count={150} ></TextareaItem>

                        )
                    }
                   
                      {
                        getFieldDecorator('result',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择检查结论'}
                            ]
                        })(
                            <SelectItem data={conclusion} require={true} labelNumber="5" onChange={this.onChangeCon} placeholderTextColor="#999" >检查结论:</SelectItem>
                        )
                    }
                 
                      {
                        getFieldDecorator('isComplete',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择检查完成'}
                            ]
                        })(
                            <SelectItem data={checkComTypes} require={true} labelNumber="5"  placeholderTextColor="#999" >检查完成:
                   
                            </SelectItem>
                        )
                    }
                      <List.Item>
                        <View style={{flexDirection:"row"}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>文件上传:</Text>
                            </View>
                        
                          
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                          
                        })(
                            <ImageItem onChange={this.changeImage} labelNumber="5" ></ImageItem>
                        )
                    }
                        </List.Item>  
                   {this.state.result == 1 && <View>
                     <List.Item>
                     <View style={{flexDirection:"row"}}>
                     <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>整改要求:</Text>
                            </View>

                     </List.Item>
                      {
                        getFieldDecorator('modifyRequest',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入沟通内容'}
                            ]
                        })(
                            <TextareaItem labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要沟通的内容" count={150} ></TextareaItem>

                        )
                    }
                    
                  
                     {
                        getFieldDecorator('modifyDeptId',{
                            validateFirst: true,
                            initialValue:params.checkInfo && params.checkInfo.id ? params.checkInfo.id:"",
                            rules:[
                                {required:true, message:'请选择整改部门'}
                            ]
                        })(
                             <SelectTree data={deptTree} extra={params.checkInfo&&params.checkInfo.name?params.checkInfo.name:"请选择"} returnData={returnParam} title="整改部门" labelNumber="5" >
                               上报部门:
                             </SelectTree>
                        )
                    }
                   </View>}
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
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
        color:'#333',
        fontSize:scaleSize(text_font_size)
    },
    require:{
        color:"#ff5151"
    }
    
});

function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormTrack = createForm()(InputPlan);

export default connect(mapStateToProps)(FormTrack);
