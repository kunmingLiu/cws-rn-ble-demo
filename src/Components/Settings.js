import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from '@react-native-community/async-storage';


class SettingPage extends Component {
  getPassword = () => {
    console.log('getPassword start');
    this.props.hardware.getPairingPassword().then(pwd => {
      console.log(`Got pairing password: ${pwd}`)
    })
  }

  render() {
    const { hardware, appPublicKey, reloadStorage } = this.props;
    const { title, container, defaultBtn, danger, defaultColor } = styles;
    return (
      <View>
        <Text style={title}>Setting</Text>
        <View style={container}>
          <TouchableOpacity
            style={{ ...defaultBtn, ...danger }}
            onPress={() => { hardware.resetCard() }}>
            <Text style={danger}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...defaultBtn }}
            onPress={() => {
              console.log('register press hardware', hardware);
              hardware.register(appPublicKey, '83239194', 'myRnBle').then(
                appId => {
                  AsyncStorage.setItem('appId', appId)
                  this.props.hardware.setAppId(appId)
                  console.log(`Store AppId complete! ${appId}`)
                  reloadStorage();
                }
              ).catch(error => {
                console.log('register  error', error);
              })
            }}>
            <Text style={defaultColor}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...defaultBtn }}
            onPress={this.getPassword}>
            <Text style={defaultColor}>Get password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default SettingPage
