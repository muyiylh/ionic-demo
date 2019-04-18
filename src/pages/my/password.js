import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem,Toast,WhiteSpace} from '@ant-design/react-native';
import {deviceWidth, scaleSize} from '../../utils/ScreenUtil';
import AddrItem from '../../component/addr-item';
import SelectItem from '../../component/select-item';
import ImageItem from '../../component/image-item';
import Button from './../../component/button';//
import { connect } from '../../utils/dva';
import {hasErrors, showFormError} from '../../utils'
import {SystemInfo} from "../../utils/index";
import md5 from 'react-native-md5';

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
            title:'密码修改',
            navigatePress:this.submit
        })
    }

    submit=()=>{
        const {form,dispatch,login} = this.props;

        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }
            if(values.pwd !=values.confirmPwd){
                Toast.fail("两次密码输入不一致");
                return;
            }
            if(login.user && login.user.id){
                values.id= login.user.id;
            }else{
                let user = SystemInfo.getUser();
                user = typeof user =='string' ? JSON.parse(user):user;
                values.id= user.id;
            }
            values.privateKey = values.pwd;
            values.pwd = md5.hex_md5(values.pwd);
            values.oldPwd = md5.hex_md5(values.oldPwd);
            dispatch({
                type: `my/updatePwd`,
                params:values
            })
        })
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <ScrollView style={styles.projectPage}>
                <List style={styles.wrap}>
                    {
                        getFieldDecorator('oldPwd',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入原始\密码'},
                                
                            ]
                        })(
                            <InputItem type="password"  labelNumber="5" placeholderTextColor="#999" placeholder="请输入">原密码:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('pwd',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入新密码'},
                                {min:8, message:'密码最少6位'}
                            ],
                       
                            
                        })(
                            <InputItem type="password" labelNumber="5" placeholderTextColor="#999" placeholder="请输入">新密码:</InputItem>
                        )
                    }
                    {
                        getFieldDecorator('confirmPwd',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请输入密码'},
                                {min:8, message:'密码最少6位'}
                            ]
                        })(
                            <InputItem type="password"  labelNumber="5" placeholderTextColor="#999" placeholder="请输入">确认密码:</InputItem>
                        )
                    }
                 
                </List>
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
    const {my,login} = state;
    return {my,login}
}
const FormSalary = createForm()(Index);

export default connect(mapStateToProps)(FormSalary);