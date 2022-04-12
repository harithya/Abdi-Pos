import React, { useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Color from './src/assets/theme/color.json'
import Mapping from './src/assets/theme/mapping.json'
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import StackNavigation from './src/routes/StackNavigation';
import { MaterialCommunityPack } from 'src/assets/icon/material-community-icons';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import 'react-native-gesture-handler';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { helper } from '@utils';
import Orientation from 'react-native-orientation';
import { QueryClient, QueryClientProvider, } from 'react-query';
import { fetchCategory } from 'src/redux/actions/categoryAction';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const queryClient = new QueryClient();
const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  console.log("hi")

  useEffect(() => {
    helper.isTablet() ? Orientation.lockToLandscape() : Orientation.lockToPortrait();
  }, [])


  LogBox.ignoreAllLogs();
  store.dispatch(fetchCategory())

  //FETCH MASTER

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={MyTheme}>
          <IconRegistry icons={[MaterialCommunityPack, EvaIconsPack]} />
          <StatusBar barStyle={"light-content"} translucent backgroundColor={"transparent"} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...Color }} customMapping={{ ...eva.mapping, ...Mapping }}>
            <StackNavigation />
          </ApplicationProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}

export default App