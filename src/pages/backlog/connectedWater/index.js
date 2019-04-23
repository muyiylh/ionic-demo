import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight,Navigator,TouchableOpacity,ListView,} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace , Checkbox} from '@ant-design/react-native';
import CheckBox from 'react-native-check-box';
import {Toast} from '@ant-design/react-native';
import { connect } from '../../../utils/dva';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import FileItem from '../../../component/file-item';
import { textFontSize  } from '../../../utils/index';


class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const finish = navigation.getParam("finish");
        return {
            title: navigation.getParam('otherParam', '通水管理'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={finish}
                    style={{ marginRight: 10 }}
                >
                    <Text style={textFontSize('#fff')}>完成通水</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props , context) {
        super(props , context);
        this.state = {
            widthArr: [80,80,80,80,80,80,80,80],//table的宽度
            isChecked: {},//是否被选择
            selected: [],//选择的水表
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({finish: this.finish});
        dispatch({
            type: `connectWater/list`,
        })
    }
    //批量通水
    batch = () => {
        const { dispatch } = this.props;
        const { connectWater: { data } } = this.props;
        const { selected } = this.state;
        if(selected.length>0){
            var arr = [];
            selected.map(function(item){
                arr.push(item.id);
            })
            var params = {
                ids:arr.join(","),
            }
            dispatch({
                type: `connectWater/batchWater`,
                params,
            }).then(()=>{
                this.setState({selected:[],isChecked:{}});
            })
        }else{
            Toast.info("请选择要通水的水表")
        }
        
    }
    //完成通水
    finish = () => {
        const { dispatch , navigation } = this.props;
        const info = navigation.state.params.info;
        const params = {
            id: info.installId,
            waitId: info.id,
        }
        dispatch({
            type: `connectWater/deal`,
            params,
        })
    }
    //复选框勾选
    selectCheckBox = (data,index) => {
        console.log("check-box--data-index",data,index);
        const { isChecked, selected } = this.state;
        const { connectWater: { data: waterData } } = this.props;
        let _isChecked = JSON.parse(JSON.stringify(isChecked));
        let _selected = [];
        if(index === 0){//全选
            if(_isChecked[index]){//已被选中
                _isChecked[index] = false;
                _selected = [];
                waterData.map((item,itemIndex)=>{
                    _isChecked[itemIndex] =  false;
                });
                _isChecked[waterData.length] =  false;//最后一项
            }else{//
                _isChecked[index] = true;
                waterData.map((item,itemIndex)=>{
                        _selected.push(item);
                        _isChecked[itemIndex] = true;
                });
                _isChecked[waterData.length] =  true;//最后一项
            }
        }else{//单选
            if(_isChecked[index]){//已被选中
                _isChecked[index] = false;
            }else{//
                _isChecked[index] = true;
            }
            waterData.map((item,itemIndex)=>{
                if(_isChecked[itemIndex]){
                    _selected.push(item);
                }
            });
        }
        
        console.log("selected------",_selected,_isChecked)
        this.setState({selected: _selected, isChecked: _isChecked});
    }
    render() {
        const { widthArr, isChecked, selected } = this.state;
        const { connectWater: { data, table } } = this.props;
        const element = (data, index) => (
              <View style={styles.btn}>
                <CheckBox
                    style={{flex: 1, padding: 10}}
                    onClick={()=>{this.selectCheckBox(data,index);}}
                    isChecked={isChecked[index]}
                    rightText={data}
                />
              </View>
        );
        // table.map((item,index)=>{
        //     item.unshift(element(item,index));
        // })
        return (
            <ScrollView style={styles.projectPage}>
                <View style={{backgroundColor: '#fff',padding: 10}}>
                    <WingBlank
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={styles.buttonText} onPress={this.batch}>批量通水</Text>
                    </WingBlank>
                </View>
                {/* <WhiteSpace size="lg" /> */}
                {/* <Provider> */}
                    <View style={styles.container}>
                        {/* <Text style={styles.listTitle}>未通水</Text> */}
                        {data && data.length > 0?<ScrollView style={styles.projectPage} horizontal={true}>
                            <View style={styles.flex}>
                                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                    {/* <Row data={table_Head} style={styles.head} textStyle={styles.text}/>
                                    <Rows data={table} textStyle={styles.text}/> */}
                                    {
                                        table && table.map((rowData, index) => (
                                            <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthArr}
                                            style={[styles.row,isChecked[index] && {backgroundColor: '#40b6ce'}]}
                                            textStyle={styles.text}
                                            onPress={()=>{this.selectCheckBox(rowData, index)}}
                                            />
                                            // <TableWrapper key={index} style={styles.row}>
                                            //     {
                                            //     rowData.map((cellData, cellIndex) => (
                                            //         <Cell 
                                            //             key={cellIndex} 
                                            //             data={cellIndex === 0 ? element(cellData, index) : cellData} 
                                            //             textStyle={styles.text}
                                            //             style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                            //             widthArr={widthArr}
                                            //             />
                                            //     ))
                                            //     }
                                            // </TableWrapper>
                                        ))
                                    }
                                </Table>
                            </View>
                        </ScrollView>:null}
                    </View>
                    
                {/* </Provider> */}
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
    container: {flex: 1, padding: 10, backgroundColor: '#fff'},
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 10,
        textAlign: 'center'
    },
    flex: {
        flex: 1,
    },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1'},
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
});
function mapStateToProps(state) {
    const {connectWater, index} = state;
    return {connectWater, index}
}
export default connect(mapStateToProps)(Index);