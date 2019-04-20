import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace, Accordion} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
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
            activeSections1: [2,0],
            activeSections2: [2,0],
        }
	}
	componentDidMount(){
        const {navigation, dispatch} = this.props;
        const info = navigation.state.params.info;
        console.log("info---------",info)
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
		console.log("data----------",data);
        return (
            <ScrollView style={styles.projectPage}>
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
								  	<List>
					                    <Item extra={item.typeName} arrow="empty" style={styles.list}>
					                        水表类型:
					                    </Item>
					                    <Item extra={item.caliberName} arrow="empty" style={styles.list}>
					                        水表口径:
					                    </Item>
					                    <Item extra={item.meterCounts} arrow="empty" style={styles.list}>
					                        水表支数:
					                    </Item>
					                    <Item extra={item.natureName} arrow="empty" style={styles.list}>
					                        水表类别:
					                    </Item>
					                    <Item extra={item.functionName} arrow="empty" style={styles.list}>
					                        用水性质:
					                    </Item>
				                	</List>
								</Accordion.Panel>
							)
					})}
		        </Accordion>

		        <View>
                	<Text style={styles.listTitle}>管道信息</Text>
                </View>
                {/* <Accordion
					onChange={(value)=>this.onChange(2,value)}
					activeSections={this.state.activeSections2}
					style={styles.accordion}
					>
					{data.gDList && data.gDList.map((item) => {
						return (
								<Accordion.Panel header={item.caliberName}>
								  	<List>
					                    <Item extra={item.caliberName} arrow="empty" style={styles.list}>
					                       管径:
					                    </Item>
					                    <Item extra={item.material} arrow="empty" style={styles.list}>
					                        管材:
					                    </Item>
					                    <Item extra={item.length} arrow="empty" style={styles.list}>
					                        长度:
					                    </Item>
				                	</List>
								</Accordion.Panel>
							)
					})}
		        </Accordion> */}
                
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
    },
    list: {
    	backgroundColor: '#EFF2FA',
    	paddingLeft: 20,
    }
});
function mapStateToProps(state) {
    const {budgeting, index} = state;
    return {budgeting, index}
}
export default connect(mapStateToProps)(Info);