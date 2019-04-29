import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem,Toast,WhiteSpace} from '@ant-design/react-native';
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import AddrItem from '../../../component/addr-item';
import SelectItem from '../../../component/select-item';
import ImageItem from '../../../component/image-item';
 import CusInputItems from '../../../component/input-item';
import { connect } from '../../../utils/dva';
import {hasErrors, showFormError} from '../../../utils'
import {SystemInfo} from "../../../utils/index";
import {text_font_size} from '../../../utils/theme';
const consultTypes=[{value:0,label:"一类资信度"},{value:1,label:"二类资信度"}];
 class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(30)}}>保存</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state={
            files:[],
            name:""
        }
    }
    componentDidMount(){

        this.props.navigation.setParams({
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
            // console.log("values-------",values);
            // dispatch({
            //     type: `salary/save`,
            //     params:values
            // })
        })
    }
    onChangeName =(value)=>{
        this.setState({name:value})
    }
    render() {
        const {form,salary:{reportUnits}} = this.props;
        const {getFieldDecorator} = form;
        return (
            <ScrollView style={styles.projectPage}>
            <WhiteSpace />
                <List style={styles.wrap}>
                    {
                        getFieldDecorator('clientName',{
                            validateFirst: true,
                           // initialValue:this.state.name,
                            rules:[
                                {required:true, message:'请输入客户名称'}
                            ]
                        })(
                            <InputItem style={styles.inputInfo}  labelNumber="5" placeholderTextColor="#999" placeholder="请输入">
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.require}>*</Text>
                                <Text style={styles.label}>客户名称:</Text>
                                </View>
                            </InputItem>
                            // <CusInputItems require="true" >客户名称: </CusInputItems>
                            )
                    }
                    {
                        getFieldDecorator('levelClass',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请选择资信度等级'}
                            ]
                        })(
                            <SelectItem require="true" data={consultTypes}>资信度等级:</SelectItem>
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
                            <SelectItem require="true" data={reportUnits}>上报单位:</SelectItem>
                        )
                    }
                     <List.Item><Text style={styles.label}>附件选择:</Text>
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
                    <List.Item style={styles.inputInfo}>
                
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.require}>*</Text>
                        <Text style={styles.label}>问题描述:</Text>
                    </View>
                    </List.Item>

                    {
                        getFieldDecorator('proDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入问题'}
                            ]
                        })(
                            <TextareaItem labelNumber="4" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要咨询的内容" count={150} ></TextareaItem>
                        )
                    }
                    
                
                </List>
                <List style={styles.desc}>
                <List.Item style={styles.inputInfo}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.require}>*</Text>
                        <Text style={styles.label}>等级设定说明:</Text>
                    </View>
                </List.Item>
                {
                        getFieldDecorator('levelDesc',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入等级设定说明'}
                            ]
                        })(
                            <TextareaItem style={styles.inputInfo} labelNumber="6" placeholderTextColor="#999" style={styles.multilineInput} rows={8} placeholder="请输入你要咨询的内容" count={150} ></TextareaItem>
                        )
                    }
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    wrap:{
        fontSize: scaleSize(text_font_size),
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize: scaleSize(text_font_size),
    },
    desc:{
        marginTop:10,
    },
    inputInfo: {
  
        fontSize: scaleSize(text_font_size),
        
  
    },
    label:{
        fontSize: scaleSize(text_font_size),
        color:"#333"
    },
    require:{
        color:"#ff5151"
    }
});

function mapStateToProps(state) {
    const {salary,index} = state;
    return {salary,index}
}
const FormSalary = createForm()(Index);

export default connect(mapStateToProps)(FormSalary);