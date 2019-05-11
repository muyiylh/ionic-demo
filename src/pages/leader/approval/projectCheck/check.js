import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView,AsyncStorage } from 'react-native';
import {List, Icon,Grid,} from '@ant-design/react-native';
import { connect } from '../../../../utils/dva';
import { fileText, textFontSize, showFormError, filterConfig, getConfigName } from '../../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 工程验收----管网验收审核,现场验收
 * 梁丽
 * 2019-04-29
 */


class Check extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.state.params.info;
    	const submit = navigation.getParam("submit");
        return {
            title: navigation.getParam('otherParam', info.taskName),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={submit}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>提交</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            userInfo: {},
        }
    }
    componentDidMount(){
        const { navigation, dispatch } = this.props;
        const info = navigation.state.params.info;
        navigation.setParams({submit: this.submit});
        this.getUserInfo();
        const params = {
            installNo: info.installNo,
            waitId: info.id,
        }
        dispatch({
            type: `projectCheck/getInfoByInstall`,
            params,
        })
        dispatch({
            type: `configParams/queryConfigParams`,
        }).then(()=>{
            this.refresh();
        })
    }
    //获得用户信息
    getUserInfo = async() => {
        const { dispatch } = this.props;
        const user = await AsyncStorage.getItem('user');
        const _user = JSON.parse(user);
        this.setState({userInfo: _user});
    }
    //刷新
    refresh = () => {
        const { navigation, dispatch } = this.props;
        const info = navigation.state.params.info;
        const params = {
            installNo: info.installNo,
            waitId: info.id,
        }
        dispatch({
            type: `projectCheck/getCheck`,
            params,
        })
        .then(()=>{
            const { tabsData: data } = this.props.projectCheck;
            const { userInfo } = this.state;
            let list = [
                { title: '表节点验收',show: true},
                { title: '井室构筑物',show: true},
                { title: '安装工程',show: true},
                { title: '管道试压',show: true},
                { title: '冲洗消毒',show: true},
            ]
            if(data){
                for(let key in data){
                    if(info.nodeFlag == "XCYS"){//现场验收
                        //判断审核时的指派人是否是当前登陆者
                        if(userInfo.id == data[key].chectResultDTO.appointUser){
                            list[key-1].show = true;
                        }else{
                            list[key-1].show = false;
                        }
                        if(data[key].chectResultDTO.formBy){//已经提交过
                            list[key-1].icon = true;
                        }else{
                            list[key-1].icon = false;
                        }
                    }else{//审核
                        if(data[key].chectResultDTO.appointUser){//已经提交过
                            list[key-1].icon = true;
                        }else{
                            list[key-1].icon = false;
                        }
                    }
                }
            }
            this.setState({list});
            console.log("list-------",list)
        })
    }
    //提交--提交现场验收
    submit = ()=> {
        const { navigate } = this.props.navigation;
        const { info: data } = this.props.projectCheck;
        const info = this.props.navigation.state.params.info;
        navigate("ProjectCheckSubmit",{info,data,});
    }
    
    //查看详细信息
    viewDetail = (index) => {
        const { navigate } = this.props.navigation;
        const info = this.props.navigation.state.params.info;
        switch (info.nodeFlag) {
            case 'GWXSSH':
                navigate("ProjectCheckDetail",{index,info,onGoBack: () => this.refresh()});
                break;
            case 'XCYS':
                navigate("ProjectCheckDetailDAIBAN",{index,info,onGoBack: () => this.refresh()});
                break;
        
            default:
                break;
        }
        
    }
    //图标
    setIcon = (icon) => {
        if(icon){
            return(
                <Icon name="check-circle" color="#47E88F" size="md" style={{marginRight:10}}/>
            )
        }else{
            return null
        }
    }
    
    
    render() {
        const { list } = this.state;
        return (
            <ScrollView style={styles.projectPage}>
                    <List>
                        {
                            list.map((item,index)=>{
                                return(
                                    item.show &&
                                        <Item onPress={()=>{this.viewDetail(index+1)}} arrow="horizontal" thumb={this.setIcon(item.icon)}>
                                        
                                            <Text style={textFontSize()}>
                                                {item.title}
                                            </Text>
                                        </Item>
                                   
                                )
                            })
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
    require:{
        color:"#ff5151"
    }
});

const  CheckForm = createForm()(Check);
function mapStateToProps(state) {
    const {projectCheck, formData, configParams, index} = state;
    return {projectCheck, formData, configParams, index}
}
export default connect(mapStateToProps)(CheckForm);