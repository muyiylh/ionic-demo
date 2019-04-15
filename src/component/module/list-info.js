import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Image,TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Left } from 'native-base';
import { scaleSize } from '../../utils/ScreenUtil';
import Popup from '../../component/common/Popup';
import { WhiteSpace, Modal,Button,InputItem,List} from '@ant-design/react-native';
class ListInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            value:""
        }
    }
    press = () => {
       
        this.setState({visible:true})
            // Modal.prompt(
            //   '手机号码',

            //   password => console.log(`password: ${password}`),
            //   'secure-text',
            //   'defaultValue'
            // );
    
        //this.props.navigation.navigate(this.props.path || "home")
    }
    onClose =()=>{
        this.setState({visible:false})
    }
    renderContent =()=>{
        //type :phone : 手机 ，pwd：密码  email：邮箱  name：用户名
        const {type,value} = this.props;
    }
    onOk =()=>{
        const {onPress} = this.props;
        this.setState({visible:false});
        onPress(this.state.value);
    }
    render() {
        const {children,extra,arrow,type} = this.props;
        const footerButtons = [
            { text: '取消',style: {color: '#45cbe6',fontSize:20}, onPress: () => console.log('cancel') },
            { text: '确定',style: {color: '#45cbe6',fontSize:20}, onPress: () => this.onOk() },
          ];
          const title = children;
        return (
            <View><TouchableNativeFeedback style={{ flex: 1 }} onPress={this.press}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.list}>
                    <View style={styles.textlist}>
                        <Text style={{ fontSize: scaleSize(28),textAlign:'left',color:'#333',marginLeft:10 }}>{children}: </Text>
                        
                     
                        <Text style={{ fontSize: scaleSize(28),textAlign:'left',color:'#666666',marginLeft:10 }}>{extra}&nbsp;&nbsp;</Text>
                    </View>
                    {arrow =='horizontal' && <Image  resizeMode="contain" source={require("../../images/return_3.png")}/>} 
                </View>
            </TouchableNativeFeedback>
          
             <Modal
             title=""
             transparent
             onClose={this.onClose}
             maskClosable
             visible={this.state.visible}
           
             footer={footerButtons}
           >
             <View style={{ paddingVertical: 20 }}>
             {/* <InputItem
     
            value={extra}
            onChange={value => {
              this.setState({
                value,
              });
            }}
     
          >
            {children}
          </InputItem> */}
             <TextInput
                style={{height: 40, borderColor: '#ddd', borderWidth: 1}}
                onChangeText={(value) => this.setState({value})}
                value={extra}
            />
             </View>
             {/* <Button type="primary" onPress={this.onClose}>
               close modal
             </Button> */}
  
           </Modal>
           </View>
        );
    }
}
export default (ListInfo);
const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:15,
        paddingBottom:15,
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginBottom: 1,
        borderBottomWidth:1,
        borderColor:"#ddd",
        textAlign:"left",
    },
    textlist:{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
    }
});