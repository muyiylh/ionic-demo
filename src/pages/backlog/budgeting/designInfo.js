import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace, Accordion} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
/*
设计信息
梁丽
2019/04/10
*/
class Index extends Component {
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
            data:
            	{
            		meterList:[
	            		{
	            			caliber: "112",
							caliberName: "DN25",
							createAt: 1554872982216,
							createBy: 120,
							delFlag: 0,
							designId: 12031,
							function: "99",
							functionName: "居民用水",
							id: 373,
							installId: 12020,
							meterCounts: 12,
							nature: "127",
							natureName: "户表",
							processClassify: "A",
							type: "97",
							typeName: "超声波水表",
							updateAt: null,
							updateBy: null,
						},
						{
	            			caliber: "112",
							caliberName: "DN25",
							createAt: 1554872982216,
							createBy: 120,
							delFlag: 0,
							designId: 12031,
							function: "99",
							functionName: "居民用水",
							id: 373,
							installId: 12020,
							meterCounts: 12,
							nature: "127",
							natureName: "户表",
							processClassify: "A",
							type: "97",
							typeName: "超声波水表",
							updateAt: null,
							updateBy: null,
						}
            		],
            		gDList:[
						{
							caliber: "145",
							caliberName: "DN40",
							createAt: 1554872982216,
							createBy: 120,
							delFlag: 0,
							designId: 12031,
							id: 344,
							installId: 12020,
							length: 300,
							material: "3",
							processClassify: "A",
							updateAt: null,
							updateBy: null,
						}
					]
            		
				}

        }
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
    	const { data } = this.state;
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
					{data.meterList.map((item) => {
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
                <Accordion
					onChange={(value)=>this.onChange(2,value)}
					activeSections={this.state.activeSections2}
					style={styles.accordion}
					>
					{data.gDList.map((item) => {
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
		        </Accordion>
                
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
export default createForm()(Index);