import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { styles } from "./styles";
import * as bip39 from 'bip39';

class WalletTest extends Component {
  state = {
    mnemonic: '',
  }
  setMnemonic = () => {
    const mnemonic = this.state.mnemonic
    const hex = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
    console.log(`setting seed ${hex}`)
    this.props.wallet
      .setSeed(hex)
      .then(() => {
        console.log(`Set seed success!`)
      })
      .catch(error => {
        console.log('setSeed error', error);
      })
  }

  onChangeText = mnemonic => {
    console.log('onChangeText mnemonic', mnemonic);
    this.setState({ mnemonic })
  }

  render() {
    const { title, inputStyle, defaultBtn, defaultColor } = styles;
    return (
      <View>
        <Text style={title}>About Wallet</Text>
        <View>
          <TextInput style={inputStyle} onChangeText={this.onChangeText} />
          <TouchableOpacity style={defaultBtn} onPress={this.setMnemonic}>
            <Text style={defaultColor}>Set Seed</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default WalletTest
