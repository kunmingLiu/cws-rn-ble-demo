import React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import RNBleTransport from "@coolwallets/transport-react-native-ble";
import CoolWallet from '@coolwallets/wallet';
import cwsETH from '@coolwallets/eth';

import Connection from './Components/Connection';
import Settings from './Components/Settings';
import WalletTest from './Components/WalletTests';
import EthTest from './Components/EthereumTest';
import { getAppKeysOrGenerate, getAppIdOrNull } from './Utils/sdkUtil';
import { styles } from "./Components/styles";

console.disableYellowBox = true; // remove UI yellow box

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transport: {},
      appPublicKey: '',
      appPrivateKey: '',
      appId: '',
      isModalVisible: false,
      searchDevices: [],
      refresh: false
    }
    this.unsubscriber = {};
  }

  connect = async () => {
    this.setState({
      isModalVisible: true
    })
    this.unsubscriber = await RNBleTransport.listen(async (error, device) => {
      if (device) {
        if (this.state.searchDevices.
          filter(searchDevice => searchDevice.id === device.id).length == 0) {

          const devices = this.state.searchDevices;
          devices.push(device);
          this.setState({
            searchDevices: devices,
            refresh: !this.state.refresh
          })
        }
      }
      throw error;
    });
  }

  disconnect = () => {
    const { transport } = this.state;
    RNBleTransport.disconnect(transport.device.id);
    this.setState({
      transport: {}
    });
  }

  componentDidMount = async () => {
    this.reloadStorage();
  }

  reloadStorage = async () => {
    const { appPublicKey, appPrivateKey } = await getAppKeysOrGenerate();
    const appId = await getAppIdOrNull();

    this.setState({
      appPublicKey,
      appPrivateKey,
      appId: appId || ''
    });
  }

  _handlePressListItem = async (item) => {
    this.toggleModal();
    const transport = await RNBleTransport.connect(item.id);
    this.setState({
      transport
    });
  };

  _renderItem = (data) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this._handlePressListItem(data.item);
          }}
        >
          <View>
            <Text>Name : {data.item.name}</Text>
            <Text>MAC : {data.item.id}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  toggleModal = () => {
    console.log('unsubscriber', this.unsubscriber);
    this.unsubscriber && this.unsubscriber.unsubscribe();
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };


  render() {
    const { main, title, content } = styles;
    const {
      transport,
      appPublicKey,
      appPrivateKey,
      appId,
      searchDevices,
      isModalVisible,
      refresh
    } = this.state;
    const wallet = new CoolWallet(transport, appPrivateKey, appId);
    const ETH = new cwsETH(transport, appPrivateKey, appId);
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>

          <View style={main}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
            >
              <Text style={title}>CoolWalletS x RN BLE</Text>

              <Connection connect={this.connect} disconnect={this.disconnect} />

              <Settings hardware={wallet} appPublicKey={appPublicKey} reloadStorage={this.reloadStorage} />

              <WalletTest wallet={wallet} />

              <EthTest ETH={ETH} />

            </ScrollView>
          </View>
        </SafeAreaView>
        <Modal isVisible={isModalVisible}>
          <View style={content}>
            <FlatList
              data={searchDevices}
              extraData={refresh}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              getItemLayout={(data, index) => ({
                length: 50,
                offset: (50 + 10) * index,
                index
              })}
            />
            <Button onPress={this.toggleModal} title="Close" />
          </View>
        </Modal>
      </View>
    )
  }
};