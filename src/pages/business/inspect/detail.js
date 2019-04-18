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


const Item = List.Item;
const reportTypes=[{label:'需要上报',value:1},{label:'不需要上报',value:0}];



class Detail extends React.Component{
 
    static navigationOptions = ({ navigation }) => {
    
        return {
            title:"项目详细信息",
           
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
        console.log("componentDidMount params:,",params)
        dispatch({type:'business/getFormDataByInstallNo',params:{id:params.id}});
       // dispatch({type:'business/getDeptForTree'});

    }

   

    render(){
       
        const {form,business:{record}} = this.props;
        const {state:{params}} = this.props.navigation;
        console.log("record:",record);
        return (
            <ScrollView
            style={{  backgroundColor: '#EBEEF5' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>水表巡检总体结果</Text>
            <List >
                {/* <Item>
                {`开始巡检时间:${conList.startDate?moment(conList.startDate).format('YYYY-MM-DD HH:mm:ss'):""}`}
                </Item>
                <Item>
                {`结束巡检时间:${conList.lastDate?moment(conList.lastDate).format('YYYY-MM-DD HH:mm:ss'):""}`}
                </Item>
                <Item>
                {`巡检周期用时:${conList.spendTime}`}
                </Item>
                <Item>
                {`巡检周期用时:${conList.spendTime}`}
                </Item>
                <Item>
                {`巡检总数:${conList.total}`}
                </Item>
                <Item>
                {`正常:${conList.qualified}`}
                </Item>
                <Item>
                {`正常率:${conList.total}`}
                </Item>
                <Item>
                {`异常:${conList.unqualified}`}
                </Item>
                <Item>
                {`异常率:${conList.unqualified}`}
                </Item>
                <Item>
                {`未巡检:${conList.notResult}`}
                </Item>
                */}
            </List>
         
            {/* <Text style={styles.title}>水表巡检总体结论</Text>
            <List style={styles.wrap}>
                      <List.Item>总体结论: </List.Item>
                      {
                        getFieldDecorator('explain',{
                            validateFirst: true,
                            rules:[
                                 {required:true, message:'请输入结论'}
                            ]
                        })(
                            <TextareaItem labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入结论" count={150} ></TextareaItem>
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
               </View>} */}
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
        marginHorizontal:6
    },
    title:{
        backgroundColor:"#EBEEF5",
        color:"#999",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        fontSize:scaleSize(28)
    }
    
});

function mapStateToProps(state) {
    const {business} = state;
    return {business}
}
const FormPatrol = createForm()(Detail);

export default connect(mapStateToProps)(FormPatrol);
