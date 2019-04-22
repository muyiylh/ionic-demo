import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text,View,AsyncStorage,ImageBackground,Image,TouchableHighlight ,TextInput} from 'react-native';
import { WhiteSpace, WingBlank ,List,Modal, Toast} from '@ant-design/react-native';

import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux';
import {SystemInfo} from "../../utils/index";
import NavigationUtil from "../../utils/NavigationUtil";
import {deviceHeight,deviceWidth, scaleSize} from "../../utils/ScreenUtil";
import BgImag from '../../images/BG.png';
import Avatar from '../../images/Headportrait.png';
import ListInfo from './../../component/module/list-info';
import Button from './../../component/button';
import { connect } from '../../utils/dva';
import { tsTypeLiteral } from '@babel/types';
import{text_font_size} from '../../utils/theme';
const Item = List.Item;
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
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
       // console.warn("props:",props);
        super(props)
        this.state={
            visible:false,
            textValue :"",// 需要修改的信息
            phone:"",//手机
            listPhone:"",
            email:"",//邮箱
            listEmail:"",
            username:"",//用户名
            listUsername:"",
            type:'phone',//phone:手机 ，name：用户名 pwd：密码 
            message:"",
        }
    }
    componentDidMount() {
        const {dispatch} = this.props;
        const self = this;
        this.props.navigation.setParams({
           
            navigatePress:this.submit
        })
 
        dispatch({type:'my/queryUserByToken'}).then(()=>{
            const {userInfo} = self.props.my;
           
            self.setState({phone:userInfo.phone,listPhone:userInfo.phone,email:userInfo.email,listEmail:userInfo.email,listUsername:userInfo.realName,username:userInfo.realName})
        })
    }
    submit =()=>{
        const {my:{userInfo},dispatch} = this.props;
        const {listPhone,listEmail,listUsername} = this.state;
        var param = {id:userInfo.id,phone:listPhone,email:listEmail,realName:listUsername};
        dispatch({type:'my/updateUserInfo',params:param});
    }
    onPressModal =(value)=>{
        this.setState({type:value,visible:true});
    }
    onClose =()=>{
        this.setState({visible:false,message:""});
    }
    onChange =(value)=>{
        const {type} = this.state;
        if(type=="phone"){
            this.setState({phone:value});
        }else if(type=="email"){
            this.setState({email:value});
        }else if(type=="name"){
            this.setState({username:value});
        }
       
    }
    onOk=()=>{
        const {type,phone,textValue,email,username} = this.state;
        var phoneRule=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(type =="phone" ){
            if(!phoneRule.test(phone)){
                this.setState({message:"手机号码输入错误"})
            }else{
                this.setState({listPhone:phone,message:"",visible:false});
            }
           
        }else if(type =="email"){
            var emailRule=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
            if(!emailRule.test(email)){
                this.setState({message:"邮箱输入错误"})
            }else{
                this.setState({listEmail:email,message:"",visible:false});
            }

        }else if(type =='name'){
            var nameRule=/^[0-9A-Za-z\u4e00-\u9fa5]+$/;
            if(!nameRule.test(username)){
                this.setState({message:"用户名输入错误"})
            }else{
                this.setState({listUsername:username,message:"",visible:false});
            }
        }
    }
    render() {
        let user = SystemInfo.getUser();
        const {type,phone,listPhone,email,listEmail,listUsername,username} = this.state;
        let textValue = "";
        if(type=="phone"){
            textValue = phone;
        }else if(type=="email"){
            textValue = email;
        }else if(type=="name"){
            textValue = username;
        }
        const footerButtons = [
            { text: '取消',style: {color: '#45cbe6',fontSize:scaleSize(28)}, onPress: () => this.onClose() },
            { text: '确定',style: {color: '#45cbe6',fontSize:scaleSize(28)}, onPress: () => this.onOk() },
          ];
        const {userInfo} = this.props.my;
       console.log("userInfo:",userInfo);
        return (
            <ScrollView style={styles.myPage}>
                <List >
                    <ListInfo extra={userInfo.company} >
                    所属公司
                    </ListInfo>
                    <ListInfo extra={userInfo.deptName} arrow="empty">
                    所属部门
                    </ListInfo>
                    <ListInfo extra={userInfo.name} arrow="empty">
                    登录名称
                    </ListInfo>
                    <ListInfo extra={listPhone}  arrow="horizontal" onPress={()=>this.onPressModal("phone")}>
                    手机号码
                    </ListInfo>
                    <ListInfo extra={listEmail} arrow="horizontal" onPress={()=>this.onPressModal("email")}>
                    电子邮箱
                    </ListInfo>
                    <ListInfo extra={listUsername} arrow="horizontal" onPress={()=>this.onPressModal("name")}>
                    用户名
                    </ListInfo>
                    <ListInfo extra={userInfo.status==1?"正常":"否"} arrow="empty">
                    用户状态
                    </ListInfo>
                    <ListInfo extra={userInfo.deptName} arrow="empty">
                    部门负责人
                    </ListInfo>
                    <ListInfo extra={userInfo.isAdmin ==1?"管理员":"业务人员"} arrow="empty">
                    用户角色
                    </ListInfo>
                </List>
                <Modal
                    title=""
                    transparent
                   
                    maskClosable={false}
                    visible={this.state.visible}
    
                     footer={footerButtons}
                >
                    <View style={{ paddingVertical: 20 }}>
                   
                        <TextInput
                        style={{height: 40, borderColor: '#ddd', borderWidth: 1,fontSize:scaleSize(26)}}
                        onChangeText={this.onChange}
                        value={textValue}
                    />
                   
                 
              
                    
                    <Text style={{color:'#ff5151',fontSize:scaleSize(25)}}>{this.state.message}</Text>
             </View>
         
  
           </Modal>
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    const {my} = state;
    return {my}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        dispatch: dispatch
    })
}
export default connect(mapStateToProps)(Info);
const styles = StyleSheet.create({
    myPage: {
        backgroundColor: '#EBEEF5',
        marginBottom:10
    },

});