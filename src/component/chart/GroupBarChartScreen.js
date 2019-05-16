import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import { scaleSize } from '../../utils/ScreenUtil';

class StackedBarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: scaleSize(20),
        textColor:processColor("#333"),
       // form: "SQUARE",
        formSize: scaleSize(20),
        //xEntrySpace: 10,
       // yEntrySpace: 5,
        //wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [35, 40, 77, 81, 43,5, 40, 77, 81, 43,5, 40],
          label: '正常报装数',
          config: {
            drawValues: true,
            colors: [processColor('#50bef7')],
          }
        },
         {
          values: [40, 5, 50, 23, 79,40, 5, 50, 23, 79,40, 5],
          label: '超周期数',
          config: {
            drawValues: true,
            colors: [processColor('#ffca58')],
          }
        },
        
     
    ],
        config: {
          barWidth: 0.35,
          textColor:processColor("#333"),
          group: {
            fromX: 0,
             groupSpace: 0.1,
             barSpace: 0.1,
          },
        }
      },
      xAxis: {
        valueFormatter: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月','11月','12月'],
       //granularityEnabled: false,
      //  granularity:12,
      axisMaximum: 12,
       axisMinimum: 0,
       textColor:processColor("#333"),
        centerAxisLabels: true,
        position: 'BOTTOM',
      },

      marker: {
        enabled: false,
       // markerColor: processColor('#F0C0FF8C'),
        //textColor: processColor('white'),
        markerFontSize: 14,
      },

    };
  }

    componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({...this.state, highlights: [{x: 1, y:40}, {x: 2, y:50}]})
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

   // console.log(event.nativeEvent)
  }

  render() {
    return (
      <View>



        <View style={styles.container}>
          <BarChart
            style={{height:this.props.height-80}}
            xAxis={this.state.xAxis}
            chartDescription={{text: ''}}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={true}
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


export default StackedBarChartScreen;
