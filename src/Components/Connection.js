import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";

class Ble extends Component {
  render() {
    const { title, container, defaultBtn, warning, defaultColor } = styles;
    const { connect, disconnect } = this.props;
    return (
      <View>
        <Text style={title}>Connect</Text>
        <View style={container}>
          <TouchableOpacity style={defaultBtn} onPress={() => connect()}>
            <Text style={defaultColor}>Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...defaultBtn, ...warning }} onPress={() => disconnect()}>
            <Text style={warning}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


export default Ble
