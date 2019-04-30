import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

class BarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: false,
        textSize: 14,
       // form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: false,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [ 100,105, 102,  110, 114, 109, 105,  99,  95],
           label: ''//,
          // config: {
          //   color: processColor('teal'),
          //   barShadowColor: processColor('lightgrey'),
          //   highlightAlpha: 90,
          //   highlightColor: processColor('red'),
          // }
        }],

        config: {
          barWidth: 0.5,
        }
      },
     // highlights: [{x: 3}, {x: 6}],
      xAxis: {
        valueFormatter: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
        granularityEnabled: false,
        granularity : 1,
      }
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

      // visibleRange={{x: { min: 5, max: 5 }}}
           // drawBarShadow={false}
          //  drawValueAboveBar={true}
           // drawHighlightArrow={true}
            //  onSelect={this.handleSelect.bind(this)}
      
           // onChange={(event) => console.log(event.nativeEvent)}
  render() {
    return (
      <View>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
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
  container: {
   // flex: 1,
    backgroundColor: '#fff'
  },
  chart: {
  //  flex: 1
  height:500
  }
});

export default BarChartScreen;
