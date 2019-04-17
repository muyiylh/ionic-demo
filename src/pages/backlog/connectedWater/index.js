import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform ,TouchableHighlight,Navigator,TouchableOpacity,ListView,} from 'react-native';
import {createForm} from 'rc-form';
import {List, InputItem, TextareaItem, Picker, Provider, DatePicker, WingBlank, Button, WhiteSpace , Checkbox} from '@ant-design/react-native';
import { Row, Rows } from '../../../component/rows';
import { Col, Cols } from '../../../component/cols';
import { Table, TableWrapper } from '../../../component/table';
import { Cell } from '../../../component/cell';
import FileItem from '../../../component/file-item';
import { dataTable } from '../../../utils/index';


const table_Head = ['操作', '序号', '     水表类型     ', '水表口径' , '水表性质' , '水表用途' , '条码号' , '初始读数' , '       安装地址       ' , '  用水地址  '];
const table_Data = [
    { no:'1', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'2', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'3', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'4', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'5', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'6', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'7', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
    { no:'8', genre:'超声波水表', diameter:'DN100',nature: '户表',purpose: '居民用水',barcode: '',init: '0',install: '一栋一单元一号井室', use:'1-1-1002'},
];
let table = dataTable(table_Data);

class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const batch = navigation.getParam("batch");
        return {
            title: navigation.getParam('otherParam', '通水管理'),
            //右边的按钮
            headerRight: (
                <TouchableHighlight
                    onPress={batch}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:20}}>批量通水</Text>
                </TouchableHighlight>
            ),
        };
    };
    constructor(props , context) {
        super(props , context);
        this.state = {
        }
    }
    componentDidMount(){
        const {navigation, dispatch} = this.props;
        navigation.setParams({batch: this.batch});
    }
    //批量通水
    batch = () => {
        alert("批量通水成功")
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <ScrollView style={styles.projectPage} horizontal={true}>
                <Provider>
                    <View style={styles.container, styles.flex}>
                        <Text style={styles.listTitle}>未通水</Text>
                        <View style={styles.flex}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={table_Head} style={styles.head} textStyle={styles.text}/>
                                <Rows data={table} textStyle={styles.text}/>
                            </Table>
                        </View>
                    </View>
                </Provider>
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
    container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
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
    }
});
export default createForm()(Index);