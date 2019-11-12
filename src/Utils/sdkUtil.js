import { generateKeyPair } from '@coolwallets/wallet'
import AsyncStorage from '@react-native-community/async-storage';

export const getAppKeysOrGenerate = async () => {
  let appPublicKey = await AsyncStorage.getItem('appPublicKey')
  let appPrivateKey = await AsyncStorage.getItem('appPrivateKey')
  if (appPublicKey !== null && appPrivateKey !== null) {
    console.log(`Got Keys from AsyncStorage!`)
    return { appPublicKey, appPrivateKey }
  }

  // Generate new keyPair
  const keyPair = generateKeyPair()
  await AsyncStorage.setItem('appPublicKey', keyPair.publicKey)
  await AsyncStorage.setItem('appPrivateKey', keyPair.privateKey)
  return { appPublicKey: keyPair.publicKey, appPrivateKey: keyPair.privateKey }
}

export const getAppIdOrNull = async () => {
  const appId = await AsyncStorage.getItem('appId');
  if (appId === null) {
    console.log('No Appid stored, please register!')
  }
  return appId
}