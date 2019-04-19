import React, { Component } from 'react';
import { View, ViewPropTypes,Image,TouchableHighlight ,Text} from 'react-native';
import TreeSelect from 'react-native-tree-select';
import {scaleSize} from "../utils/ScreenUtil";
import NavigationUtil from '../utils/NavigationUtil';



const treeselectData = [
    {
      "id":"A",
      "name":"农、林、牧、渔业",
      "sortNo":"A",
      "parentId":"0",
      "children": [
        {
          "id":"A01",
          "name":"农业",
          "sortNo":"A01",
          "parentId":"A",
          "children": [
            {
              "id":"A011",
              "name":"谷物种植",
              "sortNo":"A011",
              "parentId":"A01"
            },
            {
              "id":"A012",
              "name":"豆类、油料和薯类种植",
              "sortNo":"A012",
              "parentId":"A01"
            },
            {
              "id":"A013",
              "name":"棉、麻、糖、烟草种植",
              "sortNo":"A013",
              "parentId":"A01"
            },
            {
              "id":"A014",
              "name":"蔬菜、食用菌及园艺作物种植",
              "sortNo":"A014",
              "parentId":"A01"
            },
            {
              "id":"A015",
              "name":"水果种植",
              "sortNo":"A015",
              "parentId":"A01"
            },
            {
              "id":"A016",
              "name":"坚果、含油果、香料和饮料作物种植",
              "sortNo":"A016",
              "parentId":"A01"
            },
            {
              "id":"A017",
              "name":"中药材种植",
              "sortNo":"A017",
              "parentId":"A01"
            }
          ]
        }
      ]
    },
    {
      "id":"B",
      "name":"采矿业",
      "sortNo":"B",
      "parentId":"0",
      "children": [
        {
          "id":"B06",
          "name":"煤炭开采和洗选业",
          "sortNo":"B06",
          "parentId":"B",
          "children": [
            {
              "id":"B061",
              "name":"烟煤和无烟煤开采洗选",
              "sortNo":"B061",
              "parentId":"B06"
            },
            {
              "id":"B062",
              "name":"褐煤开采洗选",
              "sortNo":"B062",
              "parentId":"B06"
            },
            {
              "id":"B069",
              "name":"其他煤炭采选",
              "sortNo":"B069",
              "parentId":"B06"
            }
          ]
        }
      ]
    }
  ]
export default class tree extends Component {
    static navigationOptions = ({ navigation }) => {
        //console.log("navigation:",navigation);
        const {state:{params:{title}}} = navigation;
        return {
            title:title,
             //右边的按钮
             headerRight: (
                <TouchableHighlight
                    onPress={navigation.state.params?navigation.state.params.navigatePress:null}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{color:'#fff',fontSize:scaleSize(28)}}>确定</Text>
                </TouchableHighlight>
            ),
        };
        
    }
    constructor(props){
        super(props);
        this.state={
            checkInfo:{},//选中的信息
        }
    }
    componentDidMount(){

        this.props.navigation.setParams({
            navigatePress:this.onOk
        })
  
    }
    onOk =() =>{
        const {checkInfo} = this.state;
        const {state:{params:{returnData}}} = this.props.navigation;
       // NavigationUtil.navigate("comTree",{data: data,title:title})
     NavigationUtil.navigate(returnData.url,{...returnData.payload,checkInfo})
    }
  _onClick =(value)=>{
   
    this.setState({checkInfo:value.item})
  }
  _onClickLeaf =(value)=>{
    this.setState({checkInfo:value.item})
  }
  render() {
    const {state:{params:{data}}} = this.props.navigation;
     //openIds={['A01']}
    return (
        <TreeSelect
        data={data}
        isOpen={false}
       
        isShowTreeId={false}
        itemStyle={{
          // backgroudColor: '#8bb0ee',
          fontSize: scaleSize(26),
          color: '#333'
        }}
        selectedItemStyle={{
          backgroudColor: '#f7edca',
          fontSize: scaleSize(26),
          color: '#45CBE6'
        }}
        onClick={this._onClick}
        onClickLeaf={this._onClickLeaf}
        treeNodeStyle={{
          // openIcon: <Icon size={18} color="#171e99" style={{ marginRight: 10 }} name="ios-arrow-down" />,
          // closeIcon: <Icon size={18} color="#171e99" style={{ marginRight: 10 }} name="ios-arrow-forward" />
          openIcon: <Image
            resizeMode="stretch"
            style={{ width: 20, height: 20 }}
            source={require('../images/caret-down.png')} />,
          closeIcon: <Image
            resizeMode="stretch"
            style={{ width: 20, height: 20 }}
            source={require('../images/caret-right.png')} />
        }}
      />
    );
  }
}


