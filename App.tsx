import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Color from './src/assets/theme/color.json'
import Mapping from './src/assets/theme/mapping.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import StackNavigation from './src/routes/StackNavigation';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer theme={MyTheme}>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar barStyle={"dark-content"} translucent backgroundColor={"transparent"} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Color }} customMapping={{ ...eva.mapping, ...Mapping }}>
        <StackNavigation />
      </ApplicationProvider>
    </NavigationContainer>
  )
}

export default App