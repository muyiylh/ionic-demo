import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {StackNavigator, SafeAreaView} from 'react-navigation';

import {PieChart} from 'react-native-charts-wrapper';
import { scaleSize } from '../../utils/ScreenUtil';
class PieChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: scaleSize(20),
        textColor:processColor("#333"),
        form: 'CIRCLE',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{value: 45, label: '正常报装数'},
            {value: 21, label: '超周期数'}],
          label: '',
          config: {
            colors: [processColor('#50bef7'), processColor('#ffca58')],
            valueTextSize: scaleSize(20),
            valueTextColor: processColor('#333'),
            sliceSpace: 5,
            selectionShift: 13,
            // xValuePosition: "OUTSIDE_SLICE",
            // yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "#.#'%'",
           // valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5
          }
        }],
      },
      highlights: [{x:2}],
      description: {
        text: '',
        textSize: 15,
        textColor: processColor('#333'),

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

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>


        <View style={styles.container}>
          <PieChart
            style={{height:this.props.height-80}}
            logEnabled={true}
            chartBackgroundColor={processColor('#fff')}
            chartDescription={{text: ''}}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}

            entryLabelColor={processColor('#333')}
            entryLabelTextSize={scaleSize(20)}
            rotationAngle={45}
            usePercentValues={true}
            centerTextRadiusPercent={100}
            holeRadius={40}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={350}
    
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});

export default PieChartScreen;
