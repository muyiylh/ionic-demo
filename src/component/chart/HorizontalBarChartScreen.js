import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {HorizontalBarChart} from 'react-native-charts-wrapper';
import { scaleSize } from '../../utils/ScreenUtil';
class HorizontalBarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: false,
      
      },
      data: {
        dataSets: [{
          values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}],
          label: '',
          config: {
            color: processColor('#f4cd44'),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],
      },
      xAxis: {
        valueFormatter: ['DN15','DN275','DN730','DN35','DN40'],
        position: 'BOTTOM',
        granularityEnabled: true,

        granularity: 1,
        labelCount: 10,
        textColor:processColor("#333"),
      },
     // yAxis: {left:{axisMinimum: 0}}
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
    console.log(event.nativeEvent)
  }


  render() {
    return (
      <View >



        <View style={styles.container}>
          <HorizontalBarChart
            style={{height:this.props.height-80}}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            chartDescription={{text: ''}}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}

          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF'
//   },
//   chart: {
//     flex: 1
//   }
});

export default HorizontalBarChartScreen;