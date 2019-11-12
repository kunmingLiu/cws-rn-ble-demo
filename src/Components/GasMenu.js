import React, { Component } from 'react';
import { View, Text } from "react-native";
import { styles } from "./styles";
import SegmentedControlTab from "react-native-segmented-control-tab";
import axios from 'axios';

class GasMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 0,
      gas: []
    }
  }

  componentDidMount = () => {
    axios.get('https://ethgasstation.info/json/ethgasAPI.json').then(response => {
      const { fast, average, safeLow } = response.data;
      this.setState({
        gas: [
          { label: `Fast: ${fast}`, value: fast },
          { label: `Avg: ${average}`, value: average },
          { label: `Slow: ${safeLow}`, value: safeLow }
        ]
      });
      this.props.handler(fast);
    })
  }

  handleIndexChange = (index) => {
    this.setState({
      selected: index
    });
    this.props.handler(this.state.gas[index].value);
  }

  render() {
    const options = this.state.gas.map(item => item.label);
    const { title } = styles
    return (
      <View>
        <Text style={title}>Gas(Gwei)</Text>
        <View style={{ padding: 20, backgroundColor: 'white' }}>
          <SegmentedControlTab
            values={options}
            selectedIndex={this.state.selected}
            onTabPress={this.handleIndexChange}
          />
        </View>
      </View>
    )
  }
}

export default GasMenu
