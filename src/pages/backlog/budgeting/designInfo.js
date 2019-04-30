import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace, Accordion} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import {text_font_size} from '../../../utils/theme';
import {scaleSize} from "../../../utils/ScreenUtil";
import CusListItem from "../../../component/list-item";
import { textFontSize, renderText } from '../../../utils/index';
const Item = List.Item;
const Brief = Item.Brief;
/*
设计信息
梁丽
2019/04/10
*/
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '设计信息'),
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            activeSections1: [],
            activeSections2: [],
        }
	}
	componentDidMount(){
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;

        const params = {
			id: info.installId,
            waitId: info.id,
        }
        dispatch({
            type: `budgeting/getByInstallId`,
            params,
        })
    }
    //改变
    onChange = (type,value) => {
    	switch(type){
    		case 1:
    			this.setState({ activeSections1: value });break;
    		case 2:
    			this.setState({ activeSections2: value });break;
    	}
    };
    render() {
		// const { data } = this.state;
		const { budgeting: { data }} = this.props;

        return (
            <ScrollView style={styles.projectPage}>
				{data.meterList && data.meterList.length>0?<View>
					<View>
						<Text style={styles.listTitle}>水表信息</Text>
					</View>
					<Accordion
						onChange={(value)=>this.onChange(1,value)}
						activeSections={this.state.activeSections1}
						style={styles.accordion}
						>
						{data.meterList && data.meterList.map((item) => {
							return (
									<Accordion.Panel header={item.typeName}>
										<List style={styles.list}>
											<CusListItem extra={item.typeName}>水表类型:</CusListItem>
											<CusListItem extra={item.caliberName}>水表口径:</CusListItem>
											<CusListItem extra={item.meterCounts}>水表支数:</CusListItem>
											<CusListItem extra={item.natureName}>水表类别:</CusListItem>
											<CusListItem extra={item.functionName}>用水性质:</CusListItem>
										</List>
									</Accordion.Panel>
								)
						})}
					</Accordion>
				</View>:renderText('暂无水表信息')}
				{data.gDList && data.gDList.length>0?<View>
					<View>
						<Text style={styles.listTitle}>管道信息</Text>
					</View>
					<Accordion
						onChange={(value)=>this.onChange(2,value)}
						activeSections={this.state.activeSections2}
						style={styles.accordion}
						>
						{data.gDList && data.gDList.map((item) => {
							return (
									<Accordion.Panel header={item.caliberName}>
										<List style={styles.list}>
											<CusListItem extra={item.caliberName}>管径:</CusListItem>
											<CusListItem extra={item.material}>管材:</CusListItem>
											<CusListItem extra={item.length}>长度:</CusListItem>
										</List>
									</Accordion.Panel>
								)
						})}
					</Accordion>
				</View>:renderText('暂无管道信息')}
                
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
    accordion: {
		backgroundColor: '#fff',
		marginBottom: 10,
		fontSize: scaleSize(text_font_size),
    },
    list: {
    	// backgroundColor: '#EFF2FA',
    	paddingLeft: 30,
		paddingRight: 30,
		fontSize: scaleSize(text_font_size),
    }
});
function mapStateToProps(state) {
    const {budgeting, index} = state;
    return {budgeting, index}
}
export default connect(mapStateToProps)(Info);