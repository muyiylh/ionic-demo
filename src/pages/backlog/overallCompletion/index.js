import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import { connect } from '../../../utils/dva';
import {List, InputItem, TextareaItem} from '@ant-design/react-native';
import {showFormError, textFontSize} from "../../../utils/index";
import { scaleSize } from '../../../utils/ScreenUtil';
import { text_font_size } from '../../../utils/theme';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 整体竣工归档
 * 梁丽
 * 2019/05/08
 */
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const info = navigation.state.params.info;
        const save = navigation.getParam("save");
        return {
            title: navigation.getParam('otherParam', info.tsakName),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={save}
                    style={{ marginRight: 10 }}
                >
                    <Text style={[{color:'#fff'},textFontSize('#fff')]}>完成</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        navigation.setParams({save: this.save});
    }
    //保存
    save = () => {
        const { form, dispatch, navigation } = this.props;
        const info = navigation.state.params.info;
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
                }
                dispatch({
                    type: `completionArchiving/overallCompletion`,
                    params,
                })
            }
        })
    }
    render() {
        const { form} = this.props;
        const { getFieldDecorator } = form;
        return (
            <ScrollView style={styles.projectPage}>
                <List style={styles.content}>
                    <Item>
                    <Text style={textFontSize()}>归档说明:</Text>
                    {  
                        getFieldDecorator('remark',{
                            validateFirst: true,
                            rules:[
                                {required:true, message:'请在此处填写归档说明'}
                            ]
                        })(
                            <TextareaItem style={styles.multilineInput} placeholder="请在此处填写归档说明" rows={3} count={150}/>
                        )
                    }
                    </Item>
                </List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    content: {
        marginTop: 10,
    },
    listTitle: {
        padding: 10,
    },
    multilineInput:{
        marginTop: 6,
        marginHorizontal:6,
        fontSize: scaleSize(text_font_size),
    },
});
const IndexForm = createForm()(Index);
function mapStateToProps(state) {
    const {completionArchiving, index} = state;
    return {completionArchiving, index}
}
export default connect(mapStateToProps)(IndexForm);