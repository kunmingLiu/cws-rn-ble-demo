# CoolWalletS RN App Demo

![](https://imgur.com/noMz946.png)

This is a demo of how to use CoolWalletS SDK to built your own app.

### Install and run
```
npm insatll
```
```
react-native link react-native-randombytes
react-native link react-native-ble-plx
```
```
react-native run-android
# or
react-native run-ios
````

## Notes

In this demo, we use [`@coolwallets/transport-react-native-ble`](https://github.com/CoolBitX-Technology/coolwallet-js-sdk/tree/master/packages/transport-react-native-ble) as the bluetooth transport.

[`@coolwallets/wallet`](https://github.com/CoolBitX-Technology/coolwallet-js-sdk/tree/master/packages/cws-wallet) is imported to handle registration, pairing and create a seed with the card.

[`@coolwallets/eth`](https://github.com/CoolBitX-Technology/coolwallet-js-sdk/tree/master/packages/cws-eth) is use to sign eth transactions.
