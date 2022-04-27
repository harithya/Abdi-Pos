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
import { store, persistor } from 'src/redux/store';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { helper } from '@utils';
import Orientation from 'react-native-orientation';
import { QueryClient, QueryClientProvider, } from 'react-query';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react'


const queryClient = new QueryClient();
const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };


  useEffect(() => {
    helper.isTablet() ? Orientation.lockToLandscape() : Orientation.lockToPortrait();
  }, [])

  LogBox.ignoreAllLogs();

  //FETCH MASTER

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={MyTheme}>
            <IconRegistry icons={[MaterialCommunityPack, EvaIconsPack]} />
            <StatusBar barStyle={"light-content"} translucent backgroundColor={"transparent"} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...Color }} customMapping={{ ...eva.mapping, ...Mapping }}>
              <StackNavigation />
            </ApplicationProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App