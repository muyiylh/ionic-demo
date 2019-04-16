import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text,View,AsyncStorage,ImageBackground,Image,TouchableHighlight } from 'react-native';
import { WhiteSpace, WingBlank ,List} from '@ant-design/react-native';
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
// import {showFormError} from "../../../utils/index";
const Item = List.Item;
class Info extends Component {
    
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
       // console.warn("props:",props);
        super(props)
    }
    componentDidMount() {
        const {dispatch} = this.props;
        this.props.navigation.setParams({
            title:'个人信息查看',
            navigatePress:this.submit
        })
        dispatch({type:'my/queryUserByToken'});
    }
    submit =()=>{

    }
    onPress =(value)=>{
        console.log("value:",value);
    }
    render() {
        let user = SystemInfo.getUser();
        if(typeof user =='string'){
            user = JSON.parse(user);
        }
        const {userInfo} = this.props.my;
        return (
            <ScrollView style={styles.myPage}>
                <List >
                    <ListInfo extra="成都自来水有限公司" >
                    所属公司
                    </ListInfo>
                    <ListInfo extra="营业部" arrow="empty">
                    所属部门
                    </ListInfo>
                    <ListInfo extra="12222" arrow="empty">
                    登录名称
                    </ListInfo>
                    <ListInfo extra="18222222222" rule="/^[1][3,4,5,7,8][0-9]{9}$/" arrow="horizontal" onPress={() => {this.onPress('phone')}}>
                    手机号码
                    </ListInfo>
                    <ListInfo extra="182@qq.com" arrow="horizontal">
                    电子邮箱
                    </ListInfo>
                    <ListInfo extra="12222" arrow="horizontal">
                    用户名
                    </ListInfo>
                    <ListInfo extra="12222" arrow="empty">
                    用户状态
                    </ListInfo>
                    <ListInfo extra="12222" arrow="empty">
                    部门负责人
                    </ListInfo>
                    <ListInfo extra="12222" arrow="empty">
                    用户角色
                    </ListInfo>
                </List>
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