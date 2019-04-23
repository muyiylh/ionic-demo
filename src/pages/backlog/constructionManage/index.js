import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import SelectItem from '../../../component/select-item';
import FileItem from '../../../component/file-item';
import { showFormError, textFontSize}  from '../../../utils/index';
import {text_font_size} from '../../../utils/theme';
import {deviceWidth, scaleSize} from '../../../utils/ScreenUtil';
import CusInputItems from '../../../component/input-item';
import Log from './log';
const Item = List.Item;
const Brief = Item.Brief;
/*
工程施工
梁丽
2019/04/11
*/
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
    	const progressInfo = navigation.getParam("progressInfo");
        return {
            title: navigation.getParam('otherParam', '施工管理'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={progressInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>施工进度</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            combiConduitList: [{}],//管道铺设
            caliberList: [{label:"DN10",value:0},{label:"DN20",value:1}],//口径选择
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({progressInfo: this.progressInfo});
        this.getDetail();
    }
    //获取详情
    getDetail = () => {
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        const params = {
            id: info.installId,
            waitId: info.id,
        }
        dispatch({
            type: `constructionManage/getDetail`,
            params,
        })
    }
    //施工进度信息
    progressInfo = () => {
        const { navigate } = this.props.navigation;
        const info = this.props.constructionManage.data;
        console.log("index---info-----",info);
        navigate('processInfo',{info:info});
    }
    //保存土方量
    saveEarthCounts = () => {
        const { navigation, form, dispatch } = this.props;
        const info = navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                console.log("info-----",info);
                const params = {
                    earthCounts: values.earthCounts,
                    backfillEarthCounts: values.backfillEarthCounts,
                    intoDate: "2019-04-19",
                    waitId: info.id,
                    installId: info.installId,
                    // installNo: info.installNo,
                    // definedId: info.definedId,
                }
                console.log("params------",params);
                dispatch({
                    type: `constructionManage/saveEarthCounts`,
                    params,
                }).then(()=>{
                    this.getDetail();
                })
            }
        })
    }
    
    
   
    render() {
       const { combiConduitList, caliberList } = this.state;
       const { getFieldDecorator } = this.props.form;
       const { params } = this.props.navigation.state;
       const { data } = this.props.constructionManage;
       console.log("view----data---",data)
        return (
            <ScrollView style={styles.projectPage}>
                <View>
                    <Text style={styles.listTitle}>设计信息填写</Text>
                </View>
                {/* <Provider> */}
                    <List> 
                        {
                            getFieldDecorator('earthCounts',{
                                validateFirst: true,
                                initialValue: data.earthCounts?data.earthCounts.toString():'',
                                rules:[
                                    {required:true, message:'请输入开挖土方量'}
                                ]
                            })(
                                // <InputItem extra="元立方米(m³)" placeholder="请输入开挖土方量" labelNumber={6}>
                                //     <View style={{flexDirection:'row'}}>
                                //         <Text style={styles.require}>*</Text>
                                //         <Text style={styles.label}>开挖土方量:</Text>
                                //     </View>
                                // </InputItem>
                                <CusInputItems require="true" extra="立方米(m³)" labelNumber={6}>开挖土方量: </CusInputItems>

                            )
                        }
                        {
                            getFieldDecorator('backfillEarthCounts',{
                                validateFirst: true,
                                initialValue: data.backfillEarthCounts?data.backfillEarthCounts.toString():'',
                                rules:[
                                    {required:true, message:'请输入回填土方量'}
                                ]
                            })(
                                <CusInputItems require="true" extra="立方米(m³)" labelNumber={6}>回填土方量: </CusInputItems>
                                // <InputItem extra="元立方米(m³)" placeholder="请输入回填土方量"labelNumber={6}>回填土方量:</InputItem>
                            )
                        }
                        {
                            getFieldDecorator('intoDateImg',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请上传进场时间文件'}
                                ]
                            })(
                                <FileItem title="进场时间"/>
                            )
                        }
                    </List>
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
                        <Text style={styles.buttonText} onPress={this.saveEarthCounts}>保存</Text>
                        </WingBlank>
                </View>
                <Log navigation={this.props.navigation} getDetail={this.getDetail}></Log>
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
    caliberBlock: {
        paddingBottom: 10,
        backgroundColor: '#EBEEF5',
    },
    buttonText: {
        backgroundColor: '#ecf8fa',
        color: '#40b6ce',
        borderColor: "#40b6ce",
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#40b6ce',
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    label:{
        fontSize: scaleSize(text_font_size),
        color:"#333"
    },
    require:{
        color:"#ff5151"
    }
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {constructionManage, index} = state;
    return {constructionManage, index}
}
export default connect(mapStateToProps)(IndexForm);