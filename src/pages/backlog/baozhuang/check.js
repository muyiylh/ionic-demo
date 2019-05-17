import React, { Component } from 'react';
import {createForm} from 'rc-form';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace} from '@ant-design/react-native';
import SelectItem from '../../../component/select-item';
import {showFormError, filterConfig, textFontSize} from "../../../utils/index";
import { connect } from '../../../utils/dva';
import { scaleSize } from '../../../utils/ScreenUtil';
import { text_font_size } from '../../../utils/theme';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 受理审核
 * 梁丽
 * 2019-04-25
 */

class BaozhuangCheck extends Component {
    static navigationOptions = ({ navigation }) => {
        const installInfo = navigation.getParam("installInfo");
        return {
            title: navigation.getParam('otherParam', '受理审核'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={installInfo}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>报装信息</Text>
                </TouchableHighlight>
            ),
        };
        
    };
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({installInfo: this.installInfo})
    }
    //报装信息
    installInfo = () => {
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        const info = navigation.state.params.info;
        navigate('InstallInfo',{info: info});
    }
    //提交信息
    submit = () => {
        const { form, dispatch } = this.props;
        const info = this.props.navigation.state.params.info;
        form.validateFields((error, values) => {
            if (error) {
                showFormError(form.getFieldsError());
                return;
            }else{
                const params = {
                    ...values,
                    installId: info.installId,
                    installNo: info.installNo,
                    waitId: info.id,
                    definedId: info.definedId,
                }
                dispatch({
                    type: `baozhuang/dealSLSH`,
                    params
                })
            }
        })
    }
    
    render() {
        const data = {
            name: '12',
        }
        const { getFieldDecorator } = this.props.form;
        const info = this.props.navigation.state.params.info;
        return (
            <ScrollView style={styles.projectPage}>
                    <View>
                        <Text style={styles.listTitle}>审核信息</Text>
                    </View>
                    <List>
                        <Item arrow="empty"><Text style={textFontSize()}><Text style={styles.require}>*</Text>受理说明描述:</Text></Item>
                        {
                            getFieldDecorator('reviewResultDesc',{
                                validateFirst: true,
                                rules:[
                                    {required:true, message:'请输入受理说明描述'}
                                ]
                            })(
                                <TextareaItem style={styles.multilineInput} placeholder="请输入受理说明描述" rows={3} count={300}/>
                            )
                        }
                        
                    </List>
                    <WhiteSpace size="lg" />
                    <View style={{backgroundColor: '#fff',padding: 10}}>
                        <WingBlank
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                            >
                            <Text style={styles.buttonText} onPress={this.submit}>审核完成</Text>
                            </WingBlank>
                    </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
    },
    listTitle: {
        padding: 10,
    },
    require:{
        color:"#ff5151"
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
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize: scaleSize(text_font_size),
    },
});

function mapStateToProps(state) {
    const {baozhuang, index} = state;
    return {baozhuang, index}
}
const BaozhuangCheckForm = createForm()(BaozhuangCheck);
export default connect(mapStateToProps)(BaozhuangCheckForm);