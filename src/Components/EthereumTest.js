import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Web3 from 'web3';
import GasMenu from './GasMenu';
import { styles } from './styles';

const chainId = 3
const web3 = new Web3('https://ropsten.infura.io/v3/44fd23cda65746a699a5d3c0e2fa45d5')

class EthTest extends Component {
  constructor(props) {
    super(props)
    this.gasHandler = this.gasHandler.bind(this)
  }

  state = {
    addressIndex: 0,
    gasLimit: 21000,
    gasPrice: 10,
    nonce: 0,
    address: '',
    to: '',
    value: '0',
    data: '0x00',
    txHash: '',
  }

  getAddress = () => {
    const addressIdx = parseInt(this.state.addressIndex)
    this.props.ETH.getAddress(addressIdx).then(address => {
      console.log('getAddress address', address);
      this.setState({ address })
    })
  }

  gasHandler = gasPrice => {
    const gasPriceInGWei = gasPrice / 10
    this.setState({
      gasPrice: gasPriceInGWei,
    })
  }

  signTx = () => {
    const { addressIndex, to, value, data, gasPrice, address } = this.state;
    console.log('signTx addressIndex', addressIndex);
    console.log('signTx to', to);
    console.log('signTx value', value);
    console.log('signTx data', data);
    console.log('signTx gasPrice', gasPrice);
    console.log('signTx address', address);

    web3.eth.getTransactionCount(address, 'pending').then(nonce => { // Get latest nonce
      web3.eth.estimateGas({ to, data }, (_, gasLimit) => {         // Get gasLimit
        const gasLimitHex = web3.utils.toHex(gasLimit)
        const gasPriceHex = web3.utils.toHex(web3.utils.toWei(gasPrice.toString(), 'Gwei'))
        const param = {
          chainId,
          nonce: web3.utils.toHex(nonce),
          gasPrice: gasPriceHex,
          gasLimit: gasLimitHex,
          to,
          value: web3.utils.toHex(web3.utils.toWei(value.toString(), 'ether')),
          data,
        }
        this.props.ETH.signTransaction(param, addressIndex).then(signedTx => {
          web3.eth.sendSignedTransaction(signedTx, (err, txHash) => {
            if (err) { console.error(err) }
            this.setState({ txHash })
          })
        })
      })
    })
  }

  onAddressIndexChange = index => {
    console.log('onAddressIndexChange index', index);
    this.setState({
      addressIndex: parseInt(index)
    })
  }

  onToAddressChange = to => {
    console.log('onToAddressChange to', to);
    this.setState({
      to
    })
  }

  onAmountChange = value => {
    console.log('onAmountChange value', value);
    this.setState({
      value
    })
  }

  onDataChange = data => {
    console.log('onDataChange data', data);
    this.setState({
      data
    })
  }

  render() {
    const {
      title,
      inputStyle,
      defaultBtn,
      success
    } = styles;

    return (
      <View>
        <Text style={title}>Ethereum Tx</Text>
        <Text style={title}>From</Text>
        <View>
          <TextInput
            style={inputStyle}
            placeholder={'Index'}
            onChangeText={this.onAddressIndexChange}
          />
          <TouchableOpacity
            style={{ ...defaultBtn, ...success }}
            onPress={this.getAddress}>
            <Text style={success}>Get Address</Text>
          </TouchableOpacity>
        </View>

        <Text style={title}>To</Text>
        <View>
          <TextInput
            style={inputStyle}
            placeholder={'0x...'}
            onChangeText={this.onToAddressChange} />
        </View>

        <Text style={title}>Amount</Text>
        <View>
          <TextInput
            style={inputStyle}
            placeholder={'Amount in Eth'}
            onChangeText={this.onAmountChange} />
        </View>

        <GasMenu handler={this.gasHandler} />
        <TouchableOpacity
          style={{ ...defaultBtn, ...success }}
          onPress={this.signTx}>
          <Text style={{ ...success, fontSize: 20 }}>{'Sign & Send'}</Text>
        </TouchableOpacity>

        <Text style={title}>Data</Text>
        <View>
          <TextInput
            style={inputStyle}
            placeholder={'0x...'}
            onChangeText={this.onDataChange} />
        </View>

        <Text style={{ ...success, fontSize: 20 }}>Result : {this.state.txHash}</Text>

      </View>
    )
  }
}

export default EthTest
