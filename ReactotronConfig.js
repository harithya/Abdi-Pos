import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron from 'reactotron-react-native'
import { NativeModules } from 'react-native';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];
const reactotron = Reactotron
    .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({ host: host }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!

export default reactotron;

// adb reverse tcp:9090 tcp:9090