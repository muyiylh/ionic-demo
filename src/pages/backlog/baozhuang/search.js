import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, Tabs} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
/*
智能检索结果
梁丽
2019/04/09
*/
class Search extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', '智能检索结果'),
            
        };
    };
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
    	const tabs = [
	      { title: 'First Tab' },
	      { title: 'Second Tab' },
	      { title: 'Third Tab' },
	    ]
        return (
            <ScrollView style={styles.projectPage}>
	            <View>
	                <Tabs tabs={tabs}>
						<View style={styles.view}>
							<Text>Content of First Tab</Text>
						</View>
						<View style={styles.view}>
							<Text>Content of Second Tab</Text>
						</View>
						<View style={styles.view}>
							<Text>Content of Third Tab</Text>
						</View>
			        </Tabs>
		        </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    projectPage: {
        backgroundColor: '#EBEEF5',
        color: '#333',
    },
    view: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      backgroundColor: '#fff',
    },
});
export default Search;