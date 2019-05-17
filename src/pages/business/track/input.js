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
import moment from 'moment';
import NavigationUtil from '../../../utils/NavigationUtil';
import {queryPlanDetail} from '../../../services/BusinessService';
import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';
const Item = List.Item;




class InputPlan extends React.Component{
 
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
            date : new Date(),
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({
            navigatePress:this.submit
        })
    }
    submit =()=>{
        const {form,dispatch} = this.props;
        const {state:{params:{consult}}} = this.props.navigation;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            values.planId = consult.planId;
            values.recordId  = consult.recordId;
            values.traceAt  = moment(values.traceAt).format("YYYY-MM-DD");
            dispatch({
                type: `business/createTraceRecord`,
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

    render(){
        const {state:{params:{consult}}} = this.props.navigation;
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>客户基础信息</Text>
            <List >
                <Item>
                <Text style={styles.info}>{`客户名称:${consult.unitName}`}</Text>
                </Item>
                <Item wrap>
      
                <Text style={styles.info}>{`单位地址:${consult.unitAddress}`}</Text>
                </Item>
                <Item wrap>
                <Text style={styles.info}>{`经办人:${consult.principalName}`}</Text>
                </Item>
                <Item wrap>
                <Text style={styles.info}>{`联系电话:${consult.principalContact}`}</Text>
                </Item>
            </List>
         
            <Text style={styles.title}>跟踪信息录入</Text>
            <List style={styles.wrap}>
                    {
                        getFieldDecorator('traceBy',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入跟踪人员'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={styles.label} placeholderTextColor="#999" placeholder="请输入">
                             <View style={{flexDirection:'row'}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>跟踪人员:</Text>
                            </View>
                            </InputItem>
                        )
                    }
                    {
                        getFieldDecorator('traceAt',{
                            validateFirst: true,
                            initialValue:this.state.date,
                            rules:[
                                {required:true, message:'请选择跟踪日期'}
                            ]
                        })(
                            <DatePicker
                            mode="date"
                            minDate={new Date()}
                            onChange={this.onChangeDate}
                            format="YYYY-MM-DD"
                            style={styles.text}
                          >
                            <List.Item >
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>跟踪日期:</Text>
                            </View>
                            </List.Item>
                          </DatePicker>
                        )
                    }
                    {
                        getFieldDecorator('clientName',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入客户姓名'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={styles.text} placeholderTextColor="#999" placeholder="请输入">
                         
                                <Text style={styles.label}>客户姓名:</Text>
                        
                            </InputItem>

                        )
                    }
                    {
                        getFieldDecorator('communicationMode',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入沟通方式'}
                            ]
                        })(
                            <InputItem  labelNumber="5" style={styles.text} placeholderTextColor="#999" placeholder="请输入">
                            <Text style={styles.label}>沟通方式:</Text>
                            </InputItem>
                        )
                    }
                  
                      <List.Item>

                      <Text style={styles.label}>沟通内容:</Text>
                      </List.Item>
                      {
                        getFieldDecorator('communicationContent',{
                            validateFirst: true,
                            rules:[
                                // {required:true, message:'请输入沟通内容'}
                            ]
                        })(
                            <TextareaItem labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要沟通的内容" count={150} ></TextareaItem>

                        )
                    }
                </List>

                <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
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
    info:{
        fontSize:scaleSize(text_font_size)
    },
    text:{
        fontSize: scaleSize(text_font_size),
    }
    ,
    label:{
        fontSize: scaleSize(text_font_size),
        color:"#333"
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
