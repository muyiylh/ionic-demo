import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import ImageView from '../../../component/image-view'
import SelectItem from '../../../component/select-item';
import { connect } from '../../../utils/dva';
import { fileText, filterConfig, showFormError } from '../../../utils/index';
import CusInputItem from "../../../component/input-item";
import CusListItem from '../../../component/list-item';
const Item = List.Item;
const Brief = Item.Brief;
class Detail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '水表详情')
        };
    };
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        const params = {
            id: navigation.state.params.info.id,
        }
        dispatch({
            type: `waterMeterReceive/getMeterInfoById`,
            params,
        })
    }
    onRef = (ref) => {
        this.child = ref
    }
    //查看图片
    open = () => {
        this.child.open()
    }
    //复核
    review = () => {
        const { waterMeterReceive: { data }, dispatch } = this.props;
        const params = {
            ids:data.id,
        }
        dispatch({
            type: `waterMeterReceive/reCheck`,
            params,
        })
    }
    //修改
    edit = () => {
        const { form, dispatch, waterMeterReceive: { data } } = this.props;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    id: data.id,
                };
                console.log("params--------",params);
                dispatch({
                    type: `waterMeterReceive/update`,
                    params,
                })
            }
        })
    }
    //接收
    receive = () => {
        const { form, dispatch, waterMeterReceive: { data } } = this.props;
        const { navigate } = this.props.navigation;
        const params = {
            ids: data.id,
        }
        dispatch({
            type: `waterMeterReceive/handOver`,
            params,
        }).then(()=>{
            navigate('WaterMeterReceive');
            if (this.props.navigation.state.params.refreshData) {
                this.props.navigation.state.params.refreshData();
            }
        })
        
    }
    render() {
        const info = this.props.navigation.state.params.info;
        const { getFieldDecorator } = this.props.form;
        const { configParams :{ data:configData }, waterMeterReceive: { data }} = this.props;
        const initialReading = data.initialReading?data.initialReading.toString():'';
        return (
            <ScrollView style={styles.projectPage}>
                {/* <Provider> */}
                    <List>
                        <CusListItem extra={data.meterTypeName}>水表类型:</CusListItem>
                        <CusListItem extra={data.meterCaliberName}>水表口径:</CusListItem>
                        {/* <Item extra={data.meterTypeName} arrow="empty">
                            水表类型:
                        </Item>
                        <Item extra={data.meterCaliberName} arrow="empty">
                            水表口径:
                        </Item> */}
                        {  
                            getFieldDecorator('waterNature',{
                                validateFirst: true,
                                initialValue:data.waterNature,
                                rules:[
                                    {required:true, message:'请在选择用水性质'}
                                ]
                            })(
                                <SelectItem data={filterConfig(configData,'用水性质')} labelNumber={9}>用水性质:</SelectItem>
                            )
                        }
                        {
                            getFieldDecorator('barCode',{
                                validateFirst: true,
                                initialValue:data.barCode,
                                rules:[
                                    // {required:true, message:'请输入条码号'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>条码号:</CusInputItem>
                                // <InputItem labelNumber={9}>条码号:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('initialReading',{
                                validateFirst: true,
                                initialValue:initialReading,
                                // initialValue:data.initialReading,
                                rules:[
                                    // {required:true, message:'请输入初始读数'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>初始读数:</CusInputItem>
                                // <InputItem labelNumber={9}>初始读数:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('installAddress',{
                                validateFirst: true,
                                initialValue:data.installAddress,
                                rules:[
                                    // {required:true, message:'请输入安装地址'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>安装地址:</CusInputItem>
                                // <InputItem labelNumber={9}>安装地址:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('waterAddress',{
                                validateFirst: true,
                                initialValue:data.waterAddress,
                                rules:[
                                    // {required:true, message:'请输入用水地址'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>用水地址:</CusInputItem>
                                // <InputItem labelNumber={9}>用水地址:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('userCode',{
                                validateFirst: true,
                                initialValue:data.userCode,
                                rules:[
                                    // {required:true, message:'请输入用户号'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>用户号:</CusInputItem>
                                // <InputItem labelNumber={9}>用户号:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('unitName',{
                                validateFirst: true,
                                initialValue:data.unitName,
                                rules:[
                                    // {required:true, message:'请输入用户'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>用户:</CusInputItem>
                                // <InputItem labelNumber={9}>用户:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('managerName',{
                                validateFirst: true,
                                initialValue:data.managerName,
                                rules:[
                                    // {required:true, message:'请输入联系人'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>联系人:</CusInputItem>
                                // <InputItem labelNumber={9}>联系人:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('managerContact',{
                                validateFirst: true,
                                initialValue:data.managerContact,
                                rules:[
                                    // {required:true, message:'请输入电话'}
                                ]
                            })(
                                <CusInputItem labelNumber={9}>电话:</CusInputItem>
                                // <InputItem labelNumber={9}>电话:</InputItem>
                            )
                        }
                    </List>
                {/* <ImageView onRef={this.onRef} images={images}></ImageView> */}
                {/* </Provider> */}
                <WhiteSpace size="lg" />
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        >
                        {data.status !=3?<Text style={styles.buttonText} onPress={this.review}>复核</Text>:null}
                        {data.status !=3?<Text style={styles.buttonText} onPress={this.edit}>修改</Text>:null}
                        {data.status ==3?<Text style={styles.buttonText} onPress={this.receive}>接收</Text>:null}
                    </WingBlank>
                </View>

                <WhiteSpace size="lg" />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    listTitle: {
        padding: 10,
    },
    height: {
        height: 80
    },
    buttonText: {
        backgroundColor: '#ecf8fa',
        color: '#40b6ce',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
        color: '#40b6ce',
    },
});
const DetailForm = createForm()(Detail);
function mapStateToProps(state) {
    const {waterMeterReceive, configParams, index} = state;
    return {waterMeterReceive, configParams, index}
}
export default connect(mapStateToProps)(DetailForm);