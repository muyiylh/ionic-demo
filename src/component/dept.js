/**
 * 说明：
 * 创建人：liangli
 * 创建时间：2019/04/10
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Picker, List} from '@ant-design/react-native';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
		    {
		        title: '标题1',
		        content: '内容1',
		        level: 0,
		        children: [
		        	{
		        		title: '子标题1',
		        		content: '子内容1',
		        		level: 1,
		        		children: [
			        		// {
			        		// 	title: '子子标题1',
						       //  content: '子子内容1',
						       //  level: 2,
						       //  children: [],
		        			// }
		        			
		        		],
		        	}
		        ]
		    },
		    {
		        title: '标题2',
		        content: '内容2',
		        children: [],
		        level: 0,
		    },
		    {
		        title: '标题3',
		        content: '内容3',
		        children: [],
		        level: 0,
		    },
		    {
		       title: '标题4',
		        content: '内容4',
		        children: [],
		        level: 0,
		    },
		    {
		       title: '标题5',
		        content: '内容5',
		        children: [],
		        level: 0,
		    },
		];
class Dept extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        	
            activeSection: [[],[],[],[],[]],
        }
    }
    // onChange = (value) => {
    //     const item = this.getItem(value);
    //     const {onChange} = this.props;
    //     if(item){
    //         this.setState({selected: item});
    //         onChange && onChange(item.value);
    //     }
    // };
    // getItem = (value) => {
    //     const {data} = this.props;
    //     const values = data.filter(item=>{
    //         return item.value == value;
    //     });
    //     if(values.length > 0){
    //         return values[0];
    //     }
    //     return null;
    // };
    // onFormat = (labels) => {
    //     return labels.join(',')
    // };
    // componentWillReceiveProps(nextProps) {
    //     if ('value' in nextProps) {
    //         const value = nextProps.value;
    //         const item = this.getItem(value);
    //         this.setState({ selected: item });
    //     }
    // }
    // componentDidUpdate(prevProps, prevState) {

    // }
    // componentDidMount(){
    //     const {value} = this.props;
    //     if(value){
    //         const item = this.getItem(value);
    //         this.setState({ selected: item });
    //     }
    // }

    _setSection(level, section) {
    	console.warn("section----",section);
    	var s = this.state.activeSection;
    	s[level] = section;
        this.setState({ activeSection: s });
    }

    _renderHeader(section,isActive) {
    	// console.warn("state----",this.state.activeSection);
    	// const a = this.state.activeSection;
        return (
            <View style={styles.active}>
                <Text>{section.title}{section.level}</Text>
            </View>
        );
    }

    _renderContent(section) {
    	if(section.children.length > 0){
    		console.warn("level----",section.children.level);
    		console.warn("state----",this.state.activeSection[section.level]);
    		const active = this.state.activeSection[section.level];
    		return(
    				<Accordion
                        activeSections={active}
                        sections={section.children}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        duration={400}
                        onChange={(section)=>this._setSection(1, section)}
                    />
    			)
    	}else{
    		return (
	            <View style={styles.inactive}>
	                <Text style={{margin: 20}}>{section.content}</Text>
	            </View>
        	);
    	}
    	// return (
	    //         <View style={styles.inactive}>
	    //             <Text style={{margin: 20}}>{section.content}{section.level+1}</Text>
	    //         </View>
     //    	);
	           
    }
    render(){
        // const {children, data, extra} = this.props;
        // let extraTxt = extra || "请选择";
        
        return(
            <View style={styles.container}>
                <ScrollView style={{flex: 1, paddingTop: 20, }}>
                    <Accordion
                        activeSections={this.state.activeSection[0]}
                        sections={CONTENT}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent.bind(this)}
                        duration={400}
                        onChange={(section)=>this._setSection(0, section)}
                    />
                </ScrollView>
            </View>
        )
    }
}
// SelectItem.propTypes = {
//     value: PropTypes.any,
//     onChange: PropTypes.func,
//     data: PropTypes.array
// };
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    active: {
        // height: p(80),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // paddingLeft: p(15),
        backgroundColor: 'rgba(255,255,255,1)',

    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
})
export default Dept;
