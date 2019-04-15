import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem,Toast} from '@ant-design/react-native';
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import AddrItem from '../../../component/addr-item';
import SelectItem from '../../../component/select-item';
import ImageItem from '../../../component/image-item';
// import InputItems from '../../../component/input-item';
import { connect } from '../../../utils/dva';
import {hasErrors, showFormError} from '../../../utils'
import {SystemInfo} from "../../../utils/index";

const consultTypes=[{value:0,label:"一类资信度"},{value:1,label:"二类资信度"}];
 class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params?navigation.state.params.title:null,
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(28)}}>保存</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state={
            files:[],
        }
    }
    componentDidMount(){

        this.props.navigation.setParams({
            title:'新增薪信度',
            navigatePress:this.submit
        })
        const {dispatch} = this.props;

        dispatch({
            type: `salary/queryConfigParams`,
            params:{className:'营销单位'}
        })
    }
    changeImage =(images)=>{
    
        this.setState({files:images});
    }
    submit=()=>{
        const {form,dispatch} = this.props;

        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            
            const user = SystemInfo.getUser();
            values.reportUserId  = user.id;

            dispatch({
                type: `salary/save`,
                params:values
            })
        })
    }
    render() {
        const {form,salary:{reportUnits}} = this.props;
        const {getFieldDecorator} = form;
        return (
            <ScrollView style={styles.projectPage}>
                <List style={styles.wrap}>
                    {
                        getFieldDecorator('clientName',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入客户名称'}
                            ]
                        })(
                            <InputItem  labelNumber="5" placeholderTextColor="#999" placeholder="请输入">客户名称:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('levelClass',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择资信度等级'}
                            ]
                        })(
                            <SelectItem data={consultTypes}>资信度等级:</SelectItem>
                        )
                    }
                    {
                        getFieldDecorator('reportUnit',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择上报单位'}
                            ]
                        })(
                            // <InputItem labelNumber="5" placeholderTextColor="#999"  placeholder="请输入">上报单位:</InputItem>
                            <SelectItem data={reportUnits}>上报单位:</SelectItem>
                        )
                    }
                     <List.Item>附件选择:
                    {
                        getFieldDecorator('files',{
                            validateFirst: true,
                          
                        })(
                            <ImageItem onChange={this.changeImage} labelNumber="5" ></ImageItem>
                        )
                    }
                    </List.Item>
                </List>
                <List style={styles.desc}>
                    <List.Item>问题描述:</List.Item>

                    {
                        getFieldDecorator('proDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入你要咨询的内容'}
                            ]
                        })(
                            <TextareaItem labelNumber="4" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要咨询的内容" count={150} ></TextareaItem>
                        )
                    }
                    
                
                </List>
                <List style={styles.desc}>
                <List.Item>等级设定说明: </List.Item>
                {
                        getFieldDecorator('levelDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入你要咨询的内容'}
                            ]
                        })(
                            <TextareaItem labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要咨询的内容" count={150} ></TextareaItem>
                        )
                    }
                </List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    wrap:{
        fontSize: scaleSize(16),
    },
    input: {
        height: scaleSize(103),
        fontSize: scaleSize(16),
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6
    },
    desc:{
        marginTop:10,
    }
});

function mapStateToProps(state) {
    const {salary,index} = state;
    return {salary,index}
}
const FormSalary = createForm()(Index);

export default connect(mapStateToProps)(FormSalary);